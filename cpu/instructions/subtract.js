
	/**
	 * Subtract with Borrow from Accumulator Immediate
	 * 0xE9
	 */ 
function _subFromAImmediate() {
	this.name = "Subtract with Borrow from Accumulator Immediate"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.IMMEDIATE_MEMORY;
	this.mnemonic = 'SBC'
}
_subFromAImmediate.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();
	
	var subtractand = CPU.dataReg.getValue() + (!CPU.status.isCarry() ? 1 : 0); 
	CPU.a.subtract(subtractand);
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustSubtract(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry(subtractand<=oldA);
	if (!CPU.status.isDecimalMode()) CPU.status.setOverflow(oldNeg != CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	else CPU.status.setOverflow(false);
	
	var cycles = 2;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
	/**
	 * Subtract with Borrow from Accumulator Direct Page Indexed Indirect X
	 * 0xE1
	 */ 
function _subFromADPIndirectX() {
	this.name = "Subtract with Borrow from Accumulator Direct Page Indexed Indirect X"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_X;
	this.mnemonic = 'SBC'
}
_subFromADPIndirectX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();
	
	var subtractand = CPU.dataReg.getValue() + (!CPU.status.isCarry() ? 1 : 0); 
	CPU.a.subtract(subtractand);
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustSubtract(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry(subtractand<=oldA);
	if (!CPU.status.isDecimalMode()) CPU.status.setOverflow(oldNeg != CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	else CPU.status.setOverflow(false);
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}

	/**
	 * Subtract with Borrow from Accumulator Stack Relative
	 * 0xE3
	 */ 
function _subFromAStackRelative() {
	this.name = "Subtract with Borrow from Accumulator Stack Relative"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.STACK_RELATIVE;
	this.mnemonic = 'SBC'
}
_subFromAStackRelative.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();

	var subtractand = CPU.dataReg.getValue() + (!CPU.status.isCarry() ? 1 : 0); 
	CPU.a.subtract(subtractand);
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustSubtract(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry(subtractand<=oldA);
	if (!CPU.status.isDecimalMode()) CPU.status.setOverflow(oldNeg != CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	else CPU.status.setOverflow(false);
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

	/**
	 * Subtract with Borrow from Accumulator Direct Page
	 * 0xE5
	 */ 
function _subFromADP() {
	this.name = "Subtract with Borrow from Accumulator Direct Page"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE;
	this.mnemonic = 'SBC'
}
_subFromADP.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();

	var subtractand = CPU.dataReg.getValue() + (!CPU.status.isCarry() ? 1 : 0); 
	CPU.a.subtract(subtractand);
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustSubtract(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry(subtractand<=oldA);
	if (!CPU.status.isDecimalMode()) CPU.status.setOverflow(oldNeg != CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	else CPU.status.setOverflow(false);
	
	var cycles = 3;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}
	
	/**
	 * Subtract with Borrow from Accumulator Direct Page Indirect Long
	 * 0xE7
	 */ 
function _subFromADPIndirectLong() {
	this.name = "Subtract with Borrow from Accumulator Direct Page Indirect Long"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDIRECT_LONG;
	this.mnemonic = 'SBC'
}
_subFromADPIndirectLong.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();

	var subtractand = CPU.dataReg.getValue() + (!CPU.status.isCarry() ? 1 : 0); 
	CPU.a.subtract(subtractand);
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustSubtract(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry(subtractand<=oldA);
	if (!CPU.status.isDecimalMode()) CPU.status.setOverflow(oldNeg != CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	else CPU.status.setOverflow(false);
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}
	
	/**
	 * Subtract with Borrow from Accumulator Absolute
	 * 0xED
	 */ 
function _subFromAAbsolute() {
	this.name = "Subtract with Borrow from Accumulator Absolute"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE;
	this.mnemonic = 'SBC'
}
_subFromAAbsolute.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();

	var subtractand = CPU.dataReg.getValue() + (!CPU.status.isCarry() ? 1 : 0); 
	CPU.a.subtract(subtractand);
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustSubtract(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry(subtractand<=oldA);
	if (!CPU.status.isDecimalMode()) CPU.status.setOverflow(oldNeg != CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	else CPU.status.setOverflow(false);
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

	/**
	 * Subtract with Borrow from Accumulator Absolute Long
	 * 0xEF
	 */ 
function _subFromAAbsoluteLong() {
	this.name = "Subtract with Borrow from Accumulator Absolute Long"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_LONG;
	this.mnemonic = 'SBC'
}
_subFromAAbsoluteLong.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();

	var subtractand = CPU.dataReg.getValue() + (!CPU.status.isCarry() ? 1 : 0); 
	CPU.a.subtract(subtractand);
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustSubtract(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry(subtractand<=oldA);
	if (!CPU.status.isDecimalMode()) CPU.status.setOverflow(oldNeg != CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	else CPU.status.setOverflow(false);
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

	/**
	 * Subtract with Borrow from Accumulator Direct Page Indirect Indexed Y
	 * 0xF1
	 */ 
function _subFromADPIndirectY() {
	this.name = "Subtract with Borrow from Accumulator Direct Page Indirect Indexed Y"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_Y;
	this.mnemonic = 'SBC'
}
_subFromADPIndirectY.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();

	var subtractand = CPU.dataReg.getValue() + (!CPU.status.isCarry() ? 1 : 0); 
	CPU.a.subtract(subtractand);
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustSubtract(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry(subtractand<=oldA);
	if (!CPU.status.isDecimalMode()) CPU.status.setOverflow(oldNeg != CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	else CPU.status.setOverflow(false);
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	if (CPU.indexCrossedPageBoundary)
		cycles++;
	return cycles;
}

	/**
	 * Subtract with Borrow from Accumulator Direct Page Indirect
	 * 0xF2
	 */ 
function _subFromADPIndirect() {
	this.name = "Subtract with Borrow from Accumulator Direct Page Indirect"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDIRECT;
	this.mnemonic = 'SBC'
}
_subFromADPIndirect.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();

	var subtractand = CPU.dataReg.getValue() + (!CPU.status.isCarry() ? 1 : 0); 
	CPU.a.subtract(subtractand);
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustSubtract(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry(subtractand<=oldA);
	if (!CPU.status.isDecimalMode()) CPU.status.setOverflow(oldNeg != CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	else CPU.status.setOverflow(false);
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}
	
	/**
	 * Subtract with Borrow from Accumulator Stack Relative Indirect Indexed Y
	 * 0xF3
	 */ 
function _subFromASRIndirectY() {
	this.name = "Subtract with Borrow from Accumulator Stack Relative Indirect Indexed Y"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.STACK_RELATIVE_INDIRECT_INDEXED_Y;
	this.mnemonic = 'SBC'
}
_subFromASRIndirectY.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();

	var subtractand = CPU.dataReg.getValue() + (!CPU.status.isCarry() ? 1 : 0); 
	CPU.a.subtract(subtractand);
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustSubtract(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry(subtractand<=oldA);
	if (!CPU.status.isDecimalMode()) CPU.status.setOverflow(oldNeg != CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	else CPU.status.setOverflow(false);
	
	var cycles = 7;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

	/**
	 * Subtract with Borrow from Accumulator Direct Page Indexed X
	 * 0xF5
	 */ 
function _subFromADPX() {
	this.name = "Subtract with Borrow from Accumulator Direct Page Indexed X"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_X;
	this.mnemonic = 'SBC'
}
_subFromADPX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();

	var subtractand = CPU.dataReg.getValue() + (!CPU.status.isCarry() ? 1 : 0); 
	CPU.a.subtract(subtractand);
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustSubtract(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry(subtractand<=oldA);
	if (!CPU.status.isDecimalMode()) CPU.status.setOverflow(oldNeg != CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	else CPU.status.setOverflow(false);
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}

	/**
	 * Subtract with Borrow from Accumulator Direct Page Indirect Long Indexed Y
	 * 0xF7
	 */ 
function _subFromADPIndirectLongY() {
	this.name = "Subtract with Borrow from Accumulator Direct Page Indirect Long Indexed Y"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_LONG_Y;
	this.mnemonic = 'SBC'
}
_subFromADPIndirectLongY.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();

	var subtractand = CPU.dataReg.getValue() + (!CPU.status.isCarry() ? 1 : 0); 
	CPU.a.subtract(subtractand);
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustSubtract(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry(subtractand<=oldA);
	if (!CPU.status.isDecimalMode()) CPU.status.setOverflow(oldNeg != CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	else CPU.status.setOverflow(false);
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}

	/**
	 * Subtract with Borrow from Accumulator Absolute Indexed Y
	 * 0xF9
	 */ 
function _subFromAAbsoluteY() {
	this.name = "Subtract with Borrow from Accumulator Absolute Indexed Y"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_INDEXED_Y;
	this.mnemonic = 'SBC'
}
_subFromAAbsoluteY.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();

	var subtractand = CPU.dataReg.getValue() + (!CPU.status.isCarry() ? 1 : 0); 
	CPU.a.subtract(subtractand);
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustSubtract(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry(subtractand<=oldA);
	if (!CPU.status.isDecimalMode()) CPU.status.setOverflow(oldNeg != CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	else CPU.status.setOverflow(false);
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if (CPU.indexCrossedPageBoundary)
		cycles++;
	return cycles;
}

	/**
	 * Subtract with Borrow from Accumulator Absolute Indexed X
	 * 0xFD
	 */ 
function _subFromAAbsoluteX() {
	this.name = "Subtract with Borrow from Accumulator Absolute Indexed X"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_INDEXED_X;
	this.mnemonic = 'SBC'
}
_subFromAAbsoluteX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();

	var subtractand = CPU.dataReg.getValue() + (!CPU.status.isCarry() ? 1 : 0); 
	CPU.a.subtract(subtractand);
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustSubtract(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry(subtractand<=oldA);
	if (!CPU.status.isDecimalMode()) CPU.status.setOverflow(oldNeg != CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	else CPU.status.setOverflow(false);
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if (CPU.indexCrossedPageBoundary)
		cycles++;
	return cycles;
}

	/**
	 * Subtract with Borrow from Accumulator Absolute Long Indexed X
	 * 0xFF
	 */ 
function _subFromAAbsoluteLongX() {
	this.name = "Subtract with Borrow from Accumulator Absolute Long Indexed X"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_LONG_INDEXED_X;
	this.mnemonic = 'SBC'
}
_subFromAAbsoluteLongX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();

	var subtractand = CPU.dataReg.getValue() + (!CPU.status.isCarry() ? 1 : 0); 
	CPU.a.subtract(subtractand);
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustSubtract(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry(subtractand<=oldA);
	if (!CPU.status.isDecimalMode()) CPU.status.setOverflow(oldNeg != CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	else CPU.status.setOverflow(false);
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

Subtract = {
	subFromAImmediate: new _subFromAImmediate(),
	subFromADPIndirectX: new _subFromADPIndirectX(),
	subFromAStackRelative: new _subFromAStackRelative(),
	subFromADP: new _subFromADP(),
	subFromADPIndirectLong: new _subFromADPIndirectLong(),
	subFromAAbsolute: new _subFromAAbsolute(),
	subFromAAbsoluteLong: new _subFromAAbsoluteLong(),
	subFromADPIndirectY: new _subFromADPIndirectY(),
	subFromADPIndirect: new _subFromADPIndirect(),
	subFromASRIndirectY: new _subFromASRIndirectY(),
	subFromADPX: new _subFromADPX(),
	subFromADPIndirectLongY: new _subFromADPIndirectLongY(),
	subFromAAbsoluteX: new _subFromAAbsoluteX(),
	subFromAAbsoluteLongX: new _subFromAAbsoluteLongX()
}