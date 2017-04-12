(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define("jquery.validate.unobtrusive.normalize", ["jquery.validate.unobtrusive"], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require("jquery.validate.unobtrusive"));
    } else {
        jQuery.validator.unobtrusive.normalizers = factory(jQuery.validator.unobtrusive);
    }
}(function ($jQuno) {

    $jQuno.normalizers = new function () {

        var self = this;

        this.addNormalizer = function (name, method) {
            self[name] = method;
        }
    }();

    var normalize = function (value, normalizer) { //this is the DOMElement whose value is being normalized
        if (/\s/.test(normalizer)) {
            normalizer.split(/\s+/).forEach(function (childNormalizer) {
                value = normalize.call(this, value, childNormalizer);
            });
        } else {
            normalizerFn = $jQuno.normalizers[normalizer];
            if (typeof normalizerFn === 'string') {
                value = normalize.call(this, value, normalizerFn);
            }
            else {
                value = normalizerFn.call(this, value);
            }
        }
        return value;
    }

    $jQuno.adapters.add("normalizer", [], function (options) {
        options.rules["normalizer"] = function (value) { //this is the DOMElement whose value is being normalized
            return normalize.call(this, value, options.message)
        }
    });
    
    $jQuno.normalizers.addNormalizer("remove-periods", function (val) {
        var result = val;
        if (val) {
            result = val.replace(/./g, '');
        }
        return result;
    });
    $jQuno.normalizers.addNormalizer("remove-commas", function (val) {
        var result = val;
        if (val) {
            result = val.replace(/,/g, '');
        }
        return result;
    });
    $jQuno.normalizers.addNormalizer("number-only", function (val) {
        var result = val;
        if (val) {
            result = val.replace(/[^0-9.]/g);
        }
        return result;
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
    $jQuno.normalizers.addNormalizer("reformat-number", function (value) {
        if (value) {
            value = value.trim().replace(",", "");
            return value.replace(/^(-?)\$?(-?)([0-9]*\.[0-9]+|[0-9]+)(e-?[0-9]+)?(-?)$/gi, "$1$2$5$3$4");
        }
        return value;
    });

    return $jQuno.normalizers;
}));