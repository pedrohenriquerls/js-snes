
	/**
	 * Compare Y with Memory Immediate
	 * 0xC0
	 */ 
function _cmpYImmediate() {
	this.name = "Compare Y with Memory Immediate"
	this.argCount = 0;
	this.size = Size.INDEX;
	this.addrMode = AddressingMode.IMMEDIATE_INDEX;
	this.mnemonic = 'CPY'
}
_cmpYImmediate.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var newVal = Util.limit(this.size.getRealSize(), CPU.y.getValue() - CPU.dataReg.getValue());
	
	CPU.status.setNegative((newVal & this.size.getRealSize().topBitMask) != 0);
	CPU.status.setZero(newVal == 0);
	CPU.status.setCarry(CPU.y.getValue() >= CPU.dataReg.getValue());
	
	var cycles = 2;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}

	/**
	 * Compare Y with Memory Direct Page
	 * 0xC4
	 */ 
function _cmpYDP() {
	this.name = "Compare Y with Memory Direct Page"
	this.argCount = 0;
	this.size = Size.INDEX;
	this.addrMode = AddressingMode.DIRECT_PAGE;
	this.mnemonic = 'CPY'
}
_cmpYDP.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var newVal = Util.limit(this.size.getRealSize(), CPU.y.getValue() - CPU.dataReg.getValue());
	
	CPU.status.setNegative((newVal & this.size.getRealSize().topBitMask) != 0);
	CPU.status.setZero(newVal == 0);
	CPU.status.setCarry(CPU.y.getValue() >= CPU.dataReg.getValue());
	
	var cycles = 3;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}

	/**
	 * Compare Y with Memory Absolute
	 * 0xCC
	 */ 
function _cmpYAbsolute() {
	this.name = "Compare Y with Memory Absolute"
	this.argCount = 0;
	this.size = Size.INDEX;
	this.addrMode = AddressingMode.ABSOLUTE;
	this.mnemonic = 'CPY'
}
_cmpYAbsolute.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var newVal = Util.limit(this.size.getRealSize(), CPU.y.getValue() - CPU.dataReg.getValue());
	
	CPU.status.setNegative((newVal & this.size.getRealSize().topBitMask) != 0);
	CPU.status.setZero(newVal == 0);
	CPU.status.setCarry(CPU.y.getValue() >= CPU.dataReg.getValue());
	
	var cycles = 4;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}

CompareYWithMemory = {
	cmpYImmediate: 	new _cmpYImmediate(),
	cmpYDP: 				new _cmpYDP(),
	cmpYAbsolute: 	new _cmpYAbsolute()
}