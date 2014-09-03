
	/**
	 * Compare A with Memory Direct Page Indexed Indirect X
	 * 0xC1
	 */ 
function _cmpADPIndirectX() {
	this.name = "Compare A with Memory Direct Page Indexed Indirect X"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_X;
	this.mnemonic = 'CMP'
}
_cmpADPIndirectX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var newVal = Util.limit(this.size.getRealSize(), CPU.a.getValue() - CPU.dataReg.getValue());
	
	CPU.status.setNegative((newVal & this.size.getRealSize().topBitMask) != 0);
	CPU.status.setZero(newVal == 0);
	CPU.status.setCarry(CPU.a.getValue() >= CPU.dataReg.getValue());
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;

	return cycles;
}

	/**
	 * Compare A with Memory Stack Relative
	 * 0xC3
	 */ 
function _cmpAStackRelative() {
	this.name = "Compare A with Memory Stack Relative"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.STACK_RELATIVE;
	this.mnemonic = 'CMP'
}
_cmpAStackRelative.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var newVal = Util.limit(this.size.getRealSize(), CPU.a.getValue() - CPU.dataReg.getValue());
	
	CPU.status.setNegative((newVal & this.size.getRealSize().topBitMask) != 0);
	CPU.status.setZero(newVal == 0);
	CPU.status.setCarry(CPU.a.getValue() >= CPU.dataReg.getValue());
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
	
	/**
	 * Compare A with Memory Direct Page
	 * 0xC5
	 */ 
function _cmpADP() {
	this.name = "Compare A with Memory Direct Page"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE;
	this.mnemonic = 'CMP'
}
_cmpADP.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var newVal = Util.limit(this.size.getRealSize(), CPU.a.getValue() - CPU.dataReg.getValue());
	
	CPU.status.setNegative((newVal & this.size.getRealSize().topBitMask) != 0);
	CPU.status.setZero(newVal == 0);
	CPU.status.setCarry(CPU.a.getValue() >= CPU.dataReg.getValue());
	
	var cycles = 3;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;

	return cycles;
}
	
	/**
	 * Compare A with Memory Direct Page Indirect Long
	 * 0xC7
	 */ 
function _cmpADPIndirectLong() {
	this.name = "Compare A with Memory Direct Page Indirect Long"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDIRECT_LONG;
	this.mnemonic = 'CMP'
}
_cmpADPIndirectLong.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var newVal = Util.limit(this.size.getRealSize(), CPU.a.getValue() - CPU.dataReg.getValue());
	
	CPU.status.setNegative((newVal & this.size.getRealSize().topBitMask) != 0);
	CPU.status.setZero(newVal == 0);
	CPU.status.setCarry(CPU.a.getValue() >= CPU.dataReg.getValue());
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}

	/**
	 * Compare A with Memory Immediate
	 * 0xC9
	 */ 
