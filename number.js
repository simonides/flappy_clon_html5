function Number(_context, _$parent, position){
    "use strict";
    var self = new Container(_context, _$parent, position);
    var context = _context;
    var $elem;
    var digits = [];
    var size = {x: 0, y: 0};
    var value = 0;
    
    function construct() {
        $elem = self.getElement();
        //self.set(value);
    }

    self.set = function(newValue) {
        value = newValue;
        var stringValue = "" + value;
        var centerPos = self.getCenterPosition();

        for(var i=0; i<digits.length; ++i) {
            digits[i].destroy();
        }

        digits = [];
        size = {x: 0, y: 0};

        for(var c=0; c<stringValue.length; ++c){
            var digitSprite = new Sprite(context, $elem, "ui number dig" + stringValue[c], size);
            digitSprite.setVisible(true);
            digits.push(digitSprite);
            size.x += digitSprite.getSize().x;
        }

        self.setCenterPosition(centerPos);
    };

    self.getSize = function() {
        return size;
    };

    self.add = function(amount) {
        self.set(value + amount)
    }

    construct();
    return self;
}
