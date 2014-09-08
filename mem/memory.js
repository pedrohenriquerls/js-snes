function Memory(){
	this.isHiROM;
	// Initialize memory
	//Arrays.fill(this.wram, 0x55);	// WRAM is initialized with 0x55
	//TODO: tem que resolver o tamanho do array
	this.wram = Array.apply(null, new Array(100 * 1024)).map(Number.prototype.valueOf, 0x55);//[128 * 1024];
	this.sram = [0x40000];
	this.rom; // 0x80 chunks of 32k

	// CPU related hwregs
	this.mmap = []
	this.mmap[0x4200 - 0x2000] = CPURegisters.interruptEnable;
	this.mmap[0x4201 - 0x2000] = CPURegisters.wrio;
	this.mmap[0x4207 - 0x2000] = CPURegisters.htimel;
	this.mmap[0x4208 - 0x2000] = CPURegisters.htimeh;
	this.mmap[0x4209 - 0x2000] = CPURegisters.vtimel;
	this.mmap[0x420A - 0x2000] = CPURegisters.vtimeh;
	this.mmap[0x420D - 0x2000] = CPURegisters.memsel;
	this.mmap[0x4210 - 0x2000] = CPURegisters.rdnmi;
	this.mmap[0x4211 - 0x2000] = CPURegisters.timeup;
	
	
	// CPU math registers(for multiplication/division)
	this.mmap[0x4202 - 0x2000] = CPUMath.wrmpya;
	this.mmap[0x4203 - 0x2000] = CPUMath.wrmpyb;
	this.mmap[0x4204 - 0x2000] = CPUMath.wrdivl;
	this.mmap[0x4205 - 0x2000] = CPUMath.wrdivh;
	this.mmap[0x4206 - 0x2000] = CPUMath.wrdivb;
	this.mmap[0x4214 - 0x2000] = CPUMath.rddivl;
	this.mmap[0x4215 - 0x2000] = CPUMath.rddivh;
	this.mmap[0x4216 - 0x2000] = CPUMath.rdmpyl;
	this.mmap[0x4217 - 0x2000] = CPUMath.rdmpyh;
	
	// DMA
	this.mmap[0x420B - 0x2000] = DMA.mdmaen;
	this.mmap[0x420C - 0x2000] = DMA.hdmaen;
	
	// DMA Channel x Registers
	for (var i = 0; i<8;i++) {
		this.mmap[0x4300 - 0x2000 + 0x10*i] = DMA.dmaReg[i].dmapx;
		this.mmap[0x4301 - 0x2000 + 0x10*i] = DMA.dmaReg[i].bbadx;
		this.mmap[0x4302 - 0x2000 + 0x10*i] = DMA.dmaReg[i].a1txl;
		this.mmap[0x4303 - 0x2000 + 0x10*i] = DMA.dmaReg[i].a1txh;
		this.mmap[0x4304 - 0x2000 + 0x10*i] = DMA.dmaReg[i].a1bx;
		this.mmap[0x4305 - 0x2000 + 0x10*i] = DMA.dmaReg[i].dasxl;
		this.mmap[0x4306 - 0x2000 + 0x10*i] = DMA.dmaReg[i].dasxh;
		this.mmap[0x4307 - 0x2000 + 0x10*i] = DMA.dmaReg[i].dasbh;
		this.mmap[0x4308 - 0x2000 + 0x10*i] = DMA.dmaReg[i].a2axl;
		this.mmap[0x4309 - 0x2000 + 0x10*i] = DMA.dmaReg[i].a2axh;
		this.mmap[0x430a - 0x2000 + 0x10*i] = DMA.dmaReg[i].nltrx;
	}
	
	// Video
	this.mmap[0x2100 - 0x2000] = PPURegisters.screenDisplay;
	
	// Background
	this.mmap[0x2105 - 0x2000] = BGRegisters.screenMode;
	this.mmap[0x2106 - 0x2000] = BGRegisters.mosaic;
	this.mmap[0x2107 - 0x2000] = BGRegisters.bg1sc;
	this.mmap[0x2108 - 0x2000] = BGRegisters.bg2sc;
	this.mmap[0x2109 - 0x2000] = BGRegisters.bg3sc;
	this.mmap[0x210A - 0x2000] = BGRegisters.bg4sc;
	this.mmap[0x210B - 0x2000] = BGRegisters.bg12nba;
	this.mmap[0x210C - 0x2000] = BGRegisters.bg34nba;
	
	// Background scrolling
	this.mmap[0x210D - 0x2000] = BGRegisters.bg1hofs;
	this.mmap[0x210E - 0x2000] = BGRegisters.bg1vofs;
	this.mmap[0x210F - 0x2000] = BGRegisters.bg2hofs;
	this.mmap[0x2110 - 0x2000] = BGRegisters.bg2vofs;
	this.mmap[0x2111 - 0x2000] = BGRegisters.bg3hofs;
	this.mmap[0x2112 - 0x2000] = BGRegisters.bg3vofs;
	this.mmap[0x2113 - 0x2000] = BGRegisters.bg4hofs;
	this.mmap[0x2114 - 0x2000] = BGRegisters.bg4vofs;
	
	// Mode 7 TODO: Unimplemented
	this.mmap[0x211A - 0x2000] = PPURegisters.m7;
	this.mmap[0x211B - 0x2000] = PPURegisters.m7;
	this.mmap[0x211C - 0x2000] = PPURegisters.m7;
	this.mmap[0x211D - 0x2000] = PPURegisters.m7;
	this.mmap[0x211E - 0x2000] = PPURegisters.m7;
	this.mmap[0x211F - 0x2000] = PPURegisters.m7;
	this.mmap[0x2120 - 0x2000] = PPURegisters.m7;
	
	// Window Registers TODO: unimplemented
	this.mmap[0x2123 - 0x2000] = WindowRegisters.w12sel;
	this.mmap[0x2124 - 0x2000] = WindowRegisters.w34sel;
	this.mmap[0x2125 - 0x2000] = WindowRegisters.wobjsel;
	this.mmap[0x2126 - 0x2000] = WindowRegisters.wh0;
	this.mmap[0x2127 - 0x2000] = WindowRegisters.wh1;
	this.mmap[0x2128 - 0x2000] = WindowRegisters.wh2;
	this.mmap[0x2129 - 0x2000] = WindowRegisters.wh3;
	this.mmap[0x212A - 0x2000] = WindowRegisters.wbglog;
	this.mmap[0x212B - 0x2000] = WindowRegisters.wobjlog;
	this.mmap[0x212E - 0x2000] = WindowRegisters.tmw;
	this.mmap[0x212F - 0x2000] = WindowRegisters.tsw;
	
	
	// OAM registers
	this.mmap[0x2101 - 0x2000] = OAMRegisters.OAMSize;
	this.mmap[0x2102 - 0x2000] = OAMRegisters.OAMAddrLow;
	this.mmap[0x2103 - 0x2000] = OAMRegisters.OAMAddrHigh;
  this.mmap[0x2104 - 0x2000] = OAMRegisters.OAMWrite;
  this.mmap[0x2138 - 0x2000] = OAMRegisters.OAMRead;
  
  // VRAM registers
  this.mmap[0x2115 - 0x2000] = VRAM.vmainc;
  this.mmap[0x2116 - 0x2000] = VRAM.vmaddl;
  this.mmap[0x2117 - 0x2000] = VRAM.vmaddh;
  this.mmap[0x2118 - 0x2000] = VRAM.vmwdatal;
  this.mmap[0x2119 - 0x2000] = VRAM.vmwdatah;
  this.mmap[0x2139 - 0x2000] = VRAM.vmrdatal;
  this.mmap[0x213A - 0x2000] = VRAM.vmrdatah;
      
	
  // PPU Stuff
	this.mmap[0x212C - 0x2000] = PPURegisters.tm;
	this.mmap[0x212D - 0x2000] = PPURegisters.ts;
	this.mmap[0x2133 - 0x2000] = PPURegisters.setini;
	
	// PPU Status
	this.mmap[0x4212 - 0x2000] = PPURegisters.hvbjoy;

	// Color Math Registers
	this.mmap[0x2130 - 0x2000] = PPURegisters.cgwsel;
	this.mmap[0x2131 - 0x2000] = PPURegisters.cgadsub;
	this.mmap[0x2132 - 0x2000] = PPURegisters.coldata;

	// CGRam
	this.mmap[0x2121 - 0x2000] = CGRAM.cgadd;
	this.mmap[0x2122 - 0x2000] = CGRAM.cgdata;
	this.mmap[0x213B - 0x2000] = CGRAM.cgdataread;
	
	// Mode 7 registers
	this.mmap[0x211A - 0x2000] = BGRegisters.m7sel;
	this.mmap[0x211B - 0x2000] = BGRegisters.m7a;
	this.mmap[0x211C - 0x2000] = BGRegisters.m7b;
	this.mmap[0x211D - 0x2000] = BGRegisters.m7c;
	this.mmap[0x211E - 0x2000] = BGRegisters.m7d;
	this.mmap[0x211F - 0x2000] = BGRegisters.m7x;
	this.mmap[0x2120 - 0x2000] = BGRegisters.m7y;
	
	// Audio IO Ports
	//TODO: find way to make this.
	/*this.mmap[0x2140 - 0x2000] = APURegisters.apuio0;
	this.mmap[0x2141 - 0x2000] = APURegisters.apuio1;
	this.mmap[0x2142 - 0x2000] = APURegisters.apuio2;
	this.mmap[0x2143 - 0x2000] = APURegisters.apuio3;*/
	
	// Joypad
	this.mmap[0x4016 - 0x2000] = CPURegisters.joyser0;
	this.mmap[0x4017 - 0x2000] = CPURegisters.joyser1;
	this.mmap[0x4218 - 0x2000] = CPURegisters.joy1l;
	this.mmap[0x4219 - 0x2000] = CPURegisters.joy1h;
}

