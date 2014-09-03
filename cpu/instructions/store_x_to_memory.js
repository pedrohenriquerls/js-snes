
    /**
     * Store X to Memory (Direct Page)
     * 0x86
     */ 
function _storeXDirectPage() {
	this.name = "Store X to Memory (Direct Page)"
	this.argCount = 0;
	this.size = Size.INDEX;
	this.addrMode = AddressingMode.DIRECT_PAGE;
	this.mnemonic = 'STX'
}
_storeXDirectPage.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.dataReg.setValue(CPU.x.getValue());
	CPU.saveDataReg();
	
	var cycles = 3;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}

    /**
     * Store X to Memory (Absolute)
     * 0x8E
     */ 
function _storeXAbsolute() {
	this.name = "Store X to Memory (Absolute)"
	this.argCount = 0;
	this.size = Size.INDEX;
	this.addrMode = AddressingMode.ABSOLUTE;
	this.mnemonic = 'STX'
}
_storeXAbsolute.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.dataReg.setValue(CPU.x.getValue());
	CPU.saveDataReg();

	var cycles = 4;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}
/**
     * Store X to Memory (DP Indexed Y)
     * 0x96
     */ 
function _storeXDPIndexedY() {
	this.name = "Store X to Memory (DP Indexed Y)"
	this.argCount = 0;
	this.size = Size.INDEX;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_Y;
	this.mnemonic = 'STX'
}
_storeXDPIndexedY.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.dataReg.setValue(CPU.x.getValue());
	CPU.saveDataReg();

	var cycles = 4;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}

StoreXToMemory = {
	storeXDirectPage: new _storeXDirectPage(),
	storeXAbsolute: 	new _storeXAbsolute(),
	storeXDPIndexedY: new _storeXDPIndexedY(),
}
