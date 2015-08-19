var app = app || {};

(function () {
    var Collection = function (a, b) {
        if (a && a.length !== undefined && b === true) {
            this.push.apply(this, a);
        }
        else {
            this.push.apply(this, arguments);
        }
    };

    var proto = {
        min: function () {
            return Math.min.apply(null, this);
        },

        max: function () {
            return Math.max.apply(null, this);
        },

        minIndex: function () {
            return this.indexOf(this.min());
        },

        maxIndex: function () {
            return this.indexOf(this.max());
        },

        msort: function () {
            return this.sort(function (a, b) {
                return a < b ? -1 : a > b ? 1 : 0;
            });
        },

        equal: function (arr) {
            return this.every(function (item, i) {
                return item === arr[i];
            });
        },

        empty: function () {
            var a = this.length ? true : false;

            this.length = 0;

            return a;
        },

        mean: function (propertyName) {
            return this.length > 1 ? this.map(function (item) {
                return propertyName ? item[propertyName] : item;
            }).reduce(function (a, b) {
                return a + b
            }) / this.length : this[0][propertyName];
        },

        concat: function (a) {
            this.push.apply(this, a);
        }
    };

    Collection.prototype = Object.create(Array.prototype);
    app.extend(Collection.prototype, proto);

    ['filter', 'map'].forEach(function (method) {
        Collection.prototype[method] = function (callback) {
            return new Collection(Array.prototype[method].call(this, callback), true);
        };
    });

    Collection.prototype.constructor = Collection;

    app.Collection = Collection;
})();