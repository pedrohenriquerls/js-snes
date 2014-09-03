
	/**
     * Store Zero to Memory (Direct Page)
     * 0x64
     */ 
function _storeZeroDirectPage() {
	this.name = "Store Zero to Memory (Direct Page)"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE;
	this.mnemonic = 'STZ'
}
_storeZeroDirectPage.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.dataReg.setValue(0);
	CPU.saveDataReg();
	
	var cycles = 3;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}

    /**
     * Store Zero to Memory (DP Indexed X)
     * 0x74
     */ 
function _storeZeroDPIndexedX() {
	this.name = "Store Zero to Memory (DP Indexed X)"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.DIRECT_PAGE_INDEXED_X;
	this.mnemonic = 'STZ'
}
_storeZeroDPIndexedX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.dataReg.setValue(0);
	CPU.saveDataReg();

	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	if ((CPU.dp.getValue() & 0xFF) != 0)
		cycles++;
	return cycles;
}

    /**
     * Store Zero to Memory (Absolute)
     * 0x9C
     */ 
function _storeZeroAbsolute() {
	this.name = "Store Zero to Memory (Absolute)"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE;
	this.mnemonic = 'STZ'
}
_storeZeroAbsolute.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.dataReg.setValue(0);
	CPU.saveDataReg();

	var cycles = 4;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}
    
    /**
     * Store Zero to Memory (Absolute Indexed X)
     * 0x9E
     */ 
function _storeZeroAbsoluteIndexedX() {
	this.name = "Store Zero to Memory (Absolute Indexed X)"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.ABSOLUTE_INDEXED_X;
	this.mnemonic = 'STZ'
}
_storeZeroAbsoluteIndexedX.prototype.run = function(args){
	CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
	CPU.dataReg.setValue(0);
	CPU.saveDataReg();

	var cycles = 5;
	if (!CPU.status.isMemoryAccess())
		cycles++;
	return cycles;
}

StoreZeroToMemory = {
	storeZeroDirectPage: 				new _storeZeroDirectPage(),
	storeZeroDPIndexedX: 				new _storeZeroDPIndexedX(),
	storeZeroAbsolute: 					new _storeZeroAbsolute(),
	storeZeroAbsoluteIndexedX: 	new _storeZeroAbsoluteIndexedX(),
}