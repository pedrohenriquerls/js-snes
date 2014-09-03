

	/**
	 * Load Accumulator from Memory Direct Page Indexed Indirect X
	 * 0xA1
	 */ 
function _loadADPIndexedIndirectX() {
  this.name = "Load Accumulator from Memory Direct Page Indexed Indirect X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_X;
  this.mnemonic = 'LDA'
}
_loadADPIndexedIndirectX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.dataReg.getValue());
	
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
	 * Load Accumulator from Memory Stack Relative
	 * 0xA3
	 */ 
function _loadAStackRelative() {
  this.name = "Load Accumulator from Memory Stack Relative"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.STACK_RELATIVE;
  this.mnemonic = 'LDA'
}
_loadAStackRelative.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

	/**
	 * Load Accumulator from Memory Direct Page
	 * 0xA5
	 */ 
function _loadADirectPage() {
  this.name = "Load Accumulator from Memory Direct Page"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE;
  this.mnemonic = 'LDA'
}
_loadADirectPage.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.dataReg.getValue());
	
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
	 * Load Accumulator from Memory Direct Page Indirect Long
	 * 0xA7
	 */ 
function _loadADPIndirectLong() {
  this.name = "Load Accumulator from Memory Direct Page Indirect Long"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDIRECT_LONG;
  this.mnemonic = 'LDA'
}
_loadADPIndirectLong.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.dataReg.getValue());
	
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
	 * Load Accumulator from Memory Immediate
	 * 0xA9
	 */ 
function _loadAImmediate() {
  this.name = "Load Accumulator from Memory Immediate"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMMEDIATE_MEMORY;
  this.mnemonic = 'LDA'
}
_loadAImmediate.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 2;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
	
	/**
	 * Load Accumulator from Memory Absolute
	 * 0xAD
	 */ 
function _loadAAbsolute() {
  this.name = "Load Accumulator from Memory Absolute"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE;
  this.mnemonic = 'LDA'
}
_loadAAbsolute.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

	/**
	 * Load Accumulator from Memory Absolute Long
	 * 0xAF
	 */ 
function _loadAAbsoluteLong() {
  this.name = "Load Accumulator from Memory Absolute Long"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE_LONG;
  this.mnemonic = 'LDA'
}
_loadAAbsoluteLong.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

	/**
	 * Load Accumulator from Memory Direct Page Indirect Indexed Y
	 * 0xB1
	 */ 
function _loadADPIndirectIndexedY() {
  this.name = "Load Accumulator from Memory Direct Page Indirect Indexed Y"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_Y;
  this.mnemonic = 'LDA'
}
_loadADPIndirectIndexedY.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	if (CPU.indexCrossedPageBoundary)
		cycles++;
	return cycles;
}

	/**
	 * Load Accumulator from Memory Direct Page Indirect
	 * 0xB2
	 */ 
function _loadADPIndirect() {
  this.name = "Load Accumulator from Memory Direct Page Indirect"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDIRECT;
  this.mnemonic = 'LDA'
}
_loadADPIndirect.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.dataReg.getValue());
	
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
	 * Load Accumulator from Memory Stack Relative Indirect Indexed Y
	 * 0xB3
	 */ 
function _loadASRIndirectIndexedY() {
  this.name = "Load Accumulator from Memory Stack Relative Indirect Indexed Y"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.STACK_RELATIVE_INDIRECT_INDEXED_Y;
  this.mnemonic = 'LDA'
}
_loadASRIndirectIndexedY.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 7;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
	
	/**
	 * Load Accumulator from Memory Direct Page Indexed X
	 * 0xB5
	 */ 
function _loadADirectPageX() {
  this.name = "Load Accumulator from Memory Direct Page Indexed X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_X;
  this.mnemonic = 'LDA'
}
_loadADirectPageX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.dataReg.getValue());
	
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
	 * Load Accumulator from Memory Direct Page Indirect Long Indexed Y
	 * 0xB7
	 */ 
function _loadADPIndirectLongIndexedY() {
  this.name = "Load Accumulator from Memory Direct Page Indirect Long Indexed Y"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_LONG_Y;
  this.mnemonic = 'LDA'
}
_loadADPIndirectLongIndexedY.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.dataReg.getValue());
	
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
	 * Load Accumulator from Memory Absolute Indexed Y
	 * 0xB9
	 */ 
function _loadAAbsoluteIndexedY() {
  this.name = "Load Accumulator from Memory Absolute Indexed Y"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE_INDEXED_Y;
  this.mnemonic = 'LDA'
}
_loadAAbsoluteIndexedY.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.dataReg.getValue());
	
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
	 * Load Accumulator from Memory Absolute Indexed X
	 * 0xBD
	 */ 
function _loadAAbsoluteIndexedX() {
  this.name = "Load Accumulator from Memory Absolute Indexed X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE_INDEXED_X;
  this.mnemonic = 'LDA'
}
_loadAAbsoluteIndexedX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.dataReg.getValue());
	
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
	 * Load Accumulator from Memory Absolute Long Indexed X
	 * 0xBF
	 */ 
function _loadAAbsoluteLongIndexedX() {
  this.name = "Load Accumulator from Memory Absolute Long Indexed X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE_LONG_INDEXED_X;
  this.mnemonic = 'LDA'
}
_loadAAbsoluteLongIndexedX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.a.setValue(CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

LoadAFromMemory = {
	loadADPIndexedIndirectX: 			new _loadADPIndexedIndirectX(),
	loadAStackRelative: 					new _loadAStackRelative(),
	loadADirectPage: 							new _loadADirectPage(),
	loadADPIndirectLong: 					new _loadADPIndirectLong(),
	loadAImmediate: 							new _loadAImmediate(),
	loadAAbsolute: 								new _loadAAbsolute(),
	loadAAbsoluteLong: 						new _loadAAbsoluteLong(),
	loadADPIndirectIndexedY: 			new _loadADPIndirectIndexedY(),
	loadADPIndirect: 							new _loadADPIndirect(),
	loadASRIndirectIndexedY: 			new _loadASRIndirectIndexedY(),
	loadADirectPageX: 						new _loadADirectPageX(),
	loadADPIndirectLongIndexedY:  new _loadADPIndirectLongIndexedY(),
	loadAAbsoluteIndexedY: 				new _loadAAbsoluteIndexedY(),
	loadAAbsoluteIndexedX: 				new _loadAAbsoluteIndexedX(),
	loadAAbsoluteLongIndexedX: 		new _loadAAbsoluteLongIndexedX()
}