function Background(_context){
    "use strict";
    var self = new Container(_context, null, null);
    var context = _context;
    var $elem;

    var backgroundContainer;
    var floorContainer;
    var backgroundSprites = [];
    var floorSprites = [];
    var floorHeight;
    
    function construct() {
        $elem = self.getElement();


        floorHeight = constructBackground()
        constructFloor()

        delete self.getSize;
    };

var ss;
    function constructBackground() {
        backgroundContainer = new Container(context, $elem, {x: 0, y: 0});
        backgroundContainer.setVisible(true);
        var $bgElement = backgroundContainer.getElement();

        var width = context.getViewPort().width();
        var backgroundNumber = 1;

        var pos = {x: 0, y: 0};
        for(;;) {
            var sprite = new Sprite(context, $bgElement, "background" + backgroundNumber, pos);
            sprite.setVisible(true);
            backgroundSprites.push(sprite);
            var spriteSize = sprite.getSize();
            pos.x += spriteSize.x;
            ss = spriteSize;
            if(pos.x >= 2 * width + spriteSize.x) { // make more if browser is resized
                return spriteSize.y;
            }
        }
    }

    function constructFloor() {
        floorContainer = new Container(context, $elem, {x: 0, y: 0});
        floorContainer.setVisible(true);
        var $floorElement = floorContainer.getElement();

        var width = context.getViewPort().width();
        var pos = {x: 0, y: floorHeight}; 
        for(;;) {
            var sprite = new Sprite(context, $floorElement, "floor animatedfloor", pos);
            sprite.setVisible(true);
            floorSprites.push(sprite);
            var spriteSize = sprite.getSize();
            pos.x += spriteSize.x;
            if(pos.x >= 2* width + spriteSize.x) { // make more if browser is resized
                break;
            }
        }
    }

    self.toggleFloorAnimation = function(animateFloor){
        var classesToApply = animateFloor ? "floor animatedfloor" : "floor";
        for(var i = 0; i < floorSprites.length; ++i){
            floorSprites[i].setSprite(classesToApply);
        }
    }

    self.getFloorHeight = function() {
        return floorHeight;
    }
    
    self.moveLeft = function(width){
        moveSpritesLeft(backgroundSprites, width * 0.1);
    }

    function moveSpritesLeft(spriteArray, width) {
        var requeueCount = 0;
        var size = ss;//spriteArray[0].getSize();

        for(var i=0; i<spriteArray.length; ++i) {
            var newPos = spriteArray[i].translate({x: -width, y: 0});
            if(newPos.x + size.x < 0) {
                ++requeueCount;
            }
        }
        var requeue = spriteArray.splice(0, requeueCount);
        for(var i=0; i<requeue.length; ++i) {
            newPos.x += size.x;
            requeue[i].setPosition(newPos);
            spriteArray.push(requeue[i]);
        }
    }


    construct();
    return self;
}
