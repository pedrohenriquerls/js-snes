function BGHScrollReg(bgnum){
	this.bg = PPU.bg[bgnum];
	this.m7Write = bgnum == 0;
}

BGHScrollReg.prototype = new HWRegister()
BGHScrollReg.prototype.constructor = BGHScrollReg;

BGHScrollReg.prototype.onWrite = function(value){
	this.bg.hscroll = (value << 8) | (BGRegisters.bgScrollPrev& ~7) | ((bg.hscroll>>8)&7);
	bgScrollPrev = value;
	
	if (this.m7Write) {
		PPU.m7HOffset = (value << 8) | BGRegisters.m7Prev;
		BGRegisters.m7Prev = value;
	}
}