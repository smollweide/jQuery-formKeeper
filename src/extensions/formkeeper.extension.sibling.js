
(function($) {
	'use strict';

	/**
	 *
	 * @Class Sibling
	 * @extend FormKeeper
	 *
	 * @type {*}
	 */
	FormKeeper.Extension.Sibling = Class.extend({

		errorMessage: {
			'default': 'Please select a Sibling.',
			equal: 'This field have to be equal to it\'s sibling field',
			unequal: 'This field have to be unequal to it\'s sibling field',
			greater: 'This field have to be greater to it\'s sibling field',
			greaterEqual: 'This field have to be greater or equal to it\'s sibling field',
			longer: 'This field have to be longer to it\'s sibling field',
			longerEqual: 'This field have to be longer or equal to it\'s sibling field',
			lower: 'This field have to be lower to it\'s sibling field',
			lowerEqual: 'This field have to be lower or equal to it\'s sibling field',
			shorter: 'This field have to be shorter to it\'s sibling field',
			shorterEqual: 'This field have to be shorter or equal to it\'s sibling field'
		},

		defaults: {
			type: '=='
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
			this.returns = {
				_true: { valid: true },
				_false: function (type) {
					return {
						valid: false,
						type: type
					};
				}
			};

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
				data = $input.data('form-keeper').sibling,
				$sibling,
				isInput = function ($input) {
					return (self.utils.isTagName($input, 'input'));
				},
				isTextArea = function ($input) {
					return (self.utils.isTagName($input, 'textarea'));
				};

			if (!isInput($input) && !isTextArea($input)) {
				self.utils.console('warn', 'FormKeeper.Extension.Sibling.validateSelector: ' +
					'the selector must be an input or textarea tag');
				return true;
			}

			$sibling = self.findSibling($input, data);

			if (!$sibling || $sibling.length <= 0) {
				self.utils.console('warn', 'FormKeeper.Extension.Sibling.validateSelector: ' +
					'the selector was not found');
				return self.returns._true;
			}

			if (!isInput($sibling) && !isTextArea($sibling)) {
				self.utils.console('warn', 'FormKeeper.Extension.Sibling.validateSelector: ' +
					'the sibling must be an input or textarea tag');
				return true;
			}

			return self.validate($input.val(), $sibling.val(), data);
		},

		/**
		 *
		 * @method validate
		 *
		 * @param {string} valueInput
		 * @param {string} valueSibling
		 * @param {object} data
		 * @returns {*}
		 */
		validate: function (valueInput, valueSibling, data) {

			var utils = this.utils,
				type,
				self = this;

			if (arguments.length !== 3) {
				self.utils.console('warn', 'FormKeeper.Extension.Sibling.validate: ' +
					'wrong length of arguments');
				return self.returns._true;
			}

			// set defaults
			self.options = $.extend({}, self.defaults, data);
			type = self.options.type;


			if (utils.isMandatoryCase(valueInput) || utils.isMandatoryCase(valueSibling)) {
				return self.returns._true;
			}

			if (type === 'equal' || type === '==') {
				return self.validateEqual(valueInput, valueSibling);
			}

			if (type === 'unequal' || type === '!=') {
				return self.validateUnequal(valueInput, valueSibling);
			}

			if (type === 'greater' || type === '>') {
				return self.validateGreater(valueInput, valueSibling);
			}

			if (type === 'lower' || type === '<') {
				return self.validateLower(valueInput, valueSibling);
			}

			if (type === 'greaterEqual' || type === '>=') {
				return self.validateGreaterEqual(valueInput, valueSibling);
			}

			if (type === 'lowerEqual' || type === '<=') {
				return self.validateLowerEqual(valueInput, valueSibling);
			}

			return self.returns._true;
		},

		/**
		 *
		 * @method validateLowerEqual
		 *
		 * @param {string} valueInput
		 * @param {string} valueSibling
		 * @returns {*}
		 */
		validateLowerEqual: function (valueInput, valueSibling) {
			var self = this,
				valueInputFloat = parseFloat(valueInput),
				valueSiblingFloat = parseFloat(valueSibling),
				isFloat = (!isNaN(valueInputFloat) && !isNaN(valueSiblingFloat));

			if (isFloat) {
				if (valueInput <= valueSibling) {
					return self.returns._true;
				}

				return self.returns._false('lowerEqual');
			}

			valueInput = valueInput.toString();
			valueSibling = valueSibling.toString();

			if (valueInput.length <= valueSibling.length) {
				return self.returns._true;
			}

			return self.returns._false('shorterEqual');
		},

		/**
		 *
		 * @method validateGreaterEqual
		 *
		 * @param {string} valueInput
		 * @param {string} valueSibling
		 * @returns {*}
		 */
		validateGreaterEqual: function (valueInput, valueSibling) {
			var self = this,
				valueInputFloat = parseFloat(valueInput),
				valueSiblingFloat = parseFloat(valueSibling),
				isFloat = (!isNaN(valueInputFloat) && !isNaN(valueSiblingFloat));

			if (isFloat) {
				if (valueInput >= valueSibling) {
					return self.returns._true;
				}

				return self.returns._false('greaterEqual');
			}

			valueInput = valueInput.toString();
			valueSibling = valueSibling.toString();

			if (valueInput.length >= valueSibling.length) {
				return self.returns._true;
			}

			return self.returns._false('longerEqual');
		},

		/**
		 *
		 * @method validateLower
		 *
		 * @param {string} valueInput
		 * @param {string} valueSibling
		 * @returns {*}
		 */
		validateLower: function (valueInput, valueSibling) {
			var self = this,
				valueInputFloat = parseFloat(valueInput),
				valueSiblingFloat = parseFloat(valueSibling),
				isFloat = (!isNaN(valueInputFloat) && !isNaN(valueSiblingFloat));

			if (isFloat) {
				if (valueInput < valueSibling) {
					return self.returns._true;
				}

				return self.returns._false('lower');
			}

			valueInput = valueInput.toString();
			valueSibling = valueSibling.toString();

			if (valueInput.length < valueSibling.length) {
				return self.returns._true;
			}

			return self.returns._false('shorter');
		},

		/**
		 *
		 * @method validateGreater
		 *
		 * @param {string} valueInput
		 * @param {string} valueSibling
		 * @returns {*}
		 */
		validateGreater: function (valueInput, valueSibling) {
			var self = this,
				valueInputFloat = parseFloat(valueInput),
				valueSiblingFloat = parseFloat(valueSibling),
				isFloat = (!isNaN(valueInputFloat) && !isNaN(valueSiblingFloat));

			if (isFloat) {
				if (valueInput > valueSibling) {
					return self.returns._true;
				}

				return self.returns._false('greater');
			}

			valueInput = valueInput.toString();
			valueSibling = valueSibling.toString();

			if (valueInput.length > valueSibling.length) {
				return self.returns._true;
			}

			return self.returns._false('longer');
		},

		/**
		 *
		 * @method validateEqual
		 *
		 * @param {string} valueInput
		 * @param {string} valueSibling
		 * @returns {*}
		 */
		validateEqual: function (valueInput, valueSibling) {
			var self = this;

			if (valueInput === valueSibling) {
				return self.returns._true;
			}

			return self.returns._false('equal');
		},

		/**
		 *
		 * @method validateUnequal
		 *
		 * @param {string} valueInput
		 * @param {string} valueSibling
		 * @returns {*}
		 */
		validateUnequal: function (valueInput, valueSibling) {
			var self = this;

			if (valueInput !== valueSibling) {
				return self.returns._true;
			}

			return self.returns._false('unequal');
		},


		/**
		 *
		 * @method findSibling
		 *
		 * @param $input
		 * @param {object} data
		 * @param {string} data.name
		 * @param {string} data.id
		 * @param {string} data.class
		 * @param {string} data.selector
		 * @returns {jQuery|boolean}
		 */
		findSibling: function ($input, data) {
			var utils = this.utils;

			if (!utils.isUndefined(data['name'])) {
				return $('name["'+ data['name'] +'"]');
			}

			if (!utils.isUndefined(data['id'])) {
				return $('#' + data['id']);
			}

			if (!utils.isUndefined(data['class'])) {
				return $('.' + data['class']);
			}

			if (!utils.isUndefined(data['selector'])) {
				return $(data['selector']);
			}

			utils.console('warn', 'FormKeeper.Extension.Sibling.findSibling: ' +
				'please define a selector for the sibling');

			return false;
		}
	});

})(FormKeeper.$);