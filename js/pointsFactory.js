var app = app || {};

(function () {
    var pointsCollection = function (selector, distance) {
        Array.prototype.forEach.call(document.querySelectorAll(selector), function (elem) {
            this.push(new app.Point(elem, distance));
        }, this);
    };

    pointsCollection.prototype = Object.create(app.Collection.prototype);

    app.pointsCollection = pointsCollection;
})();