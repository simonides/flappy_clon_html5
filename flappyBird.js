"use strict";
document.addEventListener('DOMContentLoaded',  init, false);


function init() {
    var context = new Context();

    


	var scorePosition = {
    	x: context.getViewPort().width() / 2,
    	y: 10
    };

    var number = new Number(context, null, scorePosition);
    number.setVisible(true);
    number.set(0);

    var gameRunner = new GameRunner(context);
    gameRunner.start();

    window.c = context;
    window.n = number;

      
}
