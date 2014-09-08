function CPU(){}

CPU.PAGE_SIZE = 256
CPU.a = null	// Accumulator
CPU.b = null	// "B" Register (Stores top bytes of A in 8-bit mode)
CPU.dbr = null	// Data Bank Register
CPU.x = null	// X Index Register
CPU.y = null	// Y Index Register
CPU.dp = null	// Direct Page Register
CPU.sp = null	// Stack Pointer
CPU.pbr = null	// Program Bank Register
CPU.pc = null	// Program Counter
CPU.status = null		// Processor Status Register
CPU.emulationMode = false
	
CPU.dataReg = null	// Data Register - Holds data based on op addressing mode
CPU.dataBank = 0			// Data Bank - Holds the bank being referenced by an op
CPU.dataAddr = 0			// Data Address - Holds the address being referenced by an op
	
	// Used for determining how many cycles an instruction takes
CPU.indexCrossedPageBoundary
	
	// Related to hardware registers
CPU.NMIEnable = false
CPU.standardControllerRead = false
CPU.timerH = false
CPU.timerV = false
	
CPU.htime = 0x1FF
CPU.vtime = 0x1FF
CPU.irqFlag = false

/**
 * IRQ Enable
 * 0 = No IRQ
 * 1 = IRQ on htime
 * 2 = IRQ on vtime
 * 3 = IRQ on vtime and htime (at the same time)
 */
CPU.irqEnable = 0
CPU.IRQ_V = 2
CPU.IRQ_H = 1
CPU.IRQ_VH = 3
	
CPU.userDisableIRQ = false
		
CPU.intIRQ = false	// If true next cycle performs an IRQ
CPU.intVBlank
	
CPU.tracingEnabled

/**
* Initializes the CPU to a blank state. Needed for unit tests.
*/
CPU.resetCPU = function() {
	CPU.a   = new Register(Size.SHORT, 0);	// Accumulator
	CPU.dbr = new Register(Size.BYTE, 0);	// Data Bank Register
	CPU.x   = new Register(Size.SHORT, 0);	// X Index Register
	CPU.y   = new Register(Size.SHORT, 0);	// Y Index Register
	CPU.dp  = new Register(Size.SHORT, 0);	// Direct Page Register
	CPU.sp  = new Register(Size.SHORT, 0x01FF);	// Stack Pointer
	CPU.pbr = new Register(Size.BYTE, 0);	// Program Bank Register
	CPU.pc  = new Register(Size.SHORT, 0);	// Program Counter
	CPU.status = new StatusRegister();		// Processor Status Register
	CPU.emulationMode = false;
	CPU.dataReg = new Register(Size.SHORT, 0);	// Data Register - Holds data based on op addressing mode
	CPU.dataBank = 0;			// Data Bank - Holds the bank being referenced by an op
	CPU.dataAddr = 0;			// Data Address - Holds the address being referenced by an op
	
	CPU.indexCrossedPageBoundary = false;
	
	//CPU.tracingEnabled = Settings.isTrue(Settings.CPU_DEBUG_TRACE);
}

CPU.jmp = []
// Add with Carry
CPU.jmp[0x69] = Add.addImmediate;
CPU.jmp[0x61] = Add.addDPIndirectX;
CPU.jmp[0x63] = Add.addStackRelative;
CPU.jmp[0x65] = Add.addDP;
CPU.jmp[0x67] = Add.addDPIndirectLong;
CPU.jmp[0x6D] = Add.addAbsolute;
CPU.jmp[0x6F] = Add.addAbsoluteLong;
CPU.jmp[0x71] = Add.addDPIndirectY;
CPU.jmp[0x72] = Add.addDPIndirect;
CPU.jmp[0x73] = Add.addSRIndirectY;
CPU.jmp[0x75] = Add.addDPX;
CPU.jmp[0x77] = Add.addDPIndirectLongY;
CPU.jmp[0x79] = Add.addAbsoluteY;
CPU.jmp[0x7D] = Add.addAbsoluteX;
CPU.jmp[0x7F] = Add.addAbsoluteLongX;

// AND Accumulator with Memory
CPU.jmp[0x21] = AndAWithMemory.andAMemDPIndirectX;
CPU.jmp[0x23] = AndAWithMemory.andAMemStackRelative;
CPU.jmp[0x25] = AndAWithMemory.andAMemDP;
CPU.jmp[0x27] = AndAWithMemory.andAMemDPIndirectLong;
CPU.jmp[0x29] = AndAWithMemory.andAMemImmediate;
CPU.jmp[0x2D] = AndAWithMemory.andAMemAbsolute;
CPU.jmp[0x2F] = AndAWithMemory.andAMemAbsoluteLong;
CPU.jmp[0x31] = AndAWithMemory.andAMemDPIndirectY;
CPU.jmp[0x32] = AndAWithMemory.andAMemDPIndirect;
CPU.jmp[0x33] = AndAWithMemory.andAMemSRIndirectY;
CPU.jmp[0x35] = AndAWithMemory.andAMemDPIndexedX;
CPU.jmp[0x37] = AndAWithMemory.andAMemDPIndirectLongY;
CPU.jmp[0x39] = AndAWithMemory.andAMemAbsoluteY;
CPU.jmp[0x3D] = AndAWithMemory.andAMemAbsoluteX;
CPU.jmp[0x3F] = AndAWithMemory.andAMemAbsoluteLongX;

