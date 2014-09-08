/*package edu.fit.cs.sno.snes.mem;

import edu.fit.cs.sno.snes.common.Size;
import edu.fit.cs.sno.util.Log;
import edu.fit.cs.sno.util.Settings;
import edu.fit.cs.sno.util.Util;
*/
function HiROMMemory(){
	Memory.call()
	this.isHiROM = true;
}
HiROMMemory.prototype = new Memory()
HiROMMemory.prototype.constructor = HiROMMemory;

HiROMMemory.prototype.get = function(size, bank, addr){
	// Which "bank set" do you want?
	if (Util.inRange(bank, 0x0, 0x3F)) {	// WRAM, hardware registers, game pak RAM, SRAM, or ROM chunk
		// SRAM
		if (bank == 0x20 && Util.inRange(addr, 0x6000, 0x7FFF)) {
			return 0;
		}
		
		if (addr < 0x2000) { // WRAM
			return this.getFromArray(size, wram, addr);
		} else if (addr >=0x2000 && addr < 0x6000) { // Hardware registers
			return this.readHWReg(size, addr);
		} else if (addr >= 0x8000) { // ROM Chunks
			return this.getFromArray(size, this.rom, 0x8000+ (bank*0x10000) + (addr-0x8000));
		}
	} else if (Util.inRange(bank, 0x40, 0x7D)) {	// ROM chunks
		return this.getFromArray(size, this.rom, 0x8000+((bank - 0x40)*0x10000) + addr);
	} else if (bank == 0x7E) {	// WRAM, System RAM 1
		return this.getFromArray(size, wram, addr);
	} else if (bank == 0x7F) {	// Moar wram
		return this.getFromArray(size, wram, (addr + 0x10000));
	} else if (Util.inRange(bank, 0x80, 0xBF)) {
		// SRAM
		if (bank == 0xA0 && Util.inRange(addr, 0x6000, 0x7FFF)) {
			return 0;
		}
		
		if (addr < 0x2000) { // WRAM
			return this.getFromArray(size, wram, addr);
		} else if (addr >=0x2000 && addr < 0x6000) { // Hardware registers
			return this.readHWReg(size, addr);
		} else if (addr >= 0x8000) { // ROM Chunks
			return this.getFromArray(size, this.rom, 0x8000+ ((bank - 0x80) * 0x10000) + (addr-0x8000));
		}
	} else if (Util.inRange(bank, 0xC0, 0xFF)) {
		return this.getFromArray(size, this.rom, ((bank - 0xC0) * 0x10000) + addr);
	}
	
	//if (Settings.get(Settings.MEM_THROW_INVALID_ADDR).equals("true"))
		//throw new RuntimeException(String.format("Invalid memory address: 0x%02x:%04x",bank,addr));
	return 0;
}

HiROMMemory.prototype.set = function(size, bank, addr, val) {
	// Which "bank set" do you want?
	if (Util.inRange(bank, 0x0, 0x3F)) {	// WRAM, hardware registers, game pak RAM, SRAM, or ROM chunk			
		if (addr < 0x2000) { // WRAM
			this.setInArray(size, this.wram, addr, val);
			return;
		} else if (addr >=0x2000 && addr < 0x6000) { // Hardware registers
			this.writeHWReg(size, addr, val);
			return;
		} else if (addr >= 0x8000) { // ROM Chunks
			this.invalidMemoryWrite("ROM", bank, addr);

		}
	} else if (Util.inRange(bank, 0x40, 0x7D)) {	// ROM chunks
		this.invalidMemoryWrite("ROM", bank, addr);
	} else if (bank == 0x7E) {	// WRAM, System RAM 1
		this.setInArray(size, this.wram, addr, val);
		return;
	} else if (bank == 0x7F) {	// Moar WRAM
		this.setInArray(size, this.wram, (addr + 0x10000), val);
		return;
	} else if (Util.inRange(bank, 0x80, 0xBF)) {			
		if (addr < 0x2000) { // WRAM
			this.setInArray(size, this.wram, addr, val);
			return;
		} else if (addr >=0x2000 && addr < 0x6000) { // Hardware registers
			this.writeHWReg(size, addr, val);
			return;
		} else if (addr >= 0x8000) { // ROM Chunks
			this.invalidMemoryWrite("ROM", bank, addr);
		}
	} else if (Util.inRange(bank, 0xC0, 0xFF)) {
		console.log('invalid memory address')
		//Log.err(String.format("Invalid memory address: 0x%02x:%04x",bank,addr));
		this.invalidMemoryWrite("ROM", bank, addr);
	}
	
	//if (Settings.get(Settings.MEM_THROW_INVALID_ADDR).equals("true"))
		//throw new RuntimeException(String.format("Invalid memory address: 0x%02x:%04x",bank,addr));
}

