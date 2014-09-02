function UnimplementedHardwareRegister(){
	HWRegister.call()
}

UnimplementedHardwareRegister.prototype = new HWRegister()
UnimplementedHardwareRegister.prototype.construction = UnimplementedHardwareRegister