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


    	addPipes(100, 500);
    	// console.log("animate", elapsedTime);
	}

	var distance = 0;
	// var Pipe = 0;
	var pipes = [];

	function gameLoop(elapsedTime) {
		
		distance += elapsedTime;

		//
	}


	function addPipes(posX, holeY) {
		var bottom = new Sprite(context, null, "pipe-bottom", {x: posX, y: holeY});
		bottom.setVisible(true);



		var top = new Sprite(context, null, "pipe-top");
		var topPos = {
			x: posX,
			y: holeY - 12 - top.getSize().y,
		}
		top.setPosition(topPos);
		top.setVisible(true);
	}

	construct();
}


