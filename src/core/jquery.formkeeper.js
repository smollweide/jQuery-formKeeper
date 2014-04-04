

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
			formKeeper;

		if (type === 'typeahead') {

			if (typeof(options) === 'object') {
				formKeeper = new FormKeeper.Core($form, options);
			} else {
				formKeeper = new FormKeeper.Core($form, {});
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

