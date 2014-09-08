
function Background(number, mainCTX){
	this.mainCTX = mainCTX

	this.num = number;
	this.tile16px;
	this.tileWidth = 8;
	this.tileHeight = 8;
	this.baseAddress;
	
	this.mosaic;
	
	this.size;
	this.colorMode = ColorMode.Color4;
	this.tileMapAddress;
	
	this.enabled = true;
	this.userEnabled = true; // User-controlled
	
	this.hscroll = 0;
	this.vscroll = 0;
	this.mainScreen;
	this.subScreen;
	
	// Windows
	this.windowMaskMain = false;
	this.windowMaskSub = false;
	this.window1Enabled = false;
	this.window2Enabled = false;
	this.window1Invert = false;
	this.window2Invert = false;
	this.windowOp;
	
	// this.x/this.y position of the pixel we're currently drawing
	this.x = 0;
	this.y = 0;
	this.baseY;
	
	this.tile;		// Stores the content of the current this.tile entry
	//private var tileAddr;	// Address of current this.tile
	this.tilePaletteOffset;	// Palette offset for the current this.tile
	
	//private var characterAddr;	// Address of current character data
	
	
	this.xTilePos=0;
	this.yTilePos=0;
	this.pixelY = 0;
	this.cacheTilemap = new Matrix(64, 64);
	this.cacheChardata = new Matrix(4096, 16, 16);// 1024 "tiles", this.size 16x16max
	
	// Priority values
	this.priority0;
	this.priority1;
	this.curPriority;	// Priority of the current this.tile

	this.num = number;
		
	this.size = BGSize.bg32x32;
	
	for (var i=0;i<64;i++)
		for(var j=0;j<64;j++)
			this.cacheTilemap[i][j] = -1;
	
	for (var i=0;i<4096;i++)
		for(var j=0;j<16;j++)
			for(var k=0;k<16;k++)
				this.cacheChardata[i][j][k]=-1;
	
	this.tilemapMemoryObserver = new BGTilemapMemoryObserver(this);//private BGTilemapMemoryObserver this.tilemapMemoryObserver;
	this.charDataMemoryObserver = new BGCharDataMemoryObserver(this);//private BGCharDataMemoryObserver this.charDataMemoryObserver;
	
	MemoryObserver.addObserver(this.tilemapMemoryObserver);
	MemoryObserver.addObserver(this.charDataMemoryObserver);
}

