export function generateAuthError(message) {
    switch (message) {
        case "EMAIL_NOT_FOUND":
            return "Пользователь с таким e-mail не найден";
        case "INVALID_PASSWORD":
            return "Email или пароль введены неверно";
        case "EMAIL_EXISTS":
            return "Пользователь с таким email уже существует";
        case "USER_NOT_FOUND":
            return "Пользователь не найден";
        default:
            return "Слишком много попыток входа. Попробуйте позже";
    }
}
