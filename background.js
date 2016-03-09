function Background(_context, _$parent){
    "use strict";
    var self = new Container(_context, _$parent, null);
    var context = _context;
    var $parent = _$parent;
    var $elem;
    var sprites = [];
    
    function construct() {
        $elem = self.getElement();
        var size = self.getSize();
        var backgroundNumber = 1;

        var pos = {x: 0, y: 0};
        for(;;) {
            var sprite = new Sprite(context, $elem, "background" + backgroundNumber, pos);
            sprite.setVisible(true);
            sprites.push(sprite);
            var spriteSize = sprite.getSize();
            pos.x += spriteSize.x;
            if(pos.x >= size.x + spriteSize.x) {
                break;
            }
        }

        delete self.getSize;
    };

    construct();
    return self;
}
