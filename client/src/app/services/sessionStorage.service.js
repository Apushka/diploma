export const getCarouselTab = (itemName) => {
    return JSON.parse(sessionStorage.getItem(itemName));
};

export const setCarouselTab = (itemName, option) => {
    sessionStorage.setItem(itemName, JSON.stringify(option));
};

const sessionStorageService = {
    getCarouselTab,
    setCarouselTab
};

export default sessionStorageService;
