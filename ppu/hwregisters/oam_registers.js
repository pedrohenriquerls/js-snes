OAMRegisters = {}

	/**
	 * 0x2101 - Set object size and character select
	 */
OAMRegisters.OAMSize = new HWRegister()
OAMRegisters.OAMSize.onWrite = function(value) {
	this.val = value & 0xFF;
	OAM.setObjectSize((this.val >> 5) & 0x07);
	OAM.setNameSelect((this.val >> 3) & 0x03);
	OAM.setNameBaseSelect(this.val & 0x07);
}
	
	/**
	 * 0x2102 - OAM Address low byte
	 */
OAMRegisters.OAMAddrLow = new HWRegister()
OAMRegisters.OAMAddrLow.onWrite = function(value) {
	this.val = value & 0xFF;
}
	
	/**
	 * 0x2103 - OAM Address high byte
	 */
OAMRegisters.OAMAddrHigh = new HWRegister()
OAMRegisters.OAMAddrHigh.OAMAddress = 0;
OAMRegisters.OAMAddrHigh.objPriority = false;
OAMRegisters.OAMAddrHigh.onWrite = function(value) {
	this.objPriority = ((value & 0x80) == 0x80);
	this.OAMAddress = ((value & 0x01) << 8);
	
	OAM.updateAddress(this.OAMAddress | OAMRegisters.OAMAddrLow.val, this.objPriority);
}
	
	/**
	 * 0x2104 - OAM Data Write
	 */
OAMRegisters.OAMWrite = new HWRegister()
OAMRegisters.OAMWrite.onWrite = function(value) {
	this.val = value;
	OAM.writeOAM(value & 0xFF);
}	
	
	/**
	 * 0x2138 - OAM Data Read
	 */
OAMRegisters.OAMRead = new HWRegister()
OAMRegisters.OAMRead.onRead = function() {
	this.val = OAM.readOAM();
	return this.val
}
