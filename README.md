# jQuery FormKeeper

A simple, lightweight, expandable jQuery plugin for form validation. The
extensions are structured similar to Terrific.js modules.

# Installation

Include script *after* the jQuery library (unless you are packaging
scripts somehow else):
```html
<script src="/path/to/jquery.formkeeper.core.min.js"></script>
<!-- add extensions you need for your project -->
```
Do not include the script directly from GitHub
(http://raw.github.com/...). The file is being served as text/plain and
as such being blocked in Internet Explorer on Windows 7 for instance
(because of the wrong MIME type). Bottom line: GitHub is not a CDN.

# Basic Usage

Html Form:
```html
<form>
    <input class="form-keeper" data-form-keeper='{"mandatory":{}}' />
    <button type="submit">Validate</button>
</form>
```

Javascript:
```javascript
(function (window, $) {
    $(document).ready(function () {
        var $form = $('form');

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
    });
}(window, jQuery));
```

#Custom Message

Usage:
```html
<input class="form-keeper" data-form-keeper='{"mandatory":{"customMessage":"customMessageText"}}' />
```

#Mandatory Validation

Installation:
include script *after* "jquery.formkeeper.core.min.js"
```html
<script src="/path/to/jquery.formkeeper.extension.mandatory.min.js"></script>
```

Usage:
```html
<input class="form-keeper" data-form-keeper='{"mandatory":{}}' />
```

#Email Validation

Installation:
include script *after* "jquery.formkeeper.core.min.js"
```html
<script src="/path/to/jquery.formkeeper.extension.email.min.js"></script>
```

Usage:
```html
<input class="form-keeper" data-form-keeper='{"email":{}}' />
```

#Length Validation

Installation:
include script *after* "jquery.formkeeper.core.min.js"
```html
<script src="/path/to/jquery.formkeeper.extension.length.min.js"></script>
```

Usage:
```html
<input class="form-keeper" data-form-keeper='{"length":{"min": 2}}' />
```

Attributes:

* min
* max
* exactly

Combinations:

* range (min and max)

#Integer Validation

Installation:
include script *after* "jquery.formkeeper.core.min.js"
```html
<script src="/path/to/jquery.formkeeper.extension.integer.min.js"></script>
```

Usage:
```html
<input class="form-keeper" data-form-keeper='{"integer":{}}' />
```

Attributes:

* min
* max

Combinations:

* range (min and max)

#Number Validation

Installation:
include script *after* "jquery.formkeeper.core.min.js"
```html
<script src="/path/to/jquery.formkeeper.extension.number.min.js"></script>
```

Usage:
```html
<input class="form-keeper" data-form-keeper='{"number":{}}' />
```

Attributes:

* min
* max

Combinations:

* range (min and max)

#Date Validation

Installation:
include script *after* "jquery.formkeeper.core.min.js"
```html
<script src="/path/to/jquery.formkeeper.extension.date.min.js"></script>
```

Usage:
```html
<input class="form-keeper" data-form-keeper='{"date":{}}' />
```

Attributes:

* format (default: "DD.MM.YYYY")("YYYY.MM.DD", "YYYY.M.D", "DD.MM.YYYY", "D.M.YYYY")
* separator (default: ".")

#Time Validation

Installation:
include script *after* "jquery.formkeeper.core.min.js"
```html
<script src="/path/to/jquery.formkeeper.extension.time.min.js"></script>
```

Usage:
```html
<input class="form-keeper" data-form-keeper='{"time":{}' />
```

Attributes:

* format (default: "HH:mm")("HH:mm", "HH:mm:ss", "H:m", "H:m:s", "hh:mm", "hh:mm:ss", "h:m", "h:m:s", "x-x-x")
* separator (default: ":")

#Pattern Validation

Installation:
include script *after* "jquery.formkeeper.core.min.js"
```html
<script src="/path/to/jquery.formkeeper.extension.pattern.min.js"></script>
```

Usage:
```html
<input class="form-keeper" data-form-keeper='{"pattern":{"regExp": "[a-z]*"}' />
```

Attributes:

* regExp ({string} regExp)
* delimiter (i|g|..)

#Url Validation

Installation:
include script *after* "jquery.formkeeper.core.min.js"
```html
<script src="/path/to/jquery.formkeeper.extension.url.min.js"></script>
```

Usage:
```html
<input class="form-keeper" data-form-keeper='{"url":{}' />
```

Attributes:

* protocols {array} (default ["http://", "https://"])
* subDomains {array} (default ["www"])
* suggestionDomain {string} (default "com")
* allowHash {boolean} (default true)
* allowGet {boolean} (default true)

#Select Box Validation

Installation:
include script *after* "jquery.formkeeper.core.min.js"
```html
<script src="/path/to/jquery.formkeeper.extension.select.min.js"></script>
```

Usage:
```html
<select class="form-keeper" data-form-keeper='{"select":{}'>
	<option value="">Please Select ...</option>
	<option value="1">Item 1</option>
	<option value="2">Item 2</option>
</select>
```

Attributes:

* valueNot (default: [""])

#Checkbox Group Validation

Installation:
include script *after* "jquery.formkeeper.core.min.js"
```html
<script src="/path/to/jquery.formkeeper.extension.checkbox.min.js"></script>
```

Usage:
```html
<div class="form-keeper form-keeper__checkbox--group" data-form-keeper='{"checkbox":{"min": 1}}'>
	<label for="inputCheckbox1">Checkbox 1</label><input id="inputCheckbox1" type="checkbox" />
	<label for="inputCheckbox2">Checkbox 2</label><input id="inputCheckbox2" type="checkbox" />
	<label for="inputCheckbox3">Checkbox 3</label><input id="inputCheckbox3" type="checkbox" />
</div>
```

Attributes:

* min {number}
* max {number}
* exactly {number}

#Radio Group Validation

Installation:
include script *after* "jquery.formkeeper.core.min.js"
```html
<script src="/path/to/jquery.formkeeper.extension.radio.min.js"></script>
```

Usage:
```html
<div class="form-keeper form-keeper__radio--group" data-form-keeper='{"radio":{}}'>
	<label for="inputRadio1">Checkbox 1</label><input id="inputRadio1" name="inputRadio" type="radio" />
	<label for="inputRadio2">Checkbox 2</label><input id="inputRadio2" name="inputRadio" type="radio" />
	<label for="inputRadio3">Checkbox 3</label><input id="inputRadio3" name="inputRadio" type="radio" />
</div>
```

#Sibling Validation

Installation:
include script *after* "jquery.formkeeper.core.min.js"
```html
<script src="/path/to/jquery.formkeeper.extension.sibling.min.js"></script>
```

Usage:
```html
<input id="inputSibling1_1" class="form-control" value="Value 1" />
<input id="inputSibling1_2" class="form-control form-keeper"  value="Value 2" data-form-keeper='{"sibling":{"id":"inputSibling1_1"}}' />
```

Attributes:

* id {string}
* name {string}
* class {string}
* selector {string}
* type {number} (default: "==")("equal", "==", "unequal", "!=", "greater", ">", "greaterEqual", ">=", "lower", "<", "lowerEqual", "<=")

#New Extension

Installation:
include script *after* "jquery.formkeeper.core.min.js"
```html
<script src="/path/to/jquery.formkeeper.extension.##yourExtensionName##.js"></script>
```

Usage:
```html
<input id="inputSibling1_1" class="form-control" value="Value 1" />
<input id="inputSibling1_2" class="form-control form-keeper"  value="Value 2" data-form-keeper='{"##yourExtensionName##":{}}' />
```

```javascript
/*
 * FormKeeper.Extension.##yourExtensionName##
 *
 * Copyright 2014
 * Released under the MIT license
 *
 * Jquery Plugin / form validation
 *
 * @author ##author##
 * @namespace FormKeeper.$
 * @extends FormKeeper.Extension
 * @require jQuery
 * @version 0.1.0
 *
 */
(function($) {
	'use strict';

	// just required if you need a special typeahead handling
	FormKeeper.Config.bindAbleExtensions.push('##yourExtensionName##');

	/**
	 *
	 * @Class ##yourExtensionName##
	 * @extend FormKeeper
	 *
	 * @type {*}
	 */
	FormKeeper.Extension.##yourExtensionName## = Class.extend({

		errorMessage: {
			default: '##text##'
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

			return this;
		},

		/**
		 *
		 * @method bind
		 *
		 * @param {FormKeeper.Core} parent
		 * @param {jQuery} $form
		 * @returns {*}
		 */
		bind: function (parent, $form) {

			// the method bind will be triggered if you add your extension to the "FormKeeper.Config.bindAbleExtensions" array

			/*
			$form.off('change').on('change', '[data-form-keeper*="\"##yourExtensionName##\""]', function () {
				parent.validateInput($(this));
			});
			*/

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
				data = $input.data('form-keeper').##yourExtensionName##;

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
				utils = self.utils,
				returnTrue = { valid: true },
				returnFalse = { valid: false }
			;

			// set defaults
			self.options = $.extend({}, self.defaults, data);

			// your code here
		}
	});

})(FormKeeper.$);
```


License
=======

Copyright (c) 2014 Simon Mollweide

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


