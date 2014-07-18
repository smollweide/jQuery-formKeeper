/*
 * FormKeeper.Extension.Email
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
	 * @Class Email
	 * @extend FormKeeper
	 *
	 * @type {*}
	 */
	FormKeeper.Extension.Email = Class.extend({

		errorMessage: {
			'default': 'Please enter a valid email address'
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
				isTextArea = (self.utils.isTagName($input, 'textarea'));

			if (!isInput && !isTextArea) {
				self.utils.console('warn', 'FormKeeper.Extension.Email.validateSelector: ' +
					'the selector must be an input or textarea tag');
				return true;
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
			var self = this,
				regExt = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
				result = regExt.exec(value),
				returnTrue = {
					valid: true
				},
				returnFalse = {
					valid: false
				};

			if (self.utils.isMandatoryCase(value)) {
				return returnTrue;
			}

			if (self.utils.isNull(result)) {
				return returnFalse;
			}

			if (result[0] === value) {
				return returnTrue;
			} else {
				return returnFalse;
			}
		}

	});

})(FormKeeper.$);