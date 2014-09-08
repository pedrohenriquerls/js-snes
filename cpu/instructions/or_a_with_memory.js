
	/**
	 * OR Accumulator with Memory DP Indexed Indirect, X
	 * 0x01
	 */
function _orAMemDPIndirectX() {
  this.name = "Software Break"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_X;
  this.mnemonic = 'ORA'
}
_orAMemDPIndirectX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() | CPU.dataReg.getValue());
	
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
	 * OR Accumulator with Memory Stack Relative
	 * 0x03
	 */ 
function _orAMemStackRelative() {
  this.name = "OR Accumulator with Memory Stack Relative"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.STACK_RELATIVE;
  this.mnemonic = 'ORA'
}
_orAMemStackRelative.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() | CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
	
	/**
	 * OR Accumulator with Memory Direct Page
	 * 0x05
	 */ 
function _orAMemDP() {
  this.name = "OR Accumulator with Memory Direct Page"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE;
  this.mnemonic = 'ORA'
}
_orAMemDP.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() | CPU.dataReg.getValue());
	
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
	 * OR Accumulator with Memory DP Indirect Long
	 * 0x07
	 */ 
function _orAMemDPIndirectLong() {
  this.name = "OR Accumulator with Memory DP Indirect Long"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDIRECT_LONG;
  this.mnemonic = 'ORA'
}
_orAMemDPIndirectLong.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() | CPU.dataReg.getValue());
	
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
	 * OR Accumulator with Memory Immediate
	 * 0x09
	 */ 
function _orAMemImmediate() {
  this.name = "OR Accumulator with Memory Immediate"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMMEDIATE_MEMORY;
  this.mnemonic = 'ORA'
}
_orAMemImmediate.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() | CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 2;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
	
	/**
	 * OR Accumulator with Memory Absolute
	 * 0x0D
	 */ 
function _orAMemAbsolute() {
  this.name = "OR Accumulator with Memory Absolute"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE;
  this.mnemonic = 'ORA'
}
_orAMemAbsolute.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() | CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

	/**
	 * OR Accumulator with Memory Absolute Long
	 * 0x0F
	 */
function _orAMemAbsoluteLong() {
  this.name = "OR Accumulator with Memory Absolute Long"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE_LONG;
  this.mnemonic = 'ORA'
}
_orAMemAbsoluteLong.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() | CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
} 

	/**
	 * OR Accumulator with Memory Direct Page Indirect Indexed Y
	 * 0x11
	 */ 
function _orAMemDPIndirectY() {
  this.name = "OR Accumulator with Memory Direct Page Indirect Indexed Y"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_Y;
  this.mnemonic = 'ORA'
}
_orAMemDPIndirectY.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() | CPU.dataReg.getValue());
	
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
	 * OR Accumulator with Memory Direct Page Indirect
	 * 0x12
	 */ 
function _orAMemDPIndirect() {
  this.name = "OR Accumulator with Memory Direct Page Indirect"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDIRECT;
  this.mnemonic = 'ORA'
}
_orAMemDPIndirect.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() | CPU.dataReg.getValue());
	
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
	 * OR Accumulator with Memory Stack Relative Indirect Indexed Y
	 * 0x13
	 */ 
function _orAMemSRIndirectY() {
  this.name = "OR Accumulator with Memory Stack Relative Indirect Indexed Y"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.STACK_RELATIVE_INDIRECT_INDEXED_Y;
  this.mnemonic = 'ORA'
}
_orAMemSRIndirectY.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() | CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 7;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

	/**
	 * OR Accumulator with Memory Direct Page Indexed X
	 * 0x15
	 */ 
function _orAMemDPIndexedX() {
  this.name = "OR Accumulator with Memory Direct Page Indexed X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_X;
  this.mnemonic = 'ORA'
}
_orAMemDPIndexedX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() | CPU.dataReg.getValue());
	
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
	 * OR Accumulator with Memory Direct Page Indirect Long Indexed Y
	 * 0x17
	 */ 
function _orAMemDPIndirectLongY() {
  this.name = "OR Accumulator with Memory Direct Page Indirect Long Indexed Y"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_LONG_Y;
  this.mnemonic = 'ORA'
}
_orAMemDPIndirectLongY.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() | CPU.dataReg.getValue());
	
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
	 * OR Accumulator with Memory Absolute Indexed Y
	 * 0x19
	 */ 
function _orAMemAbsoluteY() {
  this.name = "OR Accumulator with Memory Absolute Indexed Y"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE_INDEXED_Y;
  this.mnemonic = 'ORA'
}
_orAMemAbsoluteY.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() | CPU.dataReg.getValue());
	
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
	 * OR Accumulator with Memory Absolute Indexed X
	 * 0x1D
	 */ 
function _orAMemAbsoluteX() {
  this.name = "OR Accumulator with Memory Absolute Indexed X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE_INDEXED_X;
  this.mnemonic = 'ORA'
}
_orAMemAbsoluteX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() | CPU.dataReg.getValue());
	
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
	 * OR Accumulator with Memory Absolute Long Indexed X
	 * 0x1F
	 */ 
function _orAMemAbsoluteLongX() {
  this.name = "OR Accumulator with Memory Absolute Long Indexed X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE_LONG_INDEXED_X;
  this.mnemonic = 'ORA'
}
_orAMemAbsoluteLongX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() | CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

OrAWithMemory = {
	orAMemDPIndirectX: 				new _orAMemDPIndirectX(),
	orAMemStackRelative: 			new _orAMemStackRelative(),
	orAMemDP: 								new _orAMemDP(),
	orAMemDPIndirectLong: 		new _orAMemDPIndirectLong(),
	orAMemImmediate: 					new _orAMemImmediate(),
	orAMemAbsolute: 					new _orAMemAbsolute(),
	orAMemAbsoluteLong: 			new _orAMemAbsoluteLong(),
	orAMemDPIndirectY: 				new _orAMemDPIndirectY(),
	orAMemDPIndirect: 				new _orAMemDPIndirect(),
	orAMemSRIndirectY: 				new _orAMemSRIndirectY(),
	orAMemDPIndexedX: 				new _orAMemDPIndexedX(),
	orAMemDPIndirectLongY: 		new _orAMemDPIndirectLongY(),
	orAMemAbsoluteY: 					new _orAMemAbsoluteY(),
	orAMemAbsoluteX: 					new _orAMemAbsoluteX(),
	orAMemAbsoluteLongX: 			new _orAMemAbsoluteLongX()
}
