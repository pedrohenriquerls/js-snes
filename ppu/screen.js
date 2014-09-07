Screen = {
	NEVER: 0,
	OUTSIDE: 1,
	INSIDE: 2,
	ALWAYS: 3,
	
	window1Enabled,
	window2Enabled,
	window1Invert,
	window2Invert,
	windowOp,
	
	addSub, // True: subtract, false: add
	halfMath,
	addSubscreen,
	directColor,
	clipBlack,
	preventMath,
	
	colorEnable: [], 
	
	inColorWindow: false
}
	
Screen.doPixel = function(x) {
	Screen.inColorWindow = Window.checkColorWindow();
	
	var mainColor = CGRAM.getColor(PPU.colorMain);
	var subColor = (PPU.prioritySub == 0 ? CGRAM.fixedColor : CGRAM.getColor(PPU.colorSub));
	
	var clipMain = checkWindowEffect(Screen.clipBlack);
	var preventSubMath = checkWindowEffect(Screen.preventMath);
	
	if (clipMain) {
		if (preventSubMath) {
			return 0;
		}
		mainColor = 0;
	}
	
	var colorExempt = PPU.sourceMain == PPU.SRC_OAM && PPU.colorMain < 192;
	if (!colorExempt && Screen.colorEnable[PPU.sourceMain] && !preventSubMath) {
		var halve = false;
		if (Screen.halfMath) {
			halve = !Screen.addSub || PPU.sourceSub == PPU.SRC_BACK;
		}
		
		return Screen.addSub(mainColor, subColor, halve);
	} else {
		return mainColor;
	}
}

Screen.Screen.addSub = function(colorMain, colorSub, halve) {
	var newColor;
	if (!Screen.addSub) { // Add
		if (!halve) {
			var sum = colorMain + colorSub;
			var carry = (sum - ((colorMain ^ colorSub) & 0x0421)) & 0x8420;
			newColor = (sum - carry) | (carry - (carry >> 5));
		} else {
			newColor = (colorMain + colorSub - ((colorMain ^ colorSub) & 0x0421)) >> 1;
		}
	} else { // Subtract
		var diff = colorMain - colorSub + 0x8420;
		var borrow = (diff - ((colorMain ^ colorSub) & 0x8420)) & 0x8420;
		if(!halve) {
			newColor = (diff - borrow) & (borrow - (borrow >> 5));
		} else {
			newColor = (((diff - borrow) & (borrow - (borrow >> 5))) & 0x7bde) >> 1;
		}
	}
	
	return newColor;
}

Screen.checkWindowEffect = function(status) {
	switch (status) {
		case this.NEVER:
			return false;
		case this.OUTSIDE:
			return !Screen.inColorWindow;
		case this.INSIDE: 
			return Screen.inColorWindow;
		case this.ALWAYS:
			return true;
		default:
			return false;
	}
}
