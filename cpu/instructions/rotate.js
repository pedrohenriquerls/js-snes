
	/**
	 * Rotate Memory or Accumulator Left Accumulator
	 * 0x2A
	 */ 
function _rotateLeftAccumulator() {
  this.name = "Rotate Memory or Accumulator Left Accumulator"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ACCUMULATOR;
  this.mnemonic = 'ROL'
}
_rotateLeftAccumulator.prototype.run = function(args){
  // Check top bit
	var newCarry = CPU.a.isNegative();
	CPU.a.setValue((CPU.a.getValue() << 1) + (CPU.status.isCarry() ? 1 : 0));
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry(newCarry);
	
	var cycles = 2;
	return cycles;
}

	/**
	 * Rotate Memory or Accumulator Left Absolute
	 * 0x2E
	 */ 
function _rotateLeftAbsolute() {
  this.name = "Rotate Memory or Accumulator Left Absolute"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE;
  this.mnemonic = 'ROL'
}
_rotateLeftAbsolute.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	// Check top bit
	var newCarry = CPU.dataReg.isNegative();
	CPU.dataReg.setValue((CPU.dataReg.getValue() << 1) + (CPU.status.isCarry() ? 1 : 0));
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
	 * Rotate Memory or Accumulator Left Direct Page
	 * 0x26
	 */ 
function _rotateLeftDP() {
  this.name = "Rotate Memory or Accumulator Left Direct Page"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE;
  this.mnemonic = 'ROL'
}
_rotateLeftDP.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	// Check top bit
	var newCarry = CPU.dataReg.isNegative();
	CPU.dataReg.setValue((CPU.dataReg.getValue() << 1) + (CPU.status.isCarry() ? 1 : 0));
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
	 * Rotate Memory or Accumulator Left Absolute Indexed X
	 * 0x3E
	 */ 
function _rotateLeftAbsoluteX() {
  this.name = "Rotate Memory or Accumulator Left Absolute Indexed X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE_INDEXED_X;
  this.mnemonic = 'ROL'
}
_rotateLeftAbsoluteX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	// Check top bit
	var newCarry = CPU.dataReg.isNegative();
	CPU.dataReg.setValue((CPU.dataReg.getValue() << 1) + (CPU.status.isCarry() ? 1 : 0));
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
	 * Rotate Memory or Accumulator Left Direct Page Indexed X
	 * 0x36
	 */ 
function _rotateLeftDPX() {
  this.name = "Rotate Memory or Accumulator Left Direct Page Indexed X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_X;
  this.mnemonic = 'ROL'
}
_rotateLeftDPX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	// Check top bit
	var newCarry = CPU.dataReg.isNegative();
	CPU.dataReg.setValue((CPU.dataReg.getValue() << 1) + (CPU.status.isCarry() ? 1 : 0));
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
	 * Rotate Memory or Accumulator Right Accumulator
	 * 0x6A
	 */ 
function _rotateRightAccumulator() {
  this.name = "Rotate Memory or Accumulator Right Accumulator"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ACCUMULATOR;
  this.mnemonic = 'ROR'
}
_rotateRightAccumulator.prototype.run = function(args){
  // Check top bit
	var newCarry = (CPU.a.getValue() & 0x1) != 0;
	CPU.a.setValue((CPU.a.getValue() >> 1) + (CPU.status.isCarry() ? this.size.getRealSize().topBitMask : 0));
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	CPU.status.setCarry(newCarry);
	
	var cycles = 2;
	return cycles;
}

	/**
	 * Rotate Memory or Accumulator Right Absolute
	 * 0x6E
	 */ 
function _rotateRightAbsolute() {
  this.name = "Rotate Memory or Accumulator Right Absolute"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE;
  this.mnemonic = 'ROR'
}
_rotateRightAbsolute.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	// Check top bit
	var newCarry = (CPU.dataReg.getValue() & 0x1) != 0;
	CPU.dataReg.setValue((CPU.dataReg.getValue() >> 1) + (CPU.status.isCarry() ? this.size.getRealSize().topBitMask : 0));
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
	 * Rotate Memory or Accumulator Right Direct Page
	 * 0x66
	 */ 
function _rotateRightDP() {
  this.name = "Rotate Memory or Accumulator Right Direct Page"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE;
  this.mnemonic = 'ROR'
}
_rotateRightDP.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	// Check top bit
	var newCarry = (CPU.dataReg.getValue() & 0x1) != 0;
	CPU.dataReg.setValue((CPU.dataReg.getValue() >> 1) + (CPU.status.isCarry() ? this.size.getRealSize().topBitMask : 0));
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
	 * Rotate Memory or Accumulator Right Absolute Indexed X
	 * 0x7E
	 */ 
function _rotateRightAbsoluteX() {
  this.name = "Rotate Memory or Accumulator Right Absolute Indexed X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE_INDEXED_X;
  this.mnemonic = 'ROR'
}
_rotateRightAbsoluteX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	// Check top bit
	var newCarry = (CPU.dataReg.getValue() & 0x1) != 0;
	CPU.dataReg.setValue((CPU.dataReg.getValue() >> 1) + (CPU.status.isCarry() ? this.size.getRealSize().topBitMask : 0));
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
	 * Rotate Memory or Accumulator Right Direct Page Indexed X
	 * 0x76
	 */ 
function _rotateRightDPX() {
  this.name = "Rotate Memory or Accumulator Right Direct Page Indexed X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_X;
  this.mnemonic = 'ROR'
}
_rotateRightDPX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	// Check top bit
	var newCarry = (CPU.dataReg.getValue() & 0x1) != 0;
	CPU.dataReg.setValue((CPU.dataReg.getValue() >> 1) + (CPU.status.isCarry() ? this.size.getRealSize().topBitMask : 0));
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

Rotate = {
	rotateLeftAccumulator: 	new _rotateLeftAccumulator(),
	rotateLeftAbsolute: 		new _rotateLeftAbsolute(),
	rotateLeftDP: 					new _rotateLeftDP(),
	rotateLeftAbsoluteX: 		new _rotateLeftAbsoluteX(),
	rotateLeftDPX: 					new _rotateLeftDPX(),
	rotateRightAccumulator: new _rotateRightAccumulator(),
	rotateRightAbsolute: 		new _rotateRightAbsolute(),
	rotateRightDP: 					new _rotateRightDP(),
	rotateRightAbsoluteX: 	new _rotateRightAbsoluteX(),
	rotateRightDPX: 				new _rotateRightDPX()
}
