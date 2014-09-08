PPU = {
	// Output pixel source constants
	SRC_BG1: 0,
	SRC_BG2: 1,
	SRC_BG3: 2,
	SRC_BG4: 3,
	SRC_OAM: 4,
	SRC_BACK: 5,
	
	// Memory declarations
	vram: [],//new int[64*1024], // Video RAM
	bg: [],
	
	screenBlank: false,
	brightness: 1,
	vBlanking: false,
	
	mode: 0,
	
	mode1BG3Priority: false,

	screenWidth: 256,
	screenHeight: 240,
	
	drawWindow1: false,
	drawWindow2: false,
	window1Color: new Color(0, 255, 0),
	window2Color: new Color(255, 0, 255),
	
	unprocessedCycles: null,
	x: 0,
	y: 0,
	
	// Color value that will be output for the next pixel
	colorMain: null,
	colorSub: null,
	
	// Priority of main and subscreen colors
	priorityMain: null,
	prioritySub: null,
	
	// Source of the colors
	sourceMain: null,
	sourceSub: null,
	
	// Whether or not to actually render the frames
	renderFrames: true,
	skipCount: 0,
	skipLimit: 5, // draw 1 out of 30 frames
	
	// Mode 7 data
	m7EXTBG: false,	// Toggle BG2 in Mode 7
	m7HOffset: null,
	m7VOffset: null,
	m7Repeat: null,
	m7XFlip: null,
	m7YFlip: null,

	canvas: null,
	currentFrame: null
}

PPU.setCurrentFrame = function(x, y, r, g, b, a){
	var imgData = PPU.getMainCTX().createImageData(256, 240);
	var index = (x + y * imgData.width) * 4;
	
	imgData.data[index+0] = r;
  imgData.data[index+1] = g;
  imgData.data[index+2] = b;
  imgData.data[index+3] = b;

  PPU.currentFrame = imgData
}

PPU.getMainCTX = function(){
	if(!PPU.mainCTX)
		PPU.mainCTX = PPU.canvas.getContext("2d")

	return PPU.mainCTX
}

PPU.initialize = function(canvas){
	PPU.canvas = canvas

	//PPU.screenBuffer = PPU.getMainCTX().createImageData(256, 240);

	PPU.bg[0] = new Background(1, PPU.getMainCTX());
	PPU.bg[1] = new Background(2, PPU.getMainCTX());
	PPU.bg[2] = new Background(3, PPU.getMainCTX());
	PPU.bg[3] = new Background(4, PPU.getMainCTX());	
}

//TODO: Implement frameskip
//if (Settings.get(Settings.FRAMES_TO_SKIP) != null)
//	PPU.PPU.skipLimit = Settings.getInt(Settings.FRAMES_TO_SKIP);
	
