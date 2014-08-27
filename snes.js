function Snes(){
	this.romData = null;
	this.ready = false;
	this.cpu = new CPU_65816();
}

Snes.prototype = {
	play: function(){
		if(this.ready)
			this.cpu.execute(this.romData)
	},
	insertRomAndPlay: function(path) {
		var me = this;
    var oReq = new XMLHttpRequest();

    oReq.open("GET", path, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function(oEvent) {
      var arrayBuffer = oReq.response; // Note: not oReq.responseText
      if (arrayBuffer) {
        me.romData = new Uint8Array(arrayBuffer);
        me.ready = true;
        me.play()
      }
    };

    oReq.send(null);
	}
}