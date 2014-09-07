function BGTilemapMemoryObserver(background){
	this.bg = background
}

BGTilemapMemoryObserver.prototype = {
	getRange: function(){
		var start = this.bg.tileMapAddress;
		var end = start + 0x800;
		switch (this.bg.size) {
			case BGSize.bg64x32:
			case BGSize.bg32x64:
				end += 0x800;
				break;
			case BGSize.bg64x64:
				end += 0x1800;
				break;
		}
		
		return [start, end];
	},
	onInvalidate: function(addr){
		this.bg.rebuildTilemap(addr)
	}
}