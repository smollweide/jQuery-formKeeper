/*
 * FormKeeper.Extension.Time
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
 */
(function($) {
	'use strict';

	/**
	 *
	 * @Class Time
	 * @extend FormKeeper
	 *
	 * @type {*}
	 */
	FormKeeper.Extension.Time = Class.extend({

		errorMessage: {
			'default': 'The value you entered must be in Format "{{format}}".'
		},

		defaults: {
			format: 'HH:mm',
			separator: ':'
		},

		/**
		 *
		 * @method init
		 *
		 * @returns {*}
		 */
		init: function(){

			this.utils = FormKeeper.Utils;

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
				data = $input.data('form-keeper').time,
				isInput = (self.utils.isTagName($input, 'input')),
				isTextArea = (self.utils.isTagName($input, 'textarea'));

			if (!isInput && !isTextArea) {
				self.utils.console('warn', 'FormKeeper.Extension.Time.validateSelector: ' +
					'the selector must be an input or textarea tag');
				return true;
			}

			return self.validate($input.val(), data);
		},

		/**
		 *
		 * @method validate
		 *
		 * @param {string} value
		 * @param {object} data
		 * @returns {{valid: boolean}}
		 */
		validate: function (value, data) {
			var self = this,
				returnTrue = {
					valid: true
				},
				returnFalse = {
					valid: false
				},
				format = data.format,
				separator = data.separator,
				formatArr,
				hasFormat = (!self.utils.isUndefined(format)),
				hasSeparator = (!self.utils.isUndefined(separator)),
				isMandatory = (self.utils.isMandatoryCase(value)),
				isInValid = (!self.utils.isString(value)),
				regExp,
				result
			;

			if (isMandatory) {
				return returnTrue;
			}

			if (isInValid) {
				return returnFalse;
			}

			if (!hasFormat) {
				format = self.defaults.format;
				data.format = format;
			}

			if (!hasSeparator) {
				separator = self.defaults.separator;
			}

			formatArr = format.split(separator);

			if (!(regExp = self.getRegExp(formatArr, separator))) {
				self.utils.console('warn', 'FormKeeper.Extension.Time.validate the format is unknown');
				return returnTrue;
			}

			result = regExp.exec(value);

			if (self.utils.isNull(result)) {
				return returnFalse;
			}

			if (result[0] === value) {
				return returnTrue;
			} else {
				return returnFalse;
			}
		},

		/**
		 *
		 * @method getRegExp
		 *
		 * @description return the regExp or false if the given form isn\'t valid
		 *
		 * @param {Array} formatArr
		 * @param {string} separator
		 * @returns {RegExp|Boolean}
		 */
		getRegExp: function (formatArr, separator) {
			var self = this,
				regExpArr = [],
				formatUnknown = function () {
					self.utils.console('warn', 'FormKeeper.Extension.Time.getRegExp the format is unknown');
				},
				regHour,
				regMinute,
				regSecond,
				isValidFormat = (self.utils.isArray(formatArr) && formatArr.length > 0),
				buildRegEx = function () {
					return new RegExp('^' + regExpArr.join(separator) + '$');
				}
			;

			if (!isValidFormat) {
				formatUnknown();
				return false;
			}

			// hour
			regHour = self.getRegExpHour(formatArr[0]);
			if (!regHour) {
				formatUnknown();
				return false;
			}
			regExpArr.push(regHour);

			// minute
			if (formatArr.length <= 1) {
				return buildRegEx();
			}
			regMinute = self.getRegExpMinute(formatArr[1]);
			if (!regMinute) {
				formatUnknown();
				return false;
			}
			regExpArr.push(regMinute);

			// second
			if (formatArr.length <= 2) {
				return buildRegEx();
			}
			regSecond = self.getRegExpSecond(formatArr[2]);
			if (!regSecond) {
				formatUnknown();
				return false;
			}
			regExpArr.push(regSecond);

			return buildRegEx();
		},

		/**
		 *
		 * @method getRegExpHour
		 *
		 * @param {string} format
		 * @returns {boolean|RegExp}
		 */
		getRegExpHour: function (format) {
			var reg = false;
			switch (format) {
				case 'HH': reg = '(0[0-9]|1[0-9]|2[0-3])'; break;
				case 'H': reg = '([0-9]|1[0-9]|2[0-3])'; break;
				case 'hh': reg = '(0[0-9]|1[0-2])'; break;
				case 'h': reg = '([0-9]|1[0-2])'; break;
			}
			return reg;
		},

		/**
		 *
		 * @method getRegExpMinute
		 *
		 * @param {string} format
		 * @returns {boolean|RegExp}
		 */
		getRegExpMinute: function (format) {
			var reg = false;
			switch (format) {
				case 'mm': reg = '(0[0-9]|[1-5][0-9])'; break;
				case 'm': reg = '([0-9]|[1-5][0-9])'; break;
			}
			return reg;
		},

		/**
		 *
		 * @method getRegExpSecond
		 *
		 * @param {string} format
		 * @returns {boolean|RegExp}
		 */
		getRegExpSecond: function (format) {
			var reg = false;
			switch (format) {
				case 'ss': reg = '(0[0-9]|[1-5][0-9])'; break;
				case 's': reg = '([0-9]|[1-5][0-9])'; break;
			}
			return reg;
		}

	});

})(FormKeeper.$);
