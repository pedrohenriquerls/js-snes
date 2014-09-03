var TARGET_SPEED = 21477272 // 21.477MHz Master Clock
Timing = {
	TARGET_SPEED: TARGET_SPEED, 
	cycleTimeNS: (1.0/TARGET_SPEED) * 1000000000.0,//1000000000.0f
	
	totalCycles: 0,        // Total master cycles that have been run
	limitSpeed: false,  // Whether or not to limit the speed of execution
	lastTime: 0,           // The last time in nanoseconds we last did a cycle
	
	autoFrameSkip: false,
	sinceLastScanline: 0,
	cyclesPerScanLine: 1364,
	scanlines: 262,
	currentScanline: 0,
	wramRefreshed: false,
	hdmaStarted: false,
	
	cyclesToCatchup: 0,
	callbacks: [],
	toremove: [],
	irqOnCurrentLine: false, // Tracks if an IRQ occurred on the current scanline
	apuCyclesToRun: 0
}
	
Timing.cycle = function(numCycles) {
	Timing.totalCycles += numCycles;
	Timing.sinceLastScanline += numCycles;
	// WRAM Refresh Period
	if (Timing.sinceLastScanline >= 536 && !Timing.wramRefreshed) {
		numCycles += 40;
		Timing.totalCycles +=40;
		Timing.wramRefreshed = true;
	}
	// HDMA Update(happens during the 0th scanline)
	if (Timing.currentScanline == 0 && !Timing.hdmaStarted) {
		DMA.HDMAInit();
		Timing.hdmaStarted = true;
	}
	
	Timing.apuCyclesToRun += numCycles;
	
	// Run PPU
	PPU.renderCycles(numCycles);
	
	// Handle IRQ check
	Timing.checkIRQ();
	
	
	// Reset the cycles into this scanline counter, incrementing
	// the current scanline
	while (Timing.sinceLastScanline > Timing.cyclesPerScanLine) {
		Timing.sinceLastScanline -= Timing.cyclesPerScanLine;
		Timing.currentScanline++;
		Timing.irqOnCurrentLine = false;
		PPU.scanline();
		PPU.renderCycles(0);
		DMA.HDMARun();
		
		// Call VBlank only immediately after switching to the right scanline
		if (Timing.currentScanline == 0xE1) {
			CPU.triggerVBlank();
			PPU.vBlank();
			
			// Set advanceFrameOnce to pause after finishing out the current frame
			Core.advanceFrameOnce = false;
			break;
		}
		
		// Handle auto-joypad read
		if (Timing.currentScanline == 0xE3 && CPU.standardControllerRead) {
			Input.autoRead();
		}
	}
	// Reset back to the top of the screen
	if (Timing.currentScanline >= Timing.scanlines) {
		Timing.currentScanline = 0;
		Timing.wramRefreshed = false;
		PPU.vBlanking = false;
		Timing.hdmaStarted = false;
	}
	
	// VBlank related stuff
	if (Timing.currentScanline >= 0xE1) { // we are vblanking
		CPURegisters.rdnmi.val |= 0x80;
	} else {
		CPURegisters.rdnmi.val &= 0x7F;
	}
	
	// TODO: HBlank related stuff
	
	
	// Check for callbacks
	Timing.toremove = [];
	Timing.callbacks.forEach(function(callback, index) {
		if(callback.callbackTime <= Timing.totalCycles){
			console.log('Running callback...')
			callback()
			Timing.toremove[Timing.toremove.length] = index
		}
	})
	
	Timing.toremove.forEach(function(callbackIndex) {
		Timing.callbacks.splice(callbackIndex, 1);
	})
	
	// Check for timers
	// TODO: corrigir isso
	// Waste time to match MHz setting(but only do it once per frame...when scanline==1)
	/*Timing.cyclesToCatchup += numCycles;
	if (Timing.limitSpeed && Timing.currentScanline==1) {
		var sleep, elapsed;
		do {
			elapsed = lastTime//System.nanoTime() - lastTime;
			sleep = Timing.cyclesToCatchup*Timing.cycleTimeNS - elapsed;
		} while(sleep>Timing.cycleTimeNS);
		lastTime = System.nanoTime();
		Timing.cyclesToCatchup = 0;
	}*/
	
	//How long should this have taken
	/*if (autoFrameSkip) {
		long duration = numCycles*cycleTimeNS;
		long actualDuration = System.nanoTime() - lastTime;
		if (actualDuration > duration) {
			PPU.renderFrames = false;
		} else {
			PPU.renderFrames = true;
		}
	}*/
}

Timing.getCycles = function() {
	return Timing.totalCycles;
}

Timing.checkIRQ = function() {
	if (!Timing.irqOnCurrentLine) {
		var doIRQ = false;
		switch (CPU.irqEnable) {
			case CPU.IRQ_V:
				Timing.doIRQ = Timing.currentScanline == CPU.vtime;
				break;
			case CPU.IRQ_H:
				Timing.doIRQ = PPU.x >= CPU.htime;
				break;
			case CPU.IRQ_VH:
				Timing.doIRQ = PPU.x >= CPU.htime && Timing.currentScanline == CPU.vtime;
				break;
		}
		
		if (Timing.doIRQ) {
			Timing.irqOnCurrentLine = true;
			CPU.triggerIRQ();
		}
	}
}

Timing.addTimer = function(repeatEvery) {
	// Adds a callback to be executed every repeatEvery cycles
}

// Adds a callback to be executed in fromNow cycles
Timing.addCallback = function(fromNow, callback) {
	callback.callbackTime = Timing.totalCycles + Timing.fromNow;
	Timing.callbacks[Timing.callbacks.length] = callback;
}
