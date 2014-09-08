function _addressingMode(numArgs, load, save){
	this.numArgs = numArgs
	this.load = load === undefined ? true : load
}

_addressingMode.prototype = {
	getNumArgs: function() {
		if (this == AddressingMode.IMMEDIATE_MEMORY) {
			return (CPU.status.isMemoryAccess() ? 1 : 2);
		} else if (this == AddressingMode.IMMEDIATE_INDEX) {
			return (CPU.status.isIndexRegister() ? 1 : 2);
		}
		
		return this.numArgs;
	}
}

AddressingMode = {
	ACCUMULATOR: new _addressingMode(0, false, false),
	ABSOLUTE: new _addressingMode(2),
	ABSOLUTE_INDEXED_X: new _addressingMode(2),
	ABSOLUTE_INDEXED_Y: new _addressingMode(2),
	ABSOLUTE_INDEXED_INDIRECT: new _addressingMode(2),
	ABSOLUTE_INDIRECT: new _addressingMode(2),
	ABSOLUTE_INDIRECT_LONG: new _addressingMode(2),
	ABSOLUTE_LONG: new _addressingMode(3),
	ABSOLUTE_LONG_INDEXED_X: new _addressingMode(3),
	DIRECT_PAGE: new _addressingMode(1),
	DIRECT_PAGE_INDEXED_X: new _addressingMode(1),
	DIRECT_PAGE_INDEXED_Y: new _addressingMode(1),
	DIRECT_PAGE_INDEXED_INDIRECT_X: new _addressingMode(1),
	DIRECT_PAGE_INDEXED_INDIRECT_Y: new _addressingMode(1),
	DIRECT_PAGE_INDIRECT: new _addressingMode(1),
	DIRECT_PAGE_INDIRECT_LONG: new _addressingMode(1),
	DIRECT_PAGE_INDEXED_INDIRECT_LONG_Y: new _addressingMode(1),
	IMPLIED: new _addressingMode(0, false, false),
	IMMEDIATE_MEMORY: new _addressingMode(-1, true, false),
	IMMEDIATE_INDEX: new _addressingMode(-1, true, false),
	PROGRAM_COUNTER_RELATIVE: new _addressingMode(1),
	PROGRAM_COUNTER_RELATIVE_LONG: new _addressingMode(2),
	STACK_RELATIVE: new _addressingMode(1),
	STACK_RELATIVE_INDIRECT_INDEXED_Y: new _addressingMode(1),
	BLOCK_MOVE: new _addressingMode(2)
}
