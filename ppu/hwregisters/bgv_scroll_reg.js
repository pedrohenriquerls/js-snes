function BGVScrollReg(bgnum){
	this.bg = PPU.bg[bgnum];
	this.m7Write = bgnum == 0;
}

BGVScrollReg.prototype = new HWRegister()
BGVScrollReg.prototype.constructor = BGVScrollReg;

BGHScrollReg.prototype.onWrite = function(value){
	this.bg.vscroll = (value << 8) | BGRegisters.bgScrollPrev;
	BGRegisters.bgScrollPrev = value;
	
	if (this.m7Write) {
		PPU.m7VOffset = (value << 8) | BGRegisters.m7Prev;
		BGRegisters.m7Prev = value;
	}
}
