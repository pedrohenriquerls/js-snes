PPURegisters = {}
	/**
	 * 0x2100
	 */
PPURegisters.screenDisplay = new HWRegister()
PPURegisters.screenDisplay.onWrite = function(value) {
	var oldval = val;
	this.val = value
	PPU.blankScreen((val & 0x80) == 0x80);
	PPU.setBrightness(val & 0x0F);
	
	//TODO: This is wrong, check anomie's doc
	// The internal OAM address is reset on a change from 1->0 of bit 7
	if ((oldval & 0x80)==0x80 && (this.val & 0x80)==0x00)
		OAM.resetOAMAddress();
}
	
	/**
	 * 0x212C - Main screen designation(enables/disables backgrounds/sprites)
	 */
PPURegisters.tm = new HWRegister()
PPURegisters.tm.onWrite = function(value) {
	PPU.bg[0].mainScreen = (value & 0x01) != 0;
	PPU.bg[1].mainScreen = (value & 0x02) != 0;
	PPU.bg[2].mainScreen = (value & 0x04) != 0;
	PPU.bg[3].mainScreen = (value & 0x08) != 0;
	OAM.mainScreen = (value & 0x10) != 0;
};
	
	/**
	 * 0x212D - Sub screen designation(added/subtracted from the main screen)
	 */
PPURegisters.ts = new HWRegister()
PPURegisters.ts.onWrite = function(value) {
	PPU.bg[0].subScreen = (value & 0x01) != 0;
	PPU.bg[1].subScreen = (value & 0x02) != 0;
	PPU.bg[2].subScreen = (value & 0x04) != 0;
	PPU.bg[3].subScreen = (value & 0x08) != 0;
	OAM.subScreen = (value & 0x10) != 0;
};
	
	// Not implemented(Mode 7 related)
PPURegisters.m7 = new HWRegister()
PPURegisters.m7.onWrite = function(value) {
	console.log("[Unimplemented] Mode 7 registers not implemented");
}
	
	
	// Color Math Related Registers
	/**
	 * 0x2130 - Color Addition Select
	 */
PPURegisters.cgwsel = new HWRegister()
PPURegisters.cgwsel.onWrite = function(value) {
	// Clip to black?
	Screen.clipBlack = (value >> 6) & 0x03;
	Screen.preventMath = (value >> 4) & 0x03;
	Screen.addSubscreen = (value & 0x02) != 0;
	Screen.directColor = (value & 0x01) != 0;
}
	
	/**
	 * 0x2131 - Color math designation
	 */
PPURegisters.cgadsub = new HWRegister()
PPURegisters.cgadsub.onWrite = function(value) {
	Screen.colorEnable[PPU.SRC_BG1] = (value & 0x01) != 0;
	Screen.colorEnable[PPU.SRC_BG2] = (value & 0x02) != 0;
	Screen.colorEnable[PPU.SRC_BG3] = (value & 0x04) != 0;
	Screen.colorEnable[PPU.SRC_BG4] = (value & 0x08) != 0;
	Screen.colorEnable[PPU.SRC_OAM] = (value & 0x10) != 0;
	Screen.colorEnable[PPU.SRC_BACK] = (value & 0x20) != 0;
	
	Screen.halfMath = (value & 0x40) != 0;
	Screen.addSub = (value & 0x80) != 0;
}
	
	/**
	 * 0x2132 - Fixed Color Data
	 */
PPURegisters.coldata = new HWRegister()
PPURegisters.coldata.onWrite = function(value) {
	CGRAM.modFixedColor(value & 0x1F, (value & 0x20) != 0, (value & 0x40) != 0, (value & 0x80) != 0);
}
	
	
	/**
	 * 0x2133 - SETINI
	 */
PPURegisters.setini = new HWRegister()
PPURegisters.setini.onWrite = function(value) {
	PPU.m7EXTBG = (value & 0x40) != 0;
	if ((value & 0x08) == 0x08)	console.log("Enabling pseudo-hires mode");
	if ((value & 0x04) == 0x04) console.log("Overscan mode enabled");
	if ((value & 0x02) == 0x02) console.log("OBJ interlace enabled");
	if ((value & 0x01) == 0x01) console.log("Screen interlace enabled");
}
	
	// TODO: Move out of PPU into CPU registers
	/**
	 * 0x4212 - PPU Status
	 */
PPURegisters.hvbjoy = new HWRegister()
PPURegisters.hvbjoy.getValue = function() {
	var val = 0;
	val |= (PPU.vBlanking ? 0x80 : 0);
	val |= ((PPU.x>274 || PPU.x<1) ? 0x40 : 0);
	// TODO: hblank status
	
	// Auto-joypad read; set when auto-joypad read happens, starting at the vblank frame
	// and ending two frames later (inclusive)
	// TODO: Handle overscan (vblank at 255 instead of 225)
	val |= (Timing.currentScanline >= 0xE1 && Timing.currentScanline <= 0xE3 ? 0x01 : 0);
	
	return val;
}