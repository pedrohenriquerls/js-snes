
	/**
	 * AND Accumulator with Memory DP Indexed Indirect, X
	 * 0x21
	 */
function _andAMemDPIndirectX(){
	this.name = "AND Accumulator with Memory DP Indexed Indirect, X"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_X;
	this.mnemonic = 'AND'
}
_andAMemDPIndirectX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() & CPU.dataReg.getValue());
	
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
	 * AND Accumulator with Memory Stack Relative
	 * 0x23
	 */ 
function _andAMemStackRelative(){
	this.name = "AND Accumulator with Memory Stack Relative"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.STACK_RELATIVE;
	this.mnemonic = 'AND'
}
_andAMemStackRelative.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() & CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
	
	/**
	 * AND Accumulator with Memory Direct Page
	 * 0x25
	 */ 
function _andAMemDP(){
	this.name = "AND Accumulator with Memory Direct Page"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE;
	this.mnemonic = 'AND'
}
_andAMemDP.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() & CPU.dataReg.getValue());
	
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
	 * AND Accumulator with Memory DP Indirect Long
	 * 0x27
	 */ 

function _andAMemDPIndirectLong(){
	this.name = "AND Accumulator with Memory DP Indirect Long"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDIRECT_LONG;
	this.mnemonic = 'AND'
}
_andAMemDPIndirectLong.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() & CPU.dataReg.getValue());
	
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
	 * AND Accumulator with Memory Immediate
	 * 0x29
	 */ 
function _andAMemImmediate(){
	this.name = "AND Accumulator with Memory DP Indirect Long"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.IMMEDIATE_MEMORY;
	this.mnemonic = 'AND'
}
_andAMemImmediate.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() & CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 2;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
	
	/**
	 * AND Accumulator with Memory Absolute
	 * 0x2D
	 */ 
function _andAMemAbsolute(){
	this.name = "AND Accumulator with Memory Absolute"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE;
	this.mnemonic = 'AND'
}
_andAMemAbsolute.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() & CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
	
	/**
	 * AND Accumulator with Memory Absolute Long
	 * 0x2F
	 */ 
function _andAMemAbsoluteLong(){
	this.name = "AND Accumulator with Memory Absolute Long"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_LONG;
	this.mnemonic = 'AND'
}
_andAMemAbsoluteLong.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() & CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
	
	/**
	 * AND Accumulator with Memory Direct Page Indirect Indexed Y
	 * 0x31
	 */ 
function _andAMemDPIndirectY(){
	this.name = "AND Accumulator with Memory Direct Page Indirect Indexed Y"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_Y;
	this.mnemonic = 'AND'
}
_andAMemDPIndirectY.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() & CPU.dataReg.getValue());
	
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
	 * AND Accumulator with Memory Direct Page Indirect
	 * 0x32
	 */ 
function _andAMemDPIndirect(){
	this.name = "AND Accumulator with Memory Direct Page Indirect"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDIRECT;
	this.mnemonic = 'AND'
}
_andAMemDPIndirect.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() & CPU.dataReg.getValue());
	
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
	 * AND Accumulator with Memory Stack Relative Indirect Indexed Y
	 * 0x33
	 */ 
function _andAMemSRIndirectY(){
	this.name = "AND Accumulator with Memory Stack Relative Indirect Indexed Y"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.STACK_RELATIVE_INDIRECT_INDEXED_Y;
	this.mnemonic = 'AND'
}
_andAMemSRIndirectY.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() & CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 7;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
	
	/**
	 * AND Accumulator with Memory Direct Page Indexed X
	 * 0x35
	 */ 
function _andAMemDPIndexedX(){
	this.name = "AND Accumulator with Memory Direct Page Indexed X"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_X;
	this.mnemonic = 'AND'
}
_andAMemDPIndexedX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() & CPU.dataReg.getValue());
	
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
	 * AND Accumulator with Memory Direct Page Indirect Long Indexed Y
	 * 0x37
	 */ 
function _andAMemDPIndirectLongY(){
	this.name = "AND Accumulator with Memory Direct Page Indirect Long Indexed Y"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_LONG_Y;
	this.mnemonic = 'AND'
}
_andAMemDPIndirectLongY.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() & CPU.dataReg.getValue());
	
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
	 * AND Accumulator with Memory Absolute Indexed Y
	 * 0x39
	 */ 
function _andAMemAbsoluteY(){
	this.name = "AND Accumulator with Memory Absolute Indexed Y"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_INDEXED_Y;
	this.mnemonic = 'AND'
}
_andAMemAbsoluteY.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() & CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if (CPU.indexCrossedPageBoundary)
		cycles++;
	return cycles;
}

	/**
	 * AND Accumulator with Memory Absolute Indexed X
	 * 0x3D
	 */ 
function _andAMemAbsoluteX(){
	this.name = "AND Accumulator with Memory Absolute Indexed X"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_INDEXED_X;
	this.mnemonic = 'AND'
}
_andAMemAbsoluteX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() & CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if (CPU.indexCrossedPageBoundary)
		cycles++;
	return cycles;
}
	
	/**
	 * AND Accumulator with Memory Absolute Long Indexed X
	 * 0x3F
	 */ 
function _andAMemAbsoluteLongX(){
	this.name = "AND Accumulator with Memory Absolute Long Indexed X"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_LONG_INDEXED_X;
	this.mnemonic = 'AND'
}
_andAMemAbsoluteLongX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.a.getValue() & CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

AndAWithMemory = {
	andAMemDPIndirectX: 				new _andAMemDPIndirectX(),
	andAMemStackRelative: 			new _andAMemStackRelative(),
	andAMemDP: 									new _andAMemDP(),
	andAMemDPIndirectLong: 			new _andAMemDPIndirectLong(),
	andAMemImmediate: 					new _andAMemImmediate(),
	andAMemAbsolute: 						new _andAMemAbsolute(),
	andAMemAbsoluteLong: 				new _andAMemAbsoluteLong(),
	andAMemDPIndirectY: 				new _andAMemDPIndirectY(),
	andAMemDPIndirect: 					new _andAMemDPIndirect(),
	andAMemSRIndirectY: 				new _andAMemSRIndirectY(),
	andAMemDPIndexedX: 					new _andAMemDPIndexedX(),
	andAMemDPIndirectLongY: 		new _andAMemDPIndirectLongY(),
	andAMemAbsoluteY: 					new _andAMemAbsoluteY(),
	andAMemAbsoluteX: 					new _andAMemAbsoluteX(),
	andAMemAbsoluteLongX: 			new _andAMemAbsoluteLongX()
}