function _cmpAImmediate() {
	this.name = "Compare A with Memory Immediate"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.IMMEDIATE_MEMORY;
	this.mnemonic = 'CMP'
}
_cmpAImmediate.prototype.run = function(args){
	CPU.loadDataRegister(this.this.addrMode, this.size.getRealSize(), args);
	var newVal = Util.limit(this.size.getRealSize(), CPU.a.getValue() - CPU.dataReg.getValue());
	
	CPU.status.setNegative((newVal & this.size.getRealSize().topBitMask) != 0);
	CPU.status.setZero(newVal == 0);
	CPU.status.setCarry(CPU.a.getValue() >= CPU.dataReg.getValue());
	
	var cycles = 2;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

	/**
	 * Compare A with Memory Absolute
	 * 0xCD
	 */ 
function _cmpAAbsolute() {
	this.name = "Compare A with Memory Absolute"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE;
	this.mnemonic = 'CMP'
}
_cmpAAbsolute.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var newVal = Util.limit(this.size.getRealSize(), CPU.a.getValue() - CPU.dataReg.getValue());
	
	CPU.status.setNegative((newVal & this.size.getRealSize().topBitMask) != 0);
	CPU.status.setZero(newVal == 0);
	CPU.status.setCarry(CPU.a.getValue() >= CPU.dataReg.getValue());
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
	
	/**
	 * Compare A with Memory Absolute Long
	 * 0xCF
	 */ 
function _cmpAAbsoluteLong() {
	this.name = "Compare A with Memory Absolute Long"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_LONG;
	this.mnemonic = 'CMP'
}
_cmpAAbsoluteLong.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var newVal = Util.limit(this.size.getRealSize(), CPU.a.getValue() - CPU.dataReg.getValue());
	
	CPU.status.setNegative((newVal & this.size.getRealSize().topBitMask) != 0);
	CPU.status.setZero(newVal == 0);
	CPU.status.setCarry(CPU.a.getValue() >= CPU.dataReg.getValue());
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

	/**
	 * Compare A with Memory Direct Page Indirect Indexed Y
	 * 0xD1
	 */ 
function _cmpADPIndirectY() {
	this.name = "Compare A with Memory Absolute Long"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_Y;
	this.mnemonic = 'CMP'
}
_cmpADPIndirectY.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var newVal = Util.limit(this.size.getRealSize(), CPU.a.getValue() - CPU.dataReg.getValue());
	
	CPU.status.setNegative((newVal & this.size.getRealSize().topBitMask) != 0);
	CPU.status.setZero(newVal == 0);
	CPU.status.setCarry(CPU.a.getValue() >= CPU.dataReg.getValue());
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	if (CPU.indexCrossedPageBoundary)
		cycles++;
	return cycles;
}
	
	/**
	 * Compare A with Memory Direct Page Indirect
	 * 0xD2
	 */ 
function _cmpADPIndirect() {
	this.name = "Compare A with Memory Direct Page Indirect"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDIRECT;
	this.mnemonic = 'CMP'
}
_cmpADPIndirect.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var newVal = Util.limit(this.size.getRealSize(), CPU.a.getValue() - CPU.dataReg.getValue());
	
	CPU.status.setNegative((newVal & this.size.getRealSize().topBitMask) != 0);
	CPU.status.setZero(newVal == 0);
	CPU.status.setCarry(CPU.a.getValue() >= CPU.dataReg.getValue());
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}
	
	/**
	 * Compare A with Memory Stack Relative Indirect Indexed Y
	 * 0xD3
	 */ 
function _cmpASRIndirectY() {
	this.name = "Compare A with Memory Stack Relative Indirect Indexed Y"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_Y;
	this.mnemonic = 'CMP'
}
_cmpASRIndirectY.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var newVal = Util.limit(this.size.getRealSize(), CPU.a.getValue() - CPU.dataReg.getValue());
	
	CPU.status.setNegative((newVal & this.size.getRealSize().topBitMask) != 0);
	CPU.status.setZero(newVal == 0);
	CPU.status.setCarry(CPU.a.getValue() >= CPU.dataReg.getValue());
	
	var cycles = 7;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
	
	/**
	 * Compare A with Memory Direct Page Indexed X
	 * 0xD5
	 */ 
function _cmpADPX() {
	this.name = "Compare A with Memory Stack Relative Indirect Indexed Y"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_X;
	this.mnemonic = 'CMP'
}
_cmpADPX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var newVal = Util.limit(this.size.getRealSize(), CPU.a.getValue() - CPU.dataReg.getValue());
	
	CPU.status.setNegative((newVal & this.size.getRealSize().topBitMask) != 0);
	CPU.status.setZero(newVal == 0);
	CPU.status.setCarry(CPU.a.getValue() >= CPU.dataReg.getValue());
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}
	
	/**
	 * Compare A with Memory Direct Page Indirect Long Indexed Y
	 * 0xD7
	 */ 
