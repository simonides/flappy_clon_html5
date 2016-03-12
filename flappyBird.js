"use strict";

jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};


document.addEventListener('DOMContentLoaded',  init, false);


function init() {
    var context = new Context();

        

    var gameRunner = new GameRunner(context);
    gameRunner.start();

      
}
