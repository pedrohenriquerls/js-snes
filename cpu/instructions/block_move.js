
	/**
	 * Block Move Negative 0x54
	 */ 
function _blockMoveNegative(){
	this.name = "Block Move Negative"
	this.argCount = 0;
	this.size = Size.BYTE;
	this.addrMode = AddressingMode.BLOCK_MOVE;
	this.mnemonic = 'MVN'
}	 
_blockMoveNegative.prototype.run = function(args) {
	CPU.dbr.setRealValue(args[0]);
	do {
		Core.mem.set(Size.BYTE, args[0], CPU.y.getValue(), Core.mem.read(Size.BYTE, args[1], CPU.x.getValue()));
		CPU.a.subtract(1);
		CPU.x.add(1);
		CPU.y.add(1);
		
		Timing.cycle(42);
		if (CPU.checkInterrupts()) break;
	} while (CPU.a.getValue() != (CPU.a.getSize()==Size.SHORT?0xFFFF:0xFF));
	return 0;
};
	
	/**
	 * Block Move Positive 0x44
	 */ 
function _blockMovePositive(){
	this.name = "Block Move Positive"
	this.argCount = 0;
	this.size = Size.BYTE;
	this.addrMode = AddressingMode.BLOCK_MOVE;
	this.mnemonic = 'MVN'
}
_blockMovePositive.prototype.run = function(args){
	CPU.dbr.setRealValue(args[0]);
	do {
		Core.mem.set(Size.BYTE, args[0], CPU.y.getValue(), Core.mem.read(Size.BYTE, args[1], CPU.x.getValue()));
		CPU.a.subtract(1);
		CPU.x.subtract(1);
		CPU.y.subtract(1);
		
		Timing.cycle(42);
		if (CPU.checkInterrupts()) break;
	} while (CPU.a.getValue() != (CPU.a.getSize()==Size.SHORT?0xFFFF:0xFF));
	return 0;
}

BlockMove = {
	blockMoveNegative: new _blockMoveNegative(),
	blockMovePositive: new _blockMovePositive()
}