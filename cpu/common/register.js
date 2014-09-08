function Register(size, val) {
	this.val = val
	this.size = size;
}

Register.prototype = {
	getValue: function(){
		return this.getValue(this.size)
	},

	getValue: function(){
		if (this.size == Size.SHORT) {
			return this.val & 0xFFFF;
		} else {
			return this.val & 0xFF;
		}
	},

	getRealValue: function(){
		return this.val
	},

	setRealValue: function(val) {
		this.val = val & 0xFFFF;
	},

	setValue: function(size, val) {
		this.size = size.getRealSize();
		
		this.setValue(val);
	},
	
	setValue: function(val) {
		if (this.size == Size.BYTE)
			this.val = (this.val & 0xFF00) + (val & 0x00FF);
		else
			this.val = val;
	},
	
	setSize: function(size) {
		this.size = size.getRealSize();
	},

	getSize: function(){
		return this.size
	},
	
	add: function(add) {
		this.setValue(this.val + add);
	},
	
	subtract: function(sub) {
		this.setValue(this.val - sub);
	},
	
	isNegative: function() {
		return (this.val & this.size.topBitMask) > 0;
	}
}