
	 /**
     * Jump Absolute
     * 0x4C
     */ 
function _jumpAbsolute() {
    this.name = "Jump Absolute"
    this.argCount = 0;
    this.size = Size.MEMORY_A;
    this.addrMode = AddressingMode.ABSOLUTE;
    this.mnemonic = 'JMP'
}
_jumpAbsolute.prototype.run = function(args){
    CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
    CPU.pc.setValue(CPU.dataAddr);
    var cycles = 3;
    return cycles;
}

    /**
     * Jump Absolute Indirect
     * 0x6C
     */ 
function _jumpAbsoluteIndirect() {
    this.name = "Jump Absolute Indirect"
    this.argCount = 0;
    this.size = Size.MEMORY_A;
    this.addrMode = AddressingMode.ABSOLUTE_INDIRECT;
    this.mnemonic = 'JMP'
}
_jumpAbsoluteIndirect.prototype.run = function(args){
    CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
    CPU.pc.setValue(CPU.dataAddr);
    var cycles = 5;
    return cycles;
}
    
    /**
     * Jump Absolute Indexed Indirect
     * 0x7C
     */ 
function _jumpAbsoluteIndexedIndirect() {
    this.name = "Jump Absolute Indexed Indirect"
    this.argCount = 0;
    this.size = Size.MEMORY_A;
    this.addrMode = AddressingMode.ABSOLUTE_INDEXED_INDIRECT;
    this.mnemonic = 'JMP'
}
_jumpAbsoluteIndirect.prototype.run = function(args){
    CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
    CPU.pc.setValue(CPU.dataAddr);
    var cycles = 6;
    return cycles;
}
    
    /**
     * Jump Absolute Long
     * 0x5C
     */ 
function _jumpAbsoluteLong() {
    this.name = "Jump Absolute Long"
    this.argCount = 0;
    this.size = Size.MEMORY_A;
    this.addrMode = AddressingMode.ABSOLUTE_LONG;
    this.mnemonic = 'JMP'
}
_jumpAbsoluteLong.prototype.run = function(args){
    CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
    CPU.pc.setValue(CPU.dataAddr);
    CPU.pbr.setValue(CPU.dataBank);
    
    var cycles = 4;
    return cycles;
}
    
    /**
     * Jump Absolute Indirect Long
     * 0xDC
     */ 
function _jumpAbsoluteIndirectLong() {
    this.name = "Jump Absolute Indirect Long"
    this.argCount = 0;
    this.size = Size.MEMORY_A;
    this.addrMode = AddressingMode.ABSOLUTE_INDIRECT_LONG;
    this.mnemonic = 'JMP'
}
_jumpAbsoluteIndirectLong.prototype.run = function(args){
    CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
    CPU.pc.setValue(CPU.dataAddr);
    CPU.pbr.setValue(CPU.dataBank);
    
    var cycles = 6;
    return cycles;
}
    
    /**
     * Jump to Subroutine Absolute
     * 0x20
     */ 
function _jumpSubAbsolute() {
    this.name = "Jump to Subroutine Absolute"
    this.argCount = 0;
    this.size = Size.MEMORY_A;
    this.addrMode = AddressingMode.ABSOLUTE;
    this.mnemonic = 'JMP'
}
_jumpSubAbsolute.prototype.run = function(args){
    CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
    // Spec says to put the address of the last byte in this instruction
    // PC points to the next instruction, so subtract one
    CPU.stackPush(Size.SHORT, CPU.pc.getValue() - 1);
    
    CPU.pc.setValue(CPU.dataAddr);

    var cycles = 6;
    return cycles;
}

    /**
     * Jump to Subroutine Absolute Indexed Indirect
     * 0xFC
     */ 
function _jumpSubAbsoluteIndexedIndirect() {
    this.name = "Jump to Subroutine Absolute Indexed Indirect"
    this.argCount = 0;
    this.size = Size.MEMORY_A;
    this.addrMode = AddressingMode.ABSOLUTE_INDEXED_INDIRECT;
    this.mnemonic = 'JSR'
}
_jumpSubAbsoluteIndexedIndirect.prototype.run = function(args){
    CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
    // Spec says to put the address of the last byte in this instruction
    // PC points to the next instruction, so subtract one
    CPU.stackPush(Size.SHORT, CPU.pc.getValue() - 1);
    
    CPU.pc.setValue(CPU.dataAddr);
    CPU.pbr.setValue(CPU.dataBank);

    var cycles = 8;
    return cycles;
}

    /**
     * Jump to Subroutine Long
     * 0x22
     */ 
function _jumpSubLong() {
    this.name = "Jump to Subroutine Long"
    this.argCount = 0;
    this.size = Size.MEMORY_A;
    this.addrMode = AddressingMode.ABSOLUTE_LONG;
    this.mnemonic = 'JSL'
}
_jumpSubLong.prototype.run = function(args){
    CPU.loadDataRegister(this.addrMode, this.size.getRealSize(), args);
    CPU.stackPush(Size.BYTE, CPU.pbr.getValue());
    
    // Spec says to put the address of the last byte in this instruction
    // PC points to the next instruction, so subtract one
    CPU.stackPush(Size.SHORT, CPU.pc.getValue() - 1);
    
    CPU.pc.setValue(CPU.dataAddr);
    CPU.pbr.setValue(CPU.dataBank);
    
    var cycles = 8;
    return cycles;
}

Jump = {
    jumpAbsolute:                   new _jumpAbsolute(),
    jumpAbsoluteIndirect:           new _jumpAbsoluteIndirect(),
    jumpAbsoluteIndexedIndirect:    new _jumpAbsoluteIndexedIndirect(),
    jumpAbsoluteLong:               new _jumpAbsoluteLong(),
    jumpAbsoluteIndirectLong:       new _jumpAbsoluteIndirectLong(),
    jumpSubAbsoluteIndexedIndirect: new _jumpSubAbsoluteIndexedIndirect(),
    jumpSubLong:                    new _jumpSubLong()
}