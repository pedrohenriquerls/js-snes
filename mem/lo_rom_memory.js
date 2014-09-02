/*package edu.fit.cs.sno.snes.mem;

import edu.fit.cs.sno.snes.common.Size;
import edu.fit.cs.sno.util.Settings;
import edu.fit.cs.sno.util.Util;
*/

function LoROMMemory(){
	Memory.call()
	this.isHiROM = false
}

LoROMMemory.prototype = new Memory()
LoROMMemory.prototype.constructor = LoROMMemory
	
LoROMMemory.prototype.get = function(size, bank, addr) {
	// Which "bank set" do you want?
	if (Util.inRange(bank, 0x0, 0x3F)) {	// WRAM, hardware registers, game pak RAM, or ROM chunk
		if (addr < 0x2000) { // WRAM
			return this.getFromArray(size, wram, addr);
		} else if (addr >=0x2000 && addr < 0x6000) { // Hardware registers
			return this.readHWReg(size, addr);
		} else if (addr >= 0x8000) { // ROM Chunks
			return this.getFromArray(size, this.rom, (bank*0x8000) + (addr-0x8000));
		}
	} else if (Util.inRange(bank, 0x40, 0x6F)) {	// ROM chunks
		if (addr >= 0x8000) {
			return this.getFromArray(size, this.rom, (bank*0x8000) + (addr-0x8000));
		}
	} else if (Util.inRange(bank, 0x70, 0x7D)) {	// SRAM, ROM
		if (addr < 0x8000) {
			return this.getFromArray(size, this.sram, ((bank - 0x70) * 0x8000) + addr);
		} else {
			return this.getFromArray(size, this.rom, (bank*0x8000) + (addr-0x8000));
		}
	} else if (bank == 0x7E) {	// WRAM
		return this.getFromArray(size, this.wram, addr);
	} else if (bank == 0x7F) {	// Moar wram
		return this.getFromArray(size, this.wram, (addr + 0x10000));
	} else if (Util.inRange(bank, 0x80, 0xBF)) {
		if (addr < 0x2000) { // WRAM
			return this.getFromArray(size, wram, addr);
		} else if (addr >=0x2000 && addr < 0x6000) { // Hardware registers
			return this.readHWReg(size, addr);
		} else if (addr >= 0x8000) { // ROM Chunks
			return this.getFromArray(size, this.rom, ((bank - 0x80)*0x8000) + (addr-0x8000));
		}
	} else if (Util.inRange(bank, 0xC0, 0xFF)) {
		if (addr >= 0x8000) { // ROM Chunks
			return this.getFromArray(size, this.rom, ((bank - 0x80)*0x8000) + (addr-0x8000));
		}
	}
	
	//if (Settings.get(Settings.MEM_THROW_INVALID_ADDR).equals("true"))
		//throw new RuntimeException(String.format("Invalid memory address: 0x%02x:%04x",bank,addr));
	return 0;
}

LoROMMemory.prototype.set = function(size, bank, addr, val) {
	// Which "bank set" do you want?
	if (Util.inRange(bank, 0x0, 0x3F)) {	// WRAM, hardware registers, game pak RAM, or ROM chunk
		if (addr < 0x2000) { // WRAM
			this.setInArray(size, wram, addr, val);
			return;
		} else if (addr >=0x2000 && addr < 0x6000) { // Hardware registers
			this.writeHWReg(size, addr, val);
			return;
		} else if (addr >= 0x8000) { // ROM Chunks
			this.invalidMemoryWrite("ROM", bank, addr);
		}
	} else if (Util.inRange(bank, 0x40, 0x7C)) {	// ROM chunks
		if (addr >= 0x8000) {
			this.invalidMemoryWrite("ROM", bank, addr);
		}
	} else if (bank == 0x7D) {	// SRAM, ROM
		if (addr < 0x8000) {
			this.sram[addr] = val;
			return;
		} else {
			this.invalidMemoryWrite("ROM", bank, addr);
		}
	} else if (bank == 0x7E) {	// WRAM
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
		if (addr >= 0x8000) { // ROM Chunks
			this.invalidMemoryWrite("ROM", bank, addr);
		}
	}
	
	//if (Settings.get(Settings.MEM_THROW_INVALID_ADDR).equals("true"))
		//throw new RuntimeException(String.format("Invalid memory address: 0x%02x:%04x",bank,addr));
}
