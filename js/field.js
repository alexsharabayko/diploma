var app = app || {};

(function () {
    var template = document.q('#field-template', true).innerHTML,
        objTemplate = '<div class="obj"></div>';

    var Field = function (count, radius, wrapper) {
        wrapper.innerHTML = template;

        Object.defineProperties(this, {
            wrapper: {
                get: function () {
                    return wrapper;
                }
            },
            radius: {
                get: function () {
                    return radius;
                },
                set: function (r) {
                    r = parseInt(r, 10);
                    r && (radius = r);
                }
            },
            count: {
                get: function () {
                    return count;
                },
                set: function (c) {
                    c = parseInt(c, 10);
                    c && (count = c);
                }
            }
        });

        this.setObjects(count, radius);
        wrapper.dataBind(this);

        wrapper.q('.fn-refresh', true).on('click', function () {
            this.setObjects(this.count, this.radius);
        }.bind(this));
    };

    Object.defineProperties(Field.prototype, {
        field: {
            get: function () {
                return this.wrapper.q('.field', true);
            }
        },

        children: {
            get: function () {
                return new app.pointsCollection('.obj');
            }
        },

        setObjects: {
            value: function (count, radius) {
                var a = [];

                for (var i = 0; i < count; i++) {
                    a.push(objTemplate);
                }

                this.field.innerHTML = a.join('');

                this.setObjectsRandom(radius);
            }
        },

        setObjectsRandom: {
            value: function (radius) {
                this.children.forEach(function (obj) {
                    obj.css({
                        top: (Math.random() * 100) + '%',
                        left: (Math.random() * 100) + '%',
                        width: radius + 'px',
                        height: radius + 'px'
                    });
                });
            }
        }
    });

    app.Field = Field;
})();