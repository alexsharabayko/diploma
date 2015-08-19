var app = app || {};

(function () {
	//var field = app.Field(10, document.body);
    //
	//var controls = Array.prototype.slice.call(document.querySelectorAll('.control button'));
    //
	//controls.forEach(function (control) {
	//	control.addEventListener('click', function (event) {
	//		app[event.target.dataset.action](field, parseInt(event.target.dataset.args, 10));
	//	});
	//});

	var field = new app.Field(10, 15, document.q('.field-wrapper', true));

	new app.Algorithms(document.q('.algorithms-wrapper', true), field);

	 //app.H12L(field, 2);
	//app.KMeans(field, 2);
	//app.Forel(field, 200);
})();