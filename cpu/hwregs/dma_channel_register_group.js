
function buildDMAChannelRegisterGroup(channel){
	var instance = {
		channel: channel,
		channels: DMA.channels
	}
	/**
	 * DMA Channel x
	 * 0x43x0 - 0x43x9
	 */
	instance.dmapx = new HWRegister('', 0xFF) /** 0x4300 - DMA Control*/
	instance.dmapx.onWrite = function(value) {
		this.val = value
		instance.channels[instance.channel].direction = ((value & 0x80) == 0x80); 
		instance.channels[instance.channel].addressMode = ((value & 0x40) == 0x40);
		instance.channels[instance.channel].addressIncrement = ((value & 0x10) == 0x10);
		instance.channels[instance.channel].fixedTransfer = ((value & 0x08) == 0x08);
		instance.channels[instance.channel].transferMode = (value & 0x07);
	}

	instance.bbadx = new HWRegister('', 0xFF) /** 0x43x1 - DMA Destination Register*/
	instance.bbadx.onWrite = function(value) {
		this.val = value
		instance.channels[instance.channel].dstRegister = 0x2100 + (value&0xFF);
	}

	instance.a1txl = new HWRegister('', 0xFF) /** 0x43x2 - DMA Source Address(low)*/
	instance.a1txl.onWrite = function(value) {
		instance.channels[instance.channel].srcAddress = (instance.channels[instance.channel].srcAddress & 0xFF00) | (value&0xFF);
	}
	instance.a1txl.onRead = function(value) {
		this.val = (instance.channels[instance.channel].srcAddress) & 0xFF;
	}

	instance.a1txh = new HWRegister('', 0xFF) /** 0x43x3 - DMA Source Address(high)*/
	instance.a1txh.onWrite = function(value) {
		instance.channels[instance.channel].srcAddress = ((value<<8) & 0xFF00) | (instance.channels[instance.channel].srcAddress & 0xFF);
	}
	instance.a1txh.onRead = function() {
		this.val = (instance.channels[instance.channel].srcAddress >> 8) & 0xFF;
	}

	instance.a1bx = new HWRegister('', 0xFF)  /** 0x43x4 - DMA Source Address(bank)*/
	instance.a1bx.onWrite = function(value) {
		this.val = value
		instance.channels[instance.channel].srcBank = value & 0xFF;
	}
	
	instance.dasxl = new HWRegister('', 0xFF) /** 0x43x5 - DMA Size(low)*/
	instance.dasxl.onWrite = function(value) {
		instance.channels[instance.channel].transferSize = (instance.channels[instance.channel].transferSize & 0xFF00) | (value&0xFF);
	}
	instance.dasxl.onRead = function() {
		this.val = instance.channels[instance.channel].transferSize & 0xFF;
	}

	instance.dasxh = new HWRegister('', 0xFF) /** 0x43x6 - DMA Size(high)*/
	instance.dasxh.onWrite = function(value) {
		instance.channels[instance.channel].transferSize = ((value<<8) & 0xFF00) | (instance.channels[instance.channel].transferSize & 0xFF);
	}
	instance.dasxh.onRead = function() {
		this.val = (instance.channels[instance.channel].transferSize>>8) & 0xFF;
	}

	instance.dasbh = new HWRegister('', 0xFF) /** 0x43x7 - HDMA Indirect Address bank */
	instance.dasbh.onWrite = function(value) {
		this.val = value
		instance.channels[instance.channel].indirectBank = (value & 0xFF);
	}
	
	instance.a2axl = new HWRegister('', 0xFF) /** 0x43x8 - HDMA Table Address(low)*/
	instance.a2axl.onWrite = function(value) {
		instance.channels[instance.channel].tableAddr = (instance.channels[instance.channel].tableAddr & 0xFF00) | (value&0xFF);
	}
	instance.a2axl.onRead = function() {
		this.val = (instance.channels[instance.channel].tableAddr) & 0xFF;
	}
	
	instance.a2axh = new HWRegister('', 0xFF) /** 0x43x9 - HDMA Table Address(high)*/
	instance.a2axh.onWrite = function(value) {
		instance.channels[instance.channel].tableAddr = ((value<<8) & 0xFF00) | (instance.channels[instance.channel].tableAddr & 0xFF);
	}
	instance.a2axh.onRead = function() {
		this.val = (instance.channels[instance.channel].tableAddr >> 8) & 0xFF;
	}
	
	instance.nltrx = new HWRegister('', 0xFF) /** 0x43xA - HDMA Line Counter */
	instance.nltrx.onWrite = function(value) {
		instance.channels[instance.channel].rlc = (value & 0xFF);
	}
	instance.nltrx.onRead = function() {
		this.val = (instance.channels[instance.channel].rlc & 0xFF);
	}

	return instance
}
