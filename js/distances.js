var app = app || {};

(function () {
	app.Distances = {
		hither: function (cluster) {
			var min = Infinity,
				tempMin = null;
			
			this.elements.forEach(function (p1) {
				cluster.elements.forEach(function (p2) {
					tempMin = p1.distance(p2);

					if (tempMin < min) {
						min = tempMin;
					}
				}.bind(this));
			}.bind(this));

			return min;
		}
	};
})();