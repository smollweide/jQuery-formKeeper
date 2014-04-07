
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
		_resultFalse = {
			valid: false
		},
		_lengthArr = [
			{ value: 'http://www.google.de',		data: {regExp: '[a-z]*'},	result: _resultFalse },
			{ value: 'httpwwwgooglede',				data: {regExp: '[a-z]*'},	result: _resultTrue },
			{ value: 'httpwwwGooglede',				data: {regExp: '[a-z]*'},	result: _resultFalse },
			{ value: 'httpwwwGooglede',				data: {regExp: '[a-z]*', delimiter:'i'},	result: _resultTrue }
		],
		_lengthArr2 = [
			{ value: _undefined,		data: {},	result: _resultTrue },
			{ value: _null,				data: {},	result: _resultTrue },
			{ value: _function,			data: {},	result: _resultFalse },
			{ value: _object,			data: {},	result: _resultFalse },
			{ value: _array,			data: {},	result: _resultFalse },
			{ value: _$div,				data: {},	result: _resultFalse }
		]
	;

	test('FormKeeper.Extension.Pattern.validate', function() {
		$.each(_lengthArr, function () {
			var arr = this,
				_formKeeper = new FormKeeper.Extension.Pattern(),
				expected = arr.result,
				result = _formKeeper.validate(arr.value, arr.data),
				message = arr.value + ', ' + JSON.stringify(arr.data) + ' = ' + JSON.stringify(expected);

			deepEqual(result, expected, message);
		});

		$.each(_lengthArr2, function () {
			var arr = this,
				_formKeeper = new FormKeeper.Extension.Pattern(),
				expected = arr.result,
				result = _formKeeper.validate(arr.value, arr.data),
				message = arr.value + ', ' + JSON.stringify(arr.data) + ' = ' + JSON.stringify(expected);

			deepEqual(result, expected, message);
		});
	});

	test('FormKeeper.Extension.Pattern.validateSelector', function() {
		$.each(_lengthArr, function () {
			var arr = this,
				_formKeeper = new FormKeeper.Extension.Pattern(),
				$input = $('<input type="text" ' +
					'value="'+ arr.value +'" data-form-keeper=\'{"pattern": ' + JSON.stringify(arr.data) + '}\' />'),
				expected = arr.result,
				result = _formKeeper.validateSelector($input),
				message = $input.wrap('<p></p>').parent().html() + ' = ' + JSON.stringify(expected);

			deepEqual(result, expected, message);
		});
	});

}());