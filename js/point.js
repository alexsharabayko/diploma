var app = app || {};

(function () {
    app.Point = function (element, distance) {
        Object.defineProperties(this, {
            x: {
                get: function () {
                    return element.offsetLeft || element[0]
                }
            },

            y: {
                get: function () {
                    return element.offsetTop || element[1]
                }
            },

            el: {
                get: function () {
                    return element
                }
            }
        });

        this.distance = app.pointsDistances[distance ? distance : 'euclid'].bind(this)
    };

    app.Point.prototype = {
        css: function (opt) {
            Object.keys(opt).forEach(function (key) {
                this.el.style[key] = opt[key];
            }, this);
        }
    };
})();