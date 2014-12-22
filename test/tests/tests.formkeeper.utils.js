
(function($) {
	'use strict';

	var utils = FormKeeper.Utils,
		_string = 'string',
		_emptyString = '',
		_undefined,
		_null = null,
		_function = function () {},
		_object = {},
		_array = [],
		_number = 1,
		_numberMinus = -10,
		_integer = 12,
		_integerMinus = -14,
		_float = 1.2,
		_floatMinus = -13.2,
		_$div = $('<div></div>'),
		_$input = $('<input name="email" type="text" />'),
		_$textarea = $('<textarea id="note">Text</textarea>')
	;

	test('FormKeeper.Utils.isString', function() {
		strictEqual(utils.isString(_string),			true,	'_string = true');
		strictEqual(utils.isString(_emptyString),		true,	'_emptyString = true');
		strictEqual(utils.isString(_undefined),			false,	'_undefined = false');
		strictEqual(utils.isString(_null),				false,	'_null = false');
		strictEqual(utils.isString(_function),			false,	'_function = false');
		strictEqual(utils.isString(_object),			false,	'_object = false');
		strictEqual(utils.isString(_array),				false,	'_array = false');
		strictEqual(utils.isString(_number),			false,	'_number = false');
		strictEqual(utils.isString(_numberMinus),		false,	'_numberMinus = false');
		strictEqual(utils.isString(_$div),				false,	'_$div = false');
	});

	test('FormKeeper.Utils.isInteger', function() {
		strictEqual(utils.isInteger(_string),			false,	'_string = false');
		strictEqual(utils.isInteger(_emptyString),		false,	'_emptyString = false');
		strictEqual(utils.isInteger(_undefined),		false,	'_undefined = false');
		strictEqual(utils.isInteger(_null),				false,	'_null = false');
		strictEqual(utils.isInteger(_function),			false,	'_function = false');
		strictEqual(utils.isInteger(_object),			false,	'_object = false');
		strictEqual(utils.isInteger(_array),			false,	'_array = false');
		strictEqual(utils.isInteger(_number),			true,	'_number = true');
		strictEqual(utils.isInteger(_numberMinus),		true,	'_numberMinus = true');
		strictEqual(utils.isInteger(_integer),			true,	'_integer = true');
		strictEqual(utils.isInteger(_integerMinus),		true,	'_integerMinus = true');
		strictEqual(utils.isInteger(_float),			false,	'_float = false');
		strictEqual(utils.isInteger(_floatMinus),		false,	'_floatMinus = false');
		strictEqual(utils.isInteger(_$div),				false,	'_$div = false');
	});

	test('FormKeeper.Utils.isNumber', function() {
		strictEqual(utils.isNumber(_string),			false,	'_string = false');
		strictEqual(utils.isNumber(_emptyString),		false,	'_emptyString = false');
		strictEqual(utils.isNumber(_undefined),			false,	'_undefined = false');
		strictEqual(utils.isNumber(_null),				false,	'_null = false');
		strictEqual(utils.isNumber(_function),			false,	'_function = false');
		strictEqual(utils.isNumber(_object),			false,	'_object = false');
		strictEqual(utils.isNumber(_array),				false,	'_array = false');
		strictEqual(utils.isNumber(_number),			true,	'_number = true');
		strictEqual(utils.isNumber(_numberMinus),		true,	'_numberMinus = true');
		strictEqual(utils.isNumber(_integer),			true,	'_integer = true');
		strictEqual(utils.isNumber(_integerMinus),		true,	'_integerMinus = true');
		strictEqual(utils.isNumber(_float),				true,	'_float = true');
		strictEqual(utils.isNumber(_floatMinus),		true,	'_floatMinus = true');
		strictEqual(utils.isNumber(_$div),				false,	'_$div = false');
	});

	test('FormKeeper.Utils.isUndefined', function() {
		strictEqual(utils.isUndefined(_string),			false,	'_string = false');
		strictEqual(utils.isUndefined(_emptyString),	false,	'_emptyString = false');
		strictEqual(utils.isUndefined(_undefined),		true,	'_undefined = true');
		strictEqual(utils.isUndefined(_null),			false,	'_null = false');
		strictEqual(utils.isUndefined(_function),		false,	'_function = false');
		strictEqual(utils.isUndefined(_object),			false,	'_object = false');
		strictEqual(utils.isUndefined(_array),			false,	'_array = false');
		strictEqual(utils.isUndefined(_number),			false,	'_number = false');
		strictEqual(utils.isUndefined(_numberMinus),	false,	'_numberMinus = false');
		strictEqual(utils.isUndefined(_$div),			false,	'_$div = false');
	});

	test('FormKeeper.Utils.isNull', function() {
		strictEqual(utils.isNull(_string),				false,	'_string = false');
		strictEqual(utils.isNull(_emptyString),			false,	'_emptyString = false');
		strictEqual(utils.isNull(_undefined),			false,	'_undefined = false');
		strictEqual(utils.isNull(_null),				true,	'_null = true');
		strictEqual(utils.isNull(_function),			false,	'_function = false');
		strictEqual(utils.isNull(_object),				false,	'_object = false');
		strictEqual(utils.isNull(_array),				false,	'_array = false');
		strictEqual(utils.isNull(_number),				false,	'_number = false');
		strictEqual(utils.isNull(_numberMinus),			false,	'_numberMinus = false');
		strictEqual(utils.isNull(_$div),				false,	'_$div = false');
	});

	test('FormKeeper.Utils.isObject', function() {
		strictEqual(utils.isObject(_string),			false,	'_string = false');
		strictEqual(utils.isObject(_emptyString),		false,	'_emptyString = false');
		strictEqual(utils.isObject(_undefined),			false,	'_undefined = false');
		strictEqual(utils.isObject(_null),				false,	'_null = false');
		strictEqual(utils.isObject(_function),			false,	'_function = false');
		strictEqual(utils.isObject(_object),			true,	'_object = true');
		strictEqual(utils.isObject(_array),				false,	'_array = false');
		strictEqual(utils.isObject(_number),			false,	'_number = false');
		strictEqual(utils.isObject(_numberMinus),		false,	'_numberMinus = false');
		strictEqual(utils.isObject(_$div),				true,	'_$div = true');
	});

	test('FormKeeper.Utils.isFunction', function() {
		strictEqual(utils.isFunction(_string),			false,	'_string = false');
		strictEqual(utils.isFunction(_emptyString),		false,	'_emptyString = false');
		strictEqual(utils.isFunction(_undefined),		false,	'_undefined = false');
		strictEqual(utils.isFunction(_null),			false,	'_null = false');
		strictEqual(utils.isFunction(_function),		true,	'_function = true');
		strictEqual(utils.isFunction(_object),			false,	'_object = false');
		strictEqual(utils.isFunction(_array),			false,	'_array = false');
		strictEqual(utils.isFunction(_number),			false,	'_number = false');
		strictEqual(utils.isFunction(_numberMinus),		false,	'_numberMinus = false');
		strictEqual(utils.isFunction(_$div),			false,	'_$div = false');
	});

	test('FormKeeper.Utils.isArray', function() {
		strictEqual(utils.isArray(_string),				false,	'_string = false');
		strictEqual(utils.isArray(_emptyString),		false,	'_emptyString = false');
		strictEqual(utils.isArray(_undefined),			false,	'_undefined = false');
		strictEqual(utils.isArray(_null),				false,	'_null = false');
		strictEqual(utils.isArray(_function),			false,	'_function = false');
		strictEqual(utils.isArray(_object),				false,	'_object = false');
		strictEqual(utils.isArray(_array),				true,	'_array = true');
		strictEqual(utils.isArray(_number),				false,	'_number = false');
		strictEqual(utils.isArray(_numberMinus),		false,	'_numberMinus = false');
		strictEqual(utils.isArray(_$div),				false,	'_$div = false');
	});

	test('FormKeeper.Utils.isTagName', function() {
		strictEqual(utils.isTagName(_$div, 'div'),				true,	'_$div, div = true');
		strictEqual(utils.isTagName(_$input, 'input'),			true,	'_$input, input = true');
		strictEqual(utils.isTagName(_$textarea, 'textarea'),	true,	'_$textarea, textarea = true');
		strictEqual(utils.isTagName(_$div, 'DIV'),				true,	'_$div, DIV = true');
		strictEqual(utils.isTagName(_$input, 'INPUT'),			true,	'_$input, INPUT = true');
		strictEqual(utils.isTagName(_$textarea, 'TEXTAREA'),	true,	'_$textarea, TEXTAREA = true');
		strictEqual(utils.isTagName(_$div, 'input'),			false,	'_$div, input = false');
		strictEqual(utils.isTagName(_$textarea, 'input'),		false,	'_$textarea, input = false');
		strictEqual(utils.isTagName(_$input, 'div'),			false,	'_$input, div = false');
		strictEqual(utils.isTagName(_$textarea, 'div	'),		false,	'_$textarea, div = false');
		strictEqual(utils.isTagName(_$div, 'textarea'),			false,	'_$div, textarea = false');
		strictEqual(utils.isTagName(_$input, 'textarea'),		false,	'_$input, textarea = false');
	});

	test('FormKeeper.Utils.isMandatoryCase', function() {
		strictEqual(utils.isMandatoryCase(_string),				false,	'_string = false');
		strictEqual(utils.isMandatoryCase(_emptyString),		true,	'_emptyString = true');
		strictEqual(utils.isMandatoryCase(_undefined),			true,	'_undefined = true');
		strictEqual(utils.isMandatoryCase(_null),				true,	'_null = true');
		strictEqual(utils.isMandatoryCase(_function),			false,	'_function = false');
		strictEqual(utils.isMandatoryCase(_object),				false,	'_object = false');
		strictEqual(utils.isMandatoryCase(_array),				false,	'_array = false');
		strictEqual(utils.isMandatoryCase(_number),				false,	'_number = false');
		strictEqual(utils.isMandatoryCase(_numberMinus),		false,	'_numberMinus = false');
		strictEqual(utils.isMandatoryCase(_$div),				false,	'_$div = false');
	});

	test('FormKeeper.Utils.isValidExtension', function() {
		strictEqual(utils.isValidExtension('email'),			true,	'email = true');
		strictEqual(utils.isValidExtension(undefined),			false,	'undefined = false');
		strictEqual(utils.isValidExtension('donTExist'),		false,	'donTExist = false');
	});

	test('FormKeeper.Utils.toLeadingNull', function() {
		strictEqual(utils.toLeadingNull(_string),			null,	'_string = null');
		strictEqual(utils.toLeadingNull(_emptyString),		null,	'_emptyString = null');
		strictEqual(utils.toLeadingNull(_undefined),			null,	'_undefined = null');
		strictEqual(utils.toLeadingNull(_null),				null,	'_null = null');
		strictEqual(utils.toLeadingNull(_function),			null,	'_function = null');
		strictEqual(utils.toLeadingNull(_object),			null,	'_object = null');
		strictEqual(utils.toLeadingNull(_array),				null,	'_array = null');
		strictEqual(utils.toLeadingNull(-1),					'-01',	'-1 = -01');
		strictEqual(utils.toLeadingNull(2),					'02',	'2 = 02');
		strictEqual(utils.toLeadingNull(6),					'06',	'6 = 06');
		strictEqual(utils.toLeadingNull('8'),				'08',	'8 = 08');
		strictEqual(utils.toLeadingNull(10),					'10',	'10 = 10');
	});

	test('FormKeeper.Utils.replace', function() {
		strictEqual(utils.replace('some {{thing}}', {
			thing: 'thing'
		}), 'some thing', 'some {{thing}} = true');

		strictEqual(utils.replace('some {{thing}} {{thing}}', {
			thing: 'thing'
		}), 'some thing thing', 'some {{thing}} {{thing}} = true');

		strictEqual(utils.replace('some {{thing}} {{happens}}', {
			thing: 'thing',
			happens: 'happens'
		}), 'some thing happens', 'some {{thing}} {{happens}} = true');

		strictEqual(utils.replace(undefined, {
			thing: 'thing',
			happens: 'happens'
		}), '', 'undefined = false');
	});

	test('FormKeeper.Utils.getSelectorIdentifier', function() {
		strictEqual(utils.getSelectorIdentifier(_$div), new Date().getTime(), '_$div = timestamp');
		strictEqual(utils.getSelectorIdentifier(_$input), 'email', '_$input = email');
		strictEqual(utils.getSelectorIdentifier(_$textarea), 'note', '_$textarea = note');
	});

	test('FormKeeper.Utils.processReplace', function() {
		strictEqual(utils.processReplace(
			'12 12 12 12',
			[[" ", ""]]),
			'1212 12 12',
			'replace simple'
		);
		strictEqual(utils.processReplace(
			'12 12 12 12',
			[{regExp:" ", delimiter:"g", replace:""}]),
			'12121212',
			'replace regExp'
		);
		strictEqual(utils.processReplace(
			'123Test32523',
			[{regExp:"[a-zA-Z]", delimiter:"g", replace:""}]),
			'12332523',
			'replace regExp 2'
		);
	});

})(FormKeeper.$);