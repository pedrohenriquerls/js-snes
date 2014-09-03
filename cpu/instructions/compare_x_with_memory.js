
	/**
	 * Compare X with Memory Immediate
	 * 0xE0
	 */ 
function _cmpXImmediate() {
	this.name = "Compare X with Memory Immediate"
	this.argCount = 0;
	this.size = Size.INDEX;
	this.addrMode = AddressingMode.IMMEDIATE_INDEX;
	this.mnemonic = 'CPX'
}
_cmpXImmediate.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var newVal = Util.limit(this.size.getRealSize(), CPU.x.getValue() - CPU.dataReg.getValue());
	
	CPU.status.setNegative((newVal & this.size.getRealSize().topBitMask) != 0);
	CPU.status.setZero(newVal == 0);
	CPU.status.setCarry(CPU.x.getValue() >= CPU.dataReg.getValue());
	
	var cycles = 2;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}

	/**
	 * Compare X with Memory Direct Page
	 * 0xE4
	 */ 
function _cmpXDP() {
	this.name = "Compare X with Memory Direct Page"
	this.argCount = 0;
	this.size = Size.INDEX;
	this.addrMode = AddressingMode.DIRECT_PAGE;
	this.mnemonic = 'CPX'
}
_cmpXDP.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var newVal = Util.limit(this.size.getRealSize(), CPU.x.getValue() - CPU.dataReg.getValue());
	
	CPU.status.setNegative((newVal & this.size.getRealSize().topBitMask) != 0);
	CPU.status.setZero(newVal == 0);
	CPU.status.setCarry(CPU.x.getValue() >= CPU.dataReg.getValue());
	
	var cycles = 3;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}

	/**
	 * Compare X with Memory Absolute
	 * 0xEC
	 */ 
function _cmpXAbsolute() {
	this.name = "Compare X with Memory Absolute"
	this.argCount = 0;
	this.size = Size.INDEX;
	this.addrMode = AddressingMode.ABSOLUTE;
	this.mnemonic = 'CPX'
}
_cmpXAbsolute.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var newVal = Util.limit(this.size.getRealSize(), CPU.x.getValue() - CPU.dataReg.getValue());
	
	CPU.status.setNegative((newVal & this.size.getRealSize().topBitMask) != 0);
	CPU.status.setZero(newVal == 0);
	CPU.status.setCarry(CPU.x.getValue() >= CPU.dataReg.getValue());
	
	var cycles = 4;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}

CompareXWithMemory = {
	cmpXImmediate: new _cmpXImmediate(),
	cmpXDP: new _cmpXDP(),
	cmpXAbsolute: new _cmpXAbsolute()
}