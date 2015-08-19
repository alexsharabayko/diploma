var app = app || {};

(function () {
    var list = [
        {
            name: 'H12L',
            args: [
                {
                    type: 'number',
                    label: 'Clusters count',
                    def: 2
                }
            ]
        },
        {
            name: 'KMeans',
            args: [
                {
                    type: 'number',
                    label: 'Clusters count',
                    def: 2
                }
            ]
        },
        {
            name: 'Forel',
            args: [
                {
                    type: 'number',
                    label: 'Radius',
                    def: 200
                }
            ]
        }
    ];

    var liTemplate = '<li>{{name}}</li>',
        parameterTemplate = '<input class="parameters-item" type="{{type}}" placeholder="{{label}}" value="{{def}}" />',
        buttonTemplate = '<button class="parameters-item"><i class="fa fa-play"></i></button>',
        timeTemplate = '<span class="parameters-time"></span>',
        timePhrase = 'Time of work is: ';

    var Algorithms = function (wrapper, field) {
        this.setList(wrapper);
        this.setParameters(wrapper);

        wrapper.on('click', '.algorithms li', function (event) {
            wrapper.q('.active').forEach(function (elem) {
                elem.classList.remove('active');
            });

            event.target.classList.add('active');

            wrapper.q('.parameters')[event.target.index()].classList.add('active');
        }.bind(this));

        wrapper.on('click', '.parameters button', function (event) {
            var parameters = event.target.parentElement.q('input');

            parameters = parameters.map(function (item) {
                return item.valueAsNumber || item.value;
            });

            parameters.unshift(field);

            var start = Date.now();
            app[event.target.parentNode.dataset.name].apply(null, parameters);

            event.target.parentElement.q('.parameters-time', true).innerHTML = timePhrase + (Date.now() - start) + 'ms';
        }.bind(this));
    };

    Object.defineProperties(Algorithms.prototype, {
        setList: {
            value: function (wrapper) {
                var str = '',
                    algorithms = document.createElement('ul');

                list.forEach(function (data) {
                    str += app.template(liTemplate, data);
                });

                algorithms.classList.add('algorithms');
                algorithms.innerHTML = str;
                algorithms.children[0].classList.add('active');

                wrapper.appendChild(algorithms);
            }
        },

        setParameters: {
            value: function (wrapper) {
                var str, parameter;

                list.forEach(function (li, index) {
                    str = timeTemplate;
                    parameter = document.createElement('div');

                    li.args && li.args.forEach(function (arg, i) {
                        arg.order = i;
                        str += app.template(parameterTemplate, arg);
                    });

                    str += buttonTemplate;

                    parameter.innerHTML = str;
                    parameter.classList.add('parameters');
                    parameter.dataset.name = li.name;

                    index || parameter.classList.add('active');

                    wrapper.appendChild(parameter);
                });
            }
        }
    });

    app.Algorithms = Algorithms;
})();