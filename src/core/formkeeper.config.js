


(function($) {
	'use strict';

	FormKeeper.Config = {
		classDefault: 'form-keeper',
		classSuccess: '',
		classError: '',
		classWrapSuccess: 'has-success',
		classWrapError: 'has-error',
		classPopover: 'form-keeper__popover',
		templatePopover: '<div class="form-keeper__popover"><div class="popover bottom form-keeper__popover__inner">' +
			'<div class="arrow"></div><p>{{title}}</p></div></div>',

		bindAbleExtensions: []
	};

})(FormKeeper.$);

