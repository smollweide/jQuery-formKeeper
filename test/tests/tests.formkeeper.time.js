
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
			{ value: _string,			data: {format: 'HH:mm'},	result: _resultFalse },
			{ value: _emptyString,		data: {format: 'HH:mm'},	result: _resultTrue },

			{ value: '12:59',			data: {},					result: _resultTrue },
			{ value: '23:59',			data: {format: 'HH:mm'},	result: _resultTrue },
			{ value: '01:59',			data: {format: 'HH:mm'},	result: _resultTrue },
			{ value: '1:59',			data: {format: 'HH:mm'},	result: _resultFalse },
			{ value: '12:59:01',		data: {format: 'HH:mm'},	result: _resultFalse },
			{ value: '23:59:59',		data: {format: 'HH:mm'},	result: _resultFalse },
			{ value: '01:59:59',		data: {format: 'HH:mm'},	result: _resultFalse },
			{ value: '1:59:59',			data: {format: 'HH:mm'},	result: _resultFalse },

			{ value: '12:59',			data: {format: 'HH:mm:ss'},	result: _resultFalse },
			{ value: '23:59',			data: {format: 'HH:mm:ss'},	result: _resultFalse },
			{ value: '01:59',			data: {format: 'HH:mm:ss'},	result: _resultFalse },
			{ value: '1:59',			data: {format: 'HH:mm:ss'},	result: _resultFalse },
			{ value: '12:59:01',		data: {format: 'HH:mm:ss'},	result: _resultTrue },
			{ value: '23:59:59',		data: {format: 'HH:mm:ss'},	result: _resultTrue },
			{ value: '01:59:59',		data: {format: 'HH:mm:ss'},	result: _resultTrue },
			{ value: '1:59:59',			data: {format: 'HH:mm:ss'},	result: _resultFalse },

			{ value: '12:59',			data: {format: 'H:m'},	result: _resultTrue },
			{ value: '23:59',			data: {format: 'H:m'},	result: _resultTrue },
			{ value: '01:59',			data: {format: 'H:m'},	result: _resultFalse },
			{ value: '1:59',			data: {format: 'H:m'},	result: _resultTrue },
			{ value: '12:59:01',		data: {format: 'H:m'},	result: _resultFalse },
			{ value: '23:59:59',		data: {format: 'H:m'},	result: _resultFalse },
			{ value: '01:59:59',		data: {format: 'H:m'},	result: _resultFalse },
			{ value: '1:59:59',			data: {format: 'H:m'},	result: _resultFalse },

			{ value: '12:59',			data: {format: 'H:m:s'},	result: _resultFalse },
			{ value: '23:59',			data: {format: 'H:m:s'},	result: _resultFalse },
			{ value: '01:59',			data: {format: 'H:m:s'},	result: _resultFalse },
			{ value: '1:59',			data: {format: 'H:m:s'},	result: _resultFalse },
			{ value: '12:59:01',		data: {format: 'H:m:s'},	result: _resultFalse },
			{ value: '23:59:59',		data: {format: 'H:m:s'},	result: _resultTrue },
			{ value: '01:59:59',		data: {format: 'H:m:s'},	result: _resultFalse },
			{ value: '1:59:1',			data: {format: 'H:m:s'},	result: _resultTrue },
			{ value: '1:59:59',			data: {format: 'H:m:s'},	result: _resultTrue },

			{ value: '12:59',			data: {format: 'h:m:s'},	result: _resultFalse },
			{ value: '23:59',			data: {format: 'h:m:s'},	result: _resultFalse },
			{ value: '01:59',			data: {format: 'h:m:s'},	result: _resultFalse },
			{ value: '1:59',			data: {format: 'h:m:s'},	result: _resultFalse },
			{ value: '12:59:01',		data: {format: 'h:m:s'},	result: _resultFalse },
			{ value: '23:59:59',		data: {format: 'h:m:s'},	result: _resultFalse },
			{ value: '01:59:59',		data: {format: 'h:m:s'},	result: _resultFalse },
			{ value: '1:59:1',			data: {format: 'h:m:s'},	result: _resultTrue },
			{ value: '1:59:59',			data: {format: 'h:m:s'},	result: _resultTrue },

			{ value: '12-59',			data: {format: 'h-m-s', separator: '-'},	result: _resultFalse },
			{ value: '23-59',			data: {format: 'h-m-s', separator: '-'},	result: _resultFalse },
			{ value: '01-59',			data: {format: 'h-m-s', separator: '-'},	result: _resultFalse },
			{ value: '1-59',			data: {format: 'h-m-s', separator: '-'},	result: _resultFalse },
			{ value: '12-59-01',		data: {format: 'h-m-s', separator: '-'},	result: _resultFalse },
			{ value: '23-59-59',		data: {format: 'h-m-s', separator: '-'},	result: _resultFalse },
			{ value: '01-59-59',		data: {format: 'h-m-s', separator: '-'},	result: _resultFalse },
			{ value: '1-59-1',			data: {format: 'h-m-s', separator: '-'},	result: _resultTrue },
			{ value: '1-59-59',			data: {format: 'h-m-s', separator: '-'},	result: _resultTrue },
			{ value: '1-59-59',			data: {format: 'h-m-s'},					result: _resultTrue }
		],
		_lengthArr2 = [
			{ value: _undefined,		data: {format: 'HH:mm'},	result: _resultTrue },
			{ value: _null,				data: {format: 'HH:mm'},	result: _resultTrue },
			{ value: _function,			data: {format: 'HH:mm'},	result: _resultFalse },
			{ value: _object,			data: {format: 'HH:mm'},	result: _resultFalse },
			{ value: _array,			data: {format: 'HH:mm'},	result: _resultFalse },
			{ value: _$div,				data: {format: 'HH:mm'},	result: _resultFalse }
		],
		_formKeeper = new FormKeeper.Extension.Time()
	;

	test('FormKeeper.Extension.Time.validate', function() {
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

	test('FormKeeper.Extension.Time.validateSelector', function() {
		$.each(_lengthArr, function () {
			var arr = this,
				$input = $('<input type="text" ' +
					'value="'+ arr.value +'" data-form-keeper=\'{"time": ' + JSON.stringify(arr.data) + '}\' />'),
				expected = arr.result,
				result = _formKeeper.validateSelector($input),
				message = $input.wrap('<p></p>').parent().html() + ' = ' + expected;

			deepEqual(result, expected, message);
		});
	});

}());