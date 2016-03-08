"use strict";



document.addEventListener('DOMContentLoaded',  init, false);

function init() {
	var context = new Context();
	var sprite = new Sprite(context, "number dig5");

	window.s = sprite;
	setTimeout(function() {
		console.log("showing now..");
		sprite.setVisible(true);
	}, 1000);

}


function Context() {
	"use strict";
    var self = this;
	var $viewport = $("#viewport");


	self.getViewPort = function() {
		return $viewport;
	}
}


function Sprite(_context, spriteClass) {
	"use strict";
    var self = this;
    var context = _context;
	var $elem;

	function construct() {
		var css = buildCss(spriteClass);
		var $viewport = context.getViewPort();

		$elem = $(css);
		$viewport.append($elem);
		self.setVisible(false);
	}

	function buildCss(spriteClass) {
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

	construct();
}



