function _colorMode(bitDepth){
	this.bitDepth = bitDepth
}
_colorMode.prototype.toString = function(){
	return parseInt(Math.pow(2,bitDepth)) + " colors";
}

ColorMode = {
	Color4: 	new _colorMode(2),
	Color16: 	new _colorMode(4),
	Color256: new _colorMode(8),
	Mode7: 		new _colorMode(0)
}