// Compare A with Memory
CPU.jmp[0xC1] = CompareAWithMemory.cmpADPIndirectX;
CPU.jmp[0xC3] = CompareAWithMemory.cmpAStackRelative;
CPU.jmp[0xC5] = CompareAWithMemory.cmpADP;
CPU.jmp[0xC7] = CompareAWithMemory.cmpADPIndirectLong;
CPU.jmp[0xC9] = CompareAWithMemory.cmpAImmediate;
CPU.jmp[0xCD] = CompareAWithMemory.cmpAAbsolute;
CPU.jmp[0xCF] = CompareAWithMemory.cmpAAbsoluteLong;
CPU.jmp[0xD1] = CompareAWithMemory.cmpADPIndirectY;
CPU.jmp[0xD2] = CompareAWithMemory.cmpADPIndirect;
CPU.jmp[0xD3] = CompareAWithMemory.cmpASRIndirectY;
CPU.jmp[0xD5] = CompareAWithMemory.cmpADPX;
CPU.jmp[0xD7] = CompareAWithMemory.cmpADPIndirectLongY;
CPU.jmp[0xD9] = CompareAWithMemory.cmpAAbsoluteY;
CPU.jmp[0xDD] = CompareAWithMemory.cmpAAbsoluteX;
CPU.jmp[0xDF] = CompareAWithMemory.cmpAAbsoluteLongX;

// Compare X With Memory
CPU.jmp[0xE0] = CompareXWithMemory.cmpXImmediate;
CPU.jmp[0xE4] = CompareXWithMemory.cmpXDP;
CPU.jmp[0xEC] = CompareXWithMemory.cmpXAbsolute;

// Compare Y With Memory
CPU.jmp[0xC0] = CompareYWithMemory.cmpYImmediate;
CPU.jmp[0xC4] = CompareYWithMemory.cmpYDP;
CPU.jmp[0xCC] = CompareYWithMemory.cmpYAbsolute;

// Decrement
CPU.jmp[0x3A] = Decrement.decAccumulator;
CPU.jmp[0xCE] = Decrement.decAbsolute;
CPU.jmp[0xC6] = Decrement.decDirectPage;
CPU.jmp[0xDE] = Decrement.decAbsoluteX;
CPU.jmp[0xD6] = Decrement.decDirectPageX;
CPU.jmp[0xCA] = Decrement.decX;
CPU.jmp[0x88] = Decrement.decY;

// Flag Ops
CPU.jmp[0x18] = FlagOps.clearCarryFlag;
CPU.jmp[0x38] = FlagOps.setCarryFlag;
CPU.jmp[0x58] = FlagOps.clearInterruptDisableFlag;
CPU.jmp[0x78] = FlagOps.setInterruptDisableFlag;
CPU.jmp[0xB8] = FlagOps.clearOverflowFlag;
CPU.jmp[0xC2] = FlagOps.resetProcessorStatusBits;
CPU.jmp[0xD8] = FlagOps.clearDecimalModeFlag;
CPU.jmp[0xE2] = FlagOps.setProcessorStatusBits;
CPU.jmp[0xF8] = FlagOps.setDecimalModeFlag;
CPU.jmp[0xFB] = FlagOps.exchangeCarryEmulationFlag;

// Increment
CPU.jmp[0x1A] = Increment.incAccumulator;
CPU.jmp[0xC8] = Increment.incY;
CPU.jmp[0xE6] = Increment.incDirectPage;
CPU.jmp[0xE8] = Increment.incX;
CPU.jmp[0xEE] = Increment.incAbsolute;
CPU.jmp[0xF6] = Increment.incDirectPageX;
CPU.jmp[0xFE] = Increment.incAbsoluteX;

// Jump
CPU.jmp[0x4C] = Jump.jumpAbsolute;
CPU.jmp[0x6C] = Jump.jumpAbsoluteIndirect;
CPU.jmp[0x7C] = Jump.jumpAbsoluteIndexedIndirect;
CPU.jmp[0x5C] = Jump.jumpAbsoluteLong;
CPU.jmp[0xDC] = Jump.jumpAbsoluteIndirectLong;

// Jump to Subroutine
CPU.jmp[0x20] = Jump.jumpSubAbsolute;
CPU.jmp[0xFC] = Jump.jumpSubAbsoluteIndexedIndirect;
CPU.jmp[0x22] = Jump.jumpSubLong;

// Branching
CPU.jmp[0x10] = Branching.branchPlus;
CPU.jmp[0x30] = Branching.branchMinus;
CPU.jmp[0x50] = Branching.branchOverflowClear;
CPU.jmp[0x70] = Branching.branchOverflowSet;
CPU.jmp[0x80] = Branching.branchAlways;
CPU.jmp[0x82] = Branching.branchAlwaysLong;
CPU.jmp[0x90] = Branching.branchCarryClear;
CPU.jmp[0xB0] = Branching.branchCarrySet;
CPU.jmp[0xD0] = Branching.branchNotEqual;
CPU.jmp[0xF0] = Branching.branchEqual;

// Load Accumulator from Memory
CPU.jmp[0xA1] = LoadAFromMemory.loadADPIndexedIndirectX;
CPU.jmp[0xA3] = LoadAFromMemory.loadAStackRelative;
CPU.jmp[0xA5] = LoadAFromMemory.loadADirectPage;
CPU.jmp[0xA7] = LoadAFromMemory.loadADPIndirectLong;
CPU.jmp[0xA9] = LoadAFromMemory.loadAImmediate;
CPU.jmp[0xAD] = LoadAFromMemory.loadAAbsolute;
CPU.jmp[0xAF] = LoadAFromMemory.loadAAbsoluteLong;
CPU.jmp[0xB1] = LoadAFromMemory.loadADPIndirectIndexedY;
CPU.jmp[0xB2] = LoadAFromMemory.loadADPIndirect;
CPU.jmp[0xB3] = LoadAFromMemory.loadASRIndirectIndexedY;
CPU.jmp[0xB5] = LoadAFromMemory.loadADirectPageX;
CPU.jmp[0xB7] = LoadAFromMemory.loadADPIndirectLongIndexedY;
CPU.jmp[0xB9] = LoadAFromMemory.loadAAbsoluteIndexedY;
CPU.jmp[0xBD] = LoadAFromMemory.loadAAbsoluteIndexedX;
CPU.jmp[0xBF] = LoadAFromMemory.loadAAbsoluteLongIndexedX;

