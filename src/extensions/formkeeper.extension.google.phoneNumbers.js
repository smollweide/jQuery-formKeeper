/*
 * FormKeeper.Extension.GooglePhoneNumber
 *
 * Copyright 2014
 * Released under the MIT license
 *
 * Jquery Plugin / form validation
 *
 * @author Simon Mollweide
 * @namespace FormKeeper.$
 * @extends FormKeeper.Extension
 * @require jQuery
 * @version 0.1.0
 *
 * @description valid us number: (071) 419-1580
 * @description valid us number: 0714191580
 *
 */
(function($) {
	'use strict';

	/**
	 *
	 * @Class Pattern
	 * @extend FormKeeper
	 *
	 * @type {*}
	 */
	FormKeeper.Extension.GooglePhoneNumber = Class.extend({

		errorMessage: {
			'default': 'The value you entered must be a valid phone number for the region {{country}}.',
			'invalidCountryCode': 'Invalid country calling code',
			'tooShort': 'The string supplied is too short to be a phone number',
			'tooLong': 'The string supplied is too long to be a phone number',
			'notANumber': 'The string supplied did not seem to be a phone number',
			'tooShortNsn': 'The string supplied is too short to be a phone number',
			'tooShortAfterIdd': 'Phone number too short after IDD'
		},

		defaults: {
			country: 'US'
		},

		/**
		 *
		 * @method init
		 *
		 * @returns {*}
		 */
		init: function(){

			this.utils = FormKeeper.Utils;
			this.options = {};

			return this;
		},

		/**
		 *
		 * @method replaceInputValue
		 *
		 * @param {jQuery} $input
		 * @param {string} suggestedValue
		 * @returns {*}
		 */
		replaceInputValue: function ($input, suggestedValue) {

			var self = this;

			if (!self.utils.isString(suggestedValue) || suggestedValue === '') {
				return this;
			}

			$input.val(suggestedValue);

			return this;
		},

		/**
		 *
		 * @method validateSelector
		 *
		 * @param {jQuery} $input
		 * @returns {*}
		 */
		validateSelector: function ($input) {
			var self = this,
				data = $input.data('form-keeper').googlePhoneNumber,
				isInput = (self.utils.isTagName($input, 'input')),
				isTextArea = (self.utils.isTagName($input, 'textarea'));

			if (!isInput && !isTextArea) {
				self.utils.console('warn', 'FormKeeper.Extension.GooglePhoneNumber.validateSelector: ' +
					'the selector must be an input or textarea tag');
				return true;
			}

			return self.validate($input, data);
		},

		/**
		 *
		 * @method validate
		 *
		 * @param {jQuery} $input
		 * @param {object} data
		 * @returns {{valid: boolean}}
		 */
		validate: function ($input, data) {
			var self = this,
				phoneUtil,
				number,
				PNV,
				isPossible,
				isImpossibleReason = '',
				formatter,
				phoneNumber = $input.val(),
				phoneNumberLength,
				inputChar,
				i,
				outputArr = [],
				returnTrue = {
					valid: true
				},
				returnFalse = function (key) {
					if (self.utils.isUndefined(key)) {
						return {
							valid: false
						};
					}
					return {
						type: key,
						valid: false
					};
				}
			;

			// set defaults
			self.options = $.extend({}, self.defaults, data);
			self.suggestedValue = undefined;

			if (typeof(i18n) !== 'object') {
				self.utils.console('warn', 'FormKeeper.Extension.GooglePhoneNumber.validate: ' +
					'please make sure the google libphonenumber library is available ' +
					'(http://closure-compiler.appspot.com/code/jsc114874aa2350cb94ff48c095969141b/libphonenumber.js)');
				return returnTrue;
			}

			phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();

			try {
				number = phoneUtil.parseAndKeepRawInput(phoneNumber, self.options.country);
				PNV = i18n.phonenumbers.PhoneNumberUtil.ValidationResult;
				isPossible = phoneUtil.isPossibleNumber(number);
			} catch (err) {
				return returnFalse('notANumber');
			}

			if (!isPossible) {
				switch (phoneUtil.isPossibleNumberWithReason(number)) {
					case PNV.INVALID_COUNTRY_CODE:
						isImpossibleReason = 'invalidCountryCode';
						break;
					case PNV.TOO_SHORT:
						isImpossibleReason = 'tooShort';
						break;
					case PNV.TOO_LONG:
						isImpossibleReason = 'tooLong';
						break;
					case PNV.TOO_SHORT_NSN:
						isImpossibleReason = 'tooShortNsn';
						break;
					case PNV.TOO_SHORT_AFTER_IDD:
						isImpossibleReason = 'tooShortAfterIdd';
						break;
					default: isImpossibleReason = 'default';
						break;
				}

				return returnFalse(isImpossibleReason);
			}

			formatter = new i18n.phonenumbers.AsYouTypeFormatter(self.options.country);
			phoneNumberLength = phoneNumber.length;
			for (i = 0; i < phoneNumberLength; ++i) {
				inputChar = phoneNumber.charAt(i);
				outputArr.push(formatter.inputDigit(inputChar));
			}

			self.replaceInputValue($input, outputArr[outputArr.length - 1]);

			return returnTrue;
		}
	});

})(FormKeeper.$);