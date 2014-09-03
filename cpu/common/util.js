
/**
 * General utility functions not specific to any one component
 */
Util = {

	/**
	 * Mask a value based on its intended size
	 * @param size Size of value
	 * @param val Value to limit
	 * @return Limited value
	 */
	limit: function(size, val) {
		if (size.sizeMask == 0)
			alert('invalid sizeMask')
			//throw new RuntimeException("Invalid sizeMask being used; code should probably read size.getRealSize()");
		return val & size.sizeMask;
	},
	
	limitShort: function(val) {
		//TODO: wtf is limit method O.o
		//return limit(Size.SHORT, val);
	},
	
	/**
	 * Converts a negative byte in  two's complement to a negative java integer of the same magnitude
	 * @param val
	 * @return sign extended value
	 */
	signExtendByte: function(val) {
		if ((val & Size.BYTE.topBitMask) != 0) {
			return val + 0xFF00;
		} else {
			return val;
		}
	},
	
	/**
	 * Fixes any invalid digits in a binary-coded decimal after addition
	 * @param size Size of number to adjust
	 * @param val Value to adjust
	 */
	bcdAdjustAdd: function(size, val) {
		var nibbleCount = 2;
		if (size.getRealSize() == Size.SHORT) {
			nibbleCount = 4;
		}
		
		// For each 4-bit digit...
		for (var k = 0; k < nibbleCount; k++) {
			// Are those 4-bits larger than 9?
			var digit = ((val & (0xF << (k * 4))) >> (k * 4));
			if (digit > 9) {
				// If so, add 6 to the digit
				val += (6 << (k * 4)); 
			}
		}
		
		return val;
	},
	
	/**
	 * Fixes any invalid digits in a binary-coded decimal after subtraction
	 * @param size Size of number to adjust
	 * @param val Value to adjust
	 */
	bcdAdjustSubtract: function(size, val) {
		var nibbleCount = 2;
		if (size.getRealSize() == Size.SHORT) {
			nibbleCount = 4;
		}
		
		// For each 4-bit digit...
		for (var k = 0; k < nibbleCount; k++) {
			// Are those 4-bits larger than 9?
			var digit = ((val & (0xF << (k * 4))) >> (k * 4));
			if (digit > 9) {
				// If so, subtract 6 from the digit
				val -= (6 << (k * 4)); 
			}
		}
		
		return val;
	},
	
	/**
	 * Converts a BCD integer to a binary integer (unsigned only)
	 * @param val BCD var to convert
	 * @return Java integer representing value of BCD var
	 */
	bcdToInt: function(val) {
		var returnVal = 0;
		
		for (var k = 0; k < 8; k++) {
			var digit = ((val & (0xF << (k * 4))) >> (k * 4));
			returnVal += (digit * Math.pow(10, k));
		}
		
		return returnVal;
	},
	
	/**
	 * Join array elements with a string
	 * @param strs Array to join
	 * @param glue String to join with 
	 * @return string containing the array elements
	 */
	implode: function(strs, glue) {
		var str = "";
		
		for (var k = 0; k < strs.length; k++) {
			if (k != 0) str += glue;
			str += String(strs[k]);
		}
		
		return str;
	},
	
	/**
	 * Join array elements with a string
	 * @param strs Array to join
	 * @param glue String to join with 
	 * @return string containing the array elements
	 */
	implode: function(strs, glue) {
		var str = "";
		
		for (var k = 0; k < strs.length; k++) {
			if (k != 0) str += glue;
			str += strs[k];
		}
		
		return str;
	},
	
	/**
	 * Checks if a value is within a range (inclusive)
	 * @param val Value to check
	 * @param high High bound
	 * @param low Low bound
	 * @return True if within range, false otherwise
	 */
	inRange: function(val, low, high) {
		return (val >= low && val <= high);
	},
	
	reverseBits: function(val, digits) {
		var newVal = 0;
		for (var k = 0; k < digits; k++) {
			newVal = (newVal << 1) | (val & 1);
			val = val >> 1;
		}
		
		return newVal;
	},
	
	getStreamFromUrl: function (loc) {
		var is = null;
		//TODO
		/*try {
			URL url;
			if (loc.startsWith("http://")) { // Check for absolute URL
				url = new URL(loc);
			} else if (SNOApplet.instance != null) {
				url = new URL(SNOApplet.instance.getDocumentBase(), loc);
			} else {
				return null;
			}
			
			is = url.openStream();
		} catch (Exception err) {
			System.out.println("Failed loading from url: " + loc);
		}
		
		return is;*/
	},
	
	/**
	 * Clips a signed number to the given number of bits
	 * @param bits
	 * @return
	 */
	sclip: function(bits, x) {
		var b = 1 << (bits - 1);
		var m = (1 << bits) - 1;
		return ((x & m) ^ b) - b;
	}
}
