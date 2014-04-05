/*
 * FormKeeper.Extension.Date
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
	 * @Class Date
	 * @extend FormKeeper
	 *
	 * @type {*}
	 */
	FormKeeper.Extension.Date = Class.extend({

		errorMessage: {
			default: 'The date you entered must be in Format "{{format}}".',
			suggestion: ' Did you mean ' +
				'<a data-form-keeper-suggestion="{{suggestion}}">{{suggestion}}</a>?'
		},

		defaults: {
			format: 'DD.MM.YYYY',
			separator: '.'
		},

		/**
		 *
		 * @method init
		 *
		 * @returns {*}
		 */
		init: function(){

			this.utils = FormKeeper.Utils;
			this.monthLeadingNull = false;
			this.dayLeadingNull = false;
			this.startWithYear = false;
			this.options = {};

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
				data = $input.data('form-keeper').date,
				isInput = (self.utils.isTagName($input, 'input')),
				isTextArea = (self.utils.isTagName($input, 'textarea'));

			if (!isInput && !isTextArea) {
				self.utils.console('warn', 'FormKeeper.Extension.Date.validateSelector: ' +
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
				returnTrue = { valid: true },
				returnFalse = { valid: false },
				isMandatory = (self.utils.isMandatoryCase(value)),
				isInValidValue = (!self.utils.isString(value)),
				formatArr, valueArr
			;

			// validate arguments
			if (isMandatory) {
				return returnTrue;
			}
			if (isInValidValue) {
				return returnFalse;
			}

			// set defaults
			self.options = $.extend({}, self.defaults, data);

			// build format Array
			formatArr = self.options.format.split(self.options.separator);
			if (self.isValidDateArray(formatArr)) {
				self.logFormatUnknown('validate');
				return returnTrue;
			}

			// build value Array
			valueArr = value.split(self.options.separator);
			if (self.isValidDateArray(valueArr)) {
				return returnFalse;
			}

			// year is first
			if (formatArr[0].search('Y') !== -1) {
				self.startWithYear = true;
				return self.getValidateReturn(formatArr, valueArr);
			}

			// year is last
			if (formatArr[2].search('Y') !== -1) {
				self.startWithYear = false;
				return self.getValidateReturn(formatArr, valueArr);
			}

			self.logFormatUnknown('validate');
			return returnTrue;
		},

		/**
		 *
		 * @method getValidateReturn
		 *
		 * @param {Array} formatArr
		 * @param {Array} valueArr
		 * @returns {*}
		 */
		getValidateReturn: function (formatArr, valueArr) {
			var self = this,
				suggestionDate,
				returnTrue = {
					valid: true
				},
				returnFalse = function (suggestionDate) {
					if (!self.utils.isUndefined(suggestionDate)) {
						return {
							valid: false,
							suggestion: self.getFormatSuggestionDate(suggestionDate)
						};
					}
					return {
						valid: false
					};
				};

			if (!self.startWithYear) {
				valueArr = valueArr.reverse();
				formatArr = formatArr.reverse();
			}

			if (!self.isValidDate(valueArr, formatArr)) {
				return returnFalse();
			}

			suggestionDate = self.getSuggestionDate([valueArr[0], valueArr[1], valueArr[2]]);

			if (suggestionDate[0] === null || isNaN(suggestionDate[0])) {
				return returnFalse();
			}

			if (suggestionDate[0] !== parseInt(valueArr[0], 10)) {
				return returnFalse(suggestionDate);
			}

			if (suggestionDate[1] !== parseInt(valueArr[1], 10)) {
				return returnFalse(suggestionDate);
			}

			if (suggestionDate[2] !== parseInt(valueArr[2], 10)) {
				return returnFalse(suggestionDate);
			}

			return returnTrue;
		},

		/**
		 *
		 * @method getSuggestionDate
		 *
		 * @param {Array} rawDate
		 * @returns {Array}
		 */
		getSuggestionDate: function (rawDate) {
			var year = parseInt(rawDate[0], 10),
				month = parseInt(rawDate[1], 10) - 1,
				date = parseInt(rawDate[2], 10),
				dateTemp = new Date(year, month, date)
			;

			return [
				(dateTemp.getFullYear()),
				(dateTemp.getMonth() + 1),
				dateTemp.getDate()
			];
		},

		/**
		 *
		 * @method getFormatSuggestionDate
		 *
		 * @param {Array} dateArr
		 * @returns {*}
		 */
		getFormatSuggestionDate: function (dateArr) {
			var self = this;

			if (dateArr.length !== 3) {
				self.utils.console('error', 'FromKeeper.Extension.Date.getFormatSuggestionDate: ' +
					'invalid argument "dateArr"');
			}

			if (!self.startWithYear) {
				dateArr.reverse();
			}

			if (self.monthLeadingNull) {
				dateArr[1] = self.utils.toLeadingNull(dateArr[1]);
			}
			if (self.dayLeadingNull) {
				dateArr[0] = self.utils.toLeadingNull(dateArr[0]);
			}

			return dateArr.join(self.options.separator);
		},

		/**
		 *
		 * @method logFormatUnknown
		 *
		 * @param {string} method
		 */
		logFormatUnknown: function (method) {
			this.utils.console('warn', 'FormKeeper.Extension.Date.' + method + ' the format is unknown');
		},

		/**
		 *
		 * @method isValidDateArray
		 *
		 * @param {Array} dateArray
		 * @returns {boolean}
		 */
		isValidDateArray: function (dateArray) {
			return (!this.utils.isArray(dateArray) || dateArray.length !== 3);
		},

		/**
		 *
		 * @method isValidDate
		 *
		 * @param {Array} valueArr
		 * @param {Array} formatArr
		 * @returns {*}
		 */
		isValidDate: function (valueArr, formatArr) {
			var self = this;

			return (
				self.isValidYear(formatArr[0], valueArr[0]) &&
					self.isValidMonth(formatArr[1], valueArr[1]) &&
					self.isValidDay(formatArr[2], valueArr[2])
				);
		},

		/**
		 *
		 * @method isValidYear
		 *
		 * @param {string} format
		 * @param {string} value
		 * @returns {boolean}
		 */
		isValidYear: function (format, value) {
			return (format.length === 4 && value.length === 4);
		},

		/**
		 *
		 * @method isValidMonth
		 *
		 * @param {string} format
		 * @param {string} value
		 * @returns {boolean}
		 */
		isValidMonth: function (format, value) {
			var self = this,
				hasLeadingNull = (format === 'MM'),
				valueLen = value.length;

			if (!hasLeadingNull && format !== 'M') {
				return true;
			}

			if (hasLeadingNull) {
				self.monthLeadingNull = true;
				return (valueLen === 2);
			}

			self.monthLeadingNull = false;
			return !(valueLen === 2 && parseInt(value, 10) <= 9);
		},

		/**
		 *
		 * @method isValidDay
		 *
		 * @param {string} format
		 * @param {string} value
		 * @returns {boolean}
		 */
		isValidDay: function (format, value) {
			var self = this,
				hasLeadingNull = (format === 'DD'),
				valueLen = value.length;

			if (!hasLeadingNull && format !== 'D') {
				return true;
			}

			if (hasLeadingNull) {
				self.dayLeadingNull = true;
				return (valueLen === 2);
			}

			self.dayLeadingNull = false;
			return !(valueLen === 2 && parseInt(value, 10) <= 9);
		}

	});

})(FormKeeper.$);