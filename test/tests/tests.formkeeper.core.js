
(function ($) {
	'use strict';

	var $form = $('.js-test-replace');

	test('FormKeeper.Core', function() {


		$form.formKeeper({
			success: function () {
				var $input1 = $('.js-test-replace-1'),
					input1Result = '1212121212',
					$input2 = $('.js-test-replace-2'),
					input2Result = '1212121212'
				;

				deepEqual($input1.val(), input1Result, 'replace "test"');
				deepEqual($input2.val(), input2Result, 'replace " "');
			},
			error: function () {

			}
		});


	});

})(FormKeeper.$);