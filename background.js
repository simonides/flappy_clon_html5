function Background(_context){
    "use strict";
    var self = new Container(_context, null, null);
    var context = _context;
    var $elem;

    var backgroundContainer;
    var floorContainer;
    var backgroundSprites = [];
    var floorSprites = [];
    
    function construct() {
        $elem = self.getElement();


        var sizeY = constructBackground()
        constructFloor(sizeY)

        delete self.getSize;
    };

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
            if(pos.x >= width + spriteSize.x) {
                return spriteSize.y;
            }
        }
    }

    function constructFloor(yOffset) {
        floorContainer = new Container(context, $elem, {x: 0, y: 0});
        floorContainer.setVisible(true);
        var $floorElement = floorContainer.getElement();

        var width = context.getViewPort().width();
        var pos = {x: 0, y: yOffset};
        for(;;) {
            var sprite = new Sprite(context, $floorElement, "floor", pos);
            sprite.setVisible(true);
            floorSprites.push(sprite);
            var spriteSize = sprite.getSize();
            pos.x += spriteSize.x;
            if(pos.x >= width + spriteSize.x) {
                break;
            }
        }
    }

    self.moveLeft = function(width){
        moveSpritesLeft(backgroundSprites, width * 0.1);
        moveSpritesLeft(floorSprites, width);
    }

    function moveSpritesLeft(spriteArray, width) {
        var requeueCount = 0;
        var size = spriteArray[0].getSize();

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
