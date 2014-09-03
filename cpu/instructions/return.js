
	/**
	 * Return from Interrupt
	 * 0x40
	 */ 
function _returnFromInterrupt() {
  this.name = "Return from Interrupt"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'RTI'
}
_returnFromInterrupt.prototype.run = function(args){
  CPU.status.setValue(CPU.stackPull(Size.BYTE));
	CPU.pc.setValue(CPU.stackPull(Size.SHORT));
	if (!CPU.emulationMode)
		CPU.pbr.setValue(CPU.stackPull(Size.BYTE));
	
	var cycles = 6;
	if (!CPU.emulationMode)
		cycles++;
	return cycles;
}

	/**
	 * Return from Subroutine Long
	 * 0x6B
	 */ 
function _returnFromSubroutineLong() {
  this.name = "Return from Subroutine Long"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'RTL'
}
_returnFromSubroutineLong.prototype.run = function(args){
  CPU.pc.setValue(CPU.stackPull(Size.SHORT) + 1);
	CPU.pbr.setValue(CPU.stackPull(Size.BYTE));
	
	var cycles = 6;
	return cycles;
}

	/**
	 * Return from Subroutine
	 * 0x60
	 */ 
function _returnFromSubroutine() {
  this.name = "Return from Subroutine"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'RTS'
}
_returnFromSubroutine.prototype.run = function(args){
  CPU.pc.setValue(CPU.stackPull(Size.SHORT) + 1);
			
	var cycles = 6;
	return cycles;
}
Return = {
	returnFromInterrupt: 		 	new _returnFromInterrupt(),
	returnFromSubroutineLong: new _returnFromSubroutineLong(),
	returnFromSubroutine: 		new _returnFromSubroutine()
}