PPU.setMode = function(mode) {
	PPU.mode = mode;
	
	// Backgrounds and OAM output a priority value that Screen uses to
	// determine which pixel is on top; For BGs, priority is a single bit
	// in each tile, while objs have 2 bits to select from 4 different
	// priorities per sprite
	switch(PPU.mode) {
		case 0:
			PPU.bg[0].enabled = true; PPU.bg[0].colorMode = ColorMode.Color4;
			PPU.bg[1].enabled = true; PPU.bg[1].colorMode = ColorMode.Color4;
			PPU.bg[2].enabled = true; PPU.bg[2].colorMode = ColorMode.Color4;
			PPU.bg[3].enabled = true; PPU.bg[3].colorMode = ColorMode.Color4;
			
			PPU.bg[0].priority0 = 8; PPU.bg[0].priority1 = 11;
			PPU.bg[1].priority0 = 7; PPU.bg[1].priority1 = 10; 
			PPU.bg[2].priority0 = 2; PPU.bg[2].priority1 = 5;
			PPU.bg[3].priority0 = 1; PPU.bg[3].priority1 = 4;
			OAM.priorityMap[0] = 3; OAM.priorityMap[1] = 6; OAM.priorityMap[2] = 7; OAM.priorityMap[3] = 12;
			break;
		case 1: 
			PPU.bg[0].enabled = true; PPU.bg[0].colorMode = ColorMode.Color16;
			PPU.bg[1].enabled = true; PPU.bg[1].colorMode = ColorMode.Color16;
			PPU.bg[2].enabled = true; PPU.bg[2].colorMode = ColorMode.Color4;
			PPU.bg[3].enabled = false;
			if (PPU.mode1BG3Priority) {
				PPU.bg[0].priority0 = 5; PPU.bg[0].priority1 = 8;
				PPU.bg[1].priority0 = 4; PPU.bg[1].priority1 = 7;
				PPU.bg[2].priority0 = 1; PPU.bg[2].priority1 = 10;
				OAM.priorityMap[0] = 2; OAM.priorityMap[1] = 3; OAM.priorityMap[2] = 6; OAM.priorityMap[3] = 9;
			} else {
				PPU.bg[0].priority0 = 6; PPU.bg[0].priority1 = 9;
				PPU.bg[1].priority0 = 5; PPU.bg[1].priority1 = 8;
				PPU.bg[2].priority0 = 1; PPU.bg[2].priority1 = 3;
				OAM.priorityMap[0] = 2; OAM.priorityMap[1] = 4; OAM.priorityMap[2] = 7; OAM.priorityMap[3] = 10;
			}
			break;
		case 2:
			PPU.bg[0].enabled = true; PPU.bg[0].colorMode = ColorMode.Color16;
			PPU.bg[1].enabled = true; PPU.bg[1].colorMode = ColorMode.Color16;
			PPU.bg[2].enabled = false;
			PPU.bg[3].enabled = false;
			
			PPU.bg[0].priority0 = 3; PPU.bg[0].priority1 = 7;
			PPU.bg[1].priority0 = 1; PPU.bg[1].priority1 = 5; 
			OAM.priorityMap[0] = 2; OAM.priorityMap[1] = 4; OAM.priorityMap[2] = 6; OAM.priorityMap[3] = 8;
			break;
		case 3:
			PPU.bg[0].enabled = true; PPU.bg[0].colorMode = ColorMode.Color256;
			PPU.bg[1].enabled = true; PPU.bg[1].colorMode = ColorMode.Color4;
			PPU.bg[2].enabled = false;
			PPU.bg[3].enabled = false;
			
			PPU.bg[0].priority0 = 3; PPU.bg[0].priority1 = 7;
			PPU.bg[1].priority0 = 1; PPU.bg[1].priority1 = 5; 
			OAM.priorityMap[0] = 2; OAM.priorityMap[1] = 4; OAM.priorityMap[2] = 6; OAM.priorityMap[3] = 8;
			break;
		case 4:
			PPU.bg[0].enabled = true; PPU.bg[0].colorMode = ColorMode.Color256;
			PPU.bg[1].enabled = true; PPU.bg[1].colorMode = ColorMode.Color4;
			PPU.bg[2].enabled = false;
			PPU.bg[3].enabled = false;
			
			PPU.bg[0].priority0 = 3; PPU.bg[0].priority1 = 7;
			PPU.bg[1].priority0 = 1; PPU.bg[1].priority1 = 5; 
			OAM.priorityMap[0] = 2; OAM.priorityMap[1] = 4; OAM.priorityMap[2] = 6; OAM.priorityMap[3] = 8;
			break;
		case 5:
			PPU.bg[0].enabled = true; PPU.bg[0].colorMode = ColorMode.Color16;
			PPU.bg[1].enabled = true; PPU.bg[1].colorMode = ColorMode.Color4;
			PPU.bg[2].enabled = false;
			PPU.bg[3].enabled = false;
			
			PPU.bg[0].priority0 = 3; PPU.bg[0].priority1 = 7;
			PPU.bg[1].priority0 = 1; PPU.bg[1].priority1 = 5; 
			OAM.priorityMap[0] = 2; OAM.priorityMap[1] = 4; OAM.priorityMap[2] = 6; OAM.priorityMap[3] = 8;
			break;
		case 6:
			PPU.bg[0].enabled = true; PPU.bg[0].colorMode = ColorMode.Color16;
			PPU.bg[1].enabled = false;
			PPU.bg[2].enabled = false;
			PPU.bg[3].enabled = false;
			
			PPU.bg[0].priority0 = 2; PPU.bg[0].priority1 = 5;
			OAM.priorityMap[0] = 1; OAM.priorityMap[1] = 3; OAM.priorityMap[2] = 4; OAM.priorityMap[3] = 6;
		case 7:
			if (PPU.m7EXTBG) {
				PPU.bg[0].enabled = true; PPU.bg[0].colorMode = ColorMode.Mode7;
				PPU.bg[1].enabled = true; PPU.bg[1].colorMode = ColorMode.Mode7;
				PPU.bg[2].enabled = false;
				PPU.bg[3].enabled = false;
				
				PPU.bg[0].priority0 = 3; PPU.bg[0].priority1 = 3;
				PPU.bg[1].priority0 = 1; PPU.bg[1].priority1 = 5;
				OAM.priorityMap[0] = 2; OAM.priorityMap[1] = 4; OAM.priorityMap[2] = 6; OAM.priorityMap[3] = 7;
			} else {
				PPU.bg[0].enabled = true; PPU.bg[0].colorMode = ColorMode.Mode7;
				PPU.bg[1].enabled = false;
				PPU.bg[2].enabled = false;
				PPU.bg[3].enabled = false;
				
				PPU.bg[0].priority0 = 2; PPU.bg[0].priority1 = 2;
				OAM.priorityMap[0] = 1; OAM.priorityMap[1] = 3; OAM.priorityMap[2] = 4; OAM.priorityMap[3] = 6;
			}
			break;
	}
}

PPU.blankScreen = function(blank) {
	PPU.screenBlank = blank;
}

PPU.setBrightness = function(i) {
	PPU.brightness = i;
}

