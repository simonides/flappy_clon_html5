function GameRunner(_context){
    "use strict";
    var self = this;
    var context = _context;
    var lastTimestamp = 0;

    function construct() {
    }


    self.start = function() {
    	scheduler();
    }

    function scheduler(timestamp) {
    	var elapsedTime = lastTimestamp - timestamp;
    	lastTimestamp = timestamp;
	    requestAnimationFrame(scheduler);
    	if(elapsedTime > 100 || elapsedTime === 0 || isNaN(elapsedTime)) {
    		return;
    	}

    	console.log("animate", elapsedTime);
	}

	function gameLoop(elapsedTime) {
	} 

	construct();
}


