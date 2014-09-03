
    /**
     * Store Y to Memory (Direct Page)
     * 0x84
     */ 
function _storeYDirectPage() {
	this.name = "Store Y to Memory (Direct Page)"
	this.argCount = 0;
	this.size = Size.INDEX;
	this.addrMode = AddressingMode.DIRECT_PAGE;
	this.mnemonic = 'STY'
}
_storeYDirectPage.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.dataReg.setValue(CPU.y.getValue());
	CPU.saveDataReg();

	var cycles = 3;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}

    /**
     * Store Y to Memory (Absolute)
     * 0x8C
     */ 
function _storeYAbsolute() {
	this.name = "Store Y to Memory (Absolute)"
	this.argCount = 0;
	this.size = Size.INDEX;
	this.addrMode = AddressingMode.ABSOLUTE;
	this.mnemonic = 'STY'
}
_storeYAbsolute.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.dataReg.setValue(CPU.y.getValue());
	CPU.saveDataReg();

	var cycles = 4;
	if (!CPU.status.isIndexRegister())
		cycles++;

	return cycles
}

    /**
     * Store Y to Memory (DP Indexed Y)
     * 0x94
     */ 
function _storeYDPIndexedX() {
	this.name = "Store Y to Memory (DP Indexed Y)"
	this.argCount = 0;
	this.size = Size.INDEX;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_X;
	this.mnemonic = 'STY'
}
_storeYDPIndexedX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.dataReg.setValue(CPU.y.getValue());
	CPU.saveDataReg();

	var cycles = 4;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	if (!CPU.status.isIndexRegister())
		cycles++;
	return cycles;
}

StoreYToMemory = {
	storeYDirectPage: new _storeYDirectPage(),
	storeYAbsolute: 	new _storeYAbsolute(),
	storeYDPIndexedX: new _storeYDPIndexedX(),
}