// Load X from Memory
CPU.jmp[0xA2] = LoadXFromMemory.loadXImmediate;
CPU.jmp[0xAE] = LoadXFromMemory.loadXAbsolute;
CPU.jmp[0xA6] = LoadXFromMemory.loadXDirectPage;
CPU.jmp[0xBE] = LoadXFromMemory.loadXAbsoluteY;
CPU.jmp[0xB6] = LoadXFromMemory.loadXDirectPageY;

// Load X from Memory
CPU.jmp[0xA0] = LoadYFromMemory.loadYImmediate;
CPU.jmp[0xAC] = LoadYFromMemory.loadYAbsolute;
CPU.jmp[0xA4] = LoadYFromMemory.loadYDirectPage;
CPU.jmp[0xBC] = LoadYFromMemory.loadYAbsoluteX;
CPU.jmp[0xB4] = LoadYFromMemory.loadYDirectPageX;

// OR Accumulator with Memory
CPU.jmp[0x01] = OrAWithMemory.orAMemDPIndirectX;
CPU.jmp[0x03] = OrAWithMemory.orAMemStackRelative;
CPU.jmp[0x05] = OrAWithMemory.orAMemDP;
CPU.jmp[0x07] = OrAWithMemory.orAMemDPIndirectLong;
CPU.jmp[0x09] = OrAWithMemory.orAMemImmediate;
CPU.jmp[0x0D] = OrAWithMemory.orAMemAbsolute;
CPU.jmp[0x0F] = OrAWithMemory.orAMemAbsoluteLong;
CPU.jmp[0x11] = OrAWithMemory.orAMemDPIndirectY;
CPU.jmp[0x12] = OrAWithMemory.orAMemDPIndirect;
CPU.jmp[0x13] = OrAWithMemory.orAMemSRIndirectY;
CPU.jmp[0x15] = OrAWithMemory.orAMemDPIndexedX;
CPU.jmp[0x17] = OrAWithMemory.orAMemDPIndirectLongY;
CPU.jmp[0x19] = OrAWithMemory.orAMemAbsoluteY;
CPU.jmp[0x1D] = OrAWithMemory.orAMemAbsoluteX;
CPU.jmp[0x1F] = OrAWithMemory.orAMemAbsoluteLongX;

// EOR Accumulator with Memory
CPU.jmp[0x41] = EOrAWithMemory.eorAMemDPIndirectX;
CPU.jmp[0x43] = EOrAWithMemory.eorAMemStackRelative;
CPU.jmp[0x45] = EOrAWithMemory.eorAMemDP;
CPU.jmp[0x47] = EOrAWithMemory.eorAMemDPIndirectLong;
CPU.jmp[0x49] = EOrAWithMemory.eorAMemImmediate;
CPU.jmp[0x4D] = EOrAWithMemory.eorAMemAbsolute;
CPU.jmp[0x4F] = EOrAWithMemory.eorAMemAbsoluteLong;
CPU.jmp[0x51] = EOrAWithMemory.eorAMemDPIndirectY;
CPU.jmp[0x52] = EOrAWithMemory.eorAMemDPIndirect;
CPU.jmp[0x53] = EOrAWithMemory.eorAMemSRIndirectY;
CPU.jmp[0x55] = EOrAWithMemory.eorAMemDPIndexedX;
CPU.jmp[0x57] = EOrAWithMemory.eorAMemDPIndirectLongY;
CPU.jmp[0x59] = EOrAWithMemory.eorAMemAbsoluteY;
CPU.jmp[0x5D] = EOrAWithMemory.eorAMemAbsoluteX;
CPU.jmp[0x5F] = EOrAWithMemory.eorAMemAbsoluteLongX;

// Pull
CPU.jmp[0x68] = Pull.pullAccumulator;
CPU.jmp[0xAB] = Pull.pullDataBank;
CPU.jmp[0x2B] = Pull.pullDirectPage;
CPU.jmp[0x28] = Pull.pullStatus;
CPU.jmp[0xFA] = Pull.pullX;
CPU.jmp[0x7A] = Pull.pullY;

// Push
CPU.jmp[0xF4] = Push.pushEffectiveAbsolute;
CPU.jmp[0xD4] = Push.pushEffectiveIndirect;
CPU.jmp[0x62] = Push.pushEffectivePC;
CPU.jmp[0x48] = Push.pushAccumulator;
CPU.jmp[0x8B] = Push.pushDataBank;
CPU.jmp[0x0B] = Push.pushDirectPage;
CPU.jmp[0x4B] = Push.pushProgramBank;
CPU.jmp[0x08] = Push.pushStatus;
CPU.jmp[0xDA] = Push.pushX;
CPU.jmp[0x5A] = Push.pushY;

// Return
CPU.jmp[0x40] = Return.returnFromInterrupt;
CPU.jmp[0x6B] = Return.returnFromSubroutineLong;
CPU.jmp[0x60] = Return.returnFromSubroutine;

// Rotate
CPU.jmp[0x2A] = Rotate.rotateLeftAccumulator;
CPU.jmp[0x2E] = Rotate.rotateLeftAbsolute;
CPU.jmp[0x26] = Rotate.rotateLeftDP;
CPU.jmp[0x3E] = Rotate.rotateLeftAbsoluteX;
CPU.jmp[0x36] = Rotate.rotateLeftDPX;
CPU.jmp[0x6A] = Rotate.rotateRightAccumulator;
CPU.jmp[0x6E] = Rotate.rotateRightAbsolute;
CPU.jmp[0x66] = Rotate.rotateRightDP;
CPU.jmp[0x7E] = Rotate.rotateRightAbsoluteX;
CPU.jmp[0x76] = Rotate.rotateRightDPX;

