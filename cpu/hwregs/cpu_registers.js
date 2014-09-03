
CPURegisters = {}

	/**
	 * 0x4200 - Enable/Disable interrupts
	 */
CPURegisters.interruptEnable = new HWRegister()
CPURegisters.interruptEnable.onWrite = function(value) {
	// Non Maskable Interrupt Enable/Disable(high bit of the register)
	var temp = (value & 0x80) == 0x80;
	if (temp != CPU.NMIEnable) {
		CPU.NMIEnable = temp;
		//if (!Settings.isTrue(Settings.CPU_ALT_DEBUG)) {
			if(CPU.NMIEnable)
				console.log("Enabling NMI interrupts");
			else
				console.log("Disabling NMI interrupts");
		//}
	}
	
	// IRQEnable
	CPU.irqEnable = (value >> 4) & 0x03;
	Log.debug("IRQ Enable set to " + CPU.irqEnable);
	
	// Standard Controller Enable
	CPU.standardControllerRead = (value & 0x01) != 0;
	//if (!Settings.isTrue(Settings.CPU_ALT_DEBUG)) {
		if(CPU.standardControllerRead)
			console.log("Enabling automatic reading of standard controller");
		else
			console.log("Disabling automatic reading of standard controller");
	//}
};
CPURegisters.interruptEnable.onRead = function() {
	console.log("Game trying to read from 0x4200.  Bad coding practice.")
}

	/**
	 * 0x4201 - I/O Port
	 */
CPURegisters.wrio = new HWRegister() 
CPURegisters.wrio.onWrite = function(value){
	var a = (value >> 7) & 0x01;
	var b = (value >> 6) & 0x01;
	
	//TODO: no idea what these actually do...
	this.val = value;
}

	/**
	 * 0x4207 - H Timer Low Byte
	 */
CPURegisters.htimel = new HWRegister() 
CPURegisters.htimel.onWrite = function(value){
	CPU.htime = (CPU.htime & 0x100) | (value & 0xFF);
}
	
	/**
	 * 0x4208 - H Timer High Byte
	 */
CPURegisters.htimeh = new HWRegister() 
CPURegisters.htimeh.onWrite = function(value){
	CPU.htime = (CPU.htime & 0xFF) | ((value << 8) & 0x01);
}

	/**
	 * 0x4209 - V Timer Low Byte
	 */
CPURegisters.vtimel = new HWRegister() 
CPURegisters.vtimel.onWrite = function(value){
	CPU.vtime = (CPU.vtime & 0x100) | (value & 0xFF);
}
	
	/**
	 * 0x420A - V Timer High Byte
	 */
CPURegisters.vtimeh = new HWRegister() 
CPURegisters.vtimeh.onWrite = function(value){
	CPU.vtime = (CPU.vtime & 0xFF) | ((value << 8) & 0x01);
}

	/**
	 * 0x420D - ROM Access Speed Register(MEMSEL)
	 */
CPURegisters.memsel = new HWRegister('', 0x00) 
CPURegisters.memsel.onWrite = function(value){
	//if (!Settings.isTrue(Settings.CPU_ALT_DEBUG)) {
		if ((value & 0x01) != 0) {
			console.log("Enabling FastRom");
		} else {
			console.log("Disabling FastRom");
		}
	//}
	// TODO: actually do what it says it's doing
}

	/**
	 * 0x4210 - NMI Register
	 * Contents: x000vvvv
	 * x = Bitflag for if v-blank generates an NMI
	 * v = 5a22 Version number
	 */
CPURegisters.rdnmi = new HWRegister() 
CPURegisters.rdnmi.getValue = function(){
	var temp = this.val;
	this.val &= 0x7F;
	return temp;
}

	/**
	 * 0x4211 - IRQ Flag
	 */
CPURegisters.timeup = new HWRegister() 
CPURegisters.timeup.onWrite = function(value){
	CPU.irqFlag = false;
}
CPURegisters.timeup.getValue = function(){
	var t = (CPU.irqFlag ? 0x80 : 0);
	CPU.irqFlag = false;
	return t;
}
	
	/**
	 * 0x4016 - NES-Style Joypad Access Port 1
	 * Read: ------ca
	 * Write: -------l
	 * 
	 * First, the CPU writes a 1 to l to "latch" the controller. Then, the
	 * controller data can be read out of 4016 and 4017, one button at a time.
	 * Controller 1's data is in a/b, 2 is in c/d in joyser1
	 * 
	 */
CPURegisters.curButton = 16;
CPURegisters.joyLatch = false;
CPURegisters.joyser0 = new HWRegister()
		// TODO: Support multiple controllers
CPURegisters.joyser0.onWrite = function(value) {
	var newLatch = (value & 1) != 0;
	if (newLatch != CPURegisters.joyLatch) {
		curButton = 0;
	}
	CPURegisters.joyLatch = newLatch;
}
CPURegisters.joyser0.getValue = function(){
	var val = 0;
	val |= (Input.readButton(CPURegisters.curButton) ? 1 : 0);
	
	CPURegisters.curButton++;
	return val;
}

	/**
	 * 0x4017 - NES-Style Joypad Access Port 2
	 * Read: ---111db
	 */
CPURegisters.joyser1 = new HWRegister()
CPURegisters.joyser1.getValue = function(){
	var val = 0x1C;
	val |= (Input.readButton(CPURegisters.curButton) ? 1 : 0);
	
	return val;
}
	
CPURegisters.joy1l = new HWRegister() 
CPURegisters.joy1h = new HWRegister() 
CPURegisters.joy2l = new HWRegister() 
CPURegisters.joy2h = new HWRegister() 
CPURegisters.joy3l = new HWRegister() 
CPURegisters.joy3h = new HWRegister() 
CPURegisters.joy4l = new HWRegister() 
CPURegisters.joy5h = new HWRegister() 
