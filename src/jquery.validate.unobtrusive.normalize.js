/**
* Unobtrusive normalization support library for jQuery Validate and jQuery Unobtrusive Validation
* @copyright cwmillerjr
* @version
* @module jquery-validation-unobtrusive-normalize
*/

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define("jquery-validation-unobtrusive-normalize", ["jquery-validation-unobtrusive"], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require("jquery-validation-unobtrusive"));
    } else {
        jQuery.validator.unobtrusive.normalizers = factory(jQuery.validator.unobtrusive);
    }
}(function ($jQuno) {

        /**
         * Callback used to normalize a value before validation.
         * @callback normalizer
         * @param {string} value - Value to be normalized.
         * @returns {string} Normalized value.
         */

        /**
         * Unobtrusive normalization add-on for jQuery Validation Unobtrusive
         * @classdesc This dictionary catalogs the normalizer functions available to be used via the data-val-normalizer="name" attributes.
         * @constructor
         */
        function normalizerDictionary () {

            var self = this;

            /**
             * @function
             * @name addNormalizer
             * Adds a named normalizer function to the dictionary.
             * @example
             * $.validator.unobtrusive.normalize.addNormalizer('remove-amps',function(value){return (value || '').replace('&','');});
             * $.validator.unobtrusive.normalize.addNormalizer('remove-amps','first next last');
             * @param {string} name - The name of the normalizer.
             * @param {(string|normalizer)} method - The method to normalize a value or a space delimited list of normalizer names to execute.
             */
            this.addNormalizer = function (name, method) {
                method.name = name;
                self[name] = method;
            }
        }

        $jQuno.normalizers = new normalizerDictionary ();

        /**
         * Inner normalization helper.
         * @param {string} value - Value being validated.
         * @param {string} normalizer - Space delimited list of named normalizers to apply.
         * @this DOMElement being validated.
         */
        function normalize (value, normalizer) { //this is the DOMElement whose value is being normalized
        //attributes that are space delimited are a list of rules, so split them and find each individually.
        if (/\s/.test(normalizer)) {
            normalizer.split(/\s+/).forEach(function (childNormalizer) {
                value = normalize.call(this, value, childNormalizer);
            });
        } else {
            //a rule in the dictionary can be a list of space delimited rules as well.
            var normalizerFn = $jQuno.normalizers[normalizer];
            if (typeof normalizerFn === 'string') {
                value = normalize.call(this, value, normalizerFn);
            }
            else {
                value = normalizerFn.call(this, value);
            }
        }
        return value;
    }

    //Adds the unobtrusive "normalizer" adapter to Unobtrusive Validation
    $jQuno.adapters.add("normalizer", [], function (options) {
        options.rules["normalizer"] = function (value) { //this is the DOMElement whose value is being normalized
            return normalize.call(this, value, options.message)
        }
    });
    
    $jQuno.normalizers.addNormalizer("remove-periods", function (value) {
        if (value) {
            return value.replace(/\./g, '');
        }
        return value;
    });
    $jQuno.normalizers.addNormalizer("remove-commas", function (value) {
        if (value) {
            return value.replace(/,/g, '');
        }
        return value;
    });
    $jQuno.normalizers.addNormalizer("number-only", function (value) {
        if (value) {
            return value.replace(/[^0-9\.]/g);
        }
        return value;
    });
    $jQuno.normalizers.addNormalizer("remove-currency", function (value) {
        if (value) {
            return value.replace(/[$]/g, "");
        }
        return value;
    });
    $jQuno.normalizers.addNormalizer("currency-to-number", "remove-currency remove-commas");
    $jQuno.normalizers.addNormalizer("remove-fractional", function (value) {
        if (value) {
            return value.replace(/\.\d*$/g, "");
        }
        return value;
    });
    $jQuno.normalizers.addNormalizer("remove-hyphens", function (value) {
        if (value) {
            return value.replace(/[-]/g, "");
        }
        return value;
    });
    $jQuno.normalizers.addNormalizer("normalize-number", function (value) {
        if (value) {
            value = value.trim().replace(",", "");
            return value.replace(/^(-?)\$?(-?)([0-9]*\.[0-9]+|[0-9]+)(e-?[0-9]+)?(-?)$/gi, "$1$2$5$3$4");
        }
        return value;
    });

    return $jQuno.normalizers;
}));
