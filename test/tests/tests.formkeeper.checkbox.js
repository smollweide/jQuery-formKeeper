
(function () {
	'use strict';

	var templateBase = '<div class="form-keeper" data-form-keeper=\'{"checkbox": ##data## }\'>##inputs##</div>',
		templateInput = '<input type="checkbox" ##checked## />',
		_resultTrue = {
			valid: true
		},
		_resultFalse = function (type) {
			return {
				type: type,
				valid: false
			};
		},
		getSelector,
		_lengthArr = [
			{ value: [true ,false,false,false,true ], data: {min: 2},			result: _resultTrue },
			{ value: [true ,false,false,false,false], data: {min: 2},			result: _resultFalse('min') },
			{ value: [true ,false,false,false,true ], data: {max: 2},			result: _resultTrue },
			{ value: [true ,false,false,false,true ], data: {max: 1},			result: _resultFalse('max') },
			{ value: [true ,false,false,false,true ], data: {exactly: 1},		result: _resultFalse('exactly') },
			{ value: [true ,false,false,false,false], data: {exactly: 1},		result: _resultTrue },
			{ value: [true ,false,false,false,false], data: {min: 1, max: 3},	result: _resultTrue },
			{ value: [true ,true ,false,false,false], data: {min: 1, max: 3},	result: _resultTrue },
			{ value: [true ,true ,true ,true ,false], data: {min: 1, max: 3},	result: _resultFalse('range') },
			{ value: [false,false,false,false,false], data: {min: 1, max: 3},	result: _resultFalse('range') }
		]
	;

	getSelector = function (array, data) {
		var inputs = [];

		$.each(array, function () {
			if (this) {
				inputs.push(templateInput.replace(/##checked##/g, 'checked="checked"'));
			} else {
				inputs.push(templateInput.replace(/##checked##/g, ''));
			}
		});

		return $(templateBase.replace(/##data##/g, JSON.stringify(data)).replace(/##inputs##/g, inputs.join('')));
	};

	test('FormKeeper.Extension.Checkbox.validateSelector', function() {
		$.each(_lengthArr, function () {

			var arr = this,
				_formKeeper = new FormKeeper.Extension.Checkbox(),
				expected = arr.result,
				$selector = getSelector(arr.value, arr.data),
				result = _formKeeper.validateSelector($selector),
				message = arr.value + ', ' + JSON.stringify(arr.data) + ' = ' + JSON.stringify(expected);

			deepEqual(result, expected, message);
		});
	});

}());