var app = app || {};

(function () {
    var Cluster = function (coords, elements, distance) {
        if (! elements || elements.constructor !== app.Collection) {
            elements = new app.Collection(elements, true);
        }

        Object.defineProperties(this, {
            x: {
                get: function () {
                    return coords[0] || null;
                }
            },

            y: {
                get: function () {
                    return coords[1] || null;
                }
            },

            elements: {
                get: function () {
                    return elements;
                }
            },

            distance: {
                get: function () {
                    return app.Distances[distance || 'hither'].bind(this);
                }
            }
        });
    };

    app.Cluster = Cluster;
})();