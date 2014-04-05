/*
 * FormKeeper.Utils
 *
 * Copyright 2014
 * Released under the MIT license
 *
 * Jquery Plugin / form validation
 *
 * @author Simon Mollweide
 * @namespace FormKeeper.$
 * @extends FormKeeper
 * @require jQuery
 * @version 0.1.0
 *
 */
(function($) {
'use strict';

	/**
	 *
	 * @Class Utils
	 * @extend FormKeeper
	 *
	 * @type {*}
	 */
	FormKeeper.Utils = {

		//
		//	BASE VALIDATE
		//

		/**
		 *
		 * @method isString
		 *
		 * @param value
		 * @returns {boolean}
		 *
		 */
		isString: function (value) {
			return (typeof(value) === 'string');
		},

		/**
		 *
		 * @method isNumber
		 *
		 * @param value
		 * @returns {boolean}
		 *
		 */
		isNumber: function (value) {
			return (typeof(value) === 'number');
		},

		/**
		 *
		 * @method isInteger
		 *
		 * @description return true if the given value is an number and not a float
		 *
		 * @param value
		 * @returns {boolean}
		 *
		 */
		isInteger: function (value) {
			var self = this;

			if (self.isNumber(value)) {
				return (value.toString().replace(/[0-9\-]*/g, '') === '');
			}

			return false;
		},

		/**
		 *
		 * @method isUndefined
		 *
		 * @param value
		 * @returns {boolean}
		 *
		 */
		isUndefined: function (value) {
			return (value === undefined);
		},

		/**
		 *
		 * @method isNull
		 *
		 * @param value
		 * @returns {boolean}
		 *
		 */
		isNull: function (value) {
			return (value === null);
		},

		/**
		 *
		 * @method isObject
		 *
		 * @description return true if the given value is an object and not null and not an array
		 *
		 * @param value
		 * @returns {boolean}
		 *
		 */
		isObject: function (value) {
			var self = this;
			return (typeof(value) === 'object' &&
				!self.isNull(value) &&
				!self.isArray(value));
		},

		/**
		 *
		 * @method isFunction
		 *
		 * @param value
		 * @returns {boolean}
		 *
		 */
		isFunction: function (value) {
			return (typeof(value) === 'function');
		},

		/**
		 *
		 * @method isArray
		 *
		 * @param value
		 * @returns {boolean}
		 *
		 */
		isArray: function (value) {
			return (value instanceof(Array));
		},

		/**
		 *
		 * @method isTagName
		 *
		 * @description Checks the given jQuery selector's tag name is equal the given tag name
		 *
		 * @param {jQuery} $selector
		 * @param {string} tagName
		 * @returns {boolean}
		 *
		 */
		isTagName: function ($selector, tagName) {
			return ($selector.prop('tagName').toLowerCase() === tagName.toLowerCase());
		},

		/**
		 *
		 * @method isMandatoryCase
		 *
		 * @description If the given value is undefined or null or empty
		 *
		 * @param value
		 * @returns {boolean}
		 *
		 */
		isMandatoryCase: function (value) {
			var self = this;
			return (self.isUndefined(value) ||
				self.isNull(value) ||
				(value === ''));
		},

		//
		//	CONSOLE
		//

		/**
		 *
		 * @method console
		 *
		 * @description if the browser support console the given msg will be logged
		 *
		 * @param {string} type
		 * @param {string} msg
		 * @returns {boolean}
		 *
		 */
		console: function (type, msg) {

			var self = this;

			if (!self.isObject(console)) {
				return false;
			}

			console[type](msg);
			return true;
		},

		/**
		 *
		 * @method replace
		 *
		 * @description very basic template engine
		 *
		 * @param {string} template
		 * @param {object} replacements
		 * @returns {*}
		 * 
		 */
		replace: function (template, replacements) {

			var self = this;

			if (!self.isString(template)) {
				return '';
			}

			if (!self.isObject(replacements)) {
				return template;
			}

			$.each(replacements, function (key, value) {

				var reg = new RegExp('{{'+key+'}}', 'g');
				template = template.replace(reg, value);

			});

			return template;
		},

		/**
		 *
		 * @method isValidExtension
		 *
		 * @description internal check for a valid formKeeper extension if not warning will be logged
		 *
		 * @param {string} instance
		 * @returns {boolean}
		 * 
		 */
		isValidExtension: function (instance) {

			var self = this,
				className;

			if (!self.isString(instance)) {
				return false;
			}

			className = self.capitalize(instance);

			if (FormKeeper.Extension[className] !== undefined) {
				return true;
			}

			self.console('warn', 'FormKeeper.Utils.isValidExtension: the Class FormKeeper.Extension.' + className + ' is undefined');
			return false;
		},

		/**
		 *
		 * @method toLeadingNull
		 *
		 * @param {number|string} value
		 * @returns {string}
		 * 
		 */
		toLeadingNull: function (value) {

			var self = this;

			if (value === '') {
				return null;
			}

			if (self.isString(value)) {
				value = parseInt(value, 10);
			}

			if (!self.isNumber(value) || isNaN(value)) {
				return null;
			}

			if (value <= 9 && value >= 0) {
				return '0' + value;
			}

			if (value < 0 && value >= -9) {
				return '-0' + (value * -1);
			}

			return value.toString();
		},

		/**
		 * Capitalizes the first letter of the given string.
		 *
		 * @method capitalize
		 * @param {String} value
		 *      The original string
		 * @return {String}
		 *      The capitalized string
		 */
		capitalize: function(value) {
			return value.substr(0, 1).toUpperCase().concat(value.substr(1));
		},

		/**
		 *
		 * @method getUniqueId
		 *
		 * @returns {number}
		 * @private
		 */
		getUniqueId: function () {
			return new Date().getTime();
		},

		/**
		 *
		 * @method getSelectorIdentifier
		 *
		 * @description returns the name or the id or a UniqueId to identify the given jQuery selector
		 *
		 * @param $selector
		 * @returns {*}
		 * @private
		 */
		getSelectorIdentifier: function ($selector) {

			var self = this,
				name = $selector.attr('name'),
				id
				;

			if (!self.isUndefined(name)) {
				return name;
			}

			id = $selector.attr('id');

			if (!self.isUndefined(id)) {
				return id;
			}

			return self.getUniqueId();
		}
	};

})(FormKeeper.$);

