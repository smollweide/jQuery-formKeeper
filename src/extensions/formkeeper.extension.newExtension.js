/*
 * FormKeeper.Extension.##newExtensionName##
 *
 * Copyright 2014
 * Released under the MIT license
 *
 * Jquery Plugin / form validation
 *
 * @author ##author##
 * @namespace FormKeeper.$
 * @extends FormKeeper.Extension
 * @require jQuery
 * @version 0.1.0
 *
 */
(function($) {
	'use strict';

	// just required if you need a special typeahead handling
	FormKeeper.Config.bindAbleExtensions.push('##newExtensionName##');

	/**
	 *
	 * @Class ##newExtensionName##
	 * @extend FormKeeper
	 *
	 * @type {*}
	 */
	FormKeeper.Extension.##newExtensionName## = Class.extend({

		errorMessage: {
			default: '##text##'
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

			// the method bind will be triggered if you add your extension to the "FormKeeper.Config.bindAbleExtensions" array

			/*
			$form.off('change').on('change', '[data-form-keeper*="\"##newExtensionName##\""]', function () {
				parent.validateInput($(this));
			});
			*/

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
				data = $input.data('form-keeper').##newExtensionName##;

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
				utils = self.utils,
				returnTrue = { valid: true },
				returnFalse = { valid: false }
			;

			// set defaults
			self.options = $.extend({}, self.defaults, data);

			// your code here
		}
	});

})(FormKeeper.$);