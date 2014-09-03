
    /* Clear Carry Flag
     * 0x18
     */ 
function _clearCarryFlag() {
    this.name = "Clear Carry Flag"
    this.argCount = 0;
    this.size = Size.MEMORY_A;
    this.addrMode = AddressingMode.IMPLIED;
    this.mnemonic = 'CLC'
}
_clearCarryFlag.prototype.run = function(args){
    CPU.status.setCarry(false);
    var cycles = 2;
    return cycles;
}
    
    /* Set Carry Flag
     * 0x38
     */ 
function _setCarryFlag() {
    this.name = "Set Carry Flag"
    this.argCount = 0;
    this.size = Size.MEMORY_A;
    this.addrMode = AddressingMode.IMPLIED;
    this.mnemonic = 'SEC'
}
_setCarryFlag.prototype.run = function(args){
    CPU.status.setCarry(true);
    var cycles = 2;
    return cycles;
}    
    
    /* Clear Decimal Mode Flag
     * 0xD8
     */ 
function _clearDecimalModeFlag() {
    this.name = "Clear Decimal Mode Flag"
    this.argCount = 0;
    this.size = Size.MEMORY_A;
    this.addrMode = AddressingMode.IMPLIED;
    this.mnemonic = 'CLD'
}
_clearDecimalModeFlag.prototype.run = function(args){
    CPU.status.setDecimalMode(false);
    var cycles = 2;
    return cycles;
} 
    
    /* Set Decimal Mode Flag
     * 0xF8
     */ 
function _setDecimalModeFlag() {
    this.name = "Set Decimal Mode Flag"
    this.argCount = 0;
    this.size = Size.MEMORY_A;
    this.addrMode = AddressingMode.IMPLIED;
    this.mnemonic = 'SED'
}
_setDecimalModeFlag.prototype.run = function(args){
    CPU.status.setDecimalMode(true);
    var cycles = 2;
    return cycles;
} 
    
    /* Clear Interrupt Disable Flag
     * 0x58
     */ 
function _clearInterruptDisableFlag() {
    this.name = "Clear Interrupt Disable Flag"
    this.argCount = 0;
    this.size = Size.MEMORY_A;
    this.addrMode = AddressingMode.IMPLIED;
    this.mnemonic = 'CLI'
}
_clearInterruptDisableFlag.prototype.run = function(args){
    CPU.status.setIrqDisable(false);
    var cycles = 2;
    return cycles;
}
    
    /* Set Interrupt Disable Flag
     * 0x78
     */ 
function _setInterruptDisableFlag() {
    this.name = "Set Interrupt Disable Flag"
    this.argCount = 0;
    this.size = Size.MEMORY_A;
    this.addrMode = AddressingMode.IMPLIED;
    this.mnemonic = 'SEI'
}
_setInterruptDisableFlag.prototype.run = function(args){
    CPU.status.setIrqDisable(true);
    var cycles = 2;
    return cycles;
}
    
    /* Set Processor Status Bits
     * 0xE2
     */ 
function _setProcessorStatusBits() {
    this.name = "Set Processor Status Bits"
    this.argCount = 1;
    this.size = Size.MEMORY_A;
    this.addrMode = AddressingMode.IMPLIED;
    this.mnemonic = 'SEP'
}
_setInterruptDisableFlag.prototype.run = function(args){
    CPU.status.setCarry((args[0] & 0x01)  == 0x01?true:CPU.status.isCarry());
    CPU.status.setZero((args[0] & 0x02)  == 0x02?true:CPU.status.isZero());
    CPU.status.setIrqDisable((args[0] & 0x04) == 0x04?true:CPU.status.isIrqDisable());
    CPU.status.setDecimalMode((args[0] & 0x08)  == 0x08?true:CPU.status.isDecimalMode());
    CPU.status.setIndexRegister((args[0] & 0x10)  == 0x10?true:CPU.status.isIndexRegister());
    CPU.status.setMemoryAccess((args[0] & 0x20)  == 0x20?true:CPU.status.isMemoryAccess());
    CPU.status.setOverflow((args[0] & 0x40)  == 0x40?true:CPU.status.isOverflow());
    CPU.status.setNegative((args[0] & 0x80) == 0x80?true:CPU.status.isNegative());
    var cycles = 3;
    return cycles;
}
    
    /* Clear Processor Status Bits
     * 0xC2
     */ 
