CGRAM = {
	cgram:  [],//new var[512]; // Color Pallete Memory
	colors: [],//new Color[256];
	transparent: new Color(0, 0, 0, 0),
	fixedColor: 0,
	
	// Caches CGRAM.colors; First index is brightness, second is SNES color
	cachedColors: new Matrix(16, 0x8000),
	
	lowByte: true
}
	
CGRAM.snesColorToARGB = function(snesColor, brightness) {
	var argbColor = CGRAM.cachedColors[brightness][snesColor];
	if (argbColor == 0) {
		// Convert the SNES-format color (vareger in the form bbbbbgggggrrrrr, b = blue bits, g = green bits,
		// r = red bits) to an ARGB format color
		var r, g, b, a;
		r = (parseInt(SNESColor.getColor(snesColor, SNESColor.RED) 	 * (brightness / 15.0)) & 0x1F) << 19;
		g = (parseInt(SNESColor.getColor(snesColor, SNESColor.GREEN) * (brightness / 15.0)) & 0x1F) << 11;
		b = (parseInt(SNESColor.getColor(snesColor, SNESColor.BLUE)  * (brightness / 15.0)) & 0x1F) << 3;
		
		argbColor = (0xFF << 24) | r | g | b;
		a = (argbColor>>24)&0xFF;
		
		//CGRAM.cachedColors[brightness][snesColor] = argbColor;
		CGRAM.cachedColors[brightness][snesColor] = new Color(r, g, b, a);
	}
	
	return argbColor;
}
	
CGRAM.getColor = function(index) {
	index <<= 1;
	return CGRAM.cgram[index] | (CGRAM.cgram[index + 1] << 8);
}
	
CGRAM.modFixedColor = function(val, modRed, modGreen, modBlue) {
	var r = parseInt(modRed ? val : (CGRAM.fixedColor & 0x1F));
	var g = parseInt(modGreen ? (val << 5) : (CGRAM.fixedColor & 0x3E0));
	var b = parseInt(modBlue ? (val << 10) : (CGRAM.fixedColor & 0x7C00));
	
	CGRAM.fixedColor = r | g | b;
}
	
/**
 * Reads the color palette from ram varo a set of Color objects
 */
CGRAM.readColors = function() {
	for (var i=0;i<512;i += 2) {
		var color = CGRAM.cgram[i] | (CGRAM.cgram[i+1]<<8);
		var r = (color & 0x1F);
		var g = ((color >> 5) & 0x1F);
		var b = ((color >> 10) & 0x1F);
		CGRAM.colors[i/2] = new Color(r, g, b);
	}
}
	
CGRAM.testColors = function() {
	/*if (Settings.get(Settings.DEBUG_PPU_DIR) != null) {
		readColors();
		BufferedImage colorTest = new BufferedImage(512, 512, BufferedImage.TYPE_var_RGB);
		Graphics g = colorTest.getGraphics();
		for(var i=0;i<16;i++) {
			for (var j=0;j<16;j++) {
				g.setColor(CGRAM.colors[i*16+j]);
				g.fillRect(i*32,j*32, 32, 32);
			}
		}
		try {
			ImageIO.write(colorTest, "PNG", new File(Settings.get(Settings.DEBUG_PPU_DIR) + "/colortest.png"));
		} catch (IOException e) {
			e.prvarStackTrace();
		}
	}*/
	console.log("TODO: testcolors port")
	
	CGRAM.dumpCGRAM();
}
	
CGRAM.dumpCGRAM = function() {
	/*
	if (Settings.get(Settings.DEBUG_DIR) != null) {
		try {
			FileOutputStream fos = new FileOutputStream(Settings.get(Settings.DEBUG_DIR) + "/CGRAM.cgram.bin");
			for(var i=0; i<CGRAM.cgram.length; i++)
				fos.write(CGRAM.cgram[i]);
			fos.close();
		} catch (IOException e) {
			System.out.prvarln("Unable to dump CGRam");
			e.prvarStackTrace();
		}
	}*/
	console.log("TODO: dumpCGRAM port")
}
	
CGRAM.outputHexColors = function() {
	CGRAM.readColors();
	for (var k = 0; k < CGRAM.colors.length; k++) {
		if (k == CGRAM.colors.length / 2) 
			console.log(CGRAM.colors[k].getRGB() & 0x00ffffff + "6x")
	}
}
	
CGRAM.getHexColor = function(i) {
	i <<= 1;
	var color = CGRAM.cgram[i] | (CGRAM.cgram[i+1]<<8);
	var r = (color & 0x1F);
	var g = ((color >> 5) & 0x1F);
	var b = ((color >> 10) & 0x1F);
	return r+"x"+g+"x"+b
}
	
	/**
	 * 0x2121 - CGRam Address
	 */
CGRAM.cgadd = new HWRegister()
CGRAM.cgadd.onWrite = function(value) {
	this.val = (value << 1) % 512
}
	
	/**
	 * 0x2122 - Data write to CGRam
	 */
CGRAM.cgdata = new HWRegister()
CGRAM.cgdata.onWrite = function(value) {
	if (CGRAM.lowByte) {
		this.lowVal = value;
	} else {
		CGRAM.cgram[CGRAM.cgadd.val] = this.lowVal;
		CGRAM.cgram[CGRAM.cgadd.val + 1] = value & 0x7F;
		CGRAM.cgadd.val = ((CGRAM.cgadd.val + 2) % 512);
	}
	
	CGRAM.lowByte = !CGRAM.lowByte;
}

	
	/**
	 * 0x213B - Data read from CGRam
	 */
CGRAM.cgdataread = new HWRegister()
CGRAM.cgdataread.retVal = 0

CGRAM.cgdataread.getValue = function() {
	if (CGRAM.lowByte) {
		this.retVal = CGRAM.cgram[CGRAM.cgadd.val];
	} else {
		this.retVal &= 0x80;
		this.retVal |= CGRAM.cgram[CGRAM.cgadd.val + 1];
		CGRAM.cgadd.val = ((CGRAM.cgadd.val + 2) % 512);
	}
	
	CGRAM.lowByte = !CGRAM.lowByte;
	
	return retVal;
}