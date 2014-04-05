/*
 * FormKeeper.Extension.Length
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
	 * @Class Length
	 * @extend FormKeeper
	 *
	 * @type {*}
	 */
	FormKeeper.Extension.Length = Class.extend({

		errorMessage: {
			exactly: 'The value must be {{exactly}} characters long.',
			max: 'The value you entered is too long. The value can be up to {{max}} characters long.',
			min: 'The value you entered is too short. The value must be at least {{min}} characters long.',
			range: 'The must be between {{min}} and {{max}} characters long.'
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
				isInput = (self.utils.isTagName($input, 'input')),
				isTextArea = (self.utils.isTagName($input, 'textarea')),
				data = $input.data('form-keeper').length
			;

			if (!isInput && !isTextArea) {
				self.utils.console('warn', 'FormKeeper.Email.lengthSelector: ' +
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
		 * @param {string} data.exactly
		 * @param {string} data.min
		 * @param {string} data.max
		 * @returns {{valid: boolean}}
		 */
		validate: function (value, data) {
			var self = this,
				length = value.length,
				isExactly = !self.utils.isUndefined(data.exactly),
				isMin = !self.utils.isUndefined(data.min),
				isMax = !self.utils.isUndefined(data.max),
				returnTrue = {
					valid: true
				},
				returnFalse = function (key) {
					return {
						type: key,
						valid: false
					};
				};

			if (self.utils.isMandatoryCase(value)) {
				return returnTrue;
			}

			if (!self.utils.isString(value)) {
				return returnTrue;
			}

			if (length < 1) {
				return returnTrue;
			}

			// exactly
			if (isExactly) {
				if (length === data.exactly) {
					return returnTrue;
				} else {
					return returnFalse('exactly');
				}
			}

			// range
			if (isMin && isMax) {
				if (length >= data.min && length <= data.max) {
					return returnTrue;
				} else {
					return returnFalse('range');
				}
			}

			// min
			if (isMin) {
				if (length >= data.min) {
					return returnTrue;
				} else {
					return returnFalse('min');
				}
			}

			// max
			if (isMax) {
				if (length <= data.max) {
					return returnTrue;
				} else {
					return returnFalse('max');
				}
			}

			return returnTrue;
		}
	});

})(FormKeeper.$);