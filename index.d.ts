declare namespace cwmillerjJQueryUnobtrusiveValidationNormalizers {
    type Normalizer = (value: string) => string;

    interface NormalizerDictionary extends Array<Normalizer> {
        addNormalizer: (name: string, normalizer: Normalizer | string) => void;
    }
}

declare namespace MicrosoftJQueryUnobtrusiveValidation {
    interface Validator {
        normalizers: cwmillerjJQueryUnobtrusiveValidationNormalizers.NormalizerDictionary;
    }
}
