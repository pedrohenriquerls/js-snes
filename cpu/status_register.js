//import size
function StatusRegister(){
	/**
	 * N
	 * True = Top Bit Set, False = Top Bit Unset
	 */
	this.negative = false;
	
	/**
	 * V
	 * True = this.overflow, False = No this.overflow
	 */
	this.overflow = false;
	
	/**
	 * M
	 * True = 8-bit, False = 16-bit
	 */
	this.memory_access = false;
	
	/**
	 * X
	 * True = 8-bit, False = 16-bit
	 */
	this.index_register = false;
	
	/**
	 * D
	 * True = Decimal, False = Binary
	 */
	this.decimal_mode = false;
	
	/**
	 * I
	 * True = Disabled, False = Enableds
	 */
	this.irq_disable = false;
	
	/**
	 * Z
	 * True = this.zero, False = Nonthis.zero
	 */
	this.zero = false;
	
	/**
	 * C
	 * Addition: True = this.carry, False = No this.carry
	 * Subtraction: True = No Borrow, False = Borrow
	 */
	this.carry = false;
}
	
StatusRegister.prototype = {
	getValue: function() {
		var status = 0;
		status |= (this.negative ? 0x80 : 0);
		status |= (this.overflow ? 0x40 : 0);
		status |= (this.memory_access ? 0x20 : 0);
		status |= (this.index_register ? 0x10 : 0);
		status |= (this.decimal_mode ? 0x8 : 0);
		status |= (this.irq_disable ? 0x4 : 0);
		status |= (this.zero ? 0x2 : 0);
		status |= (this.carry ? 0x1 : 0);
		
		return status;
	},
	
	setValue: function(status) {
		this.negative = (status & 0x80) != 0;
		this.overflow = (status & 0x40) != 0;
		this.setMemoryAccess((status & 0x20) != 0);
		this.setIndexRegister((status & 0x10) != 0);
		this.decimal_mode = (status & 0x8) != 0;
		this.irq_disable = (status & 0x4) != 0;
		this.zero = (status & 0x2) != 0;
		this.carry = (status & 0x1) != 0;
	},

	setMemoryAccess: function(memory_access) {
		this.memory_access = memory_access;
		
		if (this.memory_access) {
			CPU.a.setSize(Size.BYTE);
		} else {
			CPU.a.setSize(Size.SHORT);
		}
	},

	setIndexRegister: function(index_register) {
		this.index_register = index_register;
		
		if (this.index_register) {
			CPU.x.setSize(Size.BYTE);
			CPU.x.setValue(CPU.x.getValue() & 0xFF);
			
			CPU.y.setSize(Size.BYTE);
			CPU.y.setValue(CPU.y.getValue() & 0xFF);
		} else {
			CPU.x.setSize(Size.SHORT);
			CPU.y.setSize(Size.SHORT);
		}
	},

	setDecimalMode: function(decimal_mode){
		this.decimal_mode = decimal_mode
	},

	isDecimalMode: function() {
		return this.decimal_mode;
	},

	setIrqDisable: function(irq_disable) {
		this.irq_disable = irq_disable;
	},

	isIrqDisable: function() {
		return this.irq_disable;
	},

	isCarry: function() {
		return this.carry;
	},

	setCarry: function(carry) {
		this.carry = carry;
	},

	setNegative: function(negative) {
		this.negative = negative;
	},

	isNegative: function() {
		return this.negative;
	},

	setOverflow: function(overflow) {
		this.overflow = overflow;
	},

	isOverflow: function() {
		return this.overflow;
	},

	isMemoryAccess: function(){
		return this.memory_access;
	},

	setZero: function(zero) {
		this.zero = zero;
	},

	isZero: function() {
		return this.zero;
	},

	setCarry: function(carry) {
		this.carry = carry;
	},

	isCarry: function() {
		return this.carry;
	},

	isIndexRegister: function(){
		return this.index_register
	},
	
	toString: function() {
		/*StringBuffer sb = new StringBuffer();
		sb.append(this.negative 			? "N" : "n");
		sb.append(this.overflow 			? "V" : "v");
		sb.append(this.memory_access 	? "M" : "m");
		sb.append(this.index_register ? "X" : "x");
		sb.append(this.decimal_mode 	? "D" : "d");
		sb.append(this.irq_disable 		? "I" : "i");
		sb.append(this.zero 					? "Z" : "z");
		sb.append(this.carry 					? "C" : "c");
		
		return sb.toString();*/
		return "TODO: to string StatusRegister"
	}
}
