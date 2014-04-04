
(function($) {
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
		_$div = $('<div></div>'),
		returnTrue = {
			valid: true
		},
		returnFalse = {
			valid: false
		},
		_emailArr = [
			{ email: 'test@test.com',			result: returnTrue },
			{ email: 'as.test@test.com',		result: returnTrue },
			{ email: 'testtest.com',			result: returnFalse },
			{ email: 'test@testcom',			result: returnFalse },
			{ email: 'test',					result: returnFalse },
			{ email: 'test@test.co.uk',			result: returnTrue },
			{ email: _string,					result: returnFalse },
			{ email: _emptyString,				result: returnTrue },
			{ email: _function,					result: returnFalse },
			{ email: _object,					result: returnFalse },
			{ email: _number,					result: returnFalse },
			{ email: _numberMinus,				result: returnFalse },
			{ email: _$div,						result: returnFalse }
		],
		_emailArr2 = [
			{ email: _emptyString,				result: returnTrue },
			{ email: _undefined,				result: returnTrue },
			{ email: _null,						result: returnTrue },
			{ email: _array,					result: returnFalse }
		]
	;

	test('FormKeeper.Extension.Email.validate', function() {
		$.each(_emailArr, function () {
			var arr = this,
				formKeeperEmail = new FormKeeper.Extension.Email();

			deepEqual(
				formKeeperEmail.validate(arr.email),
				arr.result,
				arr.email + ' = ' + arr.result
			);
		});

		$.each(_emailArr2, function () {
			var arr = this,
				formKeeperEmail = new FormKeeper.Extension.Email();

			deepEqual(
				formKeeperEmail.validate(arr.email),
				arr.result,
				arr.email + ' = ' + arr.result
			);
		});
	});

	test('FormKeeper.Extension.Email.validateSelector', function() {
		$.each(_emailArr, function () {
			var arr = this,
				$input = $('<input type="text" value="'+ arr.email +'" />'),
				formKeeperEmail = new FormKeeper.Extension.Email();

			deepEqual(
				formKeeperEmail.validateSelector($input),
				arr.result,
				$input.wrap('<p></p>').parent().html() + ' = ' + arr.result
			);
		});
	});

})(FormKeeper.$);