function SpriteTile() {
	this.addr;
	this.x;
	this.y;
	this.priority;
	this.paletteOffset;
	this.hflip;
	this.vflip;
	this.enabled;
}

SpriteTile.prototype = {
	getPixel: function(nx, ny) {
		if (this.hflip) nx = 7 - nx;
		if (this.vflip) ny = 7 - ny;
		
		var val = 0;
		var rowAddr = this.addr + (2 * ny);
		var xMask = 0x80 >> nx;
		val |= ((PPU.vram[rowAddr] & xMask) != 0) ? 0x01 : 0;
		val |= ((PPU.vram[rowAddr + 1] & xMask) != 0) ? 0x02 : 0;
		val |= ((PPU.vram[rowAddr + 16] & xMask) != 0) ? 0x04 : 0;
		val |= ((PPU.vram[rowAddr + 17] & xMask) != 0) ? 0x08 : 0;
		
		return val;
	},

	toString: function() {
		return "SpriteTile [\n\taddr=" + this.addr + ", \n\tx=" + this.x + ", \n\ty=" + y + ", \n\tpriority=" + this.priority
				+ ", \n\tpaletteOffset=" + this.paletteOffset + ", \n\thflip=" + this.hflip + ", \n\tvflip=" + this.vflip
				+ ", \n\tenabled=" + this.enabled + "\n]";
	}
}
