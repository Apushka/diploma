export const paymentFormatter = (data) => {
    const { name, value } = data;
    switch (name) {
        case "cardholderName":
            return value.toUpperCase();
        case "expiryDate":
            if (value.length > 5) return value[value.length - 1];
            if (value.length === 2 && !value.includes("/")) return value + "/";
            return value;
        case "code":
            return value.length > 3 ? value[value.length - 1] : value;
        default:
            return value;
    }
};
