var app = app || {};

(function () {
    var Collection = app.Collection,
        Cluster = app.Cluster,
        Point = app.Point;

    app.Forel = function (field, radius) {
        var objects = field.children,
            clusters = new Collection(),
            center, tempCenter, areaObjects;

        var getObjectsArea = function (center) {
            return objects.filter(function (obj) {
                return obj.distance(center) < radius;
            });
        };

        while (objects.length) {
            center = objects[0];

            while (true) {
                areaObjects = getObjectsArea(center);

                tempCenter = new Point([areaObjects.mean('x'), areaObjects.mean('y')]);

                if (tempCenter.x !== center.x || tempCenter.y !== center.y) {
                    center = tempCenter;
                }
                else {
                    break;
                }
            }

            clusters.push(new Cluster([], areaObjects));

            objects = objects.filter(function (item) {
                return areaObjects.indexOf(item) === -1;
            });
        }

        clusters.forEach(function (cluster) {
            var color = app.getRandomColor();

            cluster.elements.forEach(function (element) {
                element.css({ background: color });
            });
        });
    };
})();