

	/**
	 * Shift Memory or Accumulator Left Accumulator
	 * 0x0A
	 */ 
function _shiftLeftAccumulator() {
  this.name = "Shift Memory or Accumulator Left Accumulator"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ACCUMULATOR;
  this.mnemonic = 'ASL'
}
_shiftLeftAccumulator.prototype.run = function(args){
  // Check the top bit to set the carry flag
	var newCarry = CPU.a.isNegative();
	
	CPU.a.setValue(CPU.a.getValue() << 1);
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry(newCarry);
	
	var cycles = 2;
	return cycles;
}
	
	/**
	 * Shift Memory or Accumulator Left Direct Page
	 * 0x06
	 */ 
function _shiftLeftDP() {
  this.name = "Shift Memory or Accumulator Left Direct Page"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE;
  this.mnemonic = 'ASL'
}
_shiftLeftDP.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	// Check the top bit to set the carry flag
	var newCarry = CPU.dataReg.isNegative();
	CPU.dataReg.setValue(CPU.dataReg.getValue() << 1);
	CPU.saveDataReg();
	
	CPU.status.setNegative(CPU.dataReg.isNegative());
	CPU.status.setZero(CPU.dataReg.getValue() == 0);
	CPU.status.setCarry(newCarry);
	
	var cycles = 5;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	if (!CPU.status.isMemoryAccess())
		cycles += 2;
	return cycles;
}

	/**
	 * Shift Memory or Accumulator Left Absolute
	 * 0x0E
	 */ 
function _shiftLeftAbsolute() {
  this.name = "Shift Memory or Accumulator Left Absolute"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE;
  this.mnemonic = 'ASL'
}
_shiftLeftAbsolute.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	// Check the top bit to set the carry flag
	var newCarry = CPU.dataReg.isNegative();
	CPU.dataReg.setValue(CPU.dataReg.getValue() << 1);
	CPU.saveDataReg();
	
	CPU.status.setNegative(CPU.dataReg.isNegative());
	CPU.status.setZero(CPU.dataReg.getValue() == 0);
	CPU.status.setCarry(newCarry);
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles += 2;
	return cycles;
}
	
	/**
	 * Shift Memory or Accumulator Left Absolute Indexed X
	 * 0x1E
	 */ 
function _shiftLeftAbsoluteX() {
  this.name = "Shift Memory or Accumulator Left Absolute Indexed X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE_INDEXED_X;
  this.mnemonic = 'ASL'
}
_shiftLeftAbsoluteX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	// Check the top bit to set the carry flag
	var newCarry = CPU.dataReg.isNegative();
	CPU.dataReg.setValue(CPU.dataReg.getValue() << 1);
	CPU.saveDataReg();
	
	CPU.status.setNegative(CPU.dataReg.isNegative());
	CPU.status.setZero(CPU.dataReg.getValue() == 0);
	CPU.status.setCarry(newCarry);
	
	var cycles = 7;
	if (!CPU.status.isMemoryAccess())
		cycles += 2;
	return cycles;
}	
	/**
	 * Shift Memory or Accumulator Left Direct Page Indexed X
	 * 0x16
	 */ 
function _shiftLeftDPX() {
  this.name = "Shift Memory or Accumulator Left Direct Page Indexed X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_X;
  this.mnemonic = 'ASL'
}
_shiftLeftDPX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	// Check the top bit to set the carry flag
	var newCarry = CPU.dataReg.isNegative();
	CPU.dataReg.setValue(CPU.dataReg.getValue() << 1);
	CPU.saveDataReg();
	
	CPU.status.setNegative(CPU.dataReg.isNegative());
	CPU.status.setZero(CPU.dataReg.getValue() == 0);
	CPU.status.setCarry(newCarry);
	
	var cycles = 6;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	if (!CPU.status.isMemoryAccess())
		cycles += 2;
	return cycles;
}

	/**
	 * Logical Shift Memory or Accumulator Right Accumulator
	 * 0x4A
	 */ 
