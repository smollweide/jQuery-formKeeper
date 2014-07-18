/*
 * FormKeeper.Extension.Mandatory
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
	 * @Class Mandatory
	 * @extend FormKeeper
	 *
	 * @type {*}
	 */
	FormKeeper.Extension.Mandatory = Class.extend({

		errorMessage: {
			'default': 'This field is mandatory'
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
		 * @returns {{valid: boolean}}
		 */
		validateSelector: function ($input) {
			var self = this,
				type = $input.attr('type'),
				isInput = (self.utils.isTagName($input, 'input')),
				isTextArea = (self.utils.isTagName($input, 'textarea'));

			if (!isInput && !isTextArea) {
				self.utils.console('warn', 'FormKeeper.Mandatory.validateSelector: ' +
					'the selector must be an input or textarea tag');
				return true;
			}

			if (type === 'checkbox') {
				return self.validateCheckbox($input);
			}

			if (type === 'radio') {
				return { valid: true };
			}

			return self.validate($input.val());
		},

		/**
		 *
		 * @method validate
		 *
		 * @param {string} value
		 * @returns {{valid: boolean}}
		 */
		validate: function (value) {
			if (!this.utils.isMandatoryCase(value)) {
				return {
					valid: true
				};
			}

			return {
				valid: false
			};
		},

		/**
		 *
		 * @method validateCheckbox
		 *
		 * @param {jQuery} $input
		 * @returns {{valid: boolean}}
		 */
		validateCheckbox: function ($input) {

			if ($input.is(':checked')) {
				return { valid: true };
			}

			return { valid: false };
		}
	});

})(FormKeeper.$);