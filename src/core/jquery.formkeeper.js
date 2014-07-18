
/*
 * jQuery.formKeeper
 *
 * Copyright 2014
 * Released under the MIT license
 *
 * Jquery Plugin / form validation
 *
 * @author Simon Mollweide
 * @namespace $
 * @extends $.fn
 * @require jQuery
 * @version 0.1.0
 *
 */
(function($) {
	'use strict';

	/**
	 *
	 * @param {string|object} type
	 * @param {object} options
	 *
	 * @returns {jQuery}
	 */
	$.fn.formKeeper = function (type, options) {

		var $form = $(this),
			formKeeper,
			emptyOptions = {};

		if (type === 'typeahead') {

			if (typeof(options) === 'object') {
				formKeeper = new FormKeeper.Core($form, options);
			} else {
				formKeeper = new FormKeeper.Core($form, emptyOptions);
			}

			formKeeper
				.unbind()
				.bind();

			return this;
		}

		if (typeof(type) === 'object') {
			formKeeper = new FormKeeper.Core($form, type);
			formKeeper.validate();

			return this;
		}

		return this;
	};

})(jQuery);

