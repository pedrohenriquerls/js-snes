OAM = {
	oam: new Array(544),//new var[544]; // 544 bytes for the OAM
	spriteTable: new Array(128),// new Sprite[128];
	
	lastWriteAddress: null,
	varernalOAMAddress: null,
	lastPriority: false,
	priority: false,
	
	objectSize: null,
	nameSelect: null,
	nameBaseSelect: null,
	
	userEnabled: true,
	
	// Windows
	windowMaskMain: false,
	windowMaskSub: false,
	window1Enabled: false,
	window2Enabled: false,
	window1Invert: false,
	window2Invert: false,
	windowOp: null,
	
	// Main/sub screen drawing enables
	mainScreen: false,
	subScreen: false,
	
	// Stores the 4 possible priorities for sprites
	priorityMap: new Array(4),//new var[4],
	
	// curSprites stores all 32 of the currently loaded sprites
	curSprites: new Array(32),//new Sprite[32],
	numSprites: null,
	
	// curTiles stores the 34 possible tiles being drawn
	curTiles: new Array(34),//new SpriteTile[34],
	numTiles: null
}

for (var i=0;i<128;i++) {
	OAM.spriteTable[i] = new Sprite();	
}
for (var k = 0; k < 32; k++) {
	OAM.curSprites[k] = new Sprite();
}
for (var k = 0; k < 34; k++) {
	OAM.curTiles[k] = new SpriteTile();
}
	
	/**
	 * Cycles through each active tile and checks if it has a pixel at the 
	 * current x/y position on the screen, and outputs if one is found. Called
	 * once per on-screen pixel by PPU
	 */
OAM.loadPixel = function(){
	var curTile;
	
	// For each active tile
	for (var k = 0; k < OAM.numTiles; k++) {
		curTile = OAM.curTiles[k];
		
		// Check if the tile overlaps the current pixel. Subtract 22 to handle offset
		// of 22 pixels at start of scanline
		if (Util.inRange(PPU.x - 22, curTile.x, curTile.x + 7)) {
			var color = curTile.getPixel((PPU.x - 22) - curTile.x, PPU.y - 1 - curTile.y);
			
			// Don't draw transparent pixels or when we're disabled
			if (color == 0 || !OAM.userEnabled) continue;
			
			// Masking check
			var masked = Window.checkSpriteMask();
			var mainMask = OAM.windowMaskMain && masked;
			var subMask = OAM.windowMaskSub && masked;
			
			if (OAM.mainScreen && !mainMask && curTile.OAM.priority > PPU.priorityMain) {
				PPU.colorMain = color + curTile.paletteOffset;
				PPU.priorityMain = curTile.OAM.priority;
				PPU.sourceMain = PPU.SRC_OAM;
			}
			
			if (OAM.subScreen && !subMask && curTile.OAM.priority > PPU.prioritySub) {
				PPU.colorSub = color + curTile.paletteOffset;
				PPU.prioritySub = curTile.OAM.priority;
				PPU.sourceSub = PPU.SRC_OAM;
			}
			
			// Break out if both layers have been written
			if ((!OAM.mainScreen || PPU.sourceMain == PPU.SRC_OAM) && 
				(!OAM.subScreen || PPU.sourceSub == PPU.SRC_OAM)) 
				break;
		}
	}
}
	
	/**
	 * Loads the first 32 sprites found on the current scanline. From these, load
	 * the first 34 tiles from the sprites (IE only 17 16x16 sprites can be displayed
	 * on a scanline).
	 * 
	 * @param y Current y value of PPU (AKA current scanline)
	 */
