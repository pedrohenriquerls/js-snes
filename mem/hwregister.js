function HWRegister(size, val){
	if(!val)
		this.val = 0
	else
		this.val = val
}

HWRegister.prototype = {
	getValue: function(){
		this.onRead();
		return this.val & 0xFF
	},
	onRead: function(){
		console.log('não façø nada...')
	},
	onWrite: function(value){
		this.val = value
	}
}