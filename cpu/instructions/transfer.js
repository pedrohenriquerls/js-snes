
	/**
	 * Transfer Accumulator to X
	 * 0xAA
	 */ 
function _transferAtoX() {
	this.name = "Transfer Accumulator to X"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.IMPLIED;
	this.mnemonic = 'TAX'
}
_transferAtoX.prototype.run = function(args){
	CPU.x.setValue(CPU.a.getValue(CPU.x.getSize()));
			
	CPU.status.setNegative(CPU.x.isNegative());
	CPU.status.setZero(CPU.x.getValue() == 0);
	
	var cycles = 2;
	return cycles;
} 

	/**
	 * Transfer Accumulator to Y
	 * 0xA8
	 */ 
function _transferAtoY() {
	this.name = "Transfer Accumulator to Y"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.IMPLIED;
	this.mnemonic = 'TAY'
}
_transferAtoY.prototype.run = function(args){
	CPU.y.setValue(CPU.a.getValue(CPU.y.getSize()));
			
	CPU.status.setNegative(CPU.y.isNegative());
	CPU.status.setZero(CPU.y.getValue() == 0);
	
	var cycles = 2;
	return cycles;
}

	
	/**
	 * Transfer Accumulator to Direct Page
	 * 0x5B
	 */ 
function _transferAtoDP() {
	this.name = "Transfer Accumulator to Direct Page"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.IMPLIED;
	this.mnemonic = 'TCD'
}
_transferAtoDP.prototype.run = function(args){
	CPU.dp.setValue(CPU.a.getValue(Size.SHORT));
			
	CPU.status.setNegative(CPU.dp.isNegative());
	CPU.status.setZero(CPU.dp.getValue() == 0);
	
	var cycles = 2;
	return cycles;
}

	/**
	 * Transfer Accumulator to Stack Pointer
	 * 0x1B
	 */ 
function _transferAtoSP() {
	this.name = "Transfer Accumulator to Stack Pointer"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.IMPLIED;
	this.mnemonic = 'TCS'
}
_transferAtoSP.prototype.run = function(args){
	CPU.sp.setValue(CPU.a.getValue(Size.SHORT));
			
	var cycles = 2;
	return cycles;
}
	
	/**
	 * Transfer Direct Page to Accumulator
	 * 0x7B
	 */ 
function _transferDPtoA() {
	this.name = "Transfer Direct Page to Accumulator"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.IMPLIED;
	this.mnemonic = 'TDC'
}
_transferDPtoA.prototype.run = function(args){
	CPU.a.setRealValue(CPU.dp.getValue());
			
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 2;
	return cycles;
}

	/**
	 * Transfer Stack Pointer to Accumulator
	 * 0x3B
	 */ 
function _transferSPtoA() {
	this.name = "Transfer Stack Pointer to Accumulator"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.IMPLIED;
	this.mnemonic = 'TSC'
}
_transferSPtoA.prototype.run = function(args){
	CPU.a.setRealValue(CPU.sp.getValue());
			
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 2;
	return cycles;
}

	/**
	 * Transfer Stack Pointer to X
	 * 0xBA
	 */ 
function _transferSPtoX() {
	this.name = "Transfer Stack Pointer to X"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.IMPLIED;
	this.mnemonic = 'TSX'
}
_transferSPtoX.prototype.run = function(args){
	CPU.x.setValue(CPU.sp.getValue());
			
	CPU.status.setNegative(CPU.x.isNegative());
	CPU.status.setZero(CPU.x.getValue() == 0);
	
	var cycles = 2;
	return cycles;
}
	
	/**
	 * Transfer X to Accumulator
	 * 0x8A
	 */ 
function _transferXtoA() {
	this.name = "Transfer X to Accumulator"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.IMPLIED;
	this.mnemonic = 'TXA'
}
_transferXtoA.prototype.run = function(args){
	if (CPU.status.isIndexRegister()) {
		CPU.a.setValue(CPU.x.getValue());
	} else {
		if (CPU.status.isMemoryAccess()) {
			CPU.a.setValue(CPU.x.getValue());
		} else {
			CPU.a.setRealValue(CPU.x.getValue());
		}
	}
	
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 2;
	return cycles;
}

	/**
	 * Transfer X to Stack Pointer
	 * 0x9A
	 */ 
function _transferXtoSP() {
	this.name = "Transfer X to Stack Pointer"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.IMPLIED;
	this.mnemonic = 'TXS'
}
_transferXtoSP.prototype.run = function(args){
	CPU.sp.setValue(CPU.x.getValue());
			
	var cycles = 2;
	return cycles;
}

	/**
	 * Transfer X to Y
	 * 0x9B
	 */ 
function _transferXtoY() {
	this.name = "Transfer X to Y"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.IMPLIED;
	this.mnemonic = 'TXY'
}
_transferXtoY.prototype.run = function(args){
	CPU.y.setValue(CPU.x.getValue());
			
	CPU.status.setNegative(CPU.y.isNegative());
	CPU.status.setZero(CPU.y.getValue() == 0);
	
	var cycles = 2;
	return cycles;
}

	/**
	 * Transfer Y to Accumulator
	 * 0x98
	 */ 
function _transferYtoA() {
	this.name = "Transfer Y to Accumulator"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.IMPLIED;
	this.mnemonic = 'TYA'
}
_transferYtoA.prototype.run = function(args){
	if (CPU.status.isIndexRegister()) {
		CPU.a.setValue(CPU.y.getValue());
	} else {
		CPU.a.setRealValue(CPU.y.getValue());
	}
	CPU.status.setNegative(CPU.a.isNegative());
	CPU.status.setZero(CPU.a.getValue() == 0);
	
	var cycles = 2;
	return cycles;
}

	/**
	 * Transfer Y to X
	 * 0xBB
	 */ 
function _transferYtoX() {
	this.name = "Transfer Y to X"
	this.argCount = 0;
	this.size = Size.MEMORY_A;
	this.addrMode = AddressingMode.IMPLIED;
	this.mnemonic = 'TYX'
}
_transferYtoX.prototype.run = function(args){
	CPU.x.setValue(CPU.y.getValue());
			
	CPU.status.setNegative(CPU.x.isNegative());
	CPU.status.setZero(CPU.x.getValue() == 0);
	
	var cycles = 2;
	return cycles;
}

Transfer = {
	transferAtoX:  new _transferAtoX(),
	transferAtoY:  new _transferAtoY(),
	transferAtoDP: new _transferAtoDP(),
	transferAtoSP: new _transferAtoSP(),
	transferDPtoA: new _transferDPtoA(),
	transferSPtoA: new _transferSPtoA(),
	transferSPtoX: new _transferSPtoX(),
	transferXtoA:  new _transferXtoA(),
	transferXtoSP: new _transferXtoSP(),
	transferXtoY:  new _transferXtoY(),
	transferYtoA:  new _transferYtoA(),
	transferYtoX:  new _transferYtoX()
}