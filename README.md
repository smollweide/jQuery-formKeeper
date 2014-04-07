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


