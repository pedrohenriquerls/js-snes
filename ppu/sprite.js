function Sprite(){
	this.x;
	this.y;
	this.tileNumber;
	this.vflip;
	this.hflip;
	this.priority;
	this.paletteNum;
	this.name;
	this.sizeToggle;
}

Sprite.prototype = {
	loadSprite: function(num) {
		var tileAddr = num * 4;
		
		this.x = OAM.oam[tileAddr];
		this.y = OAM.oam[tileAddr + 1];
		this.tileNumber = OAM.oam[tileAddr + 2];
		
		var lastByte = OAM.oam[tileAddr + 3];
		this.vflip = (lastByte & 0x80) == 0x80;
		this.hflip = (lastByte & 0x40) == 0x40;
		this.priority = (lastByte >> 4) & 0x03;
		this.paletteNum = ((lastByte >> 1) & 0x07);
		this.name = (lastByte & 0x01) == 1;
		
		// Hightable starts 512 bytes varo OAM. Each byte represents 4 objs,
		// so we take the corresponding byte and shift it down based on which
		// sprite in the byte we want (IE obj 15 is in byte (15 / 4) = 3 in 
		// bits 7 and 8, so we shift down by (15 % 4) * 2 = 6 bits to get them.)
		var highTableData = OAM.oam[512 + (num / 4)] >> ((num % 4) * 2);
		this.sizeToggle = (highTableData & 0x02) != 0;
		this.x |= (highTableData & 0x01) << 8;
	},
	
	getCharacterAddr: function(){
		var addr = (OAM.getNameBaseSelect() << 14) + 32 * this.tileNumber;
		if (this.name) {
			addr += (256 * 32) + (OAM.getNameSelect() << 13);
		}
		
		return addr;
	},
	
	getWidth: function(){
		switch (OAM.getObjectSize()) {
			case 0: return (this.sizeToggle?16:8);
			case 1: return (this.sizeToggle?32:8);
			case 2: return (this.sizeToggle?64:8);
			case 3: return (this.sizeToggle?32:16);
			case 4: return (this.sizeToggle?64:16);
			case 5: return (this.sizeToggle?64:32);
			case 6: return (this.sizeToggle?32:16);
			case 7: return (this.sizeToggle?32:16);
		}
		return 8;
	},
	getHeight: function(){
		switch (OAM.getObjectSize()) {
			case 0: return (this.sizeToggle?16:8);
			case 1: return (this.sizeToggle?32:8);
			case 2: return (this.sizeToggle?64:8);
			case 3: return (this.sizeToggle?32:16);
			case 4: return (this.sizeToggle?64:16);
			case 5: return (this.sizeToggle?64:32);
			case 6: return (this.sizeToggle?64:32);
			case 7: return (this.sizeToggle?32:32);
		}
		return 8;
	}
}