OAM.scanline = function(y) {
	var firstSprite;
	if (OAM.priority) {
		// TODO: Handle odd case of writing to last byte in sprite. See anomie's doc.
		firstSprite = (OAM.varernalOAMAddress & 0xFE) << 1;
	} else {
		firstSprite = 0;
	}
	
	// Loop through each sprite, finding the first 32 on the scanline
	OAM.numSprites = 0;
	for (var k = 0; k < 127; k++) {
		OAM.curSprites[OAM.numSprites].loadSprite((firstSprite + k) % 128);
		if (OAM.onScanline(OAM.curSprites[OAM.numSprites], y)) {
			OAM.numSprites++;
			if (OAM.numSprites >= 32) break; // TODO: Mark register 0x213E if >32 sprites on line
		}
	}
	
	OAM.numTiles = 0;
	var curTile = OAM.curTiles[0];
	var curSprite = null;
	
	// Loop through the sprites in reverse and load up to 34 tiles
	loadTiles:
	for (var k = 0; k < OAM.numSprites; k++) {
		curSprite = OAM.curSprites[k];
		
		// yOffset is the pixel row we want within the sprite
		var yOffset = (y - curSprite.y);
		if (curSprite.vflip) {
			yOffset = curSprite.getHeight() - 1 - yOffset;
		}
		
		// yTileOffset is the tile row we want within the sprite (0 = first
		// row of tiles, 1 = second row, and so on)
		var yTileOffset = (yOffset / 8);
		
		// For every tile in this sprite on the scanline
		for (var m = 0; m < OAM.curSprites[k].getWidth(); m += 8) {
			// Load tile data
			curTile.x = curSprite.x + m;
			curTile.priority = OAM.priorityMap[curSprite.priority];
			curTile.paletteOffset = 128 + (curSprite.paletteNum << 4);
			curTile.vflip = curSprite.vflip;
			
			// 512 = number of bytes per row of tiles
			curTile.addr = curSprite.getCharacterAddr() + (512 * yTileOffset) + (m * 4);
			
			// Handle vertical flip
			if (curSprite.vflip) {
				curTile.y = curSprite.y + (curSprite.getWidth() - 8 - (yTileOffset * 8));
			} else {
				curTile.y = curSprite.y + (yTileOffset * 8);
			}
			
			// TODO: Ensure tiles are loaded left to right after flipping
			// Handle horizontal flip
			if (curSprite.hflip) {
				curTile.hflip = true;
				curTile.x = curSprite.x + (curSprite.getWidth() - 8 - m);
			} else {
				curTile.hflip = false;
			}
			
			// Move to the next open spot of tiles to load
			OAM.numTiles++;
			if (OAM.numTiles >= 34) {
				break loadTiles;
			} else {
				curTile = OAM.curTiles[OAM.numTiles];
			}
		}
	}
}
	
/**
 * Resets the OAM address and loads scanline 0
 */
OAM.vBlank = function(){
	OAM.resetOAMAddress();
}
	
/**
 * Returns true if sprite t overlaps the scanline
 * @param t
 * @param scanline
 * @return
 */
OAM.onScanline = function(t, scanline) {
	if (t.x + t.getWidth() <= 0) return false;
	if (t.x > PPU.screenWidth) return false;
	if (t.y + t.getHeight() <= scanline) return false;
	if (t.y > scanline) return false;
	
	return true;
}

/**
 * Loads information about the 128 sprites from RAM
 */
OAM.parseOAM = function(){
	var s = 0;
	for (var i=0;i<512;i+=4) {
		OAM.spriteTable[s].x = OAM.oam[i];
		OAM.spriteTable[s].y = OAM.oam[i+1];
		OAM.spriteTable[s].tileNumber = OAM.oam[i+2];
		var lastByte = OAM.oam[i+3];
		OAM.spriteTable[s].vflip = (lastByte & 0x80) == 0x80;
		OAM.spriteTable[s].hflip = (lastByte & 0x40) == 0x40;
		OAM.spriteTable[s].OAM.priority = (lastByte >> 4) & 0x03;
		OAM.spriteTable[s].paletteNum = ((lastByte >> 1) & 0x07);
		OAM.spriteTable[s].name = (lastByte & 0x01) == 1;
		s++;
	}
	s=0;
	for (var i = 512; i < 544; i++) {
		var data = OAM.oam[i];
		for(var j = 0; j < 8; j += 2) {
			var info = (data >> j) & 0x03;
			OAM.spriteTable[s].sizeToggle = (((info>>1) & 0x01) == 0x01);
			OAM.spriteTable[s].x = (OAM.spriteTable[s].x) | ((info & 0x01)<<8);
			s++;
		}
	}
}

OAM.dumpTiles = function(){
	for (var k = 0; k < OAM.numTiles; k++) {
		console.log(OAM.curTiles[k].toString());
	}
}

OAM.resetOAMAddress = function(){
	OAM.varernalOAMAddress = OAM.lastWriteAddress;
	OAM.priority = OAM.lastPriority;
}

OAM.updateAddress = function(addr, pri) {
	OAM.lastPriority = pri;
	OAM.priority = pri;
	OAM.lastWriteAddress = addr;
	OAM.varernalOAMAddress = addr;
}

// TODO: enforce writing only when vblank or forced blank period
OAM.writeOAM = function(value) {
	OAM.oam[OAM.varernalOAMAddress] = value & 0xFF;
	OAM.varernalOAMAddress++;
	// TODO: error/bounds checking
	// only updates the table when the high byte is written...so you can write low bytes without affecting the table
}
OAM.readOAM = function(){
	var ret = OAM.oam[OAM.varernalOAMAddress];
	OAM.varernalOAMAddress++;
	return ret;
}

OAM.getObjectSize = function(){ return OAM.objectSize; }
OAM.getNameSelect = function(){ return OAM.nameSelect; }
OAM.getNameBaseSelect = function(){ return OAM.nameBaseSelect;}

OAM.setNameSelect = function(ns) { 
	OAM.nameSelect = ns; 
}

OAM.setObjectSize = function(os) { 
	OAM.objectSize = os; 
}

OAM.setNameBaseSelect = function(nbs) { 
	OAM.nameBaseSelect = nbs; 
}