// Shift
CPU.jmp[0x0A] = Shift.shiftLeftAccumulator;
CPU.jmp[0x06] = Shift.shiftLeftDP;
CPU.jmp[0x0E] = Shift.shiftLeftAbsolute;
CPU.jmp[0x1E] = Shift.shiftLeftAbsoluteX;
CPU.jmp[0x16] = Shift.shiftLeftDPX;
CPU.jmp[0x4A] = Shift.shiftRightAccumulator;
CPU.jmp[0x4E] = Shift.shiftRightAbsolute;
CPU.jmp[0x46] = Shift.shiftRightDP;
CPU.jmp[0x5E] = Shift.shiftRightAbsoluteX;
CPU.jmp[0x56] = Shift.shiftRightDPX;

// Store X to Memory
CPU.jmp[0x86] = StoreXToMemory.storeXDirectPage;
CPU.jmp[0x8E] = StoreXToMemory.storeXAbsolute;
CPU.jmp[0x96] = StoreXToMemory.storeXDPIndexedY;

// Store Y to Memory
CPU.jmp[0x84] = StoreYToMemory.storeYDirectPage;
CPU.jmp[0x8C] = StoreYToMemory.storeYAbsolute;
CPU.jmp[0x94] = StoreYToMemory.storeYDPIndexedX;

// Store A to Memory
CPU.jmp[0x81] = StoreAToMemory.saveADPIndexedIndirectX;
CPU.jmp[0x83] = StoreAToMemory.saveAStackRelative;
CPU.jmp[0x85] = StoreAToMemory.saveADirectPage;
CPU.jmp[0x87] = StoreAToMemory.saveADPIndirectLong;
CPU.jmp[0x8D] = StoreAToMemory.saveAAbsolute;
CPU.jmp[0x8F] = StoreAToMemory.saveAAbsoluteLong;
CPU.jmp[0x91] = StoreAToMemory.saveADPIndirectIndexedY;
CPU.jmp[0x92] = StoreAToMemory.saveADPIndirect;
CPU.jmp[0x93] = StoreAToMemory.saveASRIndirectIndexedY;
CPU.jmp[0x95] = StoreAToMemory.saveADirectPageX;
CPU.jmp[0x97] = StoreAToMemory.saveADPIndirectLongIndexedY;
CPU.jmp[0x99] = StoreAToMemory.saveAAbsoluteIndexedY;
CPU.jmp[0x9D] = StoreAToMemory.saveAAbsoluteIndexedX;
CPU.jmp[0x9F] = StoreAToMemory.saveAAbsoluteLongIndexedX;

// Store Zero to Memory
CPU.jmp[0x64] = StoreZeroToMemory.storeZeroDirectPage;
CPU.jmp[0x74] = StoreZeroToMemory.storeZeroDPIndexedX;
CPU.jmp[0x9C] = StoreZeroToMemory.storeZeroAbsolute;
CPU.jmp[0x9E] = StoreZeroToMemory.storeZeroAbsoluteIndexedX;

// Subtract with Borrow from Accumulator
CPU.jmp[0xE9] = Subtract.subFromAImmediate;
CPU.jmp[0xE1] = Subtract.subFromADPIndirectX;
CPU.jmp[0xE3] = Subtract.subFromAStackRelative;
CPU.jmp[0xE5] = Subtract.subFromADP;
CPU.jmp[0xE7] = Subtract.subFromADPIndirectLong;
CPU.jmp[0xED] = Subtract.subFromAAbsolute;
CPU.jmp[0xEF] = Subtract.subFromAAbsoluteLong;
CPU.jmp[0xF1] = Subtract.subFromADPIndirectY;
CPU.jmp[0xF2] = Subtract.subFromADPIndirect;
CPU.jmp[0xF3] = Subtract.subFromASRIndirectY;
CPU.jmp[0xF5] = Subtract.subFromADPX;
CPU.jmp[0xF7] = Subtract.subFromADPIndirectLongY;
CPU.jmp[0xF9] = Subtract.subFromAAbsoluteY;
CPU.jmp[0xFD] = Subtract.subFromAAbsoluteX;
CPU.jmp[0xFF] = Subtract.subFromAAbsoluteLongX;

// Test Bits
CPU.jmp[0x04] = TestBits.testSetDP;
CPU.jmp[0x0C] = TestBits.testSetAbsolute;
CPU.jmp[0x89] = TestBits.testImmediate;
CPU.jmp[0x2C] = TestBits.testAbsolute;
CPU.jmp[0x24] = TestBits.testDP;
CPU.jmp[0x3C] = TestBits.testAbsoluteX;
CPU.jmp[0x34] = TestBits.testDPX;
CPU.jmp[0x14] = TestBits.testResetDP;
CPU.jmp[0x1C] = TestBits.testResetAbsolute;

// Transfer
CPU.jmp[0xAA] = Transfer.transferAtoX;
CPU.jmp[0xA8] = Transfer.transferAtoY;
CPU.jmp[0x5B] = Transfer.transferAtoDP;
CPU.jmp[0x1B] = Transfer.transferAtoSP;
CPU.jmp[0x7B] = Transfer.transferDPtoA;
CPU.jmp[0x3B] = Transfer.transferSPtoA;
CPU.jmp[0xBA] = Transfer.transferSPtoX;
CPU.jmp[0x8A] = Transfer.transferXtoA;
CPU.jmp[0x9A] = Transfer.transferXtoSP;
CPU.jmp[0x9B] = Transfer.transferXtoY;
CPU.jmp[0x98] = Transfer.transferYtoA;
CPU.jmp[0xBB] = Transfer.transferYtoX;

// Miscellaneous Instructions
CPU.jmp[0x00] = Misc.softwareBreak;
CPU.jmp[0xEA] = Misc.nop;
CPU.jmp[0x42] = Misc.wdm;
CPU.jmp[0xEB] = Misc.exchangeBA;
CPU.jmp[0x02] = Misc.coprocessorEnable;
CPU.jmp[0xDB] = Misc.stopProcessor;

//Block Move
CPU.jmp[0x54] = BlockMove.blockMoveNegative;
CPU.jmp[0x44] = BlockMove.blockMovePositive;

