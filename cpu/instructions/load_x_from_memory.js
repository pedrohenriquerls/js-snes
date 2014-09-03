
	/**
	 * Load Index Register X from Memory Immediate
	 * 0xA2
	 */ 
function _loadXImmediate() {
  this.name = "Load Index Register X from Memory Immediate"
  this.argCount = 0;
  this.size = Size.INDEX;
  this.addrMode = AddressingMode.IMMEDIATE_INDEX;
  this.mnemonic = 'LDX'
}
_loadXImmediate.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.x.setValue(CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.x.isNegative());
	CPU.status.setZero(CPU.x.getValue() == 0);
	
	var cycles = 2;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}
/**
	 * Load Index Register X from Memory Absolute
	 * 0xAE
	 */ 
function _loadXAbsolute() {
  this.name = "Load Index Register X from Memory Absolute"
  this.argCount = 0;
  this.size = Size.INDEX;
  this.addrMode = AddressingMode.ABSOLUTE;
  this.mnemonic = 'LDX'
}
_loadXAbsolute.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.x.setValue(CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.x.isNegative());
	CPU.status.setZero(CPU.x.getValue() == 0);
	
	var cycles = 4;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}

	/**
	 * Load Index Register X from Memory Direct Page
	 * 0xA6
	 */ 
function _loadXDirectPage() {
  this.name = "Load Index Register X from Memory Direct Page"
  this.argCount = 0;
  this.size = Size.INDEX;
  this.addrMode = AddressingMode.DIRECT_PAGE;
  this.mnemonic = 'LDX'
}
_loadXDirectPage.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.x.setValue(CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.x.isNegative());
	CPU.status.setZero(CPU.x.getValue() == 0);
	
	var cycles = 3;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}
	
	/**
	 * Load Index Register X from Memory Absolute Indexed Y
	 * 0xBE
	 */ 
function _loadXAbsoluteY() {
  this.name = "Load Index Register X from Memory Absolute Indexed Y"
  this.argCount = 0;
  this.size = Size.INDEX;
  this.addrMode = AddressingMode.ABSOLUTE_INDEXED_Y;
  this.mnemonic = 'LDX'
}
_loadXAbsoluteY.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.x.setValue(CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.x.isNegative());
	CPU.status.setZero(CPU.x.getValue() == 0);
	
	var cycles = 4;
	if (CPU.indexCrossedPageBoundary)
		cycles++;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}

	/**
	 * Load Index Register X from Memory Direct Page Indexed Y
	 * 0xB6
	 */ 
function _loadXDirectPageY() {
  this.name = "Load Index Register X from Memory Direct Page Indexed Y"
  this.argCount = 0;
  this.size = Size.INDEX;
  this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_Y;
  this.mnemonic = 'LDX'
}
_loadXDirectPageY.prototype.run = function(args){
  CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.x.setValue(CPU.dataReg.getValue());
	
	CPU.status.setNegative(CPU.x.isNegative());
	CPU.status.setZero(CPU.x.getValue() == 0);
	
	var cycles = 4;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}

LoadXFromMemory = {
	loadXImmediate: 	new _loadXImmediate(),
	loadXAbsolute: 		new _loadXAbsolute(),
	loadXDirectPage: 	new _loadXDirectPage(),
	loadXAbsoluteY: 	new _loadXAbsoluteY(),
	loadXDirectPageY: new _loadXDirectPageY()
}
