/*
 * FormKeeper.Extension.Number
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
	 * @Class Number
	 * @extend FormKeeper
	 *
	 * @type {*}
	 */
	FormKeeper.Extension.Number = Class.extend({

		errorMessage: {
			number: 'The value you entered must be an Number.',
			max: 'The value you entered is too high. The value can be up to {{max}}.',
			min: 'The value you entered is too low. The value must be higher than {{min}}.',
			range: 'The value must be between {{min}} and {{max}}.'
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
				data = $input.data('form-keeper').number,
				isInput = (self.utils.isTagName($input, 'input')),
				isTextArea = (self.utils.isTagName($input, 'textarea'));

			if (!isInput && !isTextArea) {
				self.utils.console('warn', 'FormKeeper.Extension.Number.validateSelector: ' +
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
				valueNumber,
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
				},
				isMin = (!self.utils.isUndefined(data.min)),
				isMax = (!self.utils.isUndefined(data.max)),
				isMandatory = (self.utils.isMandatoryCase(value)),
				isInValid = (self.utils.isFunction(value) ||
					self.utils.isObject(value) ||
					self.utils.isArray(value));

			if (isMandatory) {
				return returnTrue;
			}

			if (isInValid) {
				return returnFalse('number');
			}

			value = value.toString();

			// number
			if (value.replace(/[0-9\-\.]*/g, '') !== '') {
				return returnFalse('number');
			}
			valueNumber = parseFloat(value);

			// range
			if (isMin && isMax) {
				if (valueNumber >= data.min && valueNumber <= data.max) {
					return returnTrue;
				} else {
					return returnFalse('range');
				}
			}

			// min
			if (isMin) {
				if (valueNumber >= data.min) {
					return returnTrue;
				} else {
					return returnFalse('min');
				}
			}

			// max
			if (isMax) {
				if (valueNumber <= data.max) {
					return returnTrue;
				} else {
					return returnFalse('max');
				}
			}

			return returnTrue;
		}

	});

})(FormKeeper.$);