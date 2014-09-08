function RomLoader(url){
	this.romData = null;
	this.url = url

	this.ready = false
}

RomLoader.prototype = {
	read: function(callback){
		var oReq = new XMLHttpRequest();
    
    oReq.open("GET", this.url, true);    
    oReq.responseType = "arraybuffer";

    var me = this;
    
    oReq.onload = function(oEvent) {
      var arrayBuffer = oReq.response;

      if (arrayBuffer) {
        var romData = new Uint8Array(arrayBuffer);

        if (romData.length % 1024 != 0) {
					romData = romData.subarray(0x200, romData.length);
					console.log("Removing File Header");
				}
				me.romData = romData

        //if (me.getRomInfo().isHiROM())
			    //Core.mem = new HiROMMemory();
			  //else
			    Core.mem = new LoROMMemory();
			  
			  me.loadMemory(Core.mem);
        
        me.ready = true;
        callback()
      }
    };

    oReq.send(null);
	},
	loadMemory: function(m) {
//		if (!(m instanceof LoROMMemory) || !ri.lorom) {
//			throw new RuntimeException("Cannot load HiRoms yet...");
//		}
		
		//int[] rom = new int[0x7c*0x8000];
		var rom = []//new Array(0x80*0x8000);
		for (var k = 0; k < this.romData.length; k++) {
			rom[k] = this.romData[k] & 0xFF;
		}
		
		m.setRom(rom);
	}
}
