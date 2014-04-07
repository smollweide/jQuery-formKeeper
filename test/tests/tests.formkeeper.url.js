
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
			{ value: 'http://www.google.de',		data: {},	result: _resultTrue },
			{ value: 'https://www.google.de',		data: {},	result: _resultTrue },
			{ value: 'https://www.google.co.uk',	data: {},	result: _resultTrue },
			{ value: 'https://www.google.docs.de',	data: {},	result: _resultTrue },
			{ value: 'www.google.de',				data: {},	result: _resultFalse('http://www.google.de') },
			{ value: 'http://wwww.google.de',		data: {},	result: _resultFalse('http://www.google.de') },
			{ value: 'http://www.google.test',		data: {},	result: _resultTrue },
			{ value: 'http://www.google.de.test',	data: {},	result: _resultTrue },

			{ value: 'http://www.go.de/#test',					data: {},	result: _resultTrue },
			{ value: 'http://www.go.de/#!/test',				data: {},	result: _resultTrue },
			{ value: 'http://www.go.de/#/test',					data: {},	result: _resultTrue },
			{ value: 'http://www.go.de?test=bert',				data: {},	result: _resultTrue },
			{ value: 'http://www.go.de/?test=bert',				data: {},	result: _resultTrue },
			{ value: 'http://www.go.de/?test=bert#test',		data: {},	result: _resultTrue },
			{ value: 'http://www.go.de/?B=A&A=B#test/A',		data: {},	result: _resultTrue },
			{
				value: 'http://wwww.go.de/?B=A&A=B#test/A',
				data: {},
				result: _resultFalse('http://www.go.de/?B=A&A=B#test/A')
			},

			{
				value: 'http://www.go.de/?B=A&A=B#test/A',
				data: {allowHash: false},
				result: _resultFalse('http://www.go.de/?B=A&A=B')
			},

			{
				value: 'http://www.go.de/?B=A&A=B#test/A',
				data: {allowGet: false},
				result: _resultFalse('http://www.go.de#test/A')
			},

			{
				value: 'http://www.go.de/?B=A&A=B#test/A',
				data: {allowGet: false, allowHash: false},
				result: _resultFalse('http://www.go.de')
			},

			{
				value: 'http://www.go.special',
				data: {allowGet: false, allowHash: false, extraDomain: ['special']},
				result: _resultTrue
			},

			{
				value: 'www.google.com',
				data: {protocols: ['']},
				result: _resultTrue
			}
		],
		_lengthArr2 = [
			{ value: _undefined,		data: {},	result: _resultTrue },
			{ value: _null,				data: {},	result: _resultTrue },
			{ value: _function,			data: {},	result: _resultFalse() },
			{ value: _object,			data: {},	result: _resultFalse() },
			{ value: _array,			data: {},	result: _resultFalse() },
			{ value: _$div,				data: {},	result: _resultFalse() }
		]
	;

	test('FormKeeper.Extension.Url.validate', function() {
		$.each(_lengthArr, function () {
			var arr = this,
				_formKeeper = new FormKeeper.Extension.Url(),
				expected = arr.result,
				result = _formKeeper.validate(arr.value, arr.data),
				message = arr.value + ', ' + JSON.stringify(arr.data) + ' = ' + JSON.stringify(expected);

			deepEqual(result, expected, message);
		});

		$.each(_lengthArr2, function () {
			var arr = this,
				_formKeeper = new FormKeeper.Extension.Url(),
				expected = arr.result,
				result = _formKeeper.validate(arr.value, arr.data),
				message = arr.value + ', ' + JSON.stringify(arr.data) + ' = ' + JSON.stringify(expected);

			deepEqual(result, expected, message);
		});
	});

	test('FormKeeper.Extension.Url.validateSelector', function() {
		$.each(_lengthArr, function () {
			var arr = this,
				_formKeeper = new FormKeeper.Extension.Url(),
				$input = $('<input type="text" ' +
					'value="'+ arr.value +'" data-form-keeper=\'{"url": ' + JSON.stringify(arr.data) + '}\' />'),
				expected = arr.result,
				result = _formKeeper.validateSelector($input),
				message = $input.wrap('<p></p>').parent().html() + ' = ' + JSON.stringify(expected);

			deepEqual(result, expected, message);
		});
	});

}());