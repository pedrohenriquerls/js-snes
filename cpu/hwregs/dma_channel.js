
function DMAChannel(){
	this.hdmaEnabled;

	this.doTransfer = false;      // Custom variable for whether hdma is enabled for this or not

	this.direction = true;        // True = Read PPU, false = Write PPU
	this.addressMode = true;      // HDMA only(true=indirect, false=direct)
	this.addressIncrement = true; // True=decrement, False=increment
	this.fixedTransfer = true;    // Do we allow addressIncrement to have an effect?
	this.transferMode = 0x7;          // TransferMode
	
	this.srcAddress = 0xFFFF;
	this.srcBank = 0xFF;
	this.dstRegister = 0x21FF;
	
	this.indirectBank = 0xFF;
	this.transferSize = 0xFFFF; // Also known as indirect address

	// Updated at the beginning of a frame(copied from 42x2/3)
	this.tableAddr = 0xFFFF;

	this.rlc = 0xFF; // repeat/line counter

	this.frameDisabled=true;//is hdma disabled for this frame?
}
DMAChannel.prototype = {
	isRepeat: function() {
		return (this.rlc & 0x80) == 0x80;
	},
	getLineCounter: function() {
		return this.rlc & 0x7F;
	},
	start: function() {
		if (this.transferSize == 0x0000) {
			this.transferSize = 0x10000;
		}
		var cycleCount = this.transferSize *8 + 24; // 8 cyles per byte + 24overhead
		
		if (this.direction == false) 
			this.dmaWritePPU();
		else                    
			this.dmaReadPPU();
		
		Timing.cycle(cycleCount);
	},
	
	/**
	 * Happens every frame(on scanline 0)
	 */
	initHDMA: function() {
		if (!this.hdmaEnabled) return;
		
		// Copy AAddress into TableAddress
		// Load repeat/line counter from table
		// load indirect address
		// set enable transfer
		this.tableAddr = this.srcAddress;
		this.rlc = Core.mem.get(Size.BYTE, this.srcBank, this.tableAddr);
		this.tableAddr++;
		if (this.rlc==0) {
			this.frameDisabled = true;
			this.doTransfer = false;
			return;
		}
		
		if (this.addressMode == true) { // Indirect
			this.transferSize = Core.mem.get(Size.SHORT, this.srcBank, this.tableAddr);
			this.tableAddr += 2;
		}
		this.frameDisabled = false;
		this.doTransfer = true;
	},
	
	doHDMA: function() {
		if (this.frameDisabled || !this.hdmaEnabled) return;
		
		if (this.doTransfer) {
			if (this.direction == false) 
				this.hdmaWritePPU();
			else                    
				this.hdmaReadPPU();
		}
		this.rlc = Util.limit(Size.BYTE, this.rlc-1);
		this.doTransfer = this.isRepeat();
		if (this.getLineCounter() == 0) {
			this.rlc = Core.mem.get(Size.BYTE, this.srcBank, this.tableAddr);
			this.tableAddr++;
			if (this.addressMode == true) { // Indirect
				this.transferSize = Core.mem.get(Size.SHORT, this.srcBank, this.tableAddr);
				this.tableAddr += 2;
			}
			// Handle special case if this.rlc == 0(this.rlc is $43xA)
			// SEE: http://wiki.superfamicom.org/snes/show/DMA+%26+HDMA
			if (this.rlc == 0) {
				this.frameDisabled = true;
			}
			this.doTransfer = true;
		}
	},
	
	hdmaReadPPU: function() {
		console.log("HDMA Read: Not implemented");
	},
	dmaReadPPU: function() {
		while(this.transferSize>0) {
			var size = dmaTransferPPUOnce(0, this.dstRegister, this.srcBank, this.srcAddress);
			this.adjustSrcAddress(size);
			this.transferSize -= size;
		}
	},
	
	hdmaWritePPU: function() {
		if (this.addressMode) { // Indirect address
			var size = dmaTransferPPUOnce(indirectBank, this.transferSize, 0, this.dstRegister);
			this.transferSize += size;
		} else {
			var size = dmaTransferPPUOnce(this.srcBank, this.tableAddr, 0, this.dstRegister);
			this.tableAddr += size;
		}
	},
	
	dmaWritePPU: function() {
		while(this.transferSize>0) {
			var size = dmaTransferPPUOnce(this.srcBank, this.srcAddress, 0, this.dstRegister);
			this.adjustSrcAddress(size);
			this.transferSize -= size;
		}
	},
	
	dmaTransferPPUOnce: function(fromBank, fromAddress, toBank, toAddress) {
		// TODO: for normal dma transfers, only write to at most $this.transferSize registers, even if we are supposed to write to multiple ones this call
		// TODO: i.e. break out of the statement if transfersize == 0 at any point
		var size = 0;
		var tmp = 0;
		if (this.this.transferMode == 0x0) { // 1 register, write once(1byte)
			tmp = Core.mem.get(Size.BYTE, fromBank, fromAddress);
			Core.mem.set(Size.BYTE, toBank, toAddress, tmp);
			size = 1;
		} else if (this.transferMode == 0x01) { // 2 Register write once(2bytes)
			tmp = Core.mem.get(Size.BYTE, fromBank, fromAddress+0);
			Core.mem.set(Size.BYTE, toBank, toAddress, tmp);
			
			// Don't fetch the next byte if it is a fixed transfer
			if (!fixedTransfer)	tmp = Core.mem.get(Size.BYTE, fromBank, fromAddress+1);
			Core.mem.set(Size.BYTE, toBank, toAddress+1, tmp);
			size = 2;
		} else  if (this.transferMode == 0x02 || this.transferMode == 0x06) { // 1 Register Write Twice(2bytes)
			tmp = Core.mem.get(Size.BYTE, fromBank, fromAddress+0);
			Core.mem.set(Size.BYTE, toBank, toAddress, tmp);
			
			if (!fixedTransfer)	tmp = Core.mem.get(Size.BYTE, fromBank, fromAddress+1);
			Core.mem.set(Size.BYTE, toBank, toAddress, tmp);
			size = 2;
		} else if (this.transferMode == 0x03 || this.transferMode == 0x07) { // 2 Register Write Twice(4bytes)
			tmp = Core.mem.get(Size.BYTE, fromBank, fromAddress+0);
			Core.mem.set(Size.BYTE, toBank, toAddress, tmp);
			
			if (!fixedTransfer)	tmp = Core.mem.get(Size.BYTE, fromBank, fromAddress+1);
			Core.mem.set(Size.BYTE, toBank, toAddress, tmp);
			
			if (!fixedTransfer)	tmp = Core.mem.get(Size.BYTE, fromBank, fromAddress+2);
			Core.mem.set(Size.BYTE, toBank, toAddress+1, tmp);
			
			if (!fixedTransfer)	tmp = Core.mem.get(Size.BYTE, fromBank, fromAddress+3);
			Core.mem.set(Size.BYTE, toBank, toAddress+1, tmp);
			size = 4;
		} else if (this.transferMode == 0x04) { // 4 Registers Write once(4bytes)
			tmp = Core.mem.get(Size.BYTE, fromBank, fromAddress+0);
			Core.mem.set(Size.BYTE, toBank, toAddress, tmp);
			
			if (!fixedTransfer)	tmp = Core.mem.get(Size.BYTE, fromBank, fromAddress+1);
			Core.mem.set(Size.BYTE, toBank, toAddress+1, tmp);
			
			if (!fixedTransfer)	tmp = Core.mem.get(Size.BYTE, fromBank, fromAddress+2);
			Core.mem.set(Size.BYTE, toBank, toAddress+2, tmp);
			
			if (!fixedTransfer)	tmp = Core.mem.get(Size.BYTE, fromBank, fromAddress+3);
			Core.mem.set(Size.BYTE, toBank, toAddress+3, tmp);
			size = 4;
		} else {
			console.log("Unknown transfer mode");
			return 0;
		}
		return size;
	},
	
	adjustSrcAddress: function(size) {
		if (!this.fixedTransfer) {
			if (this.addressIncrement) // Decrease this.srcAddress
				this.srcAddress-=size;
			else
				this.srcAddress+=size; // Increase this.srcAddress
		}
	},
	
	toString: function() {
		/*String r = "DMA Settings: \n";
		r += "  Direction:         " + (direction?"Read PPU":"Write PPU") + "\n";
		r += "  HDMA Address Mode: " + (this.addressMode?"table=pointer":"table=data") + "\n";
		r += "  Address Increment: " + (addressIncrement?"Decrement":"Increment") + "\n";
		r += "  Fixed Transfer:    " + fixedTransfer + "\n";
		r += "  Transfer Mode:     0b" + Integer.toBinaryString(this.transferMode)+"\n";
		r += String.format("  Source Address:    %02X:%04X\n",this.srcBank, this.srcAddress);
		r += String.format("  Destination Reg:   %04X\n", this.dstRegister);
		r += String.format("  Size/IndirectAddr: %04X\n", this.transferSize);
		r += String.format("  Indirect Bank:     %02X\n", indirectBank);
		return r;*/
		return 'TODO: dma_channel to string'
	}
}
