function GameRunner(_context){
    "use strict";
    var self = this;
    var context = _context;
    var lastTimestamp = 0;

    var holeHeight = 100;
    var pipeSpacing = 250;
    var pipes = [];

    var isGameOver;
    var isGameStopped = false;

    var background;
    var bird;
    var score;
    var verticalBirdSpeed = 0;
    var deathHeight;
    var birdX;
    var isBurtFlapping = false; // used to clear the animation of the bird
    var burtAnimationTimeCounter = 0;
    var isFloorMoving = false; 

    var isSchedulerRunning = false;

    //init variables to use for restarting the game
    var birdStartPosition;
    var window_width;
    var pipeCount;

    // flash when bird crashes
    var flash_div = $('#flash_div');

    function construct() {
        createGame();
    }

    function createGame(){
        background = new Background(context);
        background.setVisible(true);
    
        birdStartPosition = {
            x: context.getViewPort().width() / 2,
            y: context.getViewPort().height() / 2
        };
        bird = new Sprite(context, null, "bird", birdStartPosition);
        bird.setVisible(true);
        birdX = bird.getPosition().x;

        var scorePosition = {
            x: context.getViewPort().width() / 2,
            y: 10
        };
        score = new Number(context, null, scorePosition);
        score.setVisible(true);
        score.set(0);

        deathHeight = background.getFloorHeight() - bird.getSize().y;
    }

    self.start = function() {
        window_width = context.getViewPort().width();
        pipeCount = 2 * window_width / pipeSpacing;    // I make more in case the browser is resized
        createPipes();

        context.getViewPort().mousedown(onMouseDown);

        isGameOver = false;
        isGameStopped = false;
        if(!isSchedulerRunning){
            isSchedulerRunning = true;
            scheduler();
        }
    }



    function displayEndScreen(){

        console.log("display menu");
        var menu = new Sprite(context, null, "sprite play_btn");
        // menu.setVisible(true);
    }

    function restartGame(){
        
        score.set(0);

        bird.setPosition(birdStartPosition);        
        removePipes();
        createPipes();
        background.toggleFloorAnimation(true);
        
        isGameOver = false;
        isGameStopped = false;
        
    }

    function scheduler(timestamp) {
        var elapsedTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        
        requestAnimationFrame(scheduler);
        if(elapsedTime > 100 || elapsedTime === 0 || isNaN(elapsedTime)) {
            return;
        }
        gameLoop(elapsedTime);
    }

    function flashOnce () {
        // console.log("flash me");
        flash_div.addClass('flash');
      
        flash_div.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
        function(e) {
            // console.log("flash ended");
            flash_div.removeClass('flash');
        });
    }

    function onMouseDown(event){

        if(event.which == 2){ // middle click
            restartGame();
        }
        if(isGameOver){ //ignore clicks when burt is dead
            return;
        }


        isBurtFlapping = true;
        burtAnimationTimeCounter = 0;
        bird.setSprite("bird bird_anim");

        verticalBirdSpeed = -10;

        // For debugging purposes: set bird position to mouse
        // bird.setPosition({x: event.clientX, y: event.clientY});
    }


    function gameLoop(elapsedTime) {
        if(isGameOver){
            if(!isGameStopped){
                flashOnce();
                isGameStopped = true;
                background.toggleFloorAnimation(false);
                bird.setSprite("bird");
            }
            return;
        }        
        if(isBurtFlapping){
            burtAnimationTimeCounter += elapsedTime;
            if(burtAnimationTimeCounter >= 350){
                burtAnimationTimeCounter = 0;
                isBurtFlapping = false;
                bird.setSprite("bird");
            }
        }
        movePipes(elapsedTime/12 * -1);
        moveBurt(elapsedTime*-1);
        
    }

    function sign(num) {
        return num >= 0 ? 1 : -1;
    }

    function moveBurt(elapsedTime){
        verticalBirdSpeed -= elapsedTime * 0.03;
        if(verticalBirdSpeed < -20) {   // clamp
            verticalBirdSpeed = -20;
        }
        bird.translate({x: 0, y: verticalBirdSpeed});
        var rotation = verticalBirdSpeed * verticalBirdSpeed * 0.2;
        if(rotation > 90) {
            rotation = 90;
        }
        bird.getElement().rotate(rotation * sign(verticalBirdSpeed));
        if(doesBirdCollide()) {
            console.log("!");
            isGameOver = true;
        }
    }

    function doesBirdCollide() {
        var birdPos = bird.getPosition();
        birdX = birdPos.x;
        if(birdPos.y > deathHeight) {
            return true;
        }
        for(var i=0; i<pipes.length; ++i) {
            var pipeX = pipes[i][0].getPosition().x;
            if(birdPos.x < pipeX) {
                continue;
            }
            if(pipes[i][0].collidesWith(bird) || pipes[i][1].collidesWith(bird)) {
                return true;
            }
        }
        return false;
    }


    function movePipes(distance) {
        if(pipes.length == 0) {
            return;
        }
        var pipeWidth = pipes[0][0].getSize().x;
        var spliceCount = 0;
        var birdPassedPipe = false;

        for(var i=0; i<pipes.length; ++i) {
            var oldPos = pipes[i][1].getPosition();
            pipes[i][0].translate({x: distance, y: 0});
            var newPos = pipes[i][1].translate({x: distance, y: 0});

            if(newPos.x < birdX && birdX <= oldPos.x) {
                score.add(1);
            }
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


    function createPipes(){
        for(var i = 0; i < pipeCount; ++i) {
            addPipes(window_width + i * pipeSpacing);
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

    function removePipes(){
        for(var i = 0; i < pipes.length; ++i) {
            pipes[i][0].destroy();
            pipes[i][1].destroy();
        }
        pipes.length = 0;
        console.log("length" + pipes.length);
    }

    function getRandomHolePosition() {
        var range = [195, 420];
        return Math.floor(Math.random() * (range[1]-range[0])) + range[0];
    }
    construct();
}


