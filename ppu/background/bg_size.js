function _BGSize(width, height){
	this.width 	= width
	this.height = height
}

_BGSize.prototype = {
	toString: function(){
		return width+"x"+height
	}
}

BGSize = {
	bg32x32: new _BGSize(32, 32),
	bg64x32: new _BGSize(64, 32),
	bg32x64: new _BGSize(32, 64),
	bg64x64: new _BGSize(64, 64)
}

BGSize.toBGSize = function(num){
	switch (num) {
		case 0: return BGSize.bg32x32;
		case 1: return BGSize.bg64x32;
		case 2: return BGSize.bg32x64;
		case 3: return BGSize.bg64x64;
		default: return BGSize.bg32x32;
	}
}
