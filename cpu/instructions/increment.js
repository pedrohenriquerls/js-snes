	/**
	 * Increment Accumulator
	 * 0x1A
	 */ 

function _incAccumulator() {
    this.name = "Increment Accumulator"
    this.argCount = 0;
    this.size = Size.MEMORY_A;
    this.addrMode = AddressingMode.ACCUMULATOR;
    this.mnemonic = 'INC'
}
_incAccumulator.prototype.run = function(args){
    CPU.a.add(1);
			
		CPU.status.setNegative(CPU.a.isNegative());
		CPU.status.setZero(CPU.a.getValue() == 0);
		
		var cycles = 2;
    return cycles;
}

	/**
	 * Increment Direct Page
	 * 0xE6
	 */ 
function _incDirectPage() {
    this.name = "Increment Direct Page"
    this.argCount = 0;
    this.size = Size.MEMORY_A;
    this.addrMode = AddressingMode.DIRECT_PAGE;
    this.mnemonic = 'INC'
}
_incDirectPage.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.dataReg.add(1);
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
	 * Increment Absolute
	 * 0xEE
	 */
function _incAbsolute() {
    this.name = "Increment Absolute"
    this.argCount = 0;
    this.size = Size.MEMORY_A;
    this.addrMode = AddressingMode.ABSOLUTE;
    this.mnemonic = 'INC'
}
_incAbsolute.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.dataReg.add(1);
	CPU.saveDataReg();
	
	CPU.status.setNegative(CPU.dataReg.isNegative());
	CPU.status.setZero(CPU.dataReg.getValue() == 0);
	
	var cycles = 6;
	if(!CPU.status.isMemoryAccess())
		cycles += 2;
	return cycles;
}
	
	/**
	 * Increment Direct Page Indexed, X
	 * 0xF6
	 */
function _incDirectPageX() {
  this.name = "Increment Absolute"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_X;
  this.mnemonic = 'INC'
}
_incDirectPageX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.dataReg.add(1);
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
	 * Increment Absolute Indexed, X
	 * 0xFE
	 */
function _incAbsoluteX() {
  this.name = "Increment Absolute"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE_INDEXED_X;
  this.mnemonic = 'INC'
}
_incAbsoluteX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.dataReg.add(1);
	CPU.saveDataReg();
	
	CPU.status.setNegative(CPU.dataReg.isNegative());
	CPU.status.setZero(CPU.dataReg.getValue() == 0);
	
	var cycles = 7;
	if(!CPU.status.isMemoryAccess())
		cycles += 2;
	return cycles;
}

	/**
	 * Increment Index Register X
	 * 0xE8
	 */ 
function _incX() {
  this.name = "Increment Index Register X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.ABSOLUTE_INDEXED_X;
  this.mnemonic = 'INX'
}
_incX.prototype.run = function(args){
  CPU.x.add(1);
			
	CPU.status.setNegative(CPU.x.isNegative());
	CPU.status.setZero(CPU.x.getValue() == 0);
	var cycles = 2;
	return cycles;
}

	/**
	 * Increment Index Register Y
	 * 0xC8
	 */ 
function _incY() {
  this.name = "Increment Index Register Y"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'INY'
}
_incY.prototype.run = function(args){
  CPU.y.add(1);
			
	CPU.status.setNegative(CPU.y.isNegative());
	CPU.status.setZero(CPU.y.getValue() == 0);
	
	var cycles = 2;
	return cycles;
}

Increment = {
	incAccumulator: new _incAccumulator(),
	incDirectPage: 	new _incDirectPage(),
	incAbsolute: 		new _incAbsolute(),
	incAbsoluteX: 	new _incAbsoluteX(),
	incX: 					new _incX(),
	incY: 					new _incY()
}