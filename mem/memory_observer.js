MemoryObserver = {
	observers: []
}

MemoryObserver.addObserver = function(memoryObserver){
	MemoryObserver.observers[MemoryObserver.observers.length] = memoryObserver
	return MemoryObserver.observers.length > 0
}

MemoryObserver.delObserver = function(memoryObserver){
	var memoryObserverIndex = MemoryObserver.observers.indexOf(memoryObserver) 
	return (MemoryObserver.observers.splice(memoryObserverIndex, 1) > -1)
}

MemoryObserver.notifyObservers = function(address){
	MemoryObserver.observers.forEach(function(observer, index) {
		var range = observer.getRange();
		for(var i=0;i<range.length; i+=2) {
			var start = range[i];
			var end = range[i+1];
			if (address >= start && address < end) {
				observer.onInvalidate(address);
				break; // Move on to the next observer
			}
		}
	})
}
