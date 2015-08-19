var app = app || {};

(function () {
	app.pointsDistances = {
		euclid: function (b) {
			return Math.sqrt(Math.pow(this.x - b.x, 2) + Math.pow(this.y - b.y, 2));
		},

		euclidSquare: function (b) {
			return Math.pow(this.x - b.x, 2) + Math.pow(this.y - b.y, 2);
		},

		manhattan: function (b) {
			return Math.abs(this.x - b.x) + Math.abs(this.y - b.y);
		},

		chebyshev: function (b) {
			return Math.max(Math.abs(this.x - b.x), Math.abs(this.y - b.y));
		},

		power: function (b, p, r) {
			return Math.pow(Math.pow(this.x - b.x, p) + Math.pow(this.y - b.y, p), r);
		}
	};
})();