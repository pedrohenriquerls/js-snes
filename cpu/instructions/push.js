
	/**
	 * Push Effective Absolute Address
	 * 0xF4
	 */ 
function _pushEffectiveAbsolute() {
  this.name = "Push Effective Absolute Address"
  this.argCount = 2;
  this.size = Size.SHORT;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'PEA'
}
_pushEffectiveAbsolute.prototype.run = function(args){
  CPU.stackPush(Size.SHORT, (args[1] << 8) + args[0]);
			
	var cycles = 5;
	return cycles;
}

	/**
	 * Push Effective Indirect Address
	 * 0xD4
	 */ 
function _pushEffectiveIndirect() {
  this.name = "Push Effective Indirect Address"
  this.argCount = 0;
  this.size = Size.SHORT;
  this.addrMode = AddressingMode.DIRECT_PAGE;
  this.mnemonic = 'PEI'
}
_pushEffectiveIndirect.prototype.run = function(args){
  CPU.loadDataRegister(addrMode, size.getRealSize(), args);
	CPU.stackPush(Size.SHORT, CPU.dataReg.getValue());
	
	var cycles = 6;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}

	/**
	 * Push Effective PC Relative Indirect Address
	 * 0x62
	 */ 
function _pushEffectivePC() {
  this.name = "Push Effective PC Relative Indirect Address"
  this.argCount = 2;
  this.size = Size.SHORT;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'PER'
}
_pushEffectivePC.prototype.run = function(args){
  CPU.stackPush(Size.SHORT, CPU.pc.getValue() + ((args[1] << 8) + args[0]));
			
	var cycles = 6;
	return cycles;
}

	/**
	 * Push Accumulator
	 * 0x48
	 */ 
function _pushAccumulator() {
  this.name = "Push Accumulator"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'PHA'
}
_pushAccumulator.prototype.run = function(args){
  CPU.stackPush(Size.MEMORY_A, CPU.a.getValue());
			
	var cycles = 3;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

	/**
	 * Push Data Bank Register
	 * 0x8B
	 */ 
function _pushDataBank() {
  this.name = "Push Data Bank Register"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'PHB'
}
_pushDataBank.prototype.run = function(args){
  CPU.stackPush(Size.BYTE, CPU.dbr.getValue());
			
	var cycles = 3;
	return cycles;
}

	/**
	 * Push Direct Page Register
	 * 0x0B
	 */ 
function _pushDirectPage() {
  this.name = "Push Direct Page Register"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'PHD'
}
_pushDirectPage.prototype.run = function(args){
  CPU.stackPush(Size.SHORT, CPU.dp.getValue());
			
	var cycles = 4;
	return cycles;
}
	/**
	 * Push Program Bank Register
	 * 0x4B
	 */ 
function _pushProgramBank() {
  this.name = "Push Program Bank Register"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'PHK'
}
_pushProgramBank.prototype.run = function(args){
 CPU.stackPush(Size.BYTE, CPU.pbr.getValue());
			
	var cycles = 3;
	return cycles;
}

	/**
	 * Push Processor Status Register
	 * 0x08
	 */ 
function _pushStatus() {
  this.name = "Push Processor Status Register"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'PHP'
}
_pushStatus.prototype.run = function(args){
 	CPU.stackPush(Size.BYTE, CPU.status.getValue());
			
	var cycles = 3;
	return cycles;
}

	/**
	 * Push Index Register X
	 * 0xDA
	 */ 
function _pushX() {
  this.name = "Push Index Register X"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'PHX'
}
_pushX.prototype.run = function(args){
 	CPU.stackPush(Size.INDEX, CPU.x.getValue());
			
	var cycles = 3;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}
	/**
	 * Push Index Register Y
	 * 0x5A
	 */ 
function _pushY() {
  this.name = "Push Index Register Y"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'PHY'
}
_pushY.prototype.run = function(args){
 	CPU.stackPush(Size.INDEX, CPU.y.getValue());
			
	var cycles = 3;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}

Push = {
	pushEffectiveAbsolute: new _pushEffectiveAbsolute(),
	pushEffectiveIndirect: new _pushEffectiveIndirect(),
	pushEffectivePC: 			 new _pushEffectivePC(),
	pushAccumulator: 			 new _pushAccumulator(),
	pushDataBank: 				 new _pushDataBank(),
	pushDirectPage: 			 new _pushDirectPage(),
	pushProgramBank: 			 new _pushProgramBank(),
	pushStatus: 					 new _pushStatus(),
	pushX: 								 new _pushX(),
	pushY: 								 new _pushY()
}