function _cmpADPIndirectLongY() {
	this.name = "Compare A with Memory Direct Page Indirect Long Indexed Y"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_LONG_Y;
	this.mnemonic = 'CMP'
}
_cmpADPIndirectLongY.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var newVal = Util.limit(this.size.getRealSize(), CPU.a.getValue() - CPU.dataReg.getValue());
	
	CPU.status.setNegative((newVal & this.size.getRealSize().topBitMask) != 0);
	CPU.status.setZero(newVal == 0);
	CPU.status.setCarry(CPU.a.getValue() >= CPU.dataReg.getValue());
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}
	
	/**
	 * Compare A with Memory Absolute Indexed Y
	 * 0xD9
	 */ 
function _cmpAAbsoluteY() {
	this.name = "Compare A with Memory Absolute Indexed Y"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_INDEXED_Y;
	this.mnemonic = 'CMP'
}
_cmpAAbsoluteY.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var newVal = Util.limit(this.size.getRealSize(), CPU.a.getValue() - CPU.dataReg.getValue());
	
	CPU.status.setNegative((newVal & this.size.getRealSize().topBitMask) != 0);
	CPU.status.setZero(newVal == 0);
	CPU.status.setCarry(CPU.a.getValue() >= CPU.dataReg.getValue());
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if (CPU.indexCrossedPageBoundary)
		cycles++;
	return cycles;
}
	/**
	 * Compare A with Memory Absolute Indexed X
	 * 0xDD
	 */ 
function _cmpAAbsoluteX() {
	this.name = "Compare A with Memory Absolute Indexed X"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_INDEXED_X;
	this.mnemonic = 'CMP'
}
_cmpAAbsoluteX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var newVal = Util.limit(this.size.getRealSize(), CPU.a.getValue() - CPU.dataReg.getValue());
	
	CPU.status.setNegative((newVal & size.getRealSize().topBitMask) != 0);
	CPU.status.setZero(newVal == 0);
	CPU.status.setCarry(CPU.a.getValue() >= CPU.dataReg.getValue());
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if (CPU.indexCrossedPageBoundary)
		cycles++;
	return cycles;
}
	
	/**
	 * Compare A with Memory Absolute Long Indexed X
	 * 0xDF
	 */ 
function _cmpAAbsoluteLongX() {
	this.name = "Compare A with Memory Absolute Long Indexed X"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_LONG_INDEXED_X;
	this.mnemonic = 'CMP'
}
_cmpAAbsoluteLongX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	var newVal = Util.limit(this.size.getRealSize(), CPU.a.getValue() - CPU.dataReg.getValue());
	
	CPU.status.setNegative((newVal & this.size.getRealSize().topBitMask) != 0);
	CPU.status.setZero(newVal == 0);
	CPU.status.setCarry(CPU.a.getValue() >= CPU.dataReg.getValue());
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
}

CompareAWithMemory = {
	cmpADPIndirectX: new _cmpADPIndirectX(),
	cmpAStackRelative: new _cmpAStackRelative(),
	cmpADP: new _cmpADP(),
	cmpADPIndirectLong: new _cmpADPIndirectLong(),
	cmpAImmediate: new _cmpAImmediate(),
	cmpAAbsolute: new _cmpAAbsolute(),
	cmpAAbsoluteLong: new _cmpAAbsoluteLong(),
	cmpADPIndirectY: new _cmpADPIndirectY(),
	cmpADPIndirect: new _cmpADPIndirect(),
	cmpASRIndirectY: new _cmpASRIndirectY(),
	cmpADPX: new _cmpADPX(),
	cmpADPIndirectLongY: new _cmpADPIndirectLongY(),
	cmpAAbsoluteY: new _cmpAAbsoluteY(),
	cmpAAbsoluteX: new _cmpAAbsoluteX(),
	cmpAAbsoluteLongX: new _cmpAAbsoluteLongX()
}