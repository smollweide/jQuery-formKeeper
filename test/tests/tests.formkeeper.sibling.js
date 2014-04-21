
(function () {
	'use strict';

	var _string = 'string',
		_string2 = 'string2',
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
			{ value: _string,		value2: _string,	data: {},	result: _resultTrue },
			{ value: _string,		value2: _string2,	data: {},	result: _resultFalse('equal') },
			{ value: _string,		value2: _string,	data: {type:'!='},	result: _resultFalse('unequal') },
			{ value: _string,		value2: _string2,	data: {type:'!='},	result: _resultTrue },

			{ value: _string,		value2: _string,	data: {type:'>'},	result: _resultFalse('longer') },
			{ value: _string,		value2: _string2,	data: {type:'>'},	result: _resultFalse('longer') },
			{ value: _string2,		value2: _string,	data: {type:'>'},	result: _resultTrue },
			{ value: 10,			value2: 99,			data: {type:'>'},	result: _resultFalse('greater') },
			{ value: '10',			value2: 99,			data: {type:'>'},	result: _resultFalse('greater') },
			{ value: 99,			value2: 10,			data: {type:'>'},	result: _resultTrue },
			{ value: 99,			value2: '10',		data: {type:'>'},	result: _resultTrue },
			{ value: '99',			value2: 10,			data: {type:'>'},	result: _resultTrue },
			{ value: 10,			value2: 10,			data: {type:'>'},	result: _resultFalse('greater') },
			{ value: 10,			value2: _string,	data: {type:'>'},	result: _resultFalse('longer') },
			{ value: _string,		value2: 10,			data: {type:'>'},	result: _resultTrue },

			{ value: _string,		value2: _string,	data: {type:'>='},	result: _resultTrue },
			{ value: _string,		value2: _string2,	data: {type:'>='},	result: _resultFalse('longerEqual') },
			{ value: _string2,		value2: _string,	data: {type:'>='},	result: _resultTrue },
			{ value: 10,			value2: 99,			data: {type:'>='},	result: _resultFalse('greaterEqual') },
			{ value: 99,			value2: 10,			data: {type:'>='},	result: _resultTrue },
			{ value: 10,			value2: 10,			data: {type:'>='},	result: _resultTrue },

			{ value: _string,		value2: _string,	data: {type:'<'},	result: _resultFalse('shorter') },
			{ value: _string,		value2: _string2,	data: {type:'<'},	result: _resultTrue },
			{ value: _string2,		value2: _string,	data: {type:'<'},	result: _resultFalse('shorter') },
			{ value: 10,			value2: 99,			data: {type:'<'},	result: _resultTrue },
			{ value: 99,			value2: 10,			data: {type:'<'},	result: _resultFalse('lower') },
			{ value: 10,			value2: 10,			data: {type:'<'},	result: _resultFalse('lower') },

			{ value: _string,		value2: _string,	data: {type:'<='},	result: _resultTrue },
			{ value: _string,		value2: _string2,	data: {type:'<='},	result: _resultTrue },
			{ value: _string2,		value2: _string,	data: {type:'<='},	result: _resultFalse('shorterEqual') },
			{ value: 10,			value2: 99,			data: {type:'<='},	result: _resultTrue },
			{ value: 99,			value2: 10,			data: {type:'<='},	result: _resultFalse('lowerEqual') },
			{ value: 10,			value2: 10,			data: {type:'<='},	result: _resultTrue }
		],
		_formKeeper = new FormKeeper.Extension.Sibling()
	;

	test('FormKeeper.Extension.Sibling.validate', function() {
		$.each(_lengthArr, function () {
			var arr = this,
				expected = arr.result,
				result = _formKeeper.validate(arr.value, arr.value2, arr.data),
				message = arr.value + ', ' + arr.value2 + ', ' + JSON.stringify(arr.data) + ' = ' + JSON.stringify(expected);

			deepEqual(result, expected, message);
		});
	});

}());