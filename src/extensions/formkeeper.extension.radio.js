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

	FormKeeper.Config.bindAbleExtensions.push('Radio');

	/**
	 *
	 * @Class Radio
	 * @extend FormKeeper
	 *
	 * @type {*}
	 */
	FormKeeper.Extension.Radio = Class.extend({

		errorMessage: {
			'default': 'Please select a radio.'
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

			var selector = '[data-form-keeper*="\"radio\""]';

			$form
				.off('change.formKeeper.radio')
				.on('change.formKeeper.radio', selector + ' input[type="radio"]', function () {
					parent.validateInput($(this).closest(selector));
				})
			;

			return this;
		},

		/**
		 *
		 * @method validateSelector
		 *
		 * @param {jQuery} $radioGroup
		 * @returns {*}
		 */
		validateSelector: function ($radioGroup) {
			var $radios = $('input[type="radio"]', $radioGroup),
				hasRadios = ($radios.length > 0);

			if (!hasRadios) {
				return { valid: true };
			}

			if ($radios.filter(':checked').length > 0) {
				return { valid: true };
			}

			return { valid: false };
		}
	});

})(FormKeeper.$);