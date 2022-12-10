const CART_KEY = "relouis_cart";
const TOKEN_KEY = "relouis-jwt-token";
const REFRESH_KEY = "relouis-jwt-refresh-token";
const EXPIRES_KEY = "relouis-jwt-expires";
const USERID_KEY = "relouis-user-local-id";

export const writeCartToStorage = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const readCartFromStorage = () => {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
};

export const emptyCart = () => {
    localStorage.removeItem(CART_KEY);
};

export const getCarouselTab = (itemName) => {
    return JSON.parse(sessionStorage.getItem(itemName));
};

export const setCarouselTab = (itemName, option) => {
    sessionStorage.setItem(itemName, JSON.stringify(option));
};

export const setTokens = ({ accessToken, refreshToken, userId, expiresIn }) => {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(USERID_KEY, userId);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
};

export const removeAuthData = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
};

export const getAccessToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_KEY);
};

export const getTokenExpiresDate = () => {
    return localStorage.getItem(EXPIRES_KEY);
};

export const getUserId = () => {
    return localStorage.getItem(USERID_KEY);
};

const localStorageService = {
    writeCartToStorage,
    readCartFromStorage,
    getCarouselTab,
    setCarouselTab,
    setTokens,
    removeAuthData,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId,
    emptyCart
};

export default localStorageService;
