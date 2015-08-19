var app = app || {};

(function () {
    var Collection = app.Collection,
        Cluster = app.Cluster;

    app.KMeans = function (field, k) {
        var clusters = new Collection(),
            groups = new Collection(),
            objects = field.children;

        var createCentroids = function () {
            if (clusters.empty()) {
                groups.forEach(function (group) {
                    clusters.push(new Cluster([group.elements.mean('x'), group.elements.mean('y')], group.elements));
                });
            }
            else {
                for (var i = 0; i < k; i++) {
                    clusters.push(new Cluster([objects[i].x, objects[i].y], []));
                }
            }

            groups.empty();
            for (var i = 0; i < k; i++) {
                groups.push(new Cluster([], []));
            }
        };

        var separate = function () {
            objects.forEach(function (obj) {
                var groupIndex = clusters.map(function (cluster) {
                    return obj.distance(cluster);
                }).minIndex();

                groups[groupIndex].elements.push(obj);
            });
        };

        var check = function () {
            return groups.every(function (group, i) {
                return group.elements.msort().equal(clusters[i].elements);
            });
        };

        do {
            createCentroids();
            separate();
        } while(!check());

        clusters.forEach(function (cluster) {
            var color = app.getRandomColor();

            cluster.elements.forEach(function (element) {
                element.css({ background: color });
            });
        });
    };
})();