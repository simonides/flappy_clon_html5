"use strict";
document.addEventListener('DOMContentLoaded',  init, false);


function init() {
    var context = new Context();


    var background = new Background(context, null);
        background.setVisible(true);



    var sprite = new Sprite(context, null, "number dig5", {x: 45, y: 80});
    var number = new Number(context, null, {x: 200, y: 10});
    number.setVisible(true);
    number.set(0);

    var gameRunner = new GameRunner();
    gameRunner.start();

    window.c = context;
    window.s = sprite;
    window.n = number;
    window.b = background;

    setTimeout(function() {
        console.log("showing now..");
        sprite.setVisible(true);
    }, 1000);


    // var counter = 0;
    // window.setInterval(function() {
    //     ++counter;
    //     n.set(counter)
    //     background.moveLeft(1);
    // }, 10);


    var sprite = new Sprite(context, null, "number dig5", {x: 0, y: 0});
    
}





