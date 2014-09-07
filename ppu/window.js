Window = {
	window1Left: 0,
	window1Right: 0,
	window2Left: 0,
	window2Right: 0
}
	/**
	 * Checks if a given pixel in a BG is masked
	 * 
	 * @param index Index of background in PPU array
	 * @param screen 0 = main screen, 1 = sub screen
	 * @param x X value of pixel
	 * @return True if masked, false otherwise
	 */
Window.checkBackgroundMask = function(bg) {
	return Window.checkMask(PPU.x - 22, bg.window1Enabled, bg.window2Enabled, bg.window1Invert, bg.window2Invert, bg.windowOp);
}
	
Window.checkSpriteMask = function() {
	return Window.checkSpriteMask(PPU.x - 22);
}

Window.checkSpriteMask = function(x) {
	return Window.checkMask(x, OAM.window1Enabled, OAM.window2Enabled, OAM.window1Invert, OAM.window2Invert, OAM.windowOp);
}

Window.checkColorWindow = function() {
	return Window.checkMask(PPU.x - 22, Screen.window1Enabled, Screen.window2Enabled, Screen.window1Invert, Screen.window2Invert, Screen.windowOp);
}

Window.checkMask = function(x, w1Enabled, w2Enabled, w1Invert, w2Invert, op) {
	if (!(w1Enabled || w2Enabled)) { // Neither enabled
		return false;
	} else if (w1Enabled && !w2Enabled) {
		return Util.inRange(x, Window.window1Left, Window.window1Right) ^ w1Invert;
	} else if (!w1Enabled && w2Enabled) {
		return Util.inRange(x, Window.window2Left, Window.window2Right) ^ w2Invert;
	} else {
		var in1 = Util.inRange(x, Window.window1Left, Window.window1Right) ^ w1Invert;
		var in2 = Util.inRange(x, Window.window2Left, Window.window2Right) ^ w2Invert;
		switch (op) {
			case 0:
				return in1 || in2;
			case 1:
				return in1 && in2;
			case 2:
				return in1 ^ in2;
			case 3:
				return !(in1 ^ in2);
		}
	}
	
	return false;
}
