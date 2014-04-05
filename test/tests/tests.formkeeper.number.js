
(function () {
	'use strict';

	var _string = 'string',
		_emptyString = '',
		_undefined = undefined,
		_null = null,
		_function = function () {},
		_object = {},
		_array = [],
		_number = 1,
		_numberMinus = -10,
		_float = 1.2,
		_floatMinus = -13.2,
		_$div = $('<div></div>'),
		_resultTrue = {
			valid: true
		},
		_resultFalse = function (key) {
			if (key === undefined) {
				return {
					valid: false
				};
			}

			return {
				type: key,
				valid: false
			};
		},
		_lengthArr = [
			{ value: _string,			data: {},					result: _resultFalse('number') },
			{ value: _emptyString,		data: {},					result: _resultTrue },
			{ value: _function,			data: {},					result: _resultFalse('number') },
			{ value: _object,			data: {},					result: _resultFalse('number') },
			{ value: _number,			data: {},					result: _resultTrue },
			{ value: _numberMinus,		data: {},					result: _resultTrue },
			{ value: _float,			data: {},					result: _resultTrue },
			{ value: _floatMinus,		data: {},					result: _resultTrue },

			{ value: _string,			data: {min: 5},				result: _resultFalse('number') },
			{ value: _emptyString,		data: {min: 5},				result: _resultTrue },
			{ value: _number,			data: {min: 5},				result: _resultFalse('min') },
			{ value: _numberMinus,		data: {min: 5},				result: _resultFalse('min') },
			{ value: 6,					data: {min: 5},				result: _resultTrue },
			{ value: _float,			data: {min: 5},				result: _resultFalse('min') },
			{ value: _floatMinus,		data: {min: 5},				result: _resultFalse('min') },

			{ value: _number,			data: {max: 5},				result: _resultTrue },
			{ value: _numberMinus,		data: {max: 5},				result: _resultTrue },
			{ value: 4.6,				data: {max: 4.5},			result: _resultFalse('max') },
			{ value: _float,			data: {max: 5},				result: _resultTrue },
			{ value: _floatMinus,		data: {max: 5},				result: _resultTrue },

			{ value: _number,			data: {min: 4, max: 5},		result: _resultFalse('range') },
			{ value: _numberMinus,		data: {min: 4, max: 5},		result: _resultFalse('range') },
			{ value: 6,					data: {min: 4, max: 5},		result: _resultFalse('range') },
			{ value: 4.3,				data: {min: 4, max: 5},		result: _resultTrue },
			{ value: _float,			data: {min: 4, max: 5},		result: _resultFalse('range') },
			{ value: _floatMinus,		data: {min: 4, max: 5},		result: _resultFalse('range') }
		],
		_lengthArr2 = [
			{ value: _string,			data: {},					result: _resultFalse('number') },
			{ value: _emptyString,		data: {},					result: _resultTrue },
			{ value: _undefined,		data: {},					result: _resultTrue },
			{ value: _null,				data: {},					result: _resultTrue },
			{ value: _function,			data: {},					result: _resultFalse('number') },
			{ value: _object,			data: {},					result: _resultFalse('number') },
			{ value: _array,			data: {},					result: _resultFalse('number') },
			{ value: _$div,				data: {},					result: _resultFalse('number') }
		],
		_formKeeper = new FormKeeper.Extension.Number()
	;

	test('FormKeeper.Extension.Number.validate', function() {
		$.each(_lengthArr, function () {
			var arr = this,
				expected = arr.result,
				result = _formKeeper.validate(arr.value, arr.data),
				message = arr.value + ', ' + JSON.stringify(arr.data) + ' = ' + expected;

			deepEqual(result, expected, message);
		});

		$.each(_lengthArr2, function () {
			var arr = this,
				expected = arr.result,
				result = _formKeeper.validate(arr.value, arr.data),
				message = arr.value + ', ' + JSON.stringify(arr.data) + ' = ' + expected;

			deepEqual(result, expected, message);
		});
	});

	test('FormKeeper.Extension.Number.validateSelector', function() {
		$.each(_lengthArr, function () {
			var arr = this,
				$input = $('<input type="text" value="'+ arr.value +'" data-form-keeper=\'{"number": ' + JSON.stringify(arr.data) + '}\' />'),
				expected = arr.result,
				result = _formKeeper.validateSelector($input),
				message = $input.wrap('<p></p>').parent().html() + ' = ' + expected;

			deepEqual(result, expected, message);
		});
	});

}());