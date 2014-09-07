VRAM = {
	vramAddress: 0,
	incMode: false,
	incVal: 1,
	mapMode: 0,
	readDummy: true
}
	
	/**
	 * 0x2115 - Video Port Control
	 */
VRAM.vmainc = new HWRegister()
VRAM.vmainc.onWrite = function(value) {
	VRAM.incMode = (value & 0x80) == 0x80;
	VRAM.mapMode = (value >> 2) & 3;
	switch (value & 3) {
		case 0: VRAM.incVal = 1; break;
		case 1: VRAM.incVal = 32; break;
		case 2: VRAM.incVal = 128; break;
		case 3: VRAM.incVal = 128; break;
	}
}
	
	/**
	 * 0x2116 - VRAM Address low
	 */
VRAM.vmaddl = new HWRegister()
VRAM.vmaddl.onWrite = function(value) {
	VRAM.vramAddress = (VRAM.vramAddress & 0xFF00) | value;
	//VRAM.readDummy = true;
	//Log.debug(String.format("Updating vramaddress to 0x%x", VRAM.vramAddress));
}
	
	/**
	 * 0x2117 - VRAM Address high
	 */
VRAM.vmaddh = new HWRegister()
VRAM.vmaddh.onWrite = function(value) {
	VRAM.vramAddress = (VRAM.vramAddress & 0x00FF) | (value << 8);
	//VRAM.readDummy = true;
	//Log.debug(String.format("Updating vramaddress to 0x%x", VRAM.vramAddress));
}
	
	/**
	 * 0x2118 - VRAM Data write low
	 */
VRAM.vmwdatal = new HWRegister()
VRAM.vmwdatal.onWrite = function(value) {
	this.val = value & 0xFF;
	PPU.vram[getVramAddress()] = val;
	MemoryObserver.notifyObservers(getVramAddress());
	if (!VRAM.incMode) VRAM.vramAddress += VRAM.incVal;
}
	
	/**
	 * 0x2119 - VRAM Data write high
	 */
VRAM.vmwdatah = new HWRegister()
VRAM.vmwdatah.onWrite = function(value) {
	this.val = value & 0xFF;
	PPU.vram[getVramAddress()+1] = val;
	MemoryObserver.notifyObservers(getVramAddress()+1);
	if (VRAM.incMode) VRAM.vramAddress += VRAM.incVal;
}
	
	/**
	 * 0x2139 - VRAM Data read low
	 */
VRAM.vmrdatal = new HWRegister()
VRAM.vmrdatal.onRead = function() {
	/*if (VRAM.readDummy) {
		val = 0x00;
		VRAM.readDummy = false;
	} else {
		val = PPU.vram[getVramAddress()];
		if (!VRAM.incMode) VRAM.vramAddress += VRAM.incVal;
	}*/
	this.val = PPU.vram[getVramAddress()];
	if (!VRAM.incMode) VRAM.vramAddress += VRAM.incVal;
}
	/**
	 * 0x213A - VRAM Data read high
	 */
VRAM.vmrdatah = new HWRegister()
VRAM.vmrdatah.onRead = function() {
	/*if (VRAM.readDummy) {
		val = 0x00;
		VRAM.readDummy = false;
	} else {
		val = PPU.vram[getVramAddress()+1];
		if (VRAM.incMode) VRAM.vramAddress += VRAM.incVal;
	}*/
	this.val = PPU.vram[getVramAddress()+1];
	if (VRAM.incMode) VRAM.vramAddress += VRAM.incVal;
}
	
	/**
	 * Maps the current internal VRAM.vramAddress to the effective address
	 * Adapted from byuu's bsnes vram code
	 * 
	 * @return Effective vram address
	 */
VRAM.getVramAddress = function() {
	var addr = VRAM.vramAddress;
	
	// Each mapping takes 3 bytes from somewhere in the middle
	// and moves them to the bottom 3 bytes
	switch (VRAM.mapMode) {
		case 0: break;	// Direct mapping
		case 1: addr = (addr & 0xff00) | ((addr & 0x001f) << 3) | ((addr >> 5) & 7); break;
		case 2: addr = (addr & 0xfe00) | ((addr & 0x003f) << 3) | ((addr >> 6) & 7); break;
		case 3: addr = (addr & 0xfc00) | ((addr & 0x007f) << 3) | ((addr >> 7) & 7); break;
	}
	
	return (addr << 1) & 0xFFFF;
}
