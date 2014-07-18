/*
 * FormKeeper.Extension.Url
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
	 * @Class Url
	 * @extend FormKeeper
	 *
	 * @type {*}
	 */
	FormKeeper.Extension.Url = Class.extend({

		errorMessage: {
			'default': 'The url you entered must be in a valid Format.',
			suggestion: ' Did you mean ' +
				'<a data-form-keeper-suggestion="{{suggestion}}">{{suggestion}}</a>?'
		},

		defaults: {
			protocols: ['http://', 'https://'],
			subDomains: ['www'],
			suggestionDomain: 'com',
			allowHash: true,
			allowGet: true
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
				data = $input.data('form-keeper').url,
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
			var self = this,
				validationObject,
				returnTrue = { valid: true },
				returnFalse = function (suggestionDate) {
					if (!self.utils.isUndefined(suggestionDate)) {
						return {
							valid: false,
							suggestion: suggestionDate
						};
					}
					return {
						valid: false
					};
				}
			;

			// validate arguments
			if (self.utils.isMandatoryCase(value)) {
				return returnTrue;
			}

			if (!self.utils.isString(value)) {
				return returnFalse();
			}

			// set defaults
			self.options = $.extend({}, self.defaults, data);

			validationObject = self.getValidateReturn(value);

			if (!validationObject.valid) {
				return returnFalse(validationObject.suggestion);
			}

			return returnTrue;
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
				urlParts = self.getUrlParts(value),
				options = self.options,
				noProtocols = (options.protocols[0] === ''),
				noSubDomains = (options.subDomains[0] === ''),
				result,
				suggestion = [],
				inValidCounter = 0
			;

			result = self.getRegExp().exec(urlParts.base);

			if (self.utils.isNull(result)) {
				return { valid: false };
			}

			// check allow
			if (!options.allowHash && urlParts.hash !== '') {
				inValidCounter += 1;
				urlParts.hash = '';
			}

			if (!options.allowGet && urlParts.get !== '') {
				inValidCounter += 1;
				urlParts.get = '';
			}

			// check result
			if (result[0] !== result.input) {
				inValidCounter += 1;
			}

			// check protocols
			if (noProtocols) {
				suggestion.push('');
			} else if ($.inArray(result[1], options.protocols) === -1) {
				suggestion.push(options.protocols[0]);
				inValidCounter += 1;
			} else {
				suggestion.push(result[1]);
			}

			// check subDomains
			if (noSubDomains) {
				suggestion.push('');
			} else if ($.inArray(result[2], options.subDomains) === -1) {
				suggestion.push(options.subDomains[0]);
				inValidCounter += 1;
			} else {
				suggestion.push(result[2]);
			}

			suggestion.push(result[3]);

			// check domains
			if (self.utils.isUndefined(result[4]) || result[4] === '') {
				suggestion.push(options.suggestionDomain);
				inValidCounter += 1;
			} else {
				suggestion.push(result[4]);
			}

			// return
			if (inValidCounter === 0) {
				return {
					valid: true
				};
			}

			return {
				valid: false,
				suggestion: suggestion.join('') + urlParts.get + urlParts.hash
			};
		},

		/**
		 *
		 * @method getUrlParts
		 *
		 * @param {string} value
		 * @returns {object}
		 */
		getUrlParts: function (value) {
			var self = this,
				value_arr;

			if (value.search('/\\?') !== -1) {
				value_arr = value.split('/?');
				return self.getUrlPartsHash(value_arr[0], '/?' + value_arr[1]);
			}

			if (value.search('\\?') !== -1) {
				value_arr = value.split('?');
				return self.getUrlPartsHash(value_arr[0], '?' + value_arr[1]);
			}

			return self.getUrlPartsHash(value, undefined);
		},

		/**
		 *
		 * @method getUrlPartsHash
		 *
		 * @param {string} urlPartBase
		 * @param {string|undefined} urlPartGet
		 * @returns {*}
		 */
		getUrlPartsHash: function (urlPartBase, urlPartGet) {

			var self = this,
				parts,
				partHash = '';

			if (!self.utils.isUndefined(urlPartGet)) {
				if (urlPartGet.search('/#') !== -1) {
					parts = urlPartGet.split('/#');
					urlPartGet = parts[0];
					partHash = '/#' + parts[1];
				} else if (urlPartGet.search('#') !== -1) {
					parts = urlPartGet.split('#');
					urlPartGet = parts[0];
					partHash = '#' + parts[1];
				}

				return {
					base: urlPartBase,
					get: urlPartGet,
					hash: partHash
				};
			}

			urlPartGet = '';

			if (urlPartBase.search('/#') !== -1) {
				parts = urlPartBase.split('/#');
				urlPartBase = parts[0];
				partHash = '/#' + parts[1];
			} else if (urlPartBase.search('#') !== -1) {
				parts = urlPartBase.split('#');
				urlPartBase = parts[0];
				partHash = '#' + parts[1];
			}

			return {
				base: urlPartBase,
				get: urlPartGet,
				hash: partHash
			};
		},

		/**
		 *
		 * @method getRegExp
		 *
		 * @returns {RegExp}
		 */
		getRegExp: function () {
			var options = this.options,
				regExtStr = '' +
					'(' + options.protocols.join('|') + '){0,1}' +
					'(' + options.subDomains.join('|') + '){0,1}' +
					'([.]{1}[a-z.-_0-9]*[.]{1})' +
					'([a-z.]*)'
				;

			return new RegExp(regExtStr, 'i');
		}
	});

})(FormKeeper.$);