//Unimplemented
/*
 * 0xCB Wait for Interrupt - Implied - WAI
 */

 /**
 * When run, the next instruction cycle will trigger an NMI
 */
CPU.triggerVBlank = function() {
	CPU.intVBlank = true;
}
	
/**
 * When run, next instruction cycle triggers an IRQ;
 */
CPU.triggerIRQ = function() {
	CPU.intIRQ = !CPU.userDisableIRQ;
}
	
CPU.checkInterrupts = function() {
	if (CPU.NMIEnable && CPU.intVBlank) {
		/*if (!Settings.isTrue(Settings.CPU_ALT_DEBUG)) {
			Log.debug("Running vblank handler: " + Integer.toHexString(Core.mem.get(Size.SHORT, 0, 0xFFEA)));
		} else {
			Log.instruction("*** NMI");
		}*/
		
		CPU.stackPush(Size.BYTE,  CPU.pbr.getValue());
		CPU.stackPush(Size.SHORT, CPU.pc.getValue());
		CPU.stackPush(Size.BYTE,  CPU.status.getValue());
		
		CPU.status.setDecimalMode(false); // See pg 194 in the cpu documentation
		
		CPU.pbr.setValue(0);
		if (!CPU.emulationMode)
			CPU.pc.setValue(Core.mem.read(Size.SHORT, 0, 0xFFEA));
		else
			CPU.pc.setValue(Core.mem.read(Size.SHORT, 0, 0xFFFA));
		
		CPU.intVBlank = false;
		
		return true;
	} else if (CPU.intIRQ) {
		CPU.intIRQ = false;
		if (!CPU.status.isIrqDisable()) {
			/*if (!Settings.isTrue(Settings.CPU_ALT_DEBUG)) {
				Log.debug("Running irq handler: " + Integer.toHexString(Core.mem.get(Size.SHORT, 0, 0xFFEE)));
			} else {
				Log.instruction("*** IRQ");
			}*/
			
			CPU.irqFlag = true;
			
			CPU.stackPush(Size.BYTE,  CPU.pbr.getValue());
			CPU.stackPush(Size.SHORT, CPU.pc.getValue());
			CPU.stackPush(Size.BYTE,  CPU.status.getValue());
			CPU.status.setDecimalMode(false); // See pg 194 in the cpu documentation
			CPU.pbr.setValue(0);
			
			if (!CPU.emulationMode)
				CPU.pc.setValue(Core.mem.read(Size.SHORT, 0, 0xFFEE));
			else
				CPU.pc.setValue(Core.mem.read(Size.SHORT, 0, 0xFFFE));
			
			return true;
		}
	}
	
	return false;
}
	
/**
 * Processes the instruction at the current PBR/PC as well as handling interrupts and other
 * per-cycle things.
 * 
 * @return Number of cycles the last instruction took
 */
CPU.cycle = function() {
	CPU.indexCrossedPageBoundary = false;
	
	CPU.checkInterrupts();
	
	// Save bank/pc values for display later
	var bank = CPU.pbr.getValue();
	var addr = CPU.pc.getValue();
	
	// Get the current opcode
	var opcode = Core.mem.read(Size.BYTE, CPU.pbr.getValue(), CPU.pc.getValue());
	CPU.pc.add(1);
	
	// Get the current instruction
	var inst = CPU.jmp[opcode];
	if (inst == null) 
		alert('Instruction: '+opcode+' not implemented')
		//throw new RuntimeException(String.format("Instruction not implemented: 0x%02x", opcode));
	
	// Init argument array
	var args = [];
	if (inst.addrMode == AddressingMode.IMPLIED) {	// Implied instructions determine their argument count
		args = [inst.argCount];
	} else {
		args = [inst.addrMode.getNumArgs()];
	}
	
	// Grab arguments
	if (args.length > 0) {
		for (var k = 0; k < args.length; k++) {
			args[k] = Core.mem.read(Size.BYTE, CPU.pbr.getValue(), CPU.pc.getValue());
			CPU.pc.add(1);
		}
	}
	
	// Log current instruction
	//if (Log.instruction.enabled()) 
		//CPU.logInstruction(opcode, args, bank, addr);	

	if(CPU.tracingEnabled)
		CPUState.saveState(opcode, args);
	
	// Perform the instruction (finally)
	//console.log(inst)
	Timing.cycle(inst.run(args)*6);
}

/**
 * Performs a single instruction (used by unit tests)
 * 
 * @param opcode Opcode of instruction to perform
 * @param args Arguments to pass to instruction
 */
CPU.doOp = function(opcode, args) {
	var inst = CPU.jmp[opcode];
	
	//loadDataRegister(inst.addrMode, inst.size.getRealSize(), args);
	inst.run(args);
}

/**
 * Loads the data register and associated vars with data based on addressing mode and arguments
 * 
 * @param mode Addressing mode to use
 * @param size Size of data being loaded
 * @param args Arguments to instruction (contains addressing info)
 */