Memory.prototype = {
	get: function(size, bank, addr){return {}},
	set: function(size, bank, addr, val){console.log('do nothing')},
	isHiROM: function() {
		return this.isHiROM;
	},
	read: function(size, bank, addr) {
		var fastrom = false;
		
		// Determine speed by bank
		if (bank >= 0x80) {
			fastrom = true;
		}
		
		if ((bank == 0x00 || bank == 0x80) && addr >= 0x4000  && addr <= 0x41FF) {
			Timing.cycle(12); // 12 master cycles to access these
			return get(size,bank,addr);
		}
		
		if (fastrom){ // 6 cycles
			Timing.cycle(6);
			return this.get(size,bank,addr);
		} else { // 8 cycles
			Timing.cycle(8);
			return this.get(size,bank,addr);
		}
	},
	write: function(size, bank, addr, val) {
		var fastrom = false;
		
		// Determine speed by bank
		if (bank >= 0x80) {
			fastrom = true;
		}
		
		if ((bank == 0x00 || bank == 0x80) && addr >= 0x4000  && addr <= 0x41FF) {
			Timing.cycle(12); // 12 master cycles to access these
			this.set(size,bank,addr,val);
			return;
		}
		
		if (fastrom){ // 6 cycles
			Timing.cycle(6);
			this.set(size,bank,addr,val);
			return;
		} else { // 8 cycles
			Timing.cycle(8);
			this.set(size,bank,addr,val);
			return;
		}
	},
	
	getFromArray: function(size, data, index) {
		if (size == Size.SHORT && index != data.length-1) {
			return data[index + 1]<<8 | data[index];
		} else {
			return data[index];
		}
	},
	
	setInArray: function(size, data, index, value) {
		if (size == Size.SHORT && index != data.length-1) {
			data[index] = value & 0x00FF;
			data[index + 1] = (value & 0xFF00) >> 8;
		} else {
			data[index] = value;
		}
	},
	
	writeHWReg : function(size, addr, value) {
		var reg = addr - 0x2000;
		
		if(this.mmap[reg] == null) {
			this.mmap[reg] = new UnimplementedHardwareRegister();
			console.log("Write Memory Mapped register "+addr+"04x not implemented.");
			//if (Settings.get(Settings.MEM_THROW_INVALID_ADDR).equals("true"))
				//throw new RuntimeException(String.format("Write Memory Mapped register 0x%04x not implemented.", addr));
		}
		
		if (size == Size.SHORT) {
			if(this.mmap[reg+1] == null) {
				this.mmap[reg+1] = new UnimplementedHardwareRegister();
				console.log("Write Memory Mapped register "+addr+"04x not implemented.");
				//if (Settings.get(Settings.MEM_THROW_INVALID_ADDR).equals("true"))
					//throw new RuntimeException(String.format("Write Memory Mapped register 0x%04x not implemented.", addr+1));
			}

			/*
			 * Low goes first unless you want games to look like they're being 
			 * played through Kanye's shutter shades.
			 */
			this.mmap[reg].setValue(value & 0x00FF);
			this.mmap[reg+1].setValue((value & 0xFF00) >> 8);
		} else {
			this.mmap[reg].setValue(value);
		}
	},
	
	readHWReg: function(size, addr) {
		var reg = addr - 0x2000;
		if (this.mmap[reg] == null) {
			//Log.err(String.format("Read Memory Mapped register 0x%04x not implemented.", addr));
			//if (Settings.get(Settings.MEM_THROW_INVALID_ADDR).equals("true"))
				//throw new RuntimeException(String.format("Read Memory Mapped register 0x%04x not implemented.", addr));
			return 0;
		}
		if (size == Size.SHORT) {
			if (this.mmap[reg+1] == null) {
				//mmap[addr-0x2000] = new UnimplementedHardwareRegister();
				//Log.err(String.format("Read Memory Mapped register 0x%04x not implemented.", addr+1));
				//if (Settings.get(Settings.MEM_THROW_INVALID_ADDR).equals("true"))
					//throw new RuntimeException(String.format("Read Memory Mapped register 0x%04x not implemented.", addr+1));
				return 0;
			}
			
			// LOW ALWAYS GOES FIRST
			var val = this.mmap[reg].getValue();
			val |= this.mmap[reg+1].getValue() << 8;
			return val;
		} else {
			return this.mmap[reg].getValue();
		}
	},

	setRom: function(rom) {
		this.rom = rom;
	},
	
	loadSram: function(s) {
		var k = 0, v;
		try {
			while (k < this.sram.length && (v = s.read()) != -1) {
				sram[k] = v;
				k++;
			}
		} catch (e) {
			e.printStackTrace();
		}
	},
	
	invalidMemoryWrite: function(type, bank, addr){
		//System.out.println(String.format("Writing to invalid memory address (" + type + "):: 0x%02x:%04x",bank,addr));
		//throw new RuntimeException(String.format("Writing to invalid memory address (" + type + "):: 0x%02x:%04x",bank,addr));
	},
	
	dumpWRAM: function() {
		/*if (Settings.get(Settings.DEBUG_DIR) != null) {
			try {
				String fname = Settings.get(Settings.DEBUG_DIR) + "/wram.bin";
				FileOutputStream fos = new FileOutputStream(fname);
				for(var i=0; i<wram.length; i++)
					fos.write(wram[i]);
				fos.close();
			} catch (IOException e) {
				System.out.println("Unable to dump wram");
				e.printStackTrace();
			}
		}*/
	}
}
