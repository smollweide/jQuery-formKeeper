
(function () {
	'use strict';

	var _resultTrue = {
			valid: true
		},
		_resultFalse = function (key) {
			return {
				type: key,
				valid: false
			};
		},
		_lengthArr = [
			{ value: '',				data: {exactly: 10},		result: _resultTrue },
			{ value: 'a',				data: {exactly: 1},			result: _resultTrue },
			{ value: 'aaaa',			data: {exactly: 4},			result: _resultTrue },
			{ value: 'aaaaaa',			data: {exactly: 5},			result: _resultFalse('exactly') },
			{ value: 'aaaaaaaa',		data: {exactly: 8},			result: _resultTrue },
			{ value: 'aaaaaaaa',		data: {min: 8},				result: _resultTrue },
			{ value: 'aaaaaa',			data: {min: 8},				result: _resultFalse('min') },
			{ value: 'aaaaaa',			data: {max: 8},				result: _resultTrue },
			{ value: 'aaaaaaaa',		data: {max: 8},				result: _resultTrue },
			{ value: 'aaaaaaaaa',		data: {max: 8},				result: _resultFalse('max') },
			{ value: 'aaaaaaa',			data: {min:6, max: 8},		result: _resultTrue },
			{ value: 'aaaa',			data: {min:6, max: 8},		result: _resultFalse('range') },
			{ value: 'aaaaaaaaa',		data: {min:6, max: 8},		result: _resultFalse('range') }
		]
	;

	test('FormKeeper.Extension.Length.validate', function() {
		$.each(_lengthArr, function () {
			var arr = this,
				expected = arr.result,
				formKeeper = new FormKeeper.Extension.Length(),
				result = formKeeper.validate(arr.value, arr.data),
				message = arr.value + ', ' + JSON.stringify(arr.data) + ' = ' + expected;

			deepEqual(result, expected, message);
		});
	});

	test('FormKeeper.Extension.Length.validateSelector', function() {
		$.each(_lengthArr, function () {
			var arr = this,
				$input = $('<input type="text" value="'+ arr.value +'" data-form-keeper=\'{"length": ' + JSON.stringify(arr.data) + '}\' />'),
				expected = arr.result,
				formKeeper = new FormKeeper.Extension.Length(),
				result = formKeeper.validateSelector($input),
				message = $input.wrap('<p></p>').parent().html() + ' = ' + expected;

			deepEqual(result, expected, message);
		});
	});

}());