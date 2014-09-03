

	/**
	 * Branch if Plus 0x10
	 */ 
function _branchPlus() {
	this.name = "Branch if Plus "
	this.argCount = 0;
	this.size = Size.BYTE;
	this.addrMode = AddressingMode.PROGRAM_COUNTER_RELATIVE;
	this.mnemonic = 'BPL'
}
_branchPlus.prototype.run = function(args){
	var cycles = 2;
	if (!CPU.status.isNegative()) {
		CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
		var origPC = CPU.pc.getValue();
		CPU.pc.add(CPU.dataReg.getValue());
		
		cycles++;
	}
	return cycles;
}

	/**
	 * Branch if Minus 0x30
	 */ 
function _branchMinus() {
	this.name = "Branch if Minus "
	this.argCount = 0;
	this.size = Size.BYTE;
	this.addrMode = AddressingMode.PROGRAM_COUNTER_RELATIVE;
	this.mnemonic = 'BMI'
}
_branchMinus.prototype.run = function(args){
	var cycles = 2;
	if (CPU.status.isNegative()) {
		CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
		var origPC = CPU.pc.getValue();
		CPU.pc.add(CPU.dataReg.getValue());
		
		cycles++;
	}
	return cycles;
}

	/**
	 * Branch Overflow Clear 0x50
	 */ 
function _branchOverflowClear() {
	this.name = "Branch Overflow Clear "
	this.argCount = 0;
	this.size = Size.BYTE;
	this.addrMode = AddressingMode.PROGRAM_COUNTER_RELATIVE;
	this.mnemonic = 'BVC'
}
_branchOverflowClear.prototype.run = function(args){
	var cycles = 2;
	if (CPU.status.isOverflow()) {
		CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
		var origPC = CPU.pc.getValue();
		CPU.pc.add(CPU.dataReg.getValue());
		
		cycles++;
	}
	return cycles;
}

	/**
	 * Branch Overflow Set 0x70
	 */ 
function _branchOverflowSet() {
	this.name = "Branch Overflow Clear "
	this.argCount = 0;
	this.size = Size.BYTE;
	this.addrMode = AddressingMode.PROGRAM_COUNTER_RELATIVE;
	this.mnemonic = 'BVC'
}
_branchOverflowSet.prototype.run = function(args){
	var cycles = 2;
	if (CPU.status.isOverflow()) {
		CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
		var origPC = CPU.pc.getValue();
		CPU.pc.add(CPU.dataReg.getValue());
		
		cycles++;
	}
	return cycles;
}

	/**
	 * Branch Always 0x80
	 */ 
function _branchAlways() {
	this.name = "Branch Always"
	this.argCount = 0;
	this.size = Size.BYTE;
	this.addrMode = AddressingMode.PROGRAM_COUNTER_RELATIVE;
	this.mnemonic = 'BRA'
}
_branchAlways.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var cycles = 3;
	var origPC = CPU.pc.getValue();
	CPU.pc.add(CPU.dataReg.getValue());
	
	return cycles;
}

	/**
	 * Branch Always (Long) 0x82
	 */ 
function _branchAlwaysLong() {
	this.name = "Branch Always"
	this.argCount = 0;
	this.size = Size.SHORT;
	this.addrMode = AddressingMode.PROGRAM_COUNTER_RELATIVE_LONG;
	this.mnemonic = 'BRL'
}
_branchAlwaysLong.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var cycles = 4;
	CPU.pc.add(CPU.dataReg.getValue());
	return cycles;
}
	/**
	 * Branch if Carry Clear 0x90
	 */ 
function _branchCarryClear() {
	this.name = "Branch if Carry Clear "
	this.argCount = 0;
	this.size = Size.BYTE;
	this.addrMode = AddressingMode.PROGRAM_COUNTER_RELATIVE;
	this.mnemonic = 'BCC'
}
_branchCarryClear.prototype.run = function(args){
	var cycles = 2;
	if (!CPU.status.isCarry()) {
		CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
		var origPC = CPU.pc.getValue();
		CPU.pc.add(CPU.dataReg.getValue());
		
		cycles++;
	}
	return cycles;
}

	/**
	 * Branch if Carry Set 0xB0
	 */ 
function _branchCarrySet() {
	this.name = "Branch if Carry Set "
	this.argCount = 0;
	this.size = Size.BYTE;
	this.addrMode = AddressingMode.PROGRAM_COUNTER_RELATIVE;
	this.mnemonic = 'BCS'
}
_branchCarrySet.prototype.run = function(args){
	var cycles = 2;
	if (!CPU.status.isCarry()) {
		CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
		var origPC = CPU.pc.getValue();
		CPU.pc.add(CPU.dataReg.getValue());
		
		cycles++;
	}
	return cycles;
}

	/**
	 * Branch if Not Equal 0xD0
	 */ 
function _branchNotEqual() {
	this.name = "Branch if Not Equal"
	this.argCount = 0;
	this.size = Size.BYTE;
	this.addrMode = AddressingMode.PROGRAM_COUNTER_RELATIVE;
	this.mnemonic = 'BNE'
}
_branchNotEqual.prototype.run = function(args){
	var cycles = 2;
	if (!CPU.status.isZero()) {
		CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
		var origPC = CPU.pc.getValue();
		CPU.pc.add(CPU.dataReg.getValue());
		
		cycles++;
	}
	return cycles;
}

	/**
	 * Branch if Equal 0xF0
	 */ 
function _branchEqual() {
	this.name = "Branch if Equal"
	this.argCount = 0;
	this.size = Size.BYTE;
	this.addrMode = AddressingMode.PROGRAM_COUNTER_RELATIVE;
	this.mnemonic = 'BEQ'
}
_branchEqual.prototype.run = function(args){
	var cycles = 2;
	if (CPU.status.isZero()) {
		CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
		var origPC = CPU.pc.getValue();
		CPU.pc.add(CPU.dataReg.getValue());
		
		cycles++;
	}
	return cycles;
}

Branching = {
	branchPlus: 					new _branchPlus(),
	branchMinus: 					new _branchMinus(),
	branchOverflowClear: 	new _branchOverflowClear(),
	branchOverflowSet: 		new _branchOverflowSet(),
	branchAlways: 				new _branchAlways(),
	branchAlwaysLong: 		new _branchAlwaysLong(),
	branchCarryClear: 		new _branchCarryClear(),
	branchCarrySet: 			new _branchCarrySet(),
	branchNotEqual: 			new _branchNotEqual(),
	branchEqual: 					new _branchEqual()
}