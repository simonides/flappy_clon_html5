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

    construct();
    return self;
}
