/*
 * FormKeeper.Extension.Select
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

	FormKeeper.Config.bindAbleExtensions.push('Select');

	/**
	 *
	 * @Class Select
	 * @extend FormKeeper
	 *
	 * @type {*}
	 */
	FormKeeper.Extension.Select = Class.extend({

		errorMessage: {
			default: 'Please select a value.'
		},

		defaults: {
			valueNot: ['']
		},

		/**
		 *
		 * @method init
		 *
		 * @returns {*}
		 */
		init: function() {

			this.utils = FormKeeper.Utils;
			this.options = {};

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

			$form.off('change').on('change', '[data-form-keeper*="\"select\""]', function () {
				parent.validateInput($(this));
			});

			return this;
		},

		/**
		 *
		 * @method validateSelector
		 *
		 * @param {jQuery} $select
		 * @returns {*}
		 */
		validateSelector: function ($select) {
			var self = this,
				data = $select.data('form-keeper').select,
				isSelect = (self.utils.isTagName($select, 'select'));

			if (!isSelect) {
				self.utils.console('warn', 'FormKeeper.Extension.Select.validateSelector: ' +
					'the selector must be an select tag');
				return { valid: true };
			}

			return self.validate($select.val(), data);
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
				utils = self.utils,
				returnTrue = { valid: true },
				returnFalse = { valid: false }
			;

			// set defaults
			self.options = $.extend({}, self.defaults, data);

			if (!utils.isArray(self.options.valueNot)) {
				return returnTrue;
			}

			if ($.inArray(value, self.options.valueNot) === -1) {
				return returnTrue;
			}

			return returnFalse;
		}
	});

})(FormKeeper.$);