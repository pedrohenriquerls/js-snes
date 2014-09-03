
function _size(topBitMask, sizeMask){
	this.topBitMask = topBitMask
	this.sizeMask 	= sizeMask
}

_size.prototype = {
	getNumBits: function() {
		var s = this.getRealSize();
		if(s == Size.BYTE) {
			return 8;
		} else if (s==SHORT) {
			return 16;
		} else {
			alert("Unknown size");
		}
	},
	
	getRealSize: function() {
		if (this == Size.MEMORY_A) {
			if (CPU.status.isMemoryAccess()) {
				return Size.BYTE;
			} else {
				return Size.SHORT;
			}
		} else if (this == Size.INDEX) {
			if (CPU.status.isIndexRegister()) {
				return Size.BYTE;
			} else {
				return Size.SHORT;
			}
		}
		
		return this;
	}
}

Size = {
	BYTE 			: new _size(0x80, 0xFF),		// 1 Byte value
	SHORT			: new _size(0x8000, 0xFFFF),	// 2 Byte value
	MEMORY_A	: new _size(0, 0),	// Determined by memory access flag
	INDEX 		: new _size(0, 0)
}
