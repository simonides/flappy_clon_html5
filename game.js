function GameRunner(_context){
    "use strict";
    var self = this;
    var context = _context;
    var lastTimestamp = 0;

    var background;
	var holeHeight = 100;
	var pipeSpacing = 250;
	var pipes = [];


    function construct() {
    	background = new Background(context);
        background.setVisible(true);
    }


    self.start = function() {
    	var width = context.getViewPort().width();
    	var pipeCount = 2 * width / pipeSpacing;	// I make more in case the browser is resized
    	for(var i = 0; i < pipeCount; ++i) {
    		addPipes(width + i * pipeSpacing);
		}

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
		
		movePipes(elapsedTime/12);
		//
	}


	function movePipes(distance) {
		if(pipes.length == 0) {
			return;
		}
		var pipeWidth = pipes[0][0].getSize().x;
		var spliceCount = 0;
		for(var i=0; i<pipes.length; ++i) {
			pipes[i][0].translate({x: distance, y: 0});
			var newPos = pipes[i][1].translate({x: distance, y: 0});
			if(newPos.x < -pipeWidth){
				++spliceCount;
			}
		}
		var replace = pipes.splice(0, spliceCount);
		for(var i=0; i<replace.length; ++i) {
			replace[i][0].destroy();
			replace[i][1].destroy();
			newPos.x += pipeSpacing;
			addPipes(newPos.x);
		}
	}

	function addPipes(posX) {
		var holeY = getRandomHolePosition();
		var bottom = new Sprite(context, null, "pipe-bottom", {x: posX, y: holeY});
		var top = new Sprite(context, null, "pipe-top");
		var topPos = {
			x: posX,
			y: holeY - holeHeight - top.getSize().y,
		}
		top.setPosition(topPos);
		bottom.setVisible(true);
		top.setVisible(true);
		pipes.push([top, bottom]);
	}

	function getRandomHolePosition() {
		var range = [195, 420];
		return Math.floor(Math.random() * (range[1]-range[0])) + range[0];
	}
	construct();
}


