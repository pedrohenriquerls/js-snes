
/**
* Add with Carry from Accumulator Immediate
* 0x69
*/ 
function _addImediate(){
	this.name = "Add with Carry from Accumulator Immediate"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.IMMEDIATE_MEMORY;
	this.mnemonic = 'ADC'
}
_addImediate.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();
	
	CPU.a.add(CPU.dataReg.getValue() + (CPU.status.isCarry() ? 1 : 0));
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustAdd(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry((CPU.a.getValue() < oldA) || (CPU.status.isCarry() && oldA == CPU.a.getValue()));
	
	if (CPU.status.isDecimalMode()){
		CPU.status.setOverflow(false);
	}else{
		CPU.status.setOverflow(oldNeg == CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	}
	
	var cycles = 2;
	if (!CPU.status.isMemoryAccess())
		cycles++;

	return cycles;
}

/**
* Add with Carry from Accumulator Direct Page Indexed Indirect X
* 0x61
*/ 
function _addDPIndirectX(){
	this.name = "Add with Carry from Accumulator Direct Page Indexed Indirect X";
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_X;
	this.mnemonic = 'ADC'
}
_addDPIndirectX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();
	
	CPU.a.add(CPU.dataReg.getValue() + (CPU.status.isCarry() ? 1 : 0));
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustAdd(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry((CPU.a.getValue() < oldA) || (CPU.status.isCarry() && oldA == CPU.a.getValue()));
	
	if (CPU.status.isDecimalMode()){
		CPU.status.setOverflow(false);
	}else{
		CPU.status.setOverflow(oldNeg == CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	} 
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;

	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;

	return cycles;
}

/**
* Add with Carry from Accumulator Stack Relative
* 0x63
*/ 	
function _addStackRelative(){
	this.name = "Add with Carry from Accumulator Stack Relative";
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.STACK_RELATIVE;
	this.mnemonic = 'ADC'
}
_addStackRelative.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();
	
	CPU.a.add(CPU.dataReg.getValue() + (CPU.status.isCarry() ? 1 : 0));
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustAdd(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry((CPU.a.getValue() < oldA) || (CPU.status.isCarry() && oldA == CPU.a.getValue()));
	if (CPU.status.isDecimalMode()) CPU.status.setOverflow(false);
	else CPU.status.setOverflow(oldNeg == CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

	
/**
 * Add with Carry from Accumulator Direct Page
 * 0x65
 */ 
function _addDP(){
	this.name = "Add with Carry from Accumulator Direct Page";
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE;
	this.mnemonic = 'ADC'
}
_addDP.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();
	
	CPU.a.add(CPU.dataReg.getValue() + (CPU.status.isCarry() ? 1 : 0));
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustAdd(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry((CPU.a.getValue() < oldA) || (CPU.status.isCarry() && oldA == CPU.a.getValue()));
	if(CPU.status.isDecimalMode()){
		CPU.status.setOverflow(false)
	}else{
		CPU.status.setOverflow(oldNeg == CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	} 
	
	var cycles = 3;
	if (!CPU.status.isMemoryAccess())
		cycles++;

	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}


/**
 * Add with Carry from Accumulator Direct Page Indirect Long
 * 0x67
 */ 
function _addDPIndirectLong(){
	this.name = "Add with Carry from Accumulator Direct Page Indirect Long";
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDIRECT_LONG;
	this.mnemonic = 'ADC'
}
_addDPIndirectLong.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();
	
	CPU.a.add(CPU.dataReg.getValue() + (CPU.status.isCarry() ? 1 : 0));
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustAdd(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry((CPU.a.getValue() < oldA) || (CPU.status.isCarry() && oldA == CPU.a.getValue()));
	if (CPU.status.isDecimalMode()){
		CPU.status.setOverflow(false);
	}else{
		CPU.status.setOverflow(oldNeg == CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	} 
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;

	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;

	return cycles;
}

/**
 * Add with Carry from Accumulator Absolute
 * 0x6D
 */ 
function _addAbsolute(){
	this.name = "Add with Carry from Accumulator Absolute";
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE;
	this.mnemonic = 'ADC'
}
_addAbsolute.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();
	
	CPU.a.add(CPU.dataReg.getValue() + (CPU.status.isCarry() ? 1 : 0));
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustAdd(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry((CPU.a.getValue() < oldA) || (CPU.status.isCarry() && oldA == CPU.a.getValue()));
	if (CPU.status.isDecimalMode()){
		CPU.status.setOverflow(false);
	}else{
		CPU.status.setOverflow(oldNeg == CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	}
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;

	return cycles;
}

/**
 * Add with Carry from Accumulator Absolute Long
 * 0x6F
 */ 
function _addAbsoluteLong(){
	this.name = "Add with Carry from Accumulator Absolute Long";
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_LONG;
	this.mnemonic = 'ADC'
}
_addAbsoluteLong.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();
	
	CPU.a.add(CPU.dataReg.getValue() + (CPU.status.isCarry() ? 1 : 0));
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustAdd(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry((CPU.a.getValue() < oldA) || (CPU.status.isCarry() && oldA == CPU.a.getValue()));
	if(CPU.status.isDecimalMode()){
		CPU.status.setOverflow(false);
	}else{
		CPU.status.setOverflow(oldNeg == CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	} 
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;

	return cycles;
}

/**
 * Add with Carry from Accumulator Direct Page Indirect Indexed Y
 * 0x71
 */ 
function _addDPIndirectY(){
	this.name = "Add with Carry from Accumulator Direct Page Indirect Indexed Y";
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_Y;
	this.mnemonic = 'ADC'
}
_addDPIndirectY.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();
	
	CPU.a.add(CPU.dataReg.getValue() + (CPU.status.isCarry() ? 1 : 0));
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustAdd(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry((CPU.a.getValue() < oldA) || (CPU.status.isCarry() && oldA == CPU.a.getValue()));
	if (CPU.status.isDecimalMode()){
		CPU.status.setOverflow(false);
	}else{
		CPU.status.setOverflow(oldNeg == CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	} 
	
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
 * Add with Carry from Accumulator Direct Page Indirect
 * 0x72
 */ 
function _addDPIndirect(){
	this.name = "Add with Carry from Accumulator Direct Page Indirect";

	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDIRECT;
	this.mnemonic = 'ADC'
}
_addDPIndirect.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();
	
	CPU.a.add(CPU.dataReg.getValue() + (CPU.status.isCarry() ? 1 : 0));
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustAdd(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry((CPU.a.getValue() < oldA) || (CPU.status.isCarry() && oldA == CPU.a.getValue()));
	
	if (CPU.status.isDecimalMode()){
		CPU.status.setOverflow(false);
	}else{
		CPU.status.setOverflow(oldNeg == CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	} 
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;

	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;

	return cycles;
}

/**
 * Add with Carry from Accumulator Stack Relative Indirect Indexed Y
 * 0x73
 */ 
function _addSRIndirectY(){
	this.name = "Add with Carry from Accumulator Stack Relative Indirect Indexed Y";

	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.STACK_RELATIVE_INDIRECT_INDEXED_Y;
	this.mnemonic = 'ADC'
}
_addSRIndirectY.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();
	
	CPU.a.add(CPU.dataReg.getValue() + (CPU.status.isCarry() ? 1 : 0));
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustAdd(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry((CPU.a.getValue() < oldA) || (CPU.status.isCarry() && oldA == CPU.a.getValue()));
	if(CPU.status.isDecimalMode()){
		CPU.status.setOverflow(false);
	}else{
		CPU.status.setOverflow(oldNeg == CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	} 

	var cycles = 7;
	if (!CPU.status.isMemoryAccess())
		cycles++;

	return cycles;
}

	
/**
 * Add with Carry from Accumulator Direct Page Indexed X
 * 0x75
 */ 
function _addDPX(){
	this.name = "Add with Carry from Accumulator Direct Page Indexed X";

	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_X;
	this.mnemonic = 'ADC'
}
_addDPX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();
	
	CPU.a.add(CPU.dataReg.getValue() + (CPU.status.isCarry() ? 1 : 0));
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustAdd(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry((CPU.a.getValue() < oldA) || (CPU.status.isCarry() && oldA == CPU.a.getValue()));
	if (CPU.status.isDecimalMode()){
		CPU.status.setOverflow(false);
	}else{
		CPU.status.setOverflow(oldNeg == CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	} 
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;

	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;

	return cycles;
}

/**
 * Add with Carry from Accumulator Direct Page Indirect Long Indexed Y
 * 0x77
 */ 
function _addDPIndirectLongY(){
	this.name = "Add with Carry from Accumulator Direct Page Indirect Long Indexed Y";
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_LONG_Y;
	this.mnemonic = 'ADC'
}
_addDPIndirectLongY.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();
	
	CPU.a.add(CPU.dataReg.getValue() + (CPU.status.isCarry() ? 1 : 0));
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustAdd(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry((CPU.a.getValue() < oldA) || (CPU.status.isCarry() && oldA == CPU.a.getValue()));
	if (CPU.status.isDecimalMode()){
		CPU.status.setOverflow(false);
	}else{
		CPU.status.setOverflow(oldNeg == CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	} 
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;

	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;

	return cycles;
}

	
/**
 * Add with Carry from Accumulator Absolute Indexed Y
 * 0x79
 */ 
function _addAbsoluteY(){
	this.name = "Add with Carry from Accumulator Absolute Indexed Y";

	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_INDEXED_Y;
	this.mnemonic = 'ADC'
}
_addAbsoluteY.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();
	
	CPU.a.add(CPU.dataReg.getValue() + (CPU.status.isCarry() ? 1 : 0));
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustAdd(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry((CPU.a.getValue() < oldA) || (CPU.status.isCarry() && oldA == CPU.a.getValue()));
	if(CPU.status.isDecimalMode()){
		CPU.status.setOverflow(false);
	}else{
		CPU.status.setOverflow(oldNeg == CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	} 
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;

	if (CPU.indexCrossedPageBoundary)
		cycles++;

	return cycles;
}

/**
* Add with Carry from Accumulator Absolute Indexed X
* 0x7D
*/ 
function _addAbsoluteX(){
	this.name = "Add with Carry from Accumulator Absolute Indexed X";

	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_INDEXED_X;
	this.mnemonic = 'ADC'
}
_addAbsoluteX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();
	
	CPU.a.add(CPU.dataReg.getValue() + (CPU.status.isCarry() ? 1 : 0));
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustAdd(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry((CPU.a.getValue() < oldA) || (CPU.status.isCarry() && oldA == CPU.a.getValue()));
	if (CPU.status.isDecimalMode()){
		CPU.status.setOverflow(false);
	}else{
		CPU.status.setOverflow(oldNeg == CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	} 
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;

	if (CPU.indexCrossedPageBoundary)
		cycles++;

	return cycles;
}
	

	
/**
 * Add with Carry from Accumulator Absolute Long Indexed X
 * 0x7F
 */ 
function _addAbsoluteLongX(){
	this.name = "Add with Carry from Accumulator Absolute Long Indexed X";

	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_LONG_INDEXED_X;
	this.mnemonic = 'ADC'
}
_addAbsoluteLongX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var oldA = CPU.a.getValue();
	var oldNeg = CPU.a.isNegative();
	
	CPU.a.add(CPU.dataReg.getValue() + (CPU.status.isCarry() ? 1 : 0));
	
	// BCD adjust
	if (CPU.status.isDecimalMode()) {
		CPU.a.setValue(Util.bcdAdjustAdd(Size.MEMORY_A.getRealSize(), CPU.a.getValue()));
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry((CPU.a.getValue() < oldA) || (CPU.status.isCarry() && oldA == CPU.a.getValue()));
	if (CPU.status.isDecimalMode()){
		CPU.status.setOverflow(false);
	} else{
		CPU.status.setOverflow(oldNeg == CPU.dataReg.isNegative() && oldNeg != CPU.a.isNegative());
	} 
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;

	return cycles;
}

Add = {
	addImmediate: 			new _addImediate(),
	addDPIndirectX: 		new _addDPIndirectX(),
	addStackRelative: 	new _addStackRelative(),
	addDP: 							new _addDP(),
	addDPIndirectLong: 	new _addDPIndirectLong(),
	addAbsolute: 				new _addAbsolute(),
	addAbsoluteLong: 		new _addAbsoluteLong(),
	addDPIndirectY: 		new _addDPIndirectY(),
	addDPIndirect: 			new _addDPIndirect(),
	addSRIndirectY: 		new _addSRIndirectY(),
	addDPX: 						new _addDPX(),
	addDPIndirectLongY: new _addDPIndirectLongY(),
	addAbsoluteY: 			new _addAbsoluteY(),
	addAbsoluteX: 			new _addAbsoluteX(),
	addAbsoluteLongX: 	new _addAbsoluteLongX()
}