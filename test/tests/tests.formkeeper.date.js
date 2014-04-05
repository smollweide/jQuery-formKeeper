
(function () {
	'use strict';

	var _string = 'string',
		_emptyString = '',
		_undefined,
		_null = null,
		_function = function () {},
		_object = {},
		_array = [],
		_$div = $('<div></div>'),
		_resultTrue = {
			valid: true
		},
		_resultFalse = function (suggestionDate) {

			if (suggestionDate !== undefined) {
				return {
					valid: false,
					suggestion: suggestionDate
				};
			}

			return {
				valid: false
			};
		},
		_lengthArr = [
			{ value: '12.12.2014',		data: {},						result: _resultTrue },
			{ value: '12.12.2014',		data: {format: 'YYYY.MM.DD'},	result: _resultFalse() },
			{ value: '12.1.2014',		data: {format: 'DD.MM.YYYY'},	result: _resultFalse() },
			{ value: '12.1.2014',		data: {format: 'DD.M.YYYY'},	result: _resultTrue },
			{ value: '2014.12.12',		data: {format: 'YYYY.MM.DD'},	result: _resultTrue },
			{ value: '2014.1.12',		data: {format: 'YYYY.MM.DD'},	result: _resultFalse() },
			{ value: '2014.01.12',		data: {format: 'YYYY.MM.DD'},	result: _resultTrue },
			{ value: '2014.01.12',		data: {format: 'YYYY.M.DD'},	result: _resultFalse() },
			{ value: '2014.1.1',		data: {format: 'YYYY.M.D'},		result: _resultTrue },
			{ value: '2014.1.01',		data: {format: 'YYYY.M.D'},		result: _resultFalse() },
			{ value: '1.1.2014',		data: {format: 'D.M.YYYY'},		result: _resultTrue },
			{ value: '01.1.2014',		data: {format: 'D.M.YYYY'},		result: _resultFalse() },
			{ value: '1-1-2014',		data: {format: 'D-M-YYYY',
										separator: '-'},				result: _resultTrue },
			{ value: '1.13.2014',		data: {format: 'D.M.YYYY'},		result: _resultFalse('1.1.2015') },
			{ value: '29.2.2014',		data: {format: 'D.M.YYYY'},		result: _resultFalse('1.3.2014') },
			{ value: '29.02.2014',		data: {format: 'DD.MM.YYYY'},	result: _resultFalse('01.03.2014') }
		],
		_lengthArr2 = [
			{ value: _undefined,		data: {},	result: _resultTrue },
			{ value: _null,				data: {},	result: _resultTrue },
			{ value: _function,			data: {},	result: _resultFalse() },
			{ value: _object,			data: {},	result: _resultFalse() },
			{ value: _array,			data: {},	result: _resultFalse() },
			{ value: _$div,				data: {},	result: _resultFalse() }
		],
		_lengthArr3 = [
			{ value: [2014,12,12],		result: [2014,12,12] },
			{ value: [2014,2,29],		result: [2014,3,1] },
			{ value: [2014,12,32],		result: [2015,1,1] },
			{ value: ['Hallo',12,3],	result: [NaN,NaN,NaN] }
		]
	;

	test('FormKeeper.Extension.Date.getSuggestionDate', function() {
		$.each(_lengthArr3, function () {
			var arr = this,
				_formKeeper = new FormKeeper.Extension.Date(),
				expected = arr.result,
				result = _formKeeper.getSuggestionDate(arr.value),
				message = arr.value + ' = ' + expected;

			deepEqual(result, expected, message);
		});
	});

	test('FormKeeper.Extension.Date.validate', function() {
		$.each(_lengthArr, function () {
			var arr = this,
				_formKeeper = new FormKeeper.Extension.Date(),
				expected = arr.result,
				result = _formKeeper.validate(arr.value, arr.data),
				message = arr.value + ', ' + JSON.stringify(arr.data) + ' = ' + expected;

			deepEqual(result, expected, message);
		});

		$.each(_lengthArr2, function () {
			var arr = this,
				_formKeeper = new FormKeeper.Extension.Date(),
				expected = arr.result,
				result = _formKeeper.validate(arr.value, arr.data),
				message = arr.value + ', ' + JSON.stringify(arr.data) + ' = ' + expected;

			deepEqual(result, expected, message);
		});
	});

	test('FormKeeper.Extension.Date.validateSelector', function() {
		$.each(_lengthArr, function () {
			var arr = this,
				_formKeeper = new FormKeeper.Extension.Date(),
				$input = $('<input type="text" ' +
					'value="'+ arr.value +'" data-form-keeper=\'{"date": ' + JSON.stringify(arr.data) + '}\' />'),
				expected = arr.result,
				result = _formKeeper.validateSelector($input),
				message = $input.wrap('<p></p>').parent().html() + ' = ' + expected;

			deepEqual(result, expected, message);
		});
	});


}());