Background.prototype = {	
	/**
	 * Calculates the offset of the palette colors for the current this.tile
	 * 
	 * @return
	 */
	getPaletteOffset: function() {
		switch(this.colorMode) {
			case ColorMode.Color4:
				return ((this.tile >> 10) & 0x7) * 4;
			case ColorMode.Color16:
				return ((this.tile >> 10) & 0x7) * 16;
			default:
				return ((this.tile >> 10) & 0x7);
		}
	},
	
	setTileSize: function(tileSize) {
		this.tile16px = tileSize;
		this.tileWidth = this.tile16px ? 16 : 8;
		this.tileHeight = this.tileWidth;
	},

	setHScroll: function(scrollvalue) {
		this.hscroll = scrollvalue;
	},
	setVScroll: function(scrollvalue) {
		this.vscroll = scrollvalue;
	},
	
	/**
	 * Resets this.x and this.y to the beginning of the next scanline and loads
	 * the first this.tile in the scanline
	 */
	nextScanline: function() {
		// Mod to wrap scrolling
		this.baseY = (this.baseY + 1);
		this.y = (this.baseY + this.getVScroll())  % (this.size.height * this.tileHeight);
		this.x = this.getHScroll();
		this.loadTile();
	},
	
	/**
	 * Calculates the address of the current this.tile using this.x and this.y and loads
	 * it into this.tile. Also processes some attributes of the current this.tile.
	 */
	loadTile: function() {
		// Get this.x/this.y position of the this.tile we want
		this.xTilePos = this.x / this.tileWidth;
		this.yTilePos = this.y / this.tileHeight;
		
		// Load the this.tile(from cache)
		this.tile = this.cacheTilemap[this.xTilePos][this.yTilePos];
		if (this.tile==-1) {
			// Tile is relative to base address
			var taddr = this.tileMapAddress;

			// Add 2 bytes per this.x this.tile
			taddr += ((this.xTilePos % 32) * 2);

			// If we are on the right 32 tiles, add 0x800 bytes
			taddr += (this.xTilePos >= 32 ? 0x800 : 0);

			// Add 64 bytes per this.y this.tile
			taddr += ((this.yTilePos % 32) * 64);

			// Add extra if we are on the bottom half
			if (this.yTilePos >= 32) {
				// 32x64 uses B as the bottom half, 64x64 uses C/D
				if (this.size == BGSize.bg32x64) {
					taddr += 0x800;
				} else {
					taddr += 0x1000;
				}
			}

			// Load the this.tile
			this.cacheTilemap[this.xTilePos][this.yTilePos] = PPU.vram[taddr] | (PPU.vram[taddr + 1] << 8);
			this.tile = this.cacheTilemap[this.xTilePos][this.yTilePos];
		}
		
		this.pixelY = this.y%this.tileHeight;
		if ((this.tile & 0x8000) != 0) { // Vertical flip
			this.pixelY = this.tileHeight - this.pixelY - 1;
		}
		
		
		this.tilePaletteOffset = this.getPaletteOffset();
		
		// Tiles can choose between one of two priorities
		this.curPriority = (((this.tile >> 13) & 1) != 0 ? this.priority1 : this.priority0);
	},
	
	/**
	 * Loads and outputs the current pixel and increments this.x to move to the next
	 * pixel in the scanline.
	 */
	loadPixel: function() {
		var index = 0;
		
		if (this.colorMode == ColorMode.Mode7) return this.mode7Run();
		
		// Determine this.x offset for pixel we want
		var pixelX = this.x % this.tileWidth;
		if ((this.tile & 0x4000) != 0) { // Horizontal flip
			pixelX = this.tileWidth - this.pixelX -1;
		}
		
		// Get the pixel color
		index = this.cacheChardata[(this.tile & 0x3FF)][pixelX][this.pixelY];
		if (index == -1) {
			this.rebuildChardata((this.tile & 0x3FF)*8*this.colorMode.bitDepth + this.this.baseAddress);
			index = this.cacheChardata[(this.tile & 0x3FF)][pixelX][this.pixelY];
		}
		
		// Don't output transparent or when we're disabled
		if (index != 0 && this.isEnabled()) {
			// Masking check
			var masked = Window.checkBackgroundMask(this);
			var mainMask = this.windowMaskMain && masked;
			var subMask = this.windowMaskSub && masked;
			
			// Output on main screen
			if (this.mainScreen && !mainMask && this.curPriority > PPU.priorityMain) {
				PPU.priorityMain = this.curPriority;
				PPU.colorMain = index + this.tilePaletteOffset;
				PPU.sourceMain = this.num - 1;
			}
			
			// Output on subscreen
			if (this.subScreen && !subMask &&  this.curPriority > PPU.prioritySub) {
				PPU.prioritySub = this.curPriority;
				PPU.colorSub = index + this.tilePaletteOffset;
				PPU.sourceSub = this.num - 1;
			}
		}
		
		// Move to next pixel, wrapping in case we scrolled off the edge of the screen
		this.x = (this.x + 1) % (this.size.width*this.tileWidth);

		// If we have processed 8 pixels (or 16 for a 16x16 this.tile),
		// move to the next this.tile.
		if (((this.x % 8) == 0 && !this.tile16px) || (this.x % 16) == 0) {
			this.loadTile();
		}
		return (index==0 ? 0: index + this.tilePaletteOffset);
	},
	
	/**
	 * Ported from bsnes
	 */
	mode7Run: function() {
		var a = Util.sclip(16, BGRegisters.m7a.val);
		var b = Util.sclip(16, BGRegisters.m7b.val);
		var c = Util.sclip(16, BGRegisters.m7c.val);
		var d = Util.sclip(16, BGRegisters.m7d.val);
		
		var cx = Util.sclip(13, BGRegisters.m7x.val);
		var cy = Util.sclip(13, BGRegisters.m7y.val);
		var hoffset = Util.sclip(13, PPU.m7HOffset);
		var voffset = Util.sclip(13, PPU.m7VOffset);
		
		var tempX = PPU.this.x - 22;
		var tempY = PPU.this.y;
		
		if (PPU.m7XFlip) tempX = 255 - tempX;
		if (PPU.m7YFlip) tempY = 255 - tempY;
		
		var psx = ((a * this.m7Clip(hoffset - cx)) & (~63)) + ((b * this.m7Clip(voffset - cy)) & (~63)) + ((b * tempY) & (~63)) + (cx << 8);
		var psy = ((c * this.m7Clip(hoffset - cx)) & (~63)) + ((d * this.m7Clip(voffset - cy)) & (~63)) + ((d * tempY) & (~63)) + (cy << 8);
		
		var px = (psx + (a * tempX)) >> 8;
		var py = (psy + (c * tempX)) >> 8;
		
		var tile = 0, palette = 0, priority = 0;
		switch (PPU.m7Repeat) {
			// Screen repetition outside of screen area
			case 0:
			case 1:
				px &= 1023;
				py &= 1023;
				this.tile = PPU.vram[((py >> 3) * 128 + (px >> 3)) << 1];
				palette = PPU.vram[(((this.tile << 6) + ((py & 7) << 3) + (px & 7)) << 1) + 1];
				break;
				
			// Palette color 0 outside of screen area
			case 2:
				if(((px | py) & (~1023)) != 0) {
					palette = 0;
				} else {
					px &= 1023;
					py &= 1023;
					this.tile = PPU.vram[((py >> 3) * 128 + (px >> 3)) << 1];
					palette = PPU.vram[(((this.tile << 6) + ((py & 7) << 3) + (px & 7)) << 1) + 1];
				}
				break;
				
			// Character 0 repetition outside of screen area
			case 3:
				if(((px | py) & (~1023)) != 0) {
					this.tile = 0;
				} else {
					px &= 1023;
					py &= 1023;
					this.tile = PPU.vram[((py >> 3) * 128 + (px >> 3)) << 1];
				}
				palette = PPU.vram[(((this.tile << 6) + ((py & 7) << 3) + (px & 7)) << 1) + 1];
				break;
		}
		
		if (this.num == 1) {
			priority = this.priority0;
		} else if (this.num == 2) {
			priority = ((palette & 0x80) != 0 ? this.priority1 : this.priority0);
		    palette &= 0x7f;
		}
		
		// Don't output transparent or when we're disabled
		if (palette != 0 && this.isEnabled()) {
			// Masking check
			var masked = Window.checkBackgroundMask(this);
			var mainMask = this.windowMaskMain && masked;
			var subMask = this.windowMaskSub && masked;
			
			// Output on main screen
			if (this.mainScreen && !mainMask && priority > PPU.priorityMain) {
				PPU.priorityMain = priority;
				PPU.colorMain = palette;
				PPU.sourceMain = this.num - 1;
			}
			
			// Output on subscreen
			if (this.subScreen && !subMask &&  priority > PPU.prioritySub) {
				PPU.prioritySub = priority;
				PPU.colorSub = palette;
				PPU.sourceSub = this.num - 1;
			}
		}
		
		// Move to next pixel
		this.x++;
		
		return palette;
	},
	
	/**
	 * 13 bit sign extend; ported from bsnes
	 */
	m7Clip: function(a) {
		if ((a & 0x2000) != 0) {
			return a | (~0x3ff);
		} else {
			return a & 0x3ff;
		}
	},
	
	/**
	 * Resets the this.x and this.y values to 0 (handling scrolling)
	 * and load the first this.tile of scanline 0
	 */
	vBlank: function() {
		this.x = getHScroll();
		this.baseY = 0;
		this.y = this.baseY + getVScroll() % (this.size.height*this.tileHeight);
		
		this.loadTile();
	},
	
	// Scrolls a value for display on the screen
	getHScroll: function() {
		return (this.hscroll & 0x03FF) % (this.size.width*this.tileWidth);// only 10 bits count
	},
	
	getVScroll: function() {
		return this.vscroll & 0x03FF % (this.size.height*this.tileHeight);// only 10 bits count
	},
	
	isEnabled: function() {
		return this.enabled && this.userEnabled;
	},

	paintPixels: function(r, g, b, imgData, x, y){
		var index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
	},
	
	dumpBGImage: function() {
		var baseDir = '/tmp'//Settings.get(Settings.DEBUG_PPU_DIR);
		var oldx = this.x;
		var oldy = this.y;
		
		//BufferedImage img = new BufferedImage(this.size.width*this.tileWidth, this.size.height*this.tileHeight, BufferedImage.TYPE_INT_ARGB);
		var imgData = this.mainctx.createImageData(this.size.width*this.tileWidth, this.size.height*this.tileHeight)
		
		for (this.y=0;this.y<this.size.height*this.tileHeight; this.y++) {
			for (this.x=0;this.x<this.size.width*this.tileWidth; this.x++) {
				var ox=this.x;
				var oy=this.y;
				this.loadTile();
				var c = CGRAM.getColor(this.loadPixel());
				
				this.x=ox;
				this.y=oy;
				
				
				var r, g, b, realColor;
				r = parseInt(SNESColor.getColor(c, SNESColor.RED) & 0x1F) << 19;
				g = parseInt(SNESColor.getColor(c, SNESColor.GREEN) & 0x1F) << 11;
				b = parseInt(SNESColor.getColor(c, SNESColor.BLUE) & 0x1F) << 3;
				//realColor = (0xFF << 24) | r | g | b;

				this.paintPixels(r, g, b, imgData, this.x, this.y)
			}
		}

		this.mainctx.putImageData(imgData, 0, 0)
		
		/*try {
			ImageIO.write(img, "PNG", new File(baseDir + "/bg" + this.num + "_img.png"));
		} catch (IOException e) {
			e.printStackTrace();
		}*/
		
		this.x = oldx;
		this.y = oldy;
		this.loadTile();
	},
	
	dumpBGGraphics: function() {
		var baseDir = '/tmp'//Settings.get(Settings.DEBUG_PPU_DIR);
		var colors = [
			new Color(0, 0, 0),
			new Color(0, 0, 127),
			new Color(0, 0, 255),
			new Color(0, 127, 0),
			new Color(0, 127, 127),
			new Color(0, 127, 255),
			new Color(0, 255, 0),
			new Color(0, 255, 127),
			new Color(0, 255, 255),
			new Color(127, 0, 0),
			new Color(127, 0, 127),
			new Color(127, 0, 255),
			new Color(127, 127, 0),
			new Color(127, 127, 127),
			new Color(127, 127, 255),
			new Color(127, 255, 0)
		];
		
		//BufferedImage img = new BufferedImage(128, 512, BufferedImage.TYPE_INT_RGB);
		var imgData = this.mainctx.createImageData(128, 512)
		for (var k = 0; k < 64; k++) {
			for (var m = 0; m < 16; m++) {
				var spriteNum = (k * 16) + m;
				for (var y = 0; this.y < 8; y++) {
					for (var x = 0; this.x < 8; x++) {
						var addr = this.baseAddress + (spriteNum * 8 * this.colorMode.bitDepth) + (this.y * 2);
						var xMask = 0x80 >> this.x;
						var index = 0;
						switch (this.colorMode) {
							case Color4:
								index |= ((PPU.vram[addr] & xMask) != 0) ? 0x1 : 0;
								index |= ((PPU.vram[addr + 1] & xMask) != 0) ? 0x2 : 0;
								break;
							case Color16:
								index |= ((PPU.vram[addr] & xMask) != 0) ? 0x1 : 0;
								index |= ((PPU.vram[addr + 1] & xMask) != 0) ? 0x2 : 0;
								index |= ((PPU.vram[addr + 16] & xMask) != 0) ? 0x4 : 0;
								index |= ((PPU.vram[addr + 17] & xMask) != 0) ? 0x8 : 0;
								break;
							case Color256:
								index |= ((PPU.vram[addr] & xMask) != 0) ? 0x1 : 0;
								index |= ((PPU.vram[addr + 1] & xMask) != 0) ? 0x2 : 0;
								index |= ((PPU.vram[addr + 16] & xMask) != 0) ? 0x4 : 0;
								index |= ((PPU.vram[addr + 17] & xMask) != 0) ? 0x8 : 0;
								index |= ((PPU.vram[addr + 32] & xMask) != 0) ? 0x10 : 0;
								index |= ((PPU.vram[addr + 33] & xMask) != 0) ? 0x20 : 0;
								index |= ((PPU.vram[addr + 48] & xMask) != 0) ? 0x40 : 0;
								index |= ((PPU.vram[addr + 49] & xMask) != 0) ? 0x80 : 0;
								break;
						}
						var x = this.x + (m * 8)
						var y = this.y + (k * 8)
						if (this.colorMode != ColorMode.Color256) {
							var color = colors[index]
							this.paintPixels(color.r, color.g, color.b, imgData, x, y)
						} else {
							var color = CGRAM.getColor(index)
							this.paintPixels(color.r, color.g, color.b, imgData, x, y)
						}
					}
				}
			}
		}

		this.mainctx.putImageData(imgData,0,0)

		/*try {
			ImageIO.write(img, "PNG", new File(baseDir + "/bg" + this.num + "Dump.png"));
		} catch (IOException e) {
			e.printStackTrace();
		}*/
	},
	
	toString: function() {
		/*StringBuffer ret = new StringBuffer();
		ret.append("Background " + this.num + "\n");
		ret.append(String.format("  Map Address:  0x%04X\n", this.tileMapAddress));
		ret.append(String.format("  Char Address: 0x%04X\n", this.baseAddress));
		ret.append(String.format("  HOffset: %d\n", getHScroll()));
		ret.append(String.format("  VOffset: %d\n", getVScroll()));
		ret.append(String.format("  Tile this.size:    %s\n", (this.tile16px?"16x16":"8x8")));
		ret.append(String.format("  Mosaic Mode:  %s\n", (this.mosaic?"true":"false")));
		ret.append(String.format("  TileMap Size: %s\n", this.size));
		ret.append(String.format("  Colors:       %s\n", this.colorMode));
		ret.append(String.format("  Main screen:  %s\n", (this.mainScreen?"true":"false")));
		ret.append(String.format("  Sub screen:   %s\n", (this.subScreen?"true":"false")));
		return ret.toString();*/
		return 'TODO: Background toString'
	},

	// Rebuild the cachedata for the actual tilemap
	rebuildTilemap: function(addr) {
		addr -= (addr%2);
		var taddr = addr;
		
		// Figure out which this.x/this.y this.tile this is(so we know where to place the data in the cache)
		var tileX = 0;
		var tileY = 0;
		addr -= this.tileMapAddress;
		switch(this.size) {
			case bg32x64:
			case bg64x32:
				if (addr >= 0x800) { tileX += 32; addr -= 0x0800;}
				break;
			case bg64x64:
				if (addr >= 0x1800)      { tileX += 32; tileY += 32; addr -= 0x1800;}
				else if (addr >= 0x1000) { tileY += 32; addr -= 0x1000;}
				else if (addr >= 0x0800) { tileX += 32; addr -= 0x0800;}
				break;
		}
		
		tileY += addr/64;
		addr %= 64;
		tileX += addr/2;
		
		this.cacheTilemap[tileX][tileY] = PPU.vram[taddr] | (PPU.vram[taddr + 1] << 8);
	},
	
	// Repopulates the cachedata for the actual tiles
	rebuildChardata: function(addr) {
		// Figure out which character this.tile this will affect
		var characterNumber = (addr - this.baseAddress);
		var charOffset = characterNumber % (8 * this.colorMode.bitDepth);
		
		
		var characterBaseAddress = addr - charOffset;
		characterNumber /= (8*this.colorMode.bitDepth);
		
		var charY = charOffset / 2;
		var charX = charOffset % 8;
		
		// Check to make sure we won't overflow the address
		var largeAddr = characterBaseAddress;
		largeAddr += (this.tileWidth * 8 * this.colorMode.bitDepth);
		largeAddr += (this.tileHeight);
		
		// Re-render the entire this.tile
		for(var pixelY=0; this.pixelY<this.tileHeight; pixelY++) {
			if (this.pixelY==8)
				characterBaseAddress += 16*8*this.colorMode.bitDepth;
			for (var pixelX=0; pixelX<this.tileWidth; pixelX++) {
				if (pixelX==8)
					characterBaseAddress += 8*this.colorMode.bitDepth;
				
				var cIndex = 0;
				
				// Grab the pixel
				var xMask = 0x80 >> (pixelX % 8);
				switch (this.colorMode) {
					case Color4:
						cIndex |= ((PPU.vram[characterBaseAddress] & xMask) != 0) ? 0x1 : 0;
						cIndex |= ((PPU.vram[characterBaseAddress + 1] & xMask) != 0) ? 0x2 : 0;
						break;
					case Color16:
						cIndex |= ((PPU.vram[characterBaseAddress] & xMask) != 0) ? 0x1 : 0;
						cIndex |= ((PPU.vram[characterBaseAddress + 1] & xMask) != 0) ? 0x2 : 0;
						cIndex |= ((PPU.vram[characterBaseAddress + 16] & xMask) != 0) ? 0x4 : 0;
						cIndex |= ((PPU.vram[characterBaseAddress + 17] & xMask) != 0) ? 0x8 : 0;
						break;
					case Color256:
						cIndex |= ((PPU.vram[characterBaseAddress] & xMask) != 0) ? 0x1 : 0;
						cIndex |= ((PPU.vram[characterBaseAddress + 1] & xMask) != 0) ? 0x2 : 0;
						cIndex |= ((PPU.vram[characterBaseAddress + 16] & xMask) != 0) ? 0x4 : 0;
						cIndex |= ((PPU.vram[characterBaseAddress + 17] & xMask) != 0) ? 0x8 : 0;
						cIndex |= ((PPU.vram[characterBaseAddress + 32] & xMask) != 0) ? 0x10 : 0;
						cIndex |= ((PPU.vram[characterBaseAddress + 33] & xMask) != 0) ? 0x20 : 0;
						cIndex |= ((PPU.vram[characterBaseAddress + 48] & xMask) != 0) ? 0x40 : 0;
						cIndex |= ((PPU.vram[characterBaseAddress + 49] & xMask) != 0) ? 0x80 : 0;
						break;
				}
				this.cacheChardata[characterNumber][pixelX][this.pixelY] = cIndex;
			}
			characterBaseAddress+=2;
		}
	},

	// Invalidate the caches
	invalidateCharCache: function() {
		if (!this.isEnabled()) return;
		console.log("Rebuilding character cache");
		for (var i=0;i<4096;i++)
			for(var j=0;j<16;j++)
				for(var k=0;k<16;k++)
					this.cacheChardata[i][j][k]=-1;
	},

	invalidateTileCache: function() {
		if (!this.isEnabled()) return;
		console.log("Rebuilding this.tile cache");
		for (var i=0;i<64;i++)
			for(var j=0;j<64;j++)
				this.cacheTilemap[i][j] = -1;
		// These will get updated when LoadTile is called since they are set to -1
	}
}