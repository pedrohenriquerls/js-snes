
	/**
	 * EOR Accumulator with Memory DP Indexed Indirect, X
	 * 0x41
	 */
function _eorAMemDPIndirectX() {
	this.name = "Decrement Index Register Y"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_X;
	this.mnemonic = 'EOR'
}
_eorAMemDPIndirectX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() ^ CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}

	/**
	 * EOR Accumulator with Memory Stack Relative
	 * 0x43
	 */ 
function _eorAMemStackRelative() {
	this.name = "EOR Accumulator with Memory Stack Relative"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.STACK_RELATIVE;
	this.mnemonic = 'EOR'
}
_eorAMemStackRelative.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() ^ CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
	
	/**
	 * EOR Accumulator with Memory Direct Page
	 * 0x45
	 */ 
function _eorAMemDP() {
	this.name = "EOR Accumulator with Memory Direct Page"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE;
	this.mnemonic = 'EOR'
}
_eorAMemDP.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() ^ CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 3;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}

	/**
	 * EOR Accumulator with Memory DP Indirect Long
	 * 0x47
	 */ 
function _eorAMemDPIndirectLong() {
	this.name = "EOR Accumulator with Memory DP Indirect Long"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDIRECT_LONG;
	this.mnemonic = 'EOR'
}
_eorAMemDPIndirectLong.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() ^ CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}
	
	/**
	 * EOR Accumulator with Memory Immediate
	 * 0x49
	 */ 
function _eorAMemImmediate() {
	this.name = "EOR Accumulator with Memory Immediate"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.IMMEDIATE_MEMORY;
	this.mnemonic = 'EOR'
}
_eorAMemImmediate.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() ^ CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 2;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
	
	/**
	 * EOR Accumulator with Memory Absolute
	 * 0x4D
	 */ 
function _eorAMemAbsolute() {
	this.name = "EOR Accumulator with Memory Absolute"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE;
	this.mnemonic = 'EOR'
}
_eorAMemAbsolute.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() ^ CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
	
	/**
	 * EOR Accumulator with Memory Absolute Long
	 * 0x4F
	 */ 
function _eorAMemAbsoluteLong() {
	this.name = "EOR Accumulator with Memory Absolute Long"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_LONG;
	this.mnemonic = 'EOR'
}
_eorAMemAbsoluteLong.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() ^ CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

	/**
	 * EOR Accumulator with Memory Direct Page Indirect Indexed Y
	 * 0x51
	 */ 
function _eorAMemDPIndirectY() {
	this.name = "EOR Accumulator with Memory Direct Page Indirect Indexed Y"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_Y;
	this.mnemonic = 'EOR'
}
_eorAMemDPIndirectY.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() ^ CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
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
	 * EOR Accumulator with Memory Direct Page Indirect
	 * 0x52
	 */ 
function _eorAMemDPIndirect() {
	this.name = "EOR Accumulator with Memory Direct Page Indirect"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDIRECT;
	this.mnemonic = 'EOR'
}
_eorAMemDPIndirect.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() ^ CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}

	/**
	 * EOR Accumulator with Memory Stack Relative Indirect Indexed Y
	 * 0x53
	 */ 
function _eorAMemSRIndirectY() {
	this.name = "EOR Accumulator with Memory Stack Relative Indirect Indexed Y"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.STACK_RELATIVE_INDIRECT_INDEXED_Y;
	this.mnemonic = 'EOR'
}
_eorAMemSRIndirectY.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() ^ CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 7;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
	
	/**
	 * EOR Accumulator with Memory Direct Page Indexed X
	 * 0x55
	 */ 
function _eorAMemDPIndexedX() {
	this.name = "EOR Accumulator with Memory Direct Page Indexed X"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_X;
	this.mnemonic = 'EOR'
}
_eorAMemDPIndexedX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() ^ CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}

	/**
	 * EOR Accumulator with Memory Direct Page Indirect Long Indexed Y
	 * 0x57
	 */ 
function _eorAMemDPIndirectLongY() {
	this.name = "EOR Accumulator with Memory Direct Page Indirect Long Indexed Y"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_LONG_Y;
	this.mnemonic = 'EOR'
}
_eorAMemDPIndirectLongY.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() ^ CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}

	/**
	 * EOR Accumulator with Memory Absolute Indexed Y
	 * 0x59
	 */ 
function _eorAMemAbsoluteY() {
	this.name = "EOR Accumulator with Memory Absolute Indexed Y"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_INDEXED_Y;
	this.mnemonic = 'EOR'
}
_eorAMemAbsoluteY.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() ^ CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if (CPU.indexCrossedPageBoundary)
		cycles++;
	return cycles;
}
	
	/**
	 * EOR Accumulator with Memory Absolute Indexed X
	 * 0x5D
	 */ 
function _eorAMemAbsoluteX() {
	this.name = "EOR Accumulator with Memory Absolute Indexed X"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_INDEXED_X;
	this.mnemonic = 'EOR'
}
_eorAMemAbsoluteX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() ^ CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if (CPU.indexCrossedPageBoundary)
		cycles++;
	return cycles;
}

	/**
	 * EOR Accumulator with Memory Absolute Long Indexed X
	 * 0x5F
	 */ 
function _eorAMemAbsoluteLongX() {
	this.name = "EOR Accumulator with Memory Absolute Long Indexed X"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_LONG_INDEXED_X;
	this.mnemonic = 'EOR'
}
_eorAMemAbsoluteLongX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() ^ CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

EOrAWithMemory = {
	eorAMemDPIndirectX: 		new _eorAMemDPIndirectX(),
	eorAMemStackRelative: 	new _eorAMemStackRelative(),
	eorAMemDP: 							new _eorAMemDP(),
	eorAMemDPIndirectLong: 	new _eorAMemDPIndirectLong(),
	eorAMemImmediate: 			new _eorAMemImmediate(),
	eorAMemAbsolute: 				new _eorAMemAbsolute(),
	eorAMemAbsoluteLong: 		new _eorAMemAbsoluteLong(),
	eorAMemDPIndirectY: 		new _eorAMemDPIndirectY(),
	eorAMemDPIndirect: 			new _eorAMemDPIndirect(),
	eorAMemSRIndirectY: 		new _eorAMemSRIndirectY(),
	eorAMemDPIndexedX: 			new _eorAMemDPIndexedX(),
	eorAMemDPIndirectLongY: new _eorAMemDPIndirectLongY(),
	eorAMemAbsoluteY: 			new _eorAMemAbsoluteY(),
	eorAMemAbsoluteX: 			new _eorAMemAbsoluteX(),
	eorAMemAbsoluteLongX: 	new _eorAMemAbsoluteLongX(),
}