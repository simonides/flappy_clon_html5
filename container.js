function Container(_context, _$parent, position){
    "use strict";
    var self = this;
    var context = _context;
    var $parent = _$parent || context.getViewPort();
    var $elem;
    var digits = [];
    var size = {x: 0, y: 0};
    
    function construct() {
        var html = buildHtml();

        $elem = $(html);
        self.setVisible(false);
        $parent.append($elem);
        self.setPosition( position || {x: 0, y: 0} );
    }

    function buildHtml() {
        return "<div class='container'></div>";
    }

    self.getElement = function() {
        return $elem;
    }

    self.setVisible = function(visible) {
        if(visible) {
            $elem.show();
        } else {
            $elem.hide();
        }       
    };

    self.setPosition = function(pos) {
        $elem.css({top: pos.y, left: pos.x});
    };

    self.getPosition = function() {
        return {
            x: parseInt($elem.css('left'), 10),
            y: parseInt($elem.css('top'), 10)
        };
    };

    self.translate = function(vec) {
        var pos = self.getPosition();
        pos.x = Math.floor(pos.x + vec.x);
        pos.y = Math.floor(pos.y + vec.y);
        self.setPosition(pos);
        return pos;
    }

    self.setCenterPosition = function(pos) {
        pos.x -= (self.getSize().x) / 2;
        self.setPosition(pos);
    };

    self.getCenterPosition = function() {
        var pos = self.getPosition();
        pos.x += (self.getSize().x) / 2;
        return pos;
    };

    self.getSize = function() {
        return {
            x: $elem.width(),
            y: $elem.height()
        };
    };

    self.destroy = function() {
        $elem.remove();
    }

    self.container = true;

    construct();
}
