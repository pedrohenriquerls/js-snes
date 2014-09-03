
	/**
	 * Decrement Accumulator
	 * 0x3A
	 */ 
function _decAccumulator() {
	this.name = "Decrement Accumulator"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ACCUMULATOR;
	this.mnemonic = 'DEC'
}
_decAccumulator.prototype.run = function(args){
	CPU.a.subtract(1);
			
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 2;
	return cycles;
}
	
	/**
	 * Decrement Direct Page
	 * 0xC6
	 */ 
function _decDirectPage() {
	this.name = "Decrement Direct Page"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE;
	this.mnemonic = 'DEC'
}
_decDirectPage.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.dataReg.subtract(1);
	CPU.saveDataReg();
	
	CPU.status.setNegative(CPU.dataReg.isNegative());
	CPU.status.setZero(CPU.dataReg.getValue() == 0);
	
	var cycles = 5;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	if(!CPU.status.isMemoryAccess())
		cycles += 2;
	return cycles;
}
	
	/**
	 * Decrement Absolute
	 * 0xCE
	 */ 
function _decAbsolute() {
	this.name = "Decrement Absolute"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE;
	this.mnemonic = 'DEC'
}
_decAbsolute.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.dataReg.subtract(1);
	CPU.saveDataReg();
	
	CPU.status.setNegative(CPU.dataReg.isNegative());
	CPU.status.setZero(CPU.dataReg.getValue() == 0);
	
	var cycles = 6;
	if(!CPU.status.isMemoryAccess())
		cycles += 2;
	return cycles;
}

	/**
	 * Decrement Direct Page Indexed, X
	 * 0xD6
	 */
function _decDirectPageX() {
	this.name = "Decrement Absolute"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_X;
	this.mnemonic = 'DEC'
}
_decDirectPageX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.dataReg.subtract(1);
	CPU.saveDataReg();
	
	CPU.status.setNegative(CPU.dataReg.isNegative());
	CPU.status.setZero(CPU.dataReg.getValue() == 0);
	
	var cycles = 6;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	if(!CPU.status.isMemoryAccess())
		cycles += 2;
	return cycles;
}

	/**
	 * Decrement Absolute Indexed, X
	 * 0xDE
	 */
function _decAbsoluteX() {
	this.name = "Decrement Absolute"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_INDEXED_X;
	this.mnemonic = 'DEC'
}
_decAbsoluteX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.dataReg.subtract(1);
	CPU.saveDataReg();
	
	CPU.status.setNegative(CPU.dataReg.isNegative());
	CPU.status.setZero(CPU.dataReg.getValue() == 0);
	
	var cycles = 7;
	if(!CPU.status.isMemoryAccess())
		cycles += 2;
	return cycles;
}
	
	/**
	 * Decrement Index Register X
	 * 0xCA
	 */ 
function _decX() {
	this.name = "Decrement Index Register X"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.IMPLIED;
	this.mnemonic = 'DEX'
}
_decX.prototype.run = function(args){
	CPU.x.subtract(1);
			
	CPU.status.setNegative(CPU.x.isNegative());
	CPU.status.setZero(CPU.x.getValue() == 0);
	
	var cycles = 2;
	return cycles;
}
	
	/**
	 * Decrement Index Register Y
	 * 0x88
	 */ 
function _decY() {
	this.name = "Decrement Index Register Y"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.IMPLIED;
	this.mnemonic = 'DEY'
}
_decY.prototype.run = function(args){
	CPU.y.subtract(1);
			
	CPU.status.setNegative(CPU.y.isNegative());
	CPU.status.setZero(CPU.y.getValue() == 0);
	
	var cycles = 2;
	return cycles;
}

Decrement = {
	decAccumulator: 	new _decAccumulator(),
	decDirectPage: 		new _decDirectPage(),
	decAbsolute: 			new _decAbsolute(),
	decDirectPageX: 	new _decDirectPageX(),
	decAbsoluteX: 		new _decAbsoluteX(),
	decX: 						new _decX(),
	decY: 						new _decY()
}