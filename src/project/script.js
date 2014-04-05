

(function (window, $) {
	'use strict';

	var initFormKeeper;

	$(document).ready(function () {
		$('form').each(initFormKeeper);
	});

	initFormKeeper = function () {
		var $form = $(this);

		$form.formKeeper('typeahead');
		$form.on('submit', function (event) {
			event.preventDefault();

			$form.formKeeper({
				success: function () {
					alert('success');
				},
				error: function () {
					alert('error');
				}
			});
		});
	};

}(window, jQuery));