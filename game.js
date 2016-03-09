function GameRunner(_context){
    "use strict";
    var self = this;
    var context = _context;
    var lastTimestamp = 0;

    var background;

    function construct() {
    	background = new Background(context);
        background.setVisible(true);
        context.addObject("background", background);
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

    	gameLoop(elapsedTime);
    	// console.log("animate", elapsedTime);
	}

	function gameLoop(elapsedTime) {
		background.moveLeft(elapsedTime);
	}

	construct();
}


