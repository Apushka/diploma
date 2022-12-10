export function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        let statusValidate;
        switch (validateMethod) {
            case "isRequired":
                if (typeof data === "boolean") {
                    statusValidate = !data;
                } else {
                    statusValidate = data.trim() === "";
                }
                break;
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusValidate = !emailRegExp.test(data.trim());
                break;
            }
            case "isTel": {
                const telRegExp =
                    /(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))/;
                statusValidate = !telRegExp.test(data.trim());
                break;
            }
            case "min": {
                statusValidate = data.length < config.value;
                break;
            }
            case "isCapital": {
                const capitalRegExp = /[A-Z]+/g;
                statusValidate = !capitalRegExp.test(data);
                break;
            }
            case "isContainDigit": {
                const digitRegExp = /\d/g;
                statusValidate = !digitRegExp.test(data);
                break;
            }
            case "isCardNumber": {
                statusValidate = data.length !== config.value;
                break;
            }
            case "isExpiryDate": {
                const expiryDateRegExp = /^[0-9]{2}\/[0-9]{2}$/;
                statusValidate = !expiryDateRegExp.test(data.trim());
                break;
            }
            case "isSecretCode": {
                statusValidate = data.length !== config.value;
                break;
            }
            case "isCardholderName": {
                const isCardholderNameRegExp = /[a-z]+$/gi;
                statusValidate = !isCardholderNameRegExp.test(data.trim());
                break;
            }
            default:
                break;
        }
        if (statusValidate) return config.message;
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
