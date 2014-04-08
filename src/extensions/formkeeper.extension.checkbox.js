/*
 * FormKeeper.Extension.Checkbox
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

	FormKeeper.Config.bindAbleExtensions.push('Checkbox');

	/**
	 *
	 * @Class Checkbox
	 * @extend FormKeeper
	 *
	 * @type {*}
	 */
	FormKeeper.Extension.Checkbox = Class.extend({

		errorMessage: {
			exactly: 'Please select {{exactly}} checkbox.',
			max: 'Please select up to {{max}} checkboxes.',
			min: 'Please select at least {{min}} checkboxes.',
			range: 'Please select between {{min}} and {{max}} checkboxes.'
		},

		defaults: {},

		/**
		 *
		 * @method init
		 *
		 * @returns {*}
		 */
		init: function() {

			this.utils = FormKeeper.Utils;
			this.options = {};
			this.$inputs = {};
			this.inputCheckedCount = 0;

			return this;
		},

		/**
		 *
		 * @method bind
		 *
		 * @param {FormKeeper.Core} parent
		 * @param {jQuery} $form
		 * @returns {*}
		 */
		bind: function (parent, $form) {
			var selector = '[data-form-keeper*="\"checkbox\""]';

			$form.off('change').on('change', selector + ' input[type="checkbox"]', function () {
				parent.validateInput($(this).closest(selector));
			});

			return this;
		},

		/**
		 *
		 * @method validateSelector
		 *
		 * @param {jQuery} $selector
		 * @returns {*}
		 */
		validateSelector: function ($selector) {
			var self = this,
				data = $selector.data('form-keeper').checkbox,
				isInput = (self.utils.isTagName($selector, 'input')),
				isTextArea = (self.utils.isTagName($selector, 'textarea'));

			if (isInput || isTextArea) {
				self.utils.console('warn', 'FormKeeper.Extension.Checkbox.validateSelector: ' +
					'the selector can\'t be an input or textarea tag');
				return true;
			}

			self.$inputs = $('input[type="checkbox"]', $selector);

			// set defaults
			self.options = $.extend({}, self.defaults, data);

			return self.validate();
		},

		/**
		 *
		 * @method validate
		 *
		 * @returns {{valid: boolean}}
		 */
		validate: function () {
			var self = this,
				utils = self.utils,
				isMin = (!utils.isUndefined(self.options.min)),
				isMax = (!utils.isUndefined(self.options.max)),
				isExactly = (!utils.isUndefined(self.options.exactly)),
				returnTrue = { valid: true },
				returnFalse = function (key) {
					return {
						type: key,
						valid: false
					};
				}
			;

			if (self.$inputs.length <= 0) {
				return returnTrue;
			}
			self.inputCheckedCount = self.$inputs.filter(':checked').length;

			// exactly
			if (isExactly) {
				if (self.validateExactly(self.options.exactly)) {
					return returnTrue;
				}
				return returnFalse('exactly');
			}

			// range
			if (isMin && isMax) {
				if (self.validateMin(self.options.min) && self.validateMax(self.options.max)) {
					return returnTrue;
				}
				return returnFalse('range');
			}

			// min
			if (isMin) {
				if (self.validateMin(self.options.min)) {
					return returnTrue;
				}
				return returnFalse('min');
			}

			// max
			if (isMax) {
				if (self.validateMax(self.options.max)) {
					return returnTrue;
				}
				return returnFalse('max');
			}

			return returnTrue;
		},

		/**
		 *
		 * @method validateExactly
		 *
		 * @param {number} exactly
		 * @returns {boolean}
		 */
		validateExactly: function (exactly) {
			var self = this;

			if (!self.utils.isNumber(exactly)) {
				return true;
			}

			return (self.inputCheckedCount === exactly);
		},

		/**
		 *
		 * @method validateMin
		 *
		 * @param {number} min
		 * @returns {boolean}
		 */
		validateMin: function (min) {
			var self = this;

			if (!self.utils.isNumber(min)) {
				return true;
			}

			return (self.inputCheckedCount >= min);
		},

		/**
		 *
		 * @method validateMax
		 *
		 * @param {number} max
		 * @returns {boolean}
		 */
		validateMax: function (max) {
			var self = this;

			if (!self.utils.isNumber(max)) {
				return true;
			}

			return (self.inputCheckedCount <= max);
		}
	});

})(FormKeeper.$);