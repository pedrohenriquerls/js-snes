
	/**
	 * Pull Accumulator
	 * 0x68
	 */ 
function _pullAccumulator() {
  this.name = "Pull Accumulator"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'PLA'
}
_pullAccumulator.prototype.run = function(args){
  CPU.a.setValue(CPU.stackPull(Size.MEMORY_A.getRealSize()));
			
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
	
	/**
	 * Pull Data Bank Register
	 * 0xAB
	 */ 
function _pullDataBank() {
  this.name = "Pull Data Bank Register"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'PLB'
}
_pullDataBank.prototype.run = function(args){
  CPU.dbr.setValue(CPU.stackPull(Size.BYTE));
			
	CPU.status.setNegative(CPU.dbr.isNegative());
	CPU.status.setZero(CPU.dbr.getValue() == 0);
	
	var cycles = 4;
	return cycles;
}
	
	/**
	 * Pull Direct Page Register
	 * 0x2B
	 */ 
function _pullDirectPage() {
  this.name = "Pull Direct Page Register"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'PLD'
}
_pullDirectPage.prototype.run = function(args){
  CPU.dp.setValue(CPU.stackPull(Size.SHORT));
			
	CPU.status.setNegative(CPU.dp.isNegative());
	CPU.status.setZero(CPU.dp.getValue() == 0);
	
	var cycles = 5;
	return cycles;
}
	
	/**
	 * Pull Processor Status Register
	 * 0x28
	 */ 
function _pullStatus() {
  this.name = "Pull Processor Status Register"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'PLP'
}
_pullStatus.prototype.run = function(args){
  CPU.status.setValue(CPU.stackPull(Size.BYTE));
			
	var cycles = 4;
	return cycles;
}
	/**
	 * Pull Index Register X
	 * 0xFA
	 */ 
function _pullX() {
  this.name = "Pull Index Register X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'PLX'
}
_pullX.prototype.run = function(args){
  CPU.x.setValue(CPU.stackPull(Size.INDEX.getRealSize()));
			
	CPU.status.setNegative(CPU.x.isNegative());
	CPU.status.setZero(CPU.x.getValue() == 0);
	
	var cycles = 4;
	if (!CPU.status.isIndexRegister())
		cycles+=2;
	return cycles;
}

	/**
	 * Pull Index Register Y
	 * 0x7A
	 */ 
function _pullY() {
  this.name = "Pull Index Register Y"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'PLY'
}
_pullY.prototype.run = function(args){
  CPU.y.setValue(CPU.stackPull(Size.INDEX.getRealSize()));
			
	CPU.status.setNegative(CPU.y.isNegative());
	CPU.status.setZero(CPU.y.getValue() == 0);
	
	var cycles = 4;
	if (!CPU.status.isIndexRegister())
		cycles+=2;
	return cycles;
}

Pull = {
	pullAccumulator:  new _pullAccumulator(),
	pullDataBank: 		new _pullDataBank(),
	pullDirectPage: 	new _pullDirectPage(),
	pullStatus: 			new _pullStatus(),
	pullX: 						new _pullX(),
	pullY: 						new _pullY()
}