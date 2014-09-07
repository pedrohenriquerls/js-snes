BGRegisters = {}
	/**
	 * 0x2105 - Screen Mode Register
	 */

BGRegisters.screenMode = new HWRegister()
BGRegisters.screenMode.onWrite = function(value){
	this.val = value
	var bg1Size = (((value>>4) & 0x01) == 0x01);
	var bg2Size = (((value>>5) & 0x01) == 0x01);
	var bg3Size = (((value>>6) & 0x01) == 0x01);
	var bg4Size = (((value>>7) & 0x01) == 0x01);
	
	var mode1BG3Priority = (((value >> 3) & 0x01) == 0x01);
	PPU.mode1BG3Priority = mode1BG3Priority;
	//if (mode1BG3Priority) Debug.Log("BG3 Priority");
	//else Debug.log("BG1 Priority");
	
	PPU.bg[0].setTileSize(bg1Size);
	PPU.bg[1].setTileSize(bg2Size);
	PPU.bg[2].setTileSize(bg3Size);
	PPU.bg[3].setTileSize(bg4Size);
	
	/*
	if (bg1Size) Log.debug("Setting BG1 Size to 16x16");
	else         Log.debug("Setting BG1 Size to 8x8");
	if (bg2Size) Log.debug("Setting BG2 Size to 16x16");
	else         Log.debug("Setting BG2 Size to 8x8");
	if (bg3Size) Log.debug("Setting BG3 Size to 16x16");
	else         Log.debug("Setting BG3 Size to 8x8");
	if (bg4Size) Log.debug("Setting BG4 Size to 16x16");
	else         Log.debug("Setting BG4 Size to 8x8");
	*/
	
	PPU.setMode(value & 0x07);
	//Log.debug("Screen mode is: " + PPU.mode);
	if (PPU.mode == 7) {
		//Log.err("====MODE 7 ENABLED====");
	}
}

	/**
	 * 0x2106 - Mosaic
	 */
BGRegisters.mosaic = new HWRegister()
BGRegisters.mosaic.onWrite = function(value) {
	this.val = value
	var bg1Mosaic = (((value >> 0) & 0x01) == 0x01);
	var bg2Mosaic = (((value >> 1) & 0x01) == 0x01);
	var bg3Mosaic = (((value >> 2) & 0x01) == 0x01);
	var bg4Mosaic = (((value >> 3) & 0x01) == 0x01);
	
	/*
	if (bg1Mosaic) Log.debug("Enabling BG1 Mosaic");
	else           Log.debug("Disabling BG1 Mosaic");
	if (bg2Mosaic) Log.debug("Enabling BG1 Mosaic");
	else           Log.debug("Disabling BG1 Mosaic");
	if (bg3Mosaic) Log.debug("Enabling BG1 Mosaic");
	else           Log.debug("Disabling BG1 Mosaic");
	if (bg4Mosaic) Log.debug("Enabling BG1 Mosaic");
	else           Log.debug("Disabling BG1 Mosaic");
	*/
	
	PPU.bg[0].mosaic = bg1Mosaic;
	PPU.bg[1].mosaic = bg2Mosaic;
	PPU.bg[2].mosaic = bg3Mosaic;
	PPU.bg[3].mosaic = bg4Mosaic;
	
	var mosaicModeSize = (value >> 4)  & 0x0F;
	//Log.debug("Mosaic size set to " + mosaicModeSize);
}
	
	/**
	 * 0x2107 - BG1 Tilemap address and size
	 */
BGRegisters.bg1sc = new HWRegister()
BGRegisters.bg1sc.onWrite = function(value) {
	PPU.bg[0].tileMapAddress = ((value >> 2) & 0x3F) << 11;
	PPU.bg[0].size = BGSize.toBGSize(value & 3);
	PPU.bg[0].invalidateTileCache();
}
	
	/**
	 * 0x2108 - BG2 Tilemap address and size
	 */
