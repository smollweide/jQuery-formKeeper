


(function($) {
	'use strict';

	FormKeeper.Config = {
		classDefault: 'form-keeper',
		classSuccess: 'form-keeper--success',
		classError: 'form-keeper--error',
		classWrapSuccess: 'form-keeper__wrap--success',
		classWrapError: 'form-keeper__wrap--error',
		classPopover: 'form-keeper__popover',
		templatePopover: '<div class="popover top form-keeper__popover">' +
			'<div class="arrow"></div><p>{{title}}</p></div>',

		/*
		typeAHead: {
			minLength: 3,
			delay: 1000
		},
		 */

		bindAbleExtensions: []
	};

})(FormKeeper.$);

