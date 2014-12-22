

/*
 * FormKeeper.Core
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

	FormKeeper.Extension = {};

	/**
	 *
	 * @Class Core
	 * @extend FormKeeper
	 *
	 * @type {*}
	 */
	FormKeeper.Core = Class.extend({

		utils: FormKeeper.Utils,

		/**
		 *
		 * @method init
		 *
		 * @param {jQuery} $form
		 * @param {object} options
		 * @returns {boolean}
		 */
		init: function($form, options) {
			var self = this;

			if ($form.length !== 1) {
				return false;
			}

			self.$form = $form;
			self.options = $.extend({}, FormKeeper.Config, options);

			return true;
		},

		/**
		 *
		 * @method bind
		 *
		 * @returns {*}
		 */
		bind: function () {

			var self = this,
				_class = 'input.' + self.options.classDefault + ', textarea.' + self.options.classDefault;

			$(_class, self.$form).on('change' , function () {
				var $input = $(this);
				self.validateInputDefault($input);
			});

			self.$form
				.on('blur.formKeeper', _class, function () {
					self.validateInput($(this));
					//self.unbindTypeAHeadEvent($(this));
				})
				.on('focus.formKeeper', _class, function () {
					var $input = $(this);
					self.validateInputDefault($input);
					/*self.bindTypeAHeadEvent($input, function () {
						self.validateInput($input);
					});*/
				})
				.on('click.formKeeper', '.' + self.options.classPopover, function () {
					$(this).siblings(_class).trigger('focus');
				})
				.on('click.formKeeper', 'a[data-form-keeper-suggestion]', function () {
					var $a = $(this);
					$a
						.closest('.' + self.options.classWrapError)
						.find('.' + self.options.classDefault).val($a.data('form-keeper-suggestion'));
				})
			;

			self.bindBindAble();

			return this;
		},

		/**
		 *
		 * @method bindBindAble
		 *
		 * @returns {*}
		 */
		bindBindAble: function () {

			var self = this;

			$.each(FormKeeper.Config.bindAbleExtensions, function () {

				var key = this;

				if (!self.utils.isValidExtension(key)) {
					return true;
				}

				new FormKeeper.Extension[key]().bind(self, self.$form);

				return true;
			});

			return this;
		},

		/**
		 *
		 * @method unbind
		 *
		 * @returns {*}
		 */
		unbind: function () {
			var self = this;

			self.$form
				.off('blur.formKeeper')
				.off('focus.formKeeper')
				.off('click.formKeeper')
			;

			return this;
		},

		/**
		 *
		 * @method unbindTypeAHeadEvent
		 *
		 * @param {jQuery} $input
		 * @returns {*}
		 */
		unbindTypeAHeadEvent: function ($input) {
			$input.off('keypress.formKeeper.typeAHead');
			return this;
		},

		/**
		 *
		 * @method validate
		 *
		 * @returns {*}
		 */
		validate: function () {

			var self = this,
				$inputs = $('.' + self.options.classDefault, self.$form),
				validateObject = {},
				invalidCounter = 0
			;

			$.each($inputs, function () {

				var $input = $(this),
					invalid_arr = self.validateInput($input),
					object = {
						$selector: $input,
						invalidKeys: invalid_arr
					};

				if (invalid_arr.length === 0) {
					object.valid = true;
				} else {
					object.valid = false;
					invalidCounter += 1;
				}

				validateObject[self.utils.getSelectorIdentifier($input)] = object;
			});

			if (invalidCounter === 0 && self.utils.isFunction(self.options.success)) {
				self.options.success.call(self, validateObject);
			} else if (self.utils.isFunction(self.options.error)) {
				self.options.error.call(self, validateObject);
			}

			return this;
		},

		/**
		 *
		 * @method bindTypeAHeadEvent
		 *
		 * @param {jQuery} $input
		 * @param {function} callback
		 * @returns {*}
		 */
		bindTypeAHeadEvent: function ($input, callback) {
			var self = this,
				options = self.options.typeAHead,
				timing = 100,
				timer = options.delay,
				interval = null,
				checkTimer = function () {
					if (timer <= 0) {
						clearInterval(interval);
						callback();
					}
				},
				decreaseTimer = function () {
					timer -= timing;
					checkTimer();
				},
				startInterval = function () {
					timer = options.delay;
					clearInterval(interval);
					interval = setInterval(decreaseTimer, timing);
				}
			;

			self.unbindTypeAHeadEvent($input);

			$input.on('keypress.formKeeper.typeAHead', function () {
				var value = $(this).val();

				if (value.length >= options.minLength) {
					startInterval();
				}

				return this;
			});

			return this;
		},

		/**
		 *
		 * @method validateInput
		 *
		 * @param {jQuery} $input
		 * @returns {Array}
		 */
		validateInput: function ($input) {

			var self = this,
				data = $input.data('form-keeper'),
				invalid_arr = []
			;

			if ($input.length !== 1) {
				return invalid_arr;
			}

			if (!self.utils.isObject(data)) {
				return invalid_arr;
			}

			for(var key in data) {
				if(data.hasOwnProperty(key)) {
					if (key === 'replace') {
						self.replaceInput($input, data.replace);
					} else if (self.utils.isValidExtension(key)) {

						var className = self.utils.capitalize(key),
							extension = new FormKeeper.Extension[className](),
							returnObject;

						returnObject = extension.validateSelector($input);

						if (self.utils.isObject(returnObject)) {
							if (!returnObject.valid) {
								invalid_arr.push({key:key, extension:extension, invalidObject:returnObject});
							}
						} else {
							self.utils.console('warn', 'result of an validation must be an object like {"valid": true}');
						}

					}
				}
			}

			if (invalid_arr.length === 0) {
				self.validateInputSuccess($input);
				return invalid_arr;
			}

			self.validateInputError($input, invalid_arr);
			return invalid_arr;
		},

		/**
		 *
		 * @method replaceInput
		 *
		 * @param {jQuery} $input
		 * @param {object} data
		 * @returns {*}
		 */
		replaceInput: function ($input, data) {
			$input.val(FormKeeper.Utils.processReplace($input.val(), data));
			return this;
		},

		/**
		 *
		 * @method validateInputSuccess
		 *
		 * @param {jQuery} $input
		 * @returns {*}
		 */
		validateInputSuccess: function ($input) {
			var self = this;

			self.validateInputDefault($input);

			$input
				.addClass(self.options.classSuccess)
				.removeClass(self.options.classError)
			;

			$input.parent()
				.addClass(self.options.classWrapSuccess)
				.removeClass(self.options.classWrapError)
			;

			return this;
		},

		/**
		 *
		 * @method validateInputDefault
		 *
		 * @param {jQuery} $input
		 * @returns {*}
		 */
		validateInputDefault: function ($input) {
			var self = this;

			$input
				.removeClass(self.options.classSuccess)
				.removeClass(self.options.classError)
			;

			$input.parent()
				.removeClass(self.options.classWrapSuccess)
				.removeClass(self.options.classWrapError)
			;

			$input.siblings('.' + self.options.classPopover).remove();

			return this;
		},

		/**
		 *
		 * @method validateInputError
		 *
		 * @param {jQuery} $input
		 * @param {Array} invalid_arr
		 * @returns {*}
		 */
		validateInputError: function ($input, invalid_arr) {
			var self = this,
				data = $input.data('form-keeper'),
				invalidObj = invalid_arr[0],
				dataType,
				extension,
				titleRaw
			;

			self.validateInputDefault($input);

			$input
				.addClass(self.options.classError)
				.removeClass(self.options.classSuccess)
			;

			$input.parent()
				.addClass(self.options.classWrapError)
				.removeClass(self.options.classWrapSuccess)
			;

			if (!self.utils.isObject(invalidObj.invalidObject)) {
				return this;
			}

			dataType = invalidObj.key;
			extension = invalidObj.extension;

			if (!self.utils.isValidExtension(dataType)) {
				return this;
			}

			if (!self.utils.isUndefined(data[dataType].customMessage)) {
				titleRaw = data[dataType].customMessage;
			} else {
				titleRaw = self.getTitleByErrorType(extension, invalidObj.invalidObject.type);
				titleRaw += self.getTitleBySuggestion(extension, data[dataType], invalidObj.invalidObject.suggestion);
			}

			self.setTitle($input, titleRaw, $.extend(extension.options, data[dataType]));

			return this;
		},

		/**
		 *
		 * @method setTitle
		 *
		 * @param {jQuery} $input
		 * @param {string} titleRaw
		 * @param {object} replacements
		 * @returns {*}
		 */
		setTitle: function ($input, titleRaw, replacements) {
			var self = this,
				title = self.utils.replace(titleRaw, replacements);

			$input.after(self.utils.replace(self.options.templatePopover, {
				title: title
			}));

			return this;
		},

		/**
		 *
		 * @method getTitleBySuggestion
		 *
		 * @param {FormKeeper.Extension} extension
		 * @param {object} data
		 * @param {string} suggestion
		 * @returns {string}
		 */
		getTitleBySuggestion: function (extension, data, suggestion) {
			var titleRaw = '';

			if (!this.utils.isUndefined(suggestion)) {
				data.suggestion = suggestion;
				titleRaw = extension.errorMessage.suggestion;
			}

			return titleRaw;
		},

		/**
		 *
		 * @method getTitleByErrorType
		 *
		 * @param {FormKeeper.Extension} extension
		 * @param {string} errorType
		 * @returns {string}
		 */
		getTitleByErrorType: function (extension, errorType) {
			var self = this,
				titleRaw = '';

			if (self.utils.isUndefined(errorType)) {
				titleRaw = extension.errorMessage['default'];

			} else {
				titleRaw = extension.errorMessage[errorType];
			}

			return titleRaw;
		}

	});

})(FormKeeper.$);

