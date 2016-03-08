"use strict";



document.addEventListener('DOMContentLoaded',  init, false);

function init() {
	var context = new Context();
	var sprite = new Sprite(context, null, "number dig5", {x: 45, y: 80});
	var number = new Number(context, null, {x: 200, y: 10});
	number.setVisible(true);
	number.set(0);


	window.c = context;
	window.s = sprite;
	window.n = number;

	setTimeout(function() {
		console.log("showing now..");
		sprite.setVisible(true);
	}, 1000);


	var counter = 0;
	window.setInterval(function() {
		++counter;
		n.set(counter)
	}, 10);

}


function Context() {
	"use strict";
    var self = this;
	var $viewport = $("#viewport");


	self.getViewPort = function() {
		return $viewport;
	}
}


function Number(_context, _$parent, position){
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
		$parent.append($elem);
		self.setVisible(false);
		self.setPosition( position || {x: 0, y: 0} );
	}

	function buildHtml() {
		return "<div class='wrapper'></div>";
	}

	self.set = function(value) {
		var stringValue = "" + value;
		var centerPos = self.getCenterPosition();

		for(var i=0; i<digits.length; ++i) {
			digits[i].destroy();
		}

		digits = [];
		size = {x: 0, y: 0};
		for(var c=0; c<stringValue.length; ++c){
			var digitSprite = new Sprite(context, $elem, "number dig" + stringValue[c], size);
			digitSprite.setVisible(true);
			digits.push(digitSprite);
			size.x += digitSprite.getSize().x;
		}

		self.setCenterPosition(centerPos);
	};

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

	self.setCenterPosition = function(pos) {
		pos.x -= (self.getSize().x) / 2;
		self.setPosition(pos);
	};

	self.getPosition = function() {
		return {
			x: parseInt($elem.css('left'), 10),
			y: parseInt($elem.css('top'), 10)
		};
	};

	self.getCenterPosition = function() {
		var pos = self.getPosition();
		pos.x += (self.getSize().x) / 2;
		return pos;
	};

	self.getSize = function() {
		return size;
	};

	construct();
}


function Sprite(_context, _$parent, spriteClass, position) {
	"use strict";
    var self = this;
    var context = _context;
    var $parent = _$parent || context.getViewPort();
	var $elem;

	function construct() {
		var html = buildHtml(spriteClass);

		$elem = $(html);
		$parent.append($elem);
		self.setVisible(false);
		self.setPosition( position || {x: 0, y: 0} );
	}

	function buildHtml(spriteClass) {
		return "<div class='" + buildCssClass(spriteClass) + "'></div>";
	}

	function buildCssClass(spriteClass) {
		return "sprite " + spriteClass;
	}

	self.setSprite = function(spriteClass) {
		$elem.attr("class", buildCssClass(spriteClass));
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

	self.getSize = function() {
		return {
			x: $elem.width(),
			y: $elem.height()
		};
	};

	self.getBackgroundPosition = function() {
		var stringSize = $elem.css('background-position').split(" ");
		return {
			x: parseInt(stringSize[0], 10),
			y: parseInt(stringSize[1], 10)
		};
	};

	self.destroy = function() {
		$elem.remove();
	}

	construct();
}



