function Sprite(_context, _$parent, spriteClass, position) {
    "use strict";
    var self = new Container(_context, _$parent, position);
    var context = _context;
    var $elem;
    var flying = false;

    function construct() {
        $elem = self.getElement();
        self.setSprite(spriteClass);
    }

    function buildCssClass(spriteClass) {
        return "sprite " + spriteClass;
    }

    self.setSprite = function(spriteClass) {
        $elem.attr("class", buildCssClass(spriteClass));
    }

    self.getBackgroundPosition = function() {
        var stringSize = $elem.css('background-position').split(" ");
        return {
            x: parseInt(stringSize[0], 10),
            y: parseInt(stringSize[1], 10)
        };
    };

    self.collidesWith = function(other) {
        var otherCorners = [];
        var otherPos = other.getPosition();
        var otherSize = other.getSize();
        otherCorners.push(otherPos)
        otherCorners.push({x: (otherPos.x + otherSize.x), y: otherPos.y})
        otherCorners.push({x: otherPos.x, y: (otherPos.y + otherSize.y)})
        otherCorners.push({x: (otherPos.x + otherSize.x), y: (otherPos.y + otherSize.y)})
        for(var i=0; i<4; ++i) {
            if(self.isInside(otherCorners[i])) {
                return true;
            }
        }
        return false;
    }

    self.isInside = function(pos) {
        var me = self.getPosition();
        var size = self.getSize();
       
        if(pos.x >= me.x && pos.x <= me.x + size.x) {
            if(pos.y >= me.y && pos.y <= me.y + size.y) {
                return true;
            }
        }
        return false;
    }

    construct();
    return self;
}
