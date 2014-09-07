function BGCharDataMemoryObserver(background){
	this.bg = background
}

BGCharDataMemoryObserver.prototype = {
	getRange: function(){
		var start = this.bg.baseAddress;
		var end = start + 1024 * 8 * this.bg.colorMode.bitDepth;
		
		return [start, end]
	},

	onInvalidate: function(addr){
		this.bg.rebuildChardata(addr);
	}
}