
	/**
	 * Test Memory Bits against Accumulator Immediate
	 * 0x89
	 */
function _testImmediate() {
	this.name = "Test Memory Bits against Accumulator Immediate"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.IMMEDIATE_MEMORY;
	this.mnemonic = 'BIT'
}
_testImmediate.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.status.setZero((CPU.a.getValue() & CPU.dataReg.getValue()) == 0);
	
	var cycles = 2;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
} 

	/**
	 * Test Memory Bits against Accumulator Absolute
	 * 0x2C
	 */ 
function _testAbsolute() {
	this.name = "Test Memory Bits against Accumulator Absolute"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE;
	this.mnemonic = 'BIT'
}
_testAbsolute.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.status.setNegative(CPU.dataReg.isNegative());
	if (this.this.size.getRealSize() == Size.SHORT)
		CPU.status.setOverflow((CPU.dataReg.getValue() & 0x4000) != 0);
	else
		CPU.status.setOverflow((CPU.dataReg.getValue() & 0x40) != 0);
	CPU.status.setZero((CPU.a.getValue() & CPU.dataReg.getValue()) == 0);
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
	
	/**
	 * Test Memory Bits against Accumulator Direct Page
	 * 0x24
	 */ 
function _testDP() {
	this.name = "Test Memory Bits against Accumulator Direct Page"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE;
	this.mnemonic = 'BIT'
}
_testDP.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.status.setNegative(CPU.dataReg.isNegative());
	if (this.this.size.getRealSize() == Size.SHORT)
		CPU.status.setOverflow((CPU.dataReg.getValue() & 0x4000) != 0);
	else
		CPU.status.setOverflow((CPU.dataReg.getValue() & 0x40) != 0);
	CPU.status.setZero((CPU.a.getValue() & CPU.dataReg.getValue()) == 0);
	
	var cycles = 3;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}

	/**
	 * Test Memory Bits against Accumulator Absolute Indexed X
	 * 0x3C
	 */ 
function _testAbsoluteX() {
	this.name = "Test Memory Bits against Accumulator Absolute Indexed X"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_INDEXED_X;
	this.mnemonic = 'BIT'
}
_testAbsoluteX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.status.setNegative(CPU.dataReg.isNegative());
	if (this.this.size.getRealSize() == Size.SHORT)
		CPU.status.setOverflow((CPU.dataReg.getValue() & 0x4000) != 0);
	else
		CPU.status.setOverflow((CPU.dataReg.getValue() & 0x40) != 0);
	CPU.status.setZero((CPU.a.getValue() & CPU.dataReg.getValue()) == 0);
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if (CPU.indexCrossedPageBoundary)
		cycles++;
	return cycles;
}

	/**
	 * Test Memory Bits against Accumulator Direct Page Indexed X
	 * 0x34
	 */ 
function _testDPX() {
	this.name = "Test Memory Bits against Accumulator Direct Page Indexed X"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_X;
	this.mnemonic = 'BIT'
}
_testDPX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.status.setNegative(CPU.dataReg.isNegative());
	if (this.this.size.getRealSize() == Size.SHORT)
		CPU.status.setOverflow((CPU.dataReg.getValue() & 0x4000) != 0);
	else
		CPU.status.setOverflow((CPU.dataReg.getValue() & 0x40) != 0);
	CPU.status.setZero((CPU.a.getValue() & CPU.dataReg.getValue()) == 0);
	
	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}
/**
	 * Test and Set Memory Bits against Accumulator Absolute
	 * 0x0C
	 */ 
function _testSetAbsolute() {
	this.name = "Test and Set Memory Bits against Accumulator Absolute"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE;
	this.mnemonic = 'TSB'
}
_testSetAbsolute.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.status.setZero((CPU.a.getValue() & CPU.dataReg.getValue()) == 0);
	CPU.dataReg.setValue(CPU.a.getValue() | CPU.dataReg.getValue());
	CPU.saveDataReg();
	
	var cycles = 6;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

	/**
	 * Test and Set Memory Bits against Accumulator Direct Page
	 * 0x04
	 */ 
function _testSetDP() {
	this.name = "Test and Set Memory Bits against Accumulator Direct Page"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE;
	this.mnemonic = 'TSB'
}
_testSetDP.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.status.setZero((CPU.a.getValue() & CPU.dataReg.getValue()) == 0);
	CPU.dataReg.setValue(CPU.a.getValue() | CPU.dataReg.getValue());
	CPU.saveDataReg();
	
	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}

	/**
	 *  Test and Reset Memory Bits against Accumulator Direct Page
	 *  0x14
	 */
function _testResetDP() {
	this.name = "Test and Reset Memory Bits against Accumulator Direct Page"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE;
	this.mnemonic = 'TRB'
}
_testResetDP.prototype.run = function(args){
	var cycles = 5;
	var complement = 0xFF;
	if (!CPU.status.isMemoryAccess()) {
		cycles+=2;
		complement = 0xFFFF;
	}
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.status.setZero((CPU.a.getValue() & CPU.dataReg.getValue()) == 0);
	complement = CPU.a.getValue() ^ complement;
	CPU.dataReg.setValue(complement & CPU.dataReg.getValue());
	CPU.saveDataReg();
	
	return cycles;
} 

	/**
	 *  Test and Reset Memory Bits against Accumulator Absolute
	 *  0x1C
	 */
function _testResetAbsolute() {
	this.name = "Test and Reset Memory Bits against Accumulator Absolute"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE;
	this.mnemonic = 'TRB'
}
_testResetAbsolute.prototype.run = function(args){
	var cycles = 6;
	var complement = 0xFF;
	if (!CPU.status.isMemoryAccess()) {
		cycles+=2;
		complement = 0xFFFF;
	}
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.status.setZero((CPU.a.getValue() & CPU.dataReg.getValue()) == 0);
	complement = CPU.a.getValue() ^ complement;
	CPU.dataReg.setValue(complement & CPU.dataReg.getValue());
	CPU.saveDataReg();
	
	return cycles;
}

TestBits = {
	testImmediate: new _testImmediate(),
	testAbsolute: new _testAbsolute(),
	testDP: new _testDP(),
	testAbsoluteX: new _testAbsoluteX(),
	testDPX: new _testDPX(),
	testSetAbsolute: new _testSetAbsolute(),
	testSetDP: new _testSetDP(),
	testResetDP: new _testResetDP(),
	testResetAbsolute: new _testResetAbsolute()
}