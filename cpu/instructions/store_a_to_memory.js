
	/**
	 * Save Accumulator To Memory Direct Page Indexed Indirect X
	 * 0x81
	 */ 
function _saveADPIndexedIndirectX() {
  this.name = "Save Accumulator To Memory Direct Page Indexed Indirect X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_X;
  this.mnemonic = 'STA'
}
_saveADPIndexedIndirectX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
  CPU.dataReg.setValue(CPU.a.getValue());
	CPU.saveDataReg();
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}

	/**
	 * Save Accumulator to Memory Stack Relative
	 * 0x83
	 */ 
function _saveAStackRelative() {
  this.name = "Save Accumulator to Memory Stack Relative"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.STACK_RELATIVE;
  this.mnemonic = 'STA'
}
_saveADPIndexedIndirectX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
  CPU.dataReg.setValue(CPU.a.getValue());
	CPU.saveDataReg();
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

	/**
	 * Save Accumulator to Memory Direct Page
	 * 0x85
	 */ 
function _saveADirectPage() {
  this.name = "Save Accumulator to Memory Direct Page"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE;
  this.mnemonic = 'STA'
}
_saveADirectPage.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
  CPU.dataReg.setValue(CPU.a.getValue());
	CPU.saveDataReg();
	
	var cycles = 3;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}

	/**
	 * Save Accumulator to Memory Direct Page Indirect Long
	 * 0x87
	 */ 
function _saveADPIndirectLong() {
  this.name = "Save Accumulator to Memory Direct Page Indirect Long"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDIRECT_LONG;
  this.mnemonic = 'STA'
}
_saveADPIndirectLong.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
  CPU.dataReg.setValue(CPU.a.getValue());
	CPU.saveDataReg();
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}

	/**
	 * Save Accumulator to Memory Absolute
	 * 0x8D
	 */ 
function _saveAAbsolute() {
  this.name = "Save Accumulator to Memory Absolute"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE;
  this.mnemonic = 'STA'
}
_saveAAbsolute.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
  CPU.dataReg.setValue(CPU.a.getValue());
	CPU.saveDataReg();
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
	
	/**
	 * Save Accumulator to Memory Absolute Long
	 * 0x8F
	 */ 
function _saveAAbsoluteLong() {
  this.name = "Save Accumulator to Memory Absolute Long"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE_LONG;
  this.mnemonic = 'STA'
}
_saveAAbsoluteLong.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
  CPU.dataReg.setValue(CPU.a.getValue());
	CPU.saveDataReg();
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
	/**
	 * Save Accumulator to Memory Direct Page Indirect Indexed Y
	 * 0x91
	 */ 
function _saveADPIndirectIndexedY() {
  this.name = "Save Accumulator to Memory Direct Page Indirect Indexed Y"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_Y;
  this.mnemonic = 'STA'
}
_saveADPIndirectIndexedY.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
  CPU.dataReg.setValue(CPU.a.getValue());
	CPU.saveDataReg();
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}

	/**
	 * Save Accumulator to Memory Direct Page Indirect
	 * 0x92
	 */ 
function _saveADPIndirect() {
  this.name = "Save Accumulator to Memory Direct Page Indirect"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDIRECT;
  this.mnemonic = 'STA'
}
_saveADPIndirect.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
  CPU.dataReg.setValue(CPU.a.getValue());
	CPU.saveDataReg();
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}

	/**
	 * Save Accumulator to Memory Stack Relative Indirect Indexed Y
	 * 0x93
	 */ 
function _saveASRIndirectIndexedY() {
  this.name = "Save Accumulator to Memory Stack Relative Indirect Indexed Y"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.STACK_RELATIVE_INDIRECT_INDEXED_Y;
  this.mnemonic = 'STA'
}
_saveASRIndirectIndexedY.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
  CPU.dataReg.setValue(CPU.a.getValue());
	CPU.saveDataReg();
	
	var cycles = 7;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

	/**
	 * Save Accumulator to Memory Direct Page Indexed X
	 * 0x95
	 */ 
function _saveADirectPageX() {
  this.name = "Save Accumulator to Memory Direct Page Indexed X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_X;
  this.mnemonic = 'STA'
}
_saveADirectPageX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
  CPU.dataReg.setValue(CPU.a.getValue());
	CPU.saveDataReg();
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}

	/**
	 * Save Accumulator to Memory Direct Page Indirect Long Indexed Y
	 * 0x97
	 */ 
function _saveADPIndirectLongIndexedY() {
  this.name = "Save Accumulator to Memory Direct Page Indirect Long Indexed Y"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_LONG_Y;
  this.mnemonic = 'STA'
}
_saveADPIndirectLongIndexedY.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
  CPU.dataReg.setValue(CPU.a.getValue());
	CPU.saveDataReg();
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}

	/**
	 * Save Accumulator to Memory Absolute Indexed Y
	 * 0x99
	 */ 
function _saveAAbsoluteIndexedY() {
  this.name = "Save Accumulator to Memory Absolute Indexed Y"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE_INDEXED_Y;
  this.mnemonic = 'STA'
}
_saveAAbsoluteIndexedY.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
  CPU.dataReg.setValue(CPU.a.getValue());
	CPU.saveDataReg();
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

	/**
	 * Save Accumulator to Memory Absolute Indexed X
	 * 0x9D
	 */ 
function _saveAAbsoluteIndexedX() {
  this.name = "Save Accumulator to Memory Absolute Indexed X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE_INDEXED_X;
  this.mnemonic = 'STA'
}
_saveAAbsoluteIndexedX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
  CPU.dataReg.setValue(CPU.a.getValue());
	CPU.saveDataReg();
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

	/**
	 * Save Accumulator to Memory Absolute Long Indexed X
	 * 0x9F
	 */ 
function _saveAAbsoluteLongIndexedX() {
  this.name = "Save Accumulator to Memory Absolute Long Indexed X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE_LONG_INDEXED_X;
  this.mnemonic = 'STA'
}
_saveAAbsoluteLongIndexedX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
  CPU.dataReg.setValue(CPU.a.getValue());
	CPU.saveDataReg();
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

StoreAToMemory = {
	saveADPIndexedIndirectX: 		 new _saveADPIndexedIndirectX(),
	saveAStackRelative: 				 new _saveAStackRelative(),
	saveADirectPage: 						 new _saveADirectPage(),
	saveADPIndirectLong: 				 new _saveADPIndirectLong(),
	saveAAbsolute: 							 new _saveAAbsolute(),
	saveAAbsoluteLong: 					 new _saveAAbsoluteLong(),
	saveADPIndirect: 						 new _saveADPIndirect(),
	saveASRIndirectIndexedY: 		 new _saveASRIndirectIndexedY(),
	saveADirectPageX: 					 new _saveADirectPageX(),
	saveADPIndirectLongIndexedY: new _saveADPIndirectLongIndexedY(),
	saveAAbsoluteIndexedY: 			 new _saveAAbsoluteIndexedY(),
	saveAAbsoluteIndexedX: 			 new _saveAAbsoluteIndexedX(),
	saveAAbsoluteLongIndexedX: 	 new _saveAAbsoluteLongIndexedX()
}
