declare namespace cwmillerjJQueryUnobtrusiveValidationNormalizers {

    /**
    * Callback used to normalize a value before validation.
    * @callback Normalizer
    * @param {string} value - Value to be normalized.
    * @returns {string} Normalized value.
    */
    type Normalizer = (value: string) => string;

    /**
    * Unobtrusive normalization support library for jQuery Validate and jQuery Unobtrusive Validation
    * @copyright cwmillerjr
    * @version v0.1.0
    * @module jquery-validation-unobtrusive-normalize
    * @classdesc This dictionary catalogs the normalizer functions available to be used via the data-val-normalizer="name" attributes.
    */
    interface NormalizerDictionary extends Array<Normalizer> {

        /**
        * @function
        * @name addNormalizer
        * Adds a named normalizer function to the dictionary.
        * @example
        * $.validator.unobtrusive.normalize.addNormalizer('remove-amps',function(value){return (value || '').replace('&','');});
        * $.validator.unobtrusive.normalize.addNormalizer('remove-amps','first next last');
        * @param {string} name - The name of the Normalizer.
        * @param {(string|Normalizer)} method - The method to normalize a value or a space delimited list of normalizer names to execute.
        */
        addNormalizer: (name: string, normalizer: Normalizer | string) => void;
    }
}

declare namespace MicrosoftJQueryUnobtrusiveValidation {
    interface Validator {

        /**
        * Unobtrusive normalization add-on for jQuery Validation Unobtrusive
        **/
        normalizers: cwmillerjJQueryUnobtrusiveValidationNormalizers.NormalizerDictionary;
    }
}
