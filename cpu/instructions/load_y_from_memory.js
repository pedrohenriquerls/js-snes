
	/**
	 * Load Index Register Y from Memory Immediate
	 * 0xA0
	 */ 
function _loadYImmediate() {
  this.name = "Load Index Register Y from Memory Immediate"
  this.argCount = 0;
  this.size = Size.INDEX;
  this.addrMode = AddressingMode.IMMEDIATE_INDEX;
  this.mnemonic = 'LDY'
}
_loadYImmediate.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.y.setValue(CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.y.isNegative());
	CPU.status.setZero(CPU.y.getValue() == 0);

	var cycles = 2;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}

	/**
	 * Load Index Register Y from Memory Absolute
	 * 0xAC
	 */ 
function _loadYAbsolute() {
  this.name = "Load Index Register Y from Memory Absolute"
  this.argCount = 0;
  this.size = Size.INDEX;
  this.addrMode = AddressingMode.ABSOLUTE;
  this.mnemonic = 'LDY'
}
_loadYAbsolute.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.y.setValue(CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.y.isNegative());
	CPU.status.setZero(CPU.y.getValue() == 0);

	var cycles = 4;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}
	
	/**
	 * Load Index Register Y from Memory Direct Page
	 * 0xA4
	 */ 
function _loadYDirectPage() {
  this.name = "Load Index Register Y from Memory Direct Page"
  this.argCount = 0;
  this.size = Size.INDEX;
  this.addrMode = AddressingMode.DIRECT_PAGE;
  this.mnemonic = 'LDY'
}
_loadYDirectPage.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.y.setValue(CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.y.isNegative());
	CPU.status.setZero(CPU.y.getValue() == 0);

	var cycles = 3;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}

	/**
	 * Load Index Register Y from Memory Absolute Indexed X
	 * 0xBC
	 */ 
function _loadYAbsoluteX() {
  this.name = "Load Index Register Y from Memory Absolute Indexed X"
  this.argCount = 0;
  this.size = Size.INDEX;
  this.addrMode = AddressingMode.ABSOLUTE_INDEXED_X;
  this.mnemonic = 'LDY'
}
_loadYAbsoluteX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.y.setValue(CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.y.isNegative());
	CPU.status.setZero(CPU.y.getValue() == 0);
	
	var cycles = 4;
	if (CPU.indexCrossedPageBoundary)
		cycles++;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}
	
	/**
	 * Load Index Register Y from Memory Direct Page Indexed X
	 * 0xB4
	 */ 
function _loadYDirectPageX() {
  this.name = "Load Index Register Y from Memory Direct Page Indexed X"
  this.argCount = 0;
  this.size = Size.INDEX;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_X;
  this.mnemonic = 'LDY'
}
_loadYDirectPageX.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.y.setValue(CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.y.isNegative());
	CPU.status.setZero(CPU.y.getValue() == 0);
	
	var cycles = 4;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}

LoadYFromMemory = {
	loadYImmediate: 	new _loadYImmediate(),
	loadYAbsolute: 		new _loadYAbsolute(),
	loadYDirectPage: 	new _loadYDirectPage(),
	loadYAbsoluteX: 	new _loadYAbsoluteX(),
	loadYDirectPageX: new _loadYDirectPageX()
}