function Context() {
    "use strict";
    var self = this;
    var $viewport = $("#viewport");

    // var objectStore = {};

    self.getViewPort = function() {
        return $viewport;
    }

    self.getMain = function() {
        return $viewport;
    }

    // self.addObject = function(name, object) {
    //     objectStore[name] = object;
    // }

    // self.getObject = function(name, object) {
    //     return objectStore[name] || null;
    // }
}

