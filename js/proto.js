var app = app || {};

(function () {
	Node.prototype.q = function (selector, once) {
		return once ? this.querySelector(selector) : [].slice.call(this.querySelectorAll(selector));
	};

	Node.prototype.on = function (eventType, selector, callback) {
		if (callback) {
			this.addEventListener(eventType, function (event) {
				if (this.q(selector).indexOf(event.target) > -1) {
					callback.call(this, event);
				}
			});
		}
		else {
			this.addEventListener(eventType, selector.bind(this));
		}
	};

	Node.prototype.dataBind = function (obj) {
		this.on('change', '[data-bind]', function (event) {
			if (event.target.valueAsNumber !== undefined) {
				obj[event.target.dataset.bind] = event.target.valueAsNumber;
			}
			else if (event.target.value !== undefined) {
				obj[event.target.dataset.bind] = event.target.value;
			}
			else {
				obj[event.target.dataset.bind] = event.target.innerHTML;
			}
		});
	};

	Node.prototype.index = function () {
		return Array.prototype.slice.call(this.parentNode.children).indexOf(this);
	};

	app.getRandomColor = function () {
	    var letters = '0123456789ABCDEF'.split(''),
	    	color = '#';

	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }

	    return color;
	};

	app.extend = function (o1, o2) {
		for (var key in o2) {
			if (o2.hasOwnProperty(key)) {
				o1[key] = o2[key];
			}
		}
	};

	app.template = function (str, obj) {
		var a = str;

		Object.keys(obj).forEach(function (key) {
			a = a.replace(new RegExp('{{' + key + '}}', 'g'), obj[key]);
		});

		return a;
	};
})();