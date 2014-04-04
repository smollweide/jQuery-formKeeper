
(function ($) {
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
		_resultTrue = {
			valid: true
		},
		_resultFalse = {
			valid: false
		},
		formKeeperMandatory = new FormKeeper.Extension.Mandatory(),
		arr = [
			{
				select: '<input type="checkbox" checked="checked" />',
				result: _resultTrue
			},
			{
				select: '<input type="checkbox" />',
				result: _resultFalse
			}
		]
	;

	test('FormKeeper.Extension.Mandatory.validate', function() {
		deepEqual(formKeeperMandatory.validate(_string),		_resultTrue,	'_string = ' + _resultTrue);
		deepEqual(formKeeperMandatory.validate(_emptyString),	_resultFalse,	'_emptyString = ' + _resultFalse);
		deepEqual(formKeeperMandatory.validate(_undefined),		_resultFalse,	'_undefined = ' + _resultFalse);
		deepEqual(formKeeperMandatory.validate(_null),			_resultFalse,	'_null = ' + _resultFalse);
		deepEqual(formKeeperMandatory.validate(_function),		_resultTrue,	'_function = ' + _resultTrue);
		deepEqual(formKeeperMandatory.validate(_object),		_resultTrue,	'_object = ' + _resultTrue);
		deepEqual(formKeeperMandatory.validate(_array),			_resultTrue,	'_array = ' + _resultTrue);
		deepEqual(formKeeperMandatory.validate(_number),		_resultTrue,	'_number = ' + _resultTrue);
		deepEqual(formKeeperMandatory.validate(_numberMinus),	_resultTrue,	'_numberMinus = ' + _resultTrue);
		deepEqual(formKeeperMandatory.validate(_$div),			_resultTrue,	'_$div = ' + _resultTrue);
	});

	test('FormKeeper.Extension.Mandatory.validateSelect', function() {
		$.each(arr, function () {
			deepEqual(
				formKeeperMandatory.validateSelector($(this.select)),
				this.result,
				this.select  + ' = ' + JSON.stringify(this.result));
		});
	});

})(FormKeeper.$);