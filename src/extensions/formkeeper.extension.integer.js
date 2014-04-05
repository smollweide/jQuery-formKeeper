/*
 * FormKeeper.Extension.Integer
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
	 * @Class Integer
	 * @extend FormKeeper
	 *
	 * @type {*}
	 */
	FormKeeper.Extension.Integer = Class.extend({

		errorMessage: {
			integer: 'The value you entered must be an Integer.',
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
				data = $input.data('form-keeper').integer,
				isInput = (self.utils.isTagName($input, 'input')),
				isTextArea = (self.utils.isTagName($input, 'textarea'));

			if (!isInput && !isTextArea) {
				self.utils.console('warn', 'FormKeeper.Extension.Integer.validateSelector: ' +
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
				valueInt,
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
					self.utils.isArray(value))
			;

			if (isMandatory) {
				return returnTrue;
			}

			if (isInValid) {
				return returnFalse('integer');
			}

			value = value.toString();

			// integer
			if (value.replace(/[0-9\-]*/g, '') !== '') {
				return returnFalse('integer');
			}
			valueInt = parseInt(value, 10);

			// range
			if (isMin && isMax) {
				if (valueInt >= data.min && valueInt <= data.max) {
					return returnTrue;
				} else {
					return returnFalse('range');
				}
			}

			// min
			if (isMin) {
				if (valueInt >= data.min) {
					return returnTrue;
				} else {
					return returnFalse('min');
				}
			}

			// max
			if (isMax) {
				if (valueInt <= data.max) {
					return returnTrue;
				} else {
					return returnFalse('max');
				}
			}

			return returnTrue;
		}

	});

})(FormKeeper.$);