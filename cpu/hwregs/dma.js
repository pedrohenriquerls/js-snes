
DMA = {
	channels: [],
	dmaReg: []
}

for(var i = 0; i < 8; i++){
	DMA.channels[i] = new DMAChannel();
	DMA.dmaReg[i] 	= buildDMAChannelRegisterGroup(i);
}

	/**
	 * Initialize the HDMA channels if they are enabled
	 * This happens after every vblank(on scanline 0)
	 */
	// TODO: should take some cycles on the cpu
DMA.HDMAInit = function() {
	for (var i=0;i<8;i++) {
		DMA.channels[i].initHDMA();
	}
}
	
	// Perform the HDMA transfer for the current scanline	
DMA.HDMARun = function() {
	for (var i=0; i<8; i++) {
		DMA.channels[i].doHDMA();
	}
}
	
DMA.startDMA = function(channel) {
	//Log.debug("[DMA] Starting DMA on channel: " + channel);
	//Log.debug(channels[channel].toString());
	DMA.channels[channel].start();
}
DMA.startHDMA = function(channel) {
	//Log.debug("[HDMA] Starting HDMA channel: " + channel);
	//Log.debug(channels[channel].toString());
	DMA.channels[channel].hdmaEnabled = true;
}
DMA.stopHDMA = function(channel) {
	//if (channels[channel].hdmaEnabled) Log.debug("[HDMA] Stopping HDMA channel: " + channel);
	DMA.channels[channel].hdmaEnabled = false;
}
	
	/**
	 * Enables and disables DMA channels
	 * 0x420B
	 */
DMA.mdmaen = new HWRegister()
DMA.mdmaen.onWrite = function(value){
	// Check each channel, and start the dma transfer if necessary
	for(var i=0;i<8;i++) {
		if (((value >> i) & 0x01) == 0x01) {
			DMA.startDMA(i);
		}
	}
}

	/**
	 * Enables and disables HDMA channels
	 * 0x420C
	 */
DMA.hdmaen = new HWRegister()
DMA.hdmaen.onWrite = function(value) {
	// Check each channel, and start the hdma transfer if necessary
	for(var i=0;i<8;i++) {
		if (((value >> i) & 0x01) == 0x01) {
			DMA.startHDMA(i);
		} else {
			DMA.stopHDMA(i);
		}
	}
}