function _shiftRightAccumulator() {
  this.name = "Logical Shift Memory or Accumulator Right Accumulator"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'LSR'
}
_shiftRightAccumulator.prototype.run = function(args){
  // Check top bit
	var newCarry = (CPU.a.getValue() & 0x1) != 0;
	CPU.a.setValue(CPU.a.getValue() >> 1);
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry(newCarry);
	
	var cycles = 2;
	return cycles;
}

	/**
	 * Logical Shift Memory or Accumulator Right Absolute
	 * 0x4E
	 */ 
function _shiftRightAbsolute() {
  this.name = "Logical Shift Memory or Accumulator Right Absolute"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE;
  this.mnemonic = 'LSR'
}
_shiftRightAbsolute.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	// Check top bit
	var newCarry = (CPU.dataReg.getValue() & 0x1) != 0;
	CPU.dataReg.setValue(CPU.dataReg.getValue() >> 1);
	CPU.saveDataReg();
	
	CPU.status.setNegative(CPU.dataReg.isNegative());
	CPU.status.setZero(CPU.dataReg.getValue() == 0);
	CPU.status.setCarry(newCarry);
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles += 2;
	return cycles;
}

	/**
	 * Logical Shift Memory or Accumulator Right Direct Page
	 * 0x46
	 */ 
function _shiftRightDP() {
  this.name = "Logical Shift Memory or Accumulator Right Direct Page"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE;
  this.mnemonic = 'LSR'
}
_shiftRightDP.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	// Check top bit
	var newCarry = (CPU.dataReg.getValue() & 0x1) != 0;
	CPU.dataReg.setValue(CPU.dataReg.getValue() >> 1);
	CPU.saveDataReg();
	
	CPU.status.setNegative(CPU.dataReg.isNegative());
	CPU.status.setZero(CPU.dataReg.getValue() == 0);
	CPU.status.setCarry(newCarry);
	
	var cycles = 5;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	if (!CPU.status.isMemoryAccess())
		cycles += 2;
	return cycles;
}
	
	/**
	 * Logical Shift Memory or Accumulator Right Absolute Indexed X
	 * 0x5E
	 */ 
function _shiftRightAbsoluteX() {
  this.name = "Logical Shift Memory or Accumulator Right Absolute Indexed X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE_INDEXED_X;
  this.mnemonic = 'LSR'
}
_shiftRightAbsoluteX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	// Check top bit
	var newCarry = (CPU.dataReg.getValue() & 0x1) != 0;
	CPU.dataReg.setValue(CPU.dataReg.getValue() >> 1);
	CPU.saveDataReg();
	
	CPU.status.setNegative(CPU.dataReg.isNegative());
	CPU.status.setZero(CPU.dataReg.getValue() == 0);
	CPU.status.setCarry(newCarry);
	
	var cycles = 7;
	if (!CPU.status.isMemoryAccess())
		cycles += 2;
	return cycles;
}
	
	/**
	 * Logical Shift Memory or Accumulator Right Direct Page Indexed X
	 * 0x56
	 */ 
function _shiftRightDPX() {
  this.name = "Logical Shift Memory or Accumulator Right Direct Page Indexed X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_X;
  this.mnemonic = 'LSR'
}
_shiftRightDPX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	// Check top bit
	var newCarry = (CPU.dataReg.getValue() & 0x1) != 0;
	CPU.dataReg.setValue(CPU.dataReg.getValue() >> 1);
	CPU.saveDataReg();
	
	CPU.status.setNegative(CPU.dataReg.isNegative());
	CPU.status.setZero(CPU.dataReg.getValue() == 0);
	CPU.status.setCarry(newCarry);
	
	var cycles = 6;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	if (!CPU.status.isMemoryAccess())
		cycles += 2;
	return cycles;
}

Shift = {
	shiftLeftAccumulator:  new _shiftLeftAccumulator(),
	shiftLeftDP: 					 new _shiftLeftDP(),
	shiftLeftAbsolute: 		 new _shiftLeftAbsolute(),
	shiftLeftAbsoluteX: 	 new _shiftLeftAbsoluteX(),
	shiftLeftDPX: 				 new _shiftLeftDPX(),
	shiftRightAccumulator: new _shiftRightAccumulator(),
	shiftRightAbsolute: 	 new _shiftRightAbsolute(),
	shiftRightDPX: 				 new _shiftRightDPX()
}
