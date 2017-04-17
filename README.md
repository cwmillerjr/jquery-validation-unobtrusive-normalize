# jquery-validation-unobtrusive-normalize

This jQuery Unobtrusive Validation adapter and normalizer dictionary add the ability to specify jQuery Validation Normalizer rules using HTML5 `data-*` attributes via jQuery Unobtrusive Validation parsing.

## Usage

A normalizer is a function that takes a string as a parameter and returns a modified version of the string.
jQuery Validation will execute a provided normalizer before running any of its validations.

To attach them using `data-val-*` unobtrusive attributes using this package, simply add a `data-val-normalizer` attribute, like you would for any other jQuery Validation method.
```html
<input type="text" name="name" value="100.0-" data-val-normalizer="reformat-number" />
````

You can specify multiple normalizers to be run in sequence by separating them with whitespace.
```html
<input type="text" name="name" value="100.0-" data-val-normalizer="reformat-number remove-hyphens" />
````

To add your own normalizer to the dictionary, give it a unique name and add it to `$.validator.unobtrusive.normalizers` like such.
```javascript
$.validator.unobtrusive.normalizers.addNormalizer("remove-3rd", function(value){
	return value.replace(/(...)./g,"$1");
});
```

You can create composite normalizers by adding a normalizer whose value is a whitespace delimited list of normalizer names.
```javascript
$.validator.unobtrusive.normalizers.addNormalizer("no-excuses", "no-ifs no-ands no-buts");
```

This will make these two tags equivalent.
```html
<input type="text" name="name" value="but it's too complicated" data-val-normalizer="no-excuses" />
<input type="text" name="name" value="but it's too complicated" data-val-normalizer="no-ifs no-ands no-buts" />
````

You can see that with `data-val-normalizer` the list of named normalizers replaces the jQuery Unobtrusive Validation's usage of that attribute to specify the error message for validation.  Since normalizers are not a _real_ validation method in jQuery Validation, there is no use for the message and no need for another attribute to hold the normailzer names. 

# API

<a name="module_jquery-validation-unobtrusive-normalize"></a>

## jquery-validation-unobtrusive-normalize
Unobtrusive normalization support library for jQuery Validate and jQuery Unobtrusive Validation

**Version**: v0.1.0  
**Copyright**: cwmillerjr  

* [jquery-validation-unobtrusive-normalize](#module_jquery-validation-unobtrusive-normalize)
    * [~addNormalizer
Adds a named normalizer function to the dictionary.(name, method)](#module_jquery-validation-unobtrusive-normalize..addNormalizer
Adds a named normalizer function to the dictionary.)
    * [~normalizer](#module_jquery-validation-unobtrusive-normalize..normalizer) ⇒ <code>string</code>

<a name="module_jquery-validation-unobtrusive-normalize..addNormalizer
Adds a named normalizer function to the dictionary."></a>

### jquery-validation-unobtrusive-normalize~addNormalizer
Adds a named normalizer function to the dictionary.(name, method)
**Kind**: inner method of <code>[jquery-validation-unobtrusive-normalize](#module_jquery-validation-unobtrusive-normalize)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the normalizer. |
| method | <code>string</code> &#124; <code>normalizer</code> | The method to normalize a value or a space delimited list of normalizer names to execute. |

**Example**  
```js
$.validator.unobtrusive.normalize.addNormalizer('remove-amps',function(value){return (value || '').replace('&','');});
$.validator.unobtrusive.normalize.addNormalizer('remove-amps','first next last');
```
<a name="module_jquery-validation-unobtrusive-normalize..normalizer"></a>

### jquery-validation-unobtrusive-normalize~normalizer ⇒ <code>string</code>
Callback used to normalize a value before validation.

**Kind**: inner typedef of <code>[jquery-validation-unobtrusive-normalize](#module_jquery-validation-unobtrusive-normalize)</code>  
**Returns**: <code>string</code> - Normalized value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | Value to be normalized. |