function _resetProcessorStatusBits() {
    this.name = "Clear Processor Status Bits"
    this.argCount = 1;
    this.size = Size.MEMORY_A;
    this.addrMode = AddressingMode.IMPLIED;
    this.mnemonic = 'REP'
}
_resetProcessorStatusBits.prototype.run = function(args){
    CPU.status.setCarry((args[0] & 0x01)  == 0x01?false:CPU.status.isCarry());
    CPU.status.setZero((args[0] & 0x02)  == 0x02?false:CPU.status.isZero());
    CPU.status.setIrqDisable((args[0] & 0x04) == 0x04?false:CPU.status.isIrqDisable());
    CPU.status.setDecimalMode((args[0] & 0x08)  == 0x08?false:CPU.status.isDecimalMode());
    CPU.status.setIndexRegister((args[0] & 0x10)  == 0x10?false:CPU.status.isIndexRegister());
    CPU.status.setMemoryAccess((args[0] & 0x20)  == 0x20?false:CPU.status.isMemoryAccess());
    CPU.status.setOverflow((args[0] & 0x40)  == 0x40?false:CPU.status.isOverflow());
    CPU.status.setNegative((args[0] & 0x80) == 0x80?false:CPU.status.isNegative());
    var cycles = 3;
    return cycles;
}
    
    /* Clear Overflow Flag
     * 0xB8
     */ 
function _clearOverflowFlag() {
    this.name = "Clear Overflow Flag"
    this.argCount = 0;
    this.size = Size.MEMORY_A;
    this.addrMode = AddressingMode.IMPLIED;
    this.mnemonic = 'CLV'
}
_clearOverflowFlag.prototype.run = function(args){
    CPU.status.setOverflow(false);
    var cycles = 2;
    return cycles;
}
    
    /* Exchange Carry and Emulation Flags
     * 0xFB
     * This might also have some interaction with Index and Accumulator size
     */
function _exchangeCarryEmulationFlag() {
    this.name = "Exchange Carry and Emulation Flags"
    this.argCount = 0;
    this.size = Size.MEMORY_A;
    this.addrMode = AddressingMode.IMPLIED;
    this.mnemonic = 'XCE'
}
_exchangeCarryEmulationFlag.prototype.run = function(args){
    if(CPU.status.isCarry() ^ CPU.emulationMode) {
        if( CPU.status.isCarry()) {                 // Change to Emulation mode
            CPU.status.setCarry(false);
            CPU.emulationMode = true;
            CPU.status.setIndexRegister(false);
            CPU.status.setMemoryAccess(false);
        } else{
            CPU.status.setCarry(true);              // Change to Native mode
            CPU.emulationMode = false;
            CPU.status.setIndexRegister(true);
            CPU.status.setMemoryAccess(true);
        }
    }
    var cycles = 2;
    return cycles;
}

FlagOps = {
    clearCarryFlag: new _clearCarryFlag(),
    setCarryFlag: new _setCarryFlag(),
    clearDecimalModeFlag: new _clearDecimalModeFlag(),
    setDecimalModeFlag: new _setDecimalModeFlag(),
    clearInterruptDisableFlag: new _clearInterruptDisableFlag(),
    setInterruptDisableFlag: new _setInterruptDisableFlag(),
    setProcessorStatusBits: new _setProcessorStatusBits(),
    resetProcessorStatusBits: new _resetProcessorStatusBits(),
    clearOverflowFlag: new _clearOverflowFlag(),
    exchangeCarryEmulationFlag: new _exchangeCarryEmulationFlag()
}