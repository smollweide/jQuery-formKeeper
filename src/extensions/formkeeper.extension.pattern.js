/*
 * FormKeeper.Extension.Pattern
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
	 * @Class Pattern
	 * @extend FormKeeper
	 *
	 * @type {*}
	 */
	FormKeeper.Extension.Pattern = Class.extend({

		errorMessage: {
			'default': 'The value you entered must be in format /{{regExp}}/{{delimiter}}.'
		},

		defaults: {
			regExp: undefined,
			delimiter: ''
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
		 * @method validateSelector
		 *
		 * @param {jQuery} $input
		 * @returns {*}
		 */
		validateSelector: function ($input) {
			var self = this,
				data = $input.data('form-keeper').pattern,
				isInput = (self.utils.isTagName($input, 'input')),
				isTextArea = (self.utils.isTagName($input, 'textarea'));

			if (!isInput && !isTextArea) {
				self.utils.console('warn', 'FormKeeper.Extension.Url.validateSelector: ' +
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
			var self = this;

			// validate arguments
			if (self.utils.isMandatoryCase(value)) {
				return { valid: true };
			}

			if (!self.utils.isString(value)) {
				return { valid: false };
			}

			// set defaults
			self.options = $.extend({}, self.defaults, data);

			return self.getValidateReturn(value);
		},

		/**
		 *
		 * @method getValidateReturn
		 *
		 * @param {string} value
		 * @returns {*}
		 */
		getValidateReturn: function (value) {
			var self = this,
				options = self.options,
				result
			;

			if (!self.utils.isString(options.regExp)) {
				return { valid: true };
			}

			result = self.getRegExp().exec(value);

			if (self.utils.isNull(result)) {
				return { valid: false };
			}

			return {
				valid: (result[0] === result.input)
			};
		},

		/**
		 *
		 * @method getRegExp
		 *
		 * @returns {RegExp}
		 */
		getRegExp: function () {
			var options = this.options;

			return new RegExp(options.regExp, options.delimiter);
		}
	});

})(FormKeeper.$);