/**
 * vBlank is called by Timing when vBlank first occurs. It outputs the current
 * frame and resets everything for the next frame.
 */
PPU.vBlank = function() {
	// Draw out current frame
	if (PPU.canvas && PPU.currentFrame) 
		PPU.getMainCTX().putImageData(PPU.currentFrame, 0, 0)
	
	// Activate vblank and reset to the top of the screen
	PPU.vBlanking = true;		
	PPU.x = 0;
	PPU.y = 0;
	
	// Reset each PPU.bg and oam
	PPU.bg[0].vBlank();
	PPU.bg[1].vBlank();
	PPU.bg[2].vBlank();
	PPU.bg[3].vBlank();
	OAM.vBlank();
	
	if (!PPU.renderFrames) {
		PPU.skipCount++;
		if(PPU.skipCount>=PPU.skipLimit){
			PPU.skipCount = 0;
		} else {
			return;
		}
	}
	
	//TODO: fix this.
	// Draw color 0 as the base color if the screen is completely transparent
	//PPU.screenBuffer.getGraphics().setColor(new Color(CGRAM.getColor(0)));
	//PPU.screenBuffer.getGraphics().fillRect(0, 0, PPU.screenBuffer.getWidth(), PPU.screenBuffer.getHeight());
}

/**
 * Render cycles runs the PPU for the amount of cycles passed in. 
 * 
 * The PPU outputs one pixel every 4 cycles, with the exception of 
 * pixels 323 and 327, which take 6 cycles, for a total of 1364 cycles
 * per scanline.
 * 
 * There are always 340 pixels per scanline. But only pixels 22-277 are
 * displayed for a total of 256 displayed pixels. renderCycles calls loadPixel()
 * for each of these 256 pixels, and writes the final output to the PPU.screenBuffer.
 * 
 * @param cycles Number of cycles to process
 */
PPU.renderCycles = function(cycles) {
	// Don't render during vBlank
	if (!PPU.vBlanking) {
		// Loop until we run out of 4-cycle pixels to process
		PPU.unprocessedCycles += cycles;
		
		while (PPU.unprocessedCycles > 4 && PPU.x < 340) {
			// TODO: Refactor so PPU.x is the PPU.x value on the visible screen
			
			// Dots 323 and 327 take 6 cycles
			if (PPU.x == 323 || PPU.x == 327) {
				if (PPU.unprocessedCycles >= 6) {
					PPU.unprocessedCycles -= 6;
				} else {
					break;
				}
			} else {
				PPU.unprocessedCycles -= 4;
			}
			
			// Only draw pixels 22 - 277
			if (Util.inRange(PPU.x, 22, 277) && PPU.y < 225 && (PPU.renderFrames || (!PPU.renderFrames && PPU.skipCount==0))) {
				// Init output to the background color
				PPU.colorMain = 0;
				PPU.priorityMain = 0;
				PPU.sourceMain = PPU.SRC_BACK;
				
				PPU.colorSub = 0;
				PPU.prioritySub = 0;
				PPU.sourceSub = PPU.SRC_BACK;
				
				// loadPixel processes the current pixel and sets the output to the correct pixel
				PPU.bg[0].loadPixel();
				PPU.bg[1].loadPixel();
				PPU.bg[2].loadPixel();
				PPU.bg[3].loadPixel();
				OAM.loadPixel();
				
				// Screen then combines the output into a single color
				var color = Screen.doPixel(PPU.x - 22);
				
				// Write to the screenbuffer, adjusting for the 22 unused pixels at the start of the scanline
				//PPU.screenBuffer.setRGB(PPU.x - 22, PPU.y, CGRAM.snesColorToARGB(color, PPU.brightness));

				var thisPixelColor = CGRAM.snesColorToARGB(color, PPU.brightness)
				var r, g, b, a
				r = thisPixelColor.r
				g = thisPixelColor.g
				b = thisPixelColor.b
				a = thisPixelColor.a

				PPU.setCurrentFrame(PPU.x - 22, PPU.y, r, g, b, a)
			}

			PPU.x++;
		}
	}
}

/**
 * scanline() is called once per scanline by Timing. It resets each BG and OAM
 * to prepare for rendering the next scanline;
 */
PPU.scanline = function() {
	// No scanlines during vBlank
	if (!PPU.vBlanking) {
		PPU.bg[0].nextScanline();
		PPU.bg[1].nextScanline();
		PPU.bg[2].nextScanline();
		PPU.bg[3].nextScanline();
		OAM.scanline(PPU.y);
		PPU.x = 0;
		PPU.y++;
	}
}

PPU.dumpVRAM = function() {
	try{
		for(var i=0; i<PPU.vram.length; i++)
			console.log(PPU.vram[i]);
	} catch (e) {
		conosle.log("Unable to dump PPU.vram");
		console.log(e)
	}
	console.log(PPU.bg[0].toString());
	console.log(PPU.bg[1].toString());
	console.log(PPU.bg[2].toString());
	console.log(PPU.bg[3].toString());
}
