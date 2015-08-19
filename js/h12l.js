var app = app || {};

(function () {
	var Collection = app.Collection,
		Cluster = app.Cluster;

	app.H12L = function (field, k) {
		var clusters = new Collection(),
			opt = null;

		field.children.forEach(function (obj, i) {
			clusters.push(new Cluster([], [obj]));
		});

		var findMinDistance = function () {
			var l = clusters.length,
				min = Infinity,
				tempMin = null,
				row = null,
				cell = null;

			for (var i = 0; i < l; i++) {
				for (var j = i + 1; j < l; j++) {
					tempMin = clusters[i].distance(clusters[j]);

					if (tempMin < min) {
						min = tempMin;
						row = i;
						cell = j;
					}
				}
			}

			return {
				i: row,
				j: cell
			};
		};

		while (clusters.length > k) {
			opt = findMinDistance();

			clusters[opt.i].elements.concat(clusters[opt.j].elements);
			clusters.splice(opt.j, 1);
		}

		clusters.forEach(function (cluster) {
			var color = app.getRandomColor();

			cluster.elements.forEach(function (element) {
				element.css({ background: color });
			});
		});
	};
})();