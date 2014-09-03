
	/**
	 * Software Break
	 * 0x00
	 */ 
function _softwareBreak() {
  this.name = "Software Break"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'BRK'
}
_softwareBreak.prototype.run = function(args){
  CPU.stackPush(Size.BYTE, CPU.pbr.getValue());
	CPU.pc.add(2);
	CPU.stackPush(Size.SHORT, CPU.pc.getValue());
	CPU.stackPush(Size.BYTE, CPU.status.getValue());
	CPU.status.setIrqDisable(true);
	CPU.pbr.setValue(0);
	CPU.pc.setValue(Core.mem.get(Size.SHORT, 0, 0xFFE6));
	
	var cycles = 9;
	if (!CPU.emulationMode)
		cycles++;
	return cycles;
}
	
	/**
	 * NOP - No operation
	 * 0xEA
	 */
function _nop() {
  this.name = "Nothing"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'NOP'
}
_nop.prototype.run = function(args){
  // Does nothing
	var cycles = 2;
	return cycles;
}

	/**
	 * WDM - Reserved for Future Expansion
	 * 0x42
	 */
function _wdm() {
  this.name = "Nothing for when..."
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'WDM'
}
_wdm.prototype.run = function(args){
  return 0;
}
	
	/**
	 * Exchange the B and A accumulators
	 * 0xEB
	 */ 
function _exchangeBA() {
  this.name = "Exchange the B and A accumulators"
  this.argCount = 0;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'XBA'
}
_exchangeBA.prototype.run = function(args){
  var b = (CPU.a.getRealValue() & 0xFF00) >> 8;
	var a = (CPU.a.getRealValue() & 0x00FF);
	CPU.a.setRealValue((a << 8) + b);
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue()==0);
	var cycles = 3;
	return cycles;
}

	/**
	 * Co-Processor Enable
	 * 0x02
	 */
function _coprocessorEnable() {
  this.name = "Enable Co-Processor"
  this.argCount = 1;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'COP'
}
_coprocessorEnable.prototype.run = function(args){
  //var signatureByte = args[0];
	var cycles;
	if (CPU.emulationMode) {
		CPU.pc.add(2);
		CPU.stackPush(CPU.pc.getSize(), CPU.pc.getValue());
		CPU.stackPush(Size.BYTE,CPU.status.getValue());
		CPU.status.setIrqDisable(true);
		CPU.pc.setValue(Core.mem.read(Size.SHORT, 0x00, 0xFFF4));
		CPU.status.setDecimalMode(false);
		cycles = 7;
	} else {
		CPU.stackPush(CPU.pbr.getSize(), CPU.pbr.getValue());
		CPU.pc.add(2);
		CPU.stackPush(CPU.pc.getSize(), CPU.pc.getValue());
		CPU.stackPush(Size.BYTE,CPU.status.getValue());
		CPU.status.setIrqDisable(true);
		CPU.pbr.setValue(0x00);
		CPU.pc.setValue(Core.mem.read(Size.SHORT, 0x00, 0xFFE4));
		CPU.status.setDecimalMode(false);
		cycles = 8;
	}
	// Code to start a co-processor
	return cycles;
}
	
	/**
	 * Stop Processor
	 * 0xDB
	 */
function _stopProcessor() {
  this.name = "Stop Processor"
  this.argCount = 1;
  this.size = Size.MEMORY_A;
  this.addrMode = AddressingMode.IMPLIED;
  this.mnemonic = 'STP'
}
_stopProcessor.prototype.run = function(args){
  CPU.emulationMode = true;
	CPU.dp.setValue(0);
	//stack high set to 1?
	CPU.status.setIndexRegister(true);
	Core.running = false;
	return 3;
}

Misc = {
	softwareBreak: 		 new _softwareBreak(),
	nop: 							 new _nop(),
	wdm: 							 new _wdm(),
	exchangeBA: 			 new _exchangeBA(),
	coprocessorEnable: new _coprocessorEnable(),
	stopProcessor: 		 new _stopProcessor()
}