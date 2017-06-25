Core = {
  mem: null,
  running: false
}

function Snes(url, canvas, maxInstructions){
  this.canvas = canvas

  this.instCount = 0;
  this.timeBegin = null;
  this.timeEnd = null;
  
  this.pause = false;
  this.advanceFrameOnce = false;
  
  this.maxInstructions = maxInstructions ? maxInstructions:-1

  this.romLoader = new RomLoader(url);
}

Snes.prototype = {
  start: function() {
    var me = this
    var callback = function(){
      console.log("running...")
      me.run()
    }
    this.romLoader.read(callback)
  },

  cycle: function(count){
    debugger
    var instCount = 0;
    Core.running = true
    
    // Do as many instructions as set in properties file
    // Will execute indefinitely if instruction count is negative
    try {
      if ((instCount < count || count < 0) && Core.running) {
        if (!this.pause && this.advanceFrameOnce) {
          CPU.cycle();
          instCount++;
        }
      }
    } catch (err) {
      // Finish timing and print stats before throwing error up
      this.timeEnd = Date();
      console.log("Total time: " + ((this.timeEnd - this.timeBegin) / 1000) + " seconds");
      console.log("Instructions performed: " + instCount);
      console.log("Cycles performed: " + Timing.getCycles());
      console.log("Average speed: " + (((Timing.getCycles() + 0.0) / ((this.timeEnd - this.timeBegin + 0.0) / 1000.0)) / (1024.0 * 1024.0)) + " MHz");
      console.log("Average speed: " + (((Timing.getCycles() + 0.0) / ((this.timeEnd - this.timeBegin + 0.0) / 1000.0))) + " Hz");
      this.printMMaps();
      console.log(err)
    }
    this.instCount += instCount;
    this.cycle(this.instCount);
  },
  
  run: function(){
    this.instCount = 0;

    CPU.resetCPU();
    PPU.initialize(this.canvas);
    this.printStats();
    console.log("====Starting====");
    
    // Initiate Reset Vector
    CPU.resetVectorInit();
    
    // Load save file if found
    //TODO: load and save file
    /*if (Settings.isSet(Settings.SAVE_PATH)) {
      InputStream saveStream = Util.getStreamFromUrl(Settings.get(Settings.SAVE_PATH));
      if (saveStream != null) {
        mem.loadSram(saveStream);
      }
    }*/
    
    // Execute and time game
    console.log("====CPU Execution====");
    console.log("romAdr pbr:pc   op   CPU Status                      args              Instruction");
    console.log("------ -------  --   ------------------------------- ---------------   -----------");
    
    this.timeBegin = Date();
    this.cycle(this.maxInstructions);
    this.timeEnd = Date();
    Core.running = false;
    
    // Print run stats
    console.log("Total time: " + ((this.timeEnd - this.timeBegin) / 1000) + " seconds");
    console.log("Instructions performed: " + this.instCount);
    console.log("Cycles performed: " + Timing.getCycles());
    console.log("Average speed: " + (((Timing.getCycles() + 0.0) / ((this.timeEnd - this.timeBegin + 0.0) / 1000.0)) / (1024.0 * 1024.0)) + " MHz");
    console.log("Average speed: " + (((Timing.getCycles() + 0.0) / ((this.timeEnd - this.timeBegin + 0.0) / 1000.0))) + " Hz");
    this.printMMaps();
    
    PPU.dumpVRAM();
    Core.mem.dumpWRAM();
    this.renderScreen();
    this.run();
  },
  
  printStats: function() {
    console.log("====Information====");
    
    // Count number of implemented instructions
    var instCount = 0;
    for (var k = 0; k < CPU.jmp.length; k++) {
      if (CPU.jmp[k] != null) instCount++;
    }
    console.log("Implemented Instructions: " + instCount + "/255");
  },
  
  printMMaps: function() {
    console.log("List of unimplemented but used hardware registers: ");
    for (var i=0; i<0x4000; i++) {
      if ((/*(LoROMMemory)*/Core.mem).mmap[i]) {
        console.log(i+0x2000);
      }
    }
  },
  
  renderScreen: function() {
    CGRAM.readColors();
    CGRAM.testColors();
    Sprites.dumpOBJ();
  }
}
