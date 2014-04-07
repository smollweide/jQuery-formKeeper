
(function () {
	'use strict';

	var templateBase = '' +
		'<select data-form-keeper=\'{"select": ##data##}\'>' +
			'<option value="##value##">Please Select ...</option>' +
		'</select>',
		_resultTrue = { valid: true },
		_resultFalse = { valid: false },
		_lengthArr = [
			{ value: '', data: {}, result: _resultFalse },
			{ value: '', data: {valueNot: ['']}, result: _resultFalse },
			{ value: '1', data: {valueNot: ['']}, result: _resultTrue },
			{ value: 'sdfsd', data: {valueNot: ['', 'sdfsd']}, result: _resultFalse }
		]
	;

	test('FormKeeper.Extension.Select.validate', function() {
		$.each(_lengthArr, function () {

			var arr = this,
				_formKeeper = new FormKeeper.Extension.Select(),
				expected = arr.result,
				result = _formKeeper.validate(arr.value, arr.data),
				message = arr.value + ', ' + JSON.stringify(arr.data) + ' = ' + JSON.stringify(expected);

			deepEqual(result, expected, message);
		});
	});

	test('FormKeeper.Extension.Select.validateSelector', function() {
		$.each(_lengthArr, function () {

			var arr = this,
				_formKeeper = new FormKeeper.Extension.Select(),
				expected = arr.result,
				$select = $(templateBase
					.replace(/##value##/g, arr.value)
					.replace(/##data##/g, JSON.stringify(arr.data))),
				result = _formKeeper.validateSelector($select),
				message = arr.value + ', ' + JSON.stringify(arr.data) + ' = ' + JSON.stringify(expected);


			//console.log($select.data('form-keeper'));

			deepEqual(result, expected, message);
		});
	});

}());