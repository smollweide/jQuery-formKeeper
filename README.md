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