BGRegisters.bg2sc = new HWRegister()
BGRegisters.bg2sc.onWrite = function(value) {
	PPU.bg[1].tileMapAddress = ((value >> 2) & 0x3F) << 11;
	PPU.bg[1].size = BGSize.toBGSize(value & 3);
	PPU.bg[1].invalidateTileCache();
}
	
	/**
	 * 0x2109 - BG3 Tilemap address and size
	 */
BGRegisters.bg3sc = new HWRegister()
BGRegisters.bg3sc.onWrite = function(value) {
	PPU.bg[2].tileMapAddress = ((value >> 2) & 0x3F) << 11;
	PPU.bg[2].size = BGSize.toBGSize(value & 3);
	PPU.bg[2].invalidateTileCache();
}
	
	/**
	 * 0x210A - BG4 Tilemap address and size
	 */
BGRegisters.bg4sc = new HWRegister()
BGRegisters.bg4sc.onWrite = function(value) {
	PPU.bg[3].tileMapAddress = ((value >> 2) & 0x3F) << 11;
	PPU.bg[3].size = BGSize.toBGSize(value & 3);
	PPU.bg[3].invalidateTileCache();
}
	
	/**
	 * 0x210B - Background 1/2 Character Address
	 */
BGRegisters.bg12nba = new HWRegister()
BGRegisters.bg12nba.onWrite = function(value) {
	PPU.bg[0].baseAddress = (value & 0x07) << 13;
	PPU.bg[1].baseAddress = (value & 0x70) << 9;
	PPU.bg[0].invalidateCharCache();
	PPU.bg[1].invalidateCharCache();
}
	
	/**
	 * 0x210C - Background 3/4 Character Address
	 */
BGRegisters.bg34nba = new HWRegister()
BGRegisters.bg34nba.onWrite = function(value) {
	PPU.bg[2].baseAddress = (value & 0x07) << 13;
	PPU.bg[3].baseAddress = (value & 0x70) << 9; 
	PPU.bg[2].invalidateCharCache();
	PPU.bg[3].invalidateCharCache();
}

	// Previous value for m7 registers
BGRegisters.m7Prev;
	
	/**
	 * 0x211A - Mode 7 Settings
	 */
BGRegisters.m7sel = new HWRegister()
BGRegisters.m7sel.onWrite = function(value) {
	PPU.m7Repeat = ((value >> 6) & 0x3);
	PPU.m7YFlip = (value & 0x02) != 0;
	PPU.m7XFlip = (value & 0x01) != 0;
}

function m7MatrixRegisterOnWrite(value)	{
	val = (value << 8) | BGRegisters.m7Prev;
	BGRegisters.m7Prev = value & 0xFF;
}
	
/**
 * 0x211B, 0x211C, 0x211D, 0x211E - Mode 7 Matrix Values
 */
BGRegisters.m7a = new HWRegister();
BGRegisters.m7b = new HWRegister();
BGRegisters.m7c = new HWRegister();
BGRegisters.m7d = new HWRegister();

BGRegisters.m7a.onWrite = m7MatrixRegisterOnWrite
BGRegisters.m7b.onWrite = m7MatrixRegisterOnWrite
BGRegisters.m7c.onWrite = m7MatrixRegisterOnWrite
BGRegisters.m7d.onWrite = m7MatrixRegisterOnWrite

/**
 * 0x211F, 0x2120 - Mode 7 Center
 */
BGRegisters.m7x = new HWRegister();
BGRegisters.m7y = new HWRegister();

BGRegisters.m7x.onWrite = m7MatrixRegisterOnWrite
BGRegisters.m7y.onWrite = m7MatrixRegisterOnWrite

/**
 * Background scroll registers, 0x210D - 0x2114
 */
BGRegisters.bgScrollPrev;

BGRegisters.bg1hofs = new BGHScrollReg(0);
BGRegisters.bg1vofs = new BGVScrollReg(0);

BGRegisters.bg2hofs = new BGHScrollReg(1);
BGRegisters.bg2vofs = new BGVScrollReg(1);

BGRegisters.bg3hofs = new BGHScrollReg(2);
BGRegisters.bg3vofs = new BGVScrollReg(2);

BGRegisters.bg4hofs = new BGHScrollReg(3);
BGRegisters.bg4vofs = new BGVScrollReg(3);