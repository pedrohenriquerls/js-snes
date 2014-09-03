
CPUMath = {}

	/**
	 * 0x4202 - The multiplicand
	 */
CPUMath.wrmpya = new HWRegister('', 0xFF)// Instance initializer, this register defaults to 0xFF on power on/reset
CPUMath.wrmpya.onRead = function(){
	// This register does nothing special by itself
	console.log("Cannot read from register 0x4202")
}
	
	/**
	 * 0x4203 - The multiplier
	 */
CPUMath.wrmpyb = new HWRegister()
CPUMath.wrmpyb.onWrite = function(value){
	this.val = value
	var result = CPUMath.wrmpya.getValue() * CPUMath.wrmpyb.getValue();
	CPUMath.rdmpyl.val = (result & 0xFF);
	CPUMath.rdmpyh.val = ((result>>8) & 0xFF);
}
CPUMath.wrmpyb.onRead = function(){
	console.log("Cannot read from register 0x4203")
}

	/**
	 * 0x4204 - Dividend, low byte
	 */
CPUMath.wrdivl = new HWRegister()
CPUMath.wrdivl.onRead = function(){
	console.log("Cannot read from register 0x4204")
}

	/**
	 * 0x4205 - Dividend, high byte
	 */
CPUMath.wrdivh = new HWRegister()
CPUMath.wrdivh.onRead = function(){
	console.log("Cannot read from register 0x4205")
}

	/**
	 * 0x4206 - Divisor
	 */
CPUMath.wrdivb = new HWRegister()
CPUMath.wrdivb.onRead = function(){
	console.log("Cannot read from register 0x4206")
}
CPUMath.wrdivb.onWrite = function(value){
	this.val = value
	var divisor = val & 0xFF;
	var dividend = ((CPUMath.wrdivh.val & 0xFF) <<8) | (CPUMath.wrdivl.val & 0xFF);
	
	var result=0, remainder =0;
	if (divisor != 0) {
		result = Math.round((dividend / divisor));
		remainder = dividend % divisor;
	}
	
	
	// Update the registers for the result
	CPUMath.rddivl.val = result & 0xFF;
	CPUMath.rddivh.val = (result >> 8) & 0xFF;
	
	// Update the registers for the remainder
	CPUMath.rdmpyl.val = remainder & 0xFF;
	CPUMath.rdmpyh.val = (remainder >> 8) & 0xFF;
}

	/**
	 * 0x4214 - Low byte of the quotient
	 */
CPUMath.rddivl = new HWRegister()
CPUMath.rddivl.onWrite = function(value){
	console.log("Cannot write to register 0x4214")
}

	/**
	 * 0x4215 - High byte of the quotient
	 */
CPUMath.rddivh = new HWRegister()
CPUMath.rddivh.onWrite = function(value){
	console.log("Cannot write to register 0x4215")
}

	/**
	 * 0x4216 - Low byte of the multiply result(or the remainder from a divide)
	 */
CPUMath.rdmpyl = new HWRegister()
CPUMath.rdmpyl.onWrite = function(value){
	console.log("Cannot write from register 0x4216")
}

	/**
	 * 0x4217 - High byte of the multiply result(or the remainder from a divide)
	 */
CPUMath.rdmpyh = new HWRegister()
CPUMath.rdmpyh.onWrite = function(value){
	console.log("Cannot write from register 0x4217")
}
