function _snesColor(mask, shift){
	this.mask  = mask
	this.shift = shift
}

SNESColor = {
	RED: 	 new _snesColor(0x1F, 0),
	GREEN: new _snesColor(0x3E0, 5),
	BLUE:  new _snesColor(0x7C00, 10)
}

SNESColor.getColor = function(value, color){
	return (value & color.mask) >> color.shift;	
}