CPU.loadDataRegister = function(mode, size, args) {
	// Quick exit if implied
	if (!mode.load) return;
	
	// What addressing mode are we using?
	var indirectAddr, directAddr, origDataAddr;
	switch (mode) {
		case AddressingMode.ABSOLUTE:
			CPU.dataBank = CPU.dbr.getValue();
			CPU.dataAddr = Util.limitShort((args[1] << 8) + args[0]);
			break;
		
		case AddressingMode.ABSOLUTE_INDEXED_X:
			CPU.dataBank = CPU.dbr.getValue();
			CPU.dataAddr = Util.limitShort(((args[1] << 8) + args[0]) + CPU.x.getValue());
			
			// Determine if index crossed page boundary
			origDataAddr = (args[1] << 8) + args[0];
			if (origDataAddr / CPU.PAGE_SIZE != CPU.dataAddr / CPU.PAGE_SIZE)
				CPU.indexCrossedPageBoundary = true;
			break;
		
		case AddressingMode.ABSOLUTE_INDEXED_Y:
			CPU.dataBank = CPU.dbr.getValue();
			CPU.dataAddr = Util.limitShort(((args[1] << 8) + args[0]) + CPU.y.getValue());
			
			// Determine if index crossed page boundary
			origDataAddr = (args[1] << 8) + args[0];
			if (origDataAddr / CPU.PAGE_SIZE != CPU.dataAddr / CPU.PAGE_SIZE)
				CPU.indexCrossedPageBoundary = true;
			break;
			
		case AddressingMode.ABSOLUTE_INDEXED_INDIRECT:
			indirectAddr = Util.limitShort(((args[1] << 8) + args[0]) + CPU.x.getValue());
			CPU.dataBank = CPU.pbr.getValue();
			CPU.dataAddr = Core.mem.read(Size.SHORT, CPU.pbr.getValue(), indirectAddr);
			break;
		
		case AddressingMode.ABSOLUTE_LONG:
			CPU.dataBank = args[2];
			CPU.dataAddr = Util.limitShort((args[1] << 8) + args[0]);
			break;
		
		case AddressingMode.ABSOLUTE_LONG_INDEXED_X:
			directAddr = (args[2] << 16) + (args[1] << 8) + args[0];
			directAddr += CPU.x.getValue();
			
			CPU.dataBank = (directAddr & 0xFF0000) >> 16;
			CPU.dataAddr = directAddr & 0xFFFF;
			break;
		
		case AddressingMode.ABSOLUTE_INDIRECT:
			indirectAddr = Util.limitShort((args[1] << 8) + args[0]);
			CPU.dataBank = CPU.pbr.getValue();
			CPU.dataAddr = Core.mem.read(Size.SHORT, 0, indirectAddr);
			break;
			
		case AddressingMode.ABSOLUTE_INDIRECT_LONG:
			indirectAddr = Util.limitShort((args[1] << 8) + args[0]);
			CPU.dataBank = Core.mem.read(Size.BYTE, 0, Util.limitShort(indirectAddr + 2));
			CPU.dataAddr = Core.mem.read(Size.SHORT, 0, indirectAddr);
			break;
		
		case AddressingMode.DIRECT_PAGE:
			CPU.dataBank = 0;
			CPU.dataAddr = Util.limitShort(args[0] + CPU.dp.getValue());
			break;
		
		case AddressingMode.DIRECT_PAGE_INDEXED_X:
			CPU.dataBank = 0;
			CPU.dataAddr = Util.limitShort(args[0] + CPU.dp.getValue() + CPU.x.getValue());
			break;
		
		case AddressingMode.DIRECT_PAGE_INDEXED_Y:
			CPU.dataBank = 0;
			CPU.dataAddr = Util.limitShort(args[0] + CPU.dp.getValue() + CPU.y.getValue());
			break;
		
		case AddressingMode.DIRECT_PAGE_INDIRECT:
			indirectAddr = Util.limitShort(CPU.dp.getValue() + args[0]);
			CPU.dataBank = CPU.dbr.getValue();
			CPU.dataAddr = Core.mem.read(Size.SHORT, 0, indirectAddr);
			break;
		
		case AddressingMode.DIRECT_PAGE_INDIRECT_LONG:
			indirectAddr = Util.limitShort(CPU.dp.getValue() + args[0]);
			CPU.dataBank = Core.mem.read(Size.BYTE, 0, Util.limitShort(indirectAddr + 2));
			CPU.dataAddr = Core.mem.read(Size.SHORT, 0, indirectAddr);
			break;
		
		case AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_X:
			indirectAddr = Util.limitShort(CPU.dp.getValue() + CPU.x.getValue() + args[0]);
			CPU.dataBank = CPU.dbr.getValue();
			CPU.dataAddr = Core.mem.read(Size.SHORT, 0, indirectAddr);
			break;
		
		case AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_Y:
			indirectAddr = Util.limitShort(CPU.dp.getValue() + args[0]);
			
			// Very odd; 24-bit number plus 16-bit number
			directAddr = Core.mem.read(Size.SHORT, 0, indirectAddr);
			origDataAddr = directAddr;
			directAddr += (CPU.dbr.getValue() << 16);
			directAddr += CPU.y.getValue();
			
			CPU.dataBank = (directAddr & 0xFF0000) >> 16;
			CPU.dataAddr = directAddr & 0xFFFF;
			
			// Determine if index crossed page boundary
			if (origDataAddr / CPU.PAGE_SIZE != CPU.dataAddr / CPU.PAGE_SIZE)
				CPU.indexCrossedPageBoundary = true;
			break;
		
		case AddressingMode.DIRECT_PAGE_INDEXED_INDIRECT_LONG_Y:
			indirectAddr = Util.limitShort(CPU.dp.getValue() + args[0]);
			
			// Very odd; 24-bit number plus 16-bit number
			directAddr = Core.mem.read(Size.SHORT, 0, indirectAddr);
			origDataAddr = directAddr;
			directAddr += (Core.mem.read(Size.BYTE, 0, Util.limitShort(indirectAddr + 2)) << 16);
			directAddr += CPU.y.getValue();
			
			CPU.dataBank = (directAddr & 0xFF0000) >> 16;
			CPU.dataAddr = directAddr & 0xFFFF;
			
			// Determine if index crossed page boundary
			if (origDataAddr / CPU.PAGE_SIZE != CPU.dataAddr / CPU.PAGE_SIZE)
				CPU.indexCrossedPageBoundary = true;
			break;
		
		case AddressingMode.PROGRAM_COUNTER_RELATIVE:
			CPU.dataReg.setValue(Size.SHORT, Util.signExtendByte(args[0]));
			// Don't bother loading
			return;

		case AddressingMode.PROGRAM_COUNTER_RELATIVE_LONG:
			CPU.dataReg.setValue(Size.SHORT, (args[1] << 8) + args[0]);
			// Don't bother loading
			return;
		
		case AddressingMode.STACK_RELATIVE:
			CPU.dataBank = 0;
			CPU.dataAddr = Util.limitShort(CPU.sp.getValue() + args[0]);
			break;
		
		case AddressingMode.STACK_RELATIVE_INDIRECT_INDEXED_Y:
			indirectAddr = Util.limitShort(CPU.sp.getValue() + args[0]);
			
			// Very odd; 24-bit number plus 16-bit number
			directAddr = Core.mem.read(Size.SHORT, 0, indirectAddr) + (CPU.dbr.getValue() << 16);
			directAddr += CPU.y.getValue();
			
			CPU.dataBank = (directAddr & 0xFF0000) >> 16;
			CPU.dataAddr = directAddr & 0xFFFF;
			break;
		case AddressingMode.IMMEDIATE_MEMORY:
			if (CPU.status.isMemoryAccess()) {
				CPU.dataReg.setValue(size, args[0]);
			} else {
				CPU.dataReg.setValue(size, (args[1] << 8) + args[0]);
			}
			
			// Don't bother loading from an address
			return;
		case AddressingMode.IMMEDIATE_INDEX:
			if (CPU.status.isIndexRegister()) {
				CPU.dataReg.setValue(size, args[0]);
			} else {
				CPU.dataReg.setValue(size, (args[1] << 8) + args[0]);
			}
			
			// Don't bother loading from an address
			return;
	}
	
	// Load from memory
	CPU.dataReg.setValue(size, Core.mem.read(CPU.size, CPU.dataBank, CPU.dataAddr));
}

/**
 * Saves the contents of the data register back into memory where it was loaded from
 */
CPU.saveDataReg = function() {
	Core.mem.write(CPU.dataReg.getSize(), CPU.dataBank, CPU.dataAddr, CPU.dataReg.getValue());
}

/**
 * Pushes a value onto the stack and decrements the stack pointer
 * 
 * @param size Size of value to store
 * @param value Value to store
 */
CPU.stackPush = function(size, value) {
	if (size.getRealSize() == Size.SHORT) {
		CPU.sp.subtract(2);
		Core.mem.write(Size.SHORT, 0, CPU.sp.getValue() + 1, value);
	} else {
		Core.mem.write(Size.BYTE, 0, CPU.sp.getValue(), value);
		CPU.sp.subtract(1);
	}
}

/**
 * Pulls a value from the "top" of the stack and increments the stack pointer
 * 
 * @param size Size of value to pull
 * @return Value at the top of the stack
 */
CPU.stackPull = function(size) {
	if (size.getRealSize() == Size.SHORT) {
		CPU.sp.add(2);
		return Core.mem.read(Size.SHORT, 0, CPU.sp.getValue() - 1);
	} else {
		CPU.sp.add(1);
		return Core.mem.read(Size.BYTE, 0, CPU.sp.getValue());
	}
}

/**
 * Grabs the value from the top of the stack without removing it
 * 
 * @param size Size of value to peek
 * @return Value at the top of the stack
 */
CPU.stackPeek = function(size) {
	return Core.mem.read(size.getRealSize(), 0, CPU.sp.getValue() + 1);
}

/**
 * Initializes the CPU and registers during a reset vector interrupt
 */
CPU.resetVectorInit = function() {
	CPU.sp.setValue(0x0100 + (CPU.sp.getValue() & 0xFF)); // Stack High = 01
	CPU.dp.setValue(0); // Direct Page = 0000;
	CPU.pbr.setValue(0); // Program Bank = 00;
	CPU.dbr.setValue(0); // Data Bank = 00;
	
	CPU.irqFlag = false;
	
	CPU.status.setMemoryAccess(true); // m = 1
	CPU.status.setIndexRegister(true); // x = 1
	CPU.status.setDecimalMode(false); // d = 0
	CPU.status.setIrqDisable(true); // i = 1
	
	CPU.emulationMode = true; // Emulation flag = 1
	
	// Follow reset vector
	var reset = Core.mem.read(Size.SHORT, 0, 0xFFFC);
	//Log.debug(String.format("Reset Vector: 0x%04x\n", reset & 0xFFFF));
	CPU.pc.setValue(reset & 0xFFFF);
}


/** TODO: debug
 * Logs an instruction to the debug log
 * 
 * @param opcode Opcode on instruction
 * @param args Array of opcode arguments
 * @param bank Bank where opcode is located
 * @param addr Address where opcode is located
 */
/*CPU.logInstruction = function(opcode, args, bank, addr) {
	var inst = CPU.jmp[opcode];
	
	var strArgs = []//new String[args.length];
	if (args.length > 0) {
		for (var k = 0; k < args.length; k++) {
			strArgs[k] = args[k].toString(16)//Integer to hex;
			if (strArgs[k].length()==1) {
				strArgs[k] = '0'+strArgs[k];
			}
		}
	}
	
	if (Settings.isTrue(Settings.CPU_ALT_DEBUG)) {
		String argsString="";
		boolean argsCap = true;
		
		// Special cases for different addressing modes
		switch(inst.addrMode) {
			case IMMEDIATE_MEMORY:
			case IMMEDIATE_INDEX:
				argsString = "#$";
				for (var i = strArgs.length-1;i>=0;i--) {
					argsString += strArgs[i];
				}
				break;
			
			case ACCUMULATOR:
				argsString = "A";
				break;
				
			case IMPLIED:
				if (strArgs.length >=1)
				{
					argsString = "#$";
					if (opcode == 0xF4 || opcode==0x62) argsString = "$"; // PEA doesn't have a hash
					for (var i = strArgs.length-1;i>=0;i--) {
						argsString += strArgs[i];
					}
					if (opcode == 0x62) { // PEA needs a special case here
						argsString += String.format("  [$%4X]", pc.getValue()+ ((args[1] << 8) + args[0]));
					}
				} else {
					argsString = " ";
				}
				break;
			
			case DIRECT_PAGE_INDEXED_INDIRECT_LONG_Y:
				var indirectAddr, directAddr;
				indirectAddr = Util.limitShort(CPU.dp.getValue() + args[0]);

				directAddr = Core.mem.get(Size.SHORT, 0, indirectAddr);
				directAddr += (Core.mem.get(Size.BYTE, 0, Util.limitShort(indirectAddr + 2)) << 16);
				directAddr += CPU.y.getValue();
				var dataBank = (directAddr & 0xFF0000) >> 16;
				var dataAddr = directAddr & 0xFFFF;
				
				argsString = "[$"+strArgs[0].toUpperCase()+"],y"+ String.format("[$%02X:%04X]", dataBank, dataAddr);
				argsCap = false;	
				break;
				
			case DIRECT_PAGE:
				argsString = String.format("$%02X    [$%02X:%04X]", args[0], 0, (CPU.dp.getValue() + args[0]));
				argsCap = false;
				break;
			case DIRECT_PAGE_INDEXED_X:
				argsString = String.format("$%02X,x  [$%02X:%04X]", args[0], 0, (CPU.dp.getValue() + args[0] + CPU.x.getValue()));
				argsCap = false;
				break;
			case DIRECT_PAGE_INDIRECT_LONG:
				var iaddr = Util.limitShort(CPU.dp.getValue() + args[0]);
				var datadpBank = Core.mem.get(Size.BYTE, 0, Util.limitShort(iaddr + 2));
				var datadpAddr = Core.mem.get(Size.SHORT, 0, iaddr);
				argsString = String.format("[$%02X]  [$%02X:%04X]",args[0],datadpBank,datadpAddr);
				break;
			case ABSOLUTE_LONG_INDEXED_X:{
				var tDataBank = args[2];
				var tDataAddr = Util.limitShort(((args[1] << 8) + args[0]) + CPU.x.getValue());
				argsString = "$"+strArgs[2].toUpperCase() + strArgs[1].toUpperCase() + strArgs[0].toUpperCase()+",x"+String.format("[$%02X:%04X]", tDataBank,tDataAddr);
				argsCap = false;
				break;
			}
			case ABSOLUTE_INDEXED_X:{
				var tDataBank = CPU.dbr.getValue();
				var tDataAddr = Util.limitShort(((args[1] << 8) + args[0]) + CPU.x.getValue());
				argsString = "$"+strArgs[1].toUpperCase() + strArgs[0].toUpperCase()+",x"+ String.format("[$%02X:%04X]", tDataBank, tDataAddr);
				argsCap = false;
				break;}
			case ABSOLUTE_INDEXED_Y:{
				var tDataBank = CPU.dbr.getValue();
				var tDataAddr = Util.limitShort(((args[1] << 8) + args[0]) + CPU.y.getValue());
				argsString = "$"+strArgs[1].toUpperCase() + strArgs[0].toUpperCase()+",y"+ String.format("[$%02X:%04X]", tDataBank, tDataAddr);
				argsCap = false;
				break;}
			case BLOCK_MOVE:
				argsString = String.format("%2x %2x", args[1], args[0]);
				break;
			case ABSOLUTE_INDEXED_INDIRECT:
				indirectAddr = Util.limitShort(((args[1] << 8) + args[0]) + CPU.x.getValue());
				var datajBank = CPU.pbr.getValue();
				var datajAddr = Core.mem.get(Size.SHORT, CPU.pbr.getValue(), indirectAddr);
				if (opcode == 0x7C) // Jump is funky
				{
					argsString = String.format("($%s%s,x)[$%2X:%4X]",strArgs[1].toUpperCase(),strArgs[0].toUpperCase(),datajBank,datajAddr);
					argsCap = false;
					break;
				}
			default:
				argsString = "$";
				if (strArgs.length>=2) {
					for (var i = strArgs.length-1;i>=0;i--) {
						argsString += strArgs[i];
					}
					for (var i= strArgs.length; i<3;i++)
						argsString += "  ";
					if (strArgs.length == 3)
						argsString += String.format("[$%s:%s%s]", strArgs[2], strArgs[1],strArgs[0]);
					else {
						if (inst.mnemonic.startsWith("J"))
							argsString += String.format("[$%02X:%s%s]", bank, strArgs[1], strArgs[0]);
						else
							argsString += String.format("[$%02X:%s%s]", CPU.dbr.getValue(), strArgs[1], strArgs[0]);
					}
				} else {
					
					var offset = Util.signExtendByte(Integer.parseInt(strArgs[0],16));
					argsString +=strArgs[0]+"    [$"+Integer.toHexString(Util.limitShort(pc.getValue()+offset))+"]";
				}
				break;
		}

		Log.instruction(String.format("$%02X/%04X %02X %-8S %S %-19s A:%04X X:%04X Y:%04X D:%04X DB:%02X S:%04X P:%s%8s", 
				bank, 
				addr, 
				opcode, 
				Util.implode(strArgs, " "),
				inst.mnemonic,
				(argsCap ? argsString.toUpperCase() : argsString),
				CPU.a.getValue(Size.SHORT),
				CPU.x.getValue(),
				CPU.y.getValue(),
				CPU.dp.getValue(),
				CPU.dbr.getValue(),
				CPU.sp.getValue(),
				(CPU.emulationMode?"E":"e"),
				CPU.status.toString()
			)
		);
		if (inst.mnemonic.equals("JSR")||inst.mnemonic.equals("RTS")) {
			Log.instruction("\n");
		}
	} else {
		Log.instruction(String.format("%-6x %02x:%04x  %02x   A:%04x X:%04x Y:%04x P:%8s  %-18s %s", 
				((bank * 0x8000) + addr - 0x8000),  
				bank, 
				addr,
				opcode, 
				CPU.a.getValue(Size.SHORT),
				CPU.x.getValue(),
				CPU.y.getValue(),
				CPU.status.toString(),
				Util.implode(strArgs, " "),
				inst.name
			)
		);
	}
}*/