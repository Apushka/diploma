const useCart = () => {
    const addToCart = (productId) => {
        let cart = JSON.parse(localStorage.getItem("relouis_cart"));
        cart = {
            ...cart,
            [productId]: cart[productId] ? cart[productId] + 1 : 1
        };
        localStorage.setItem("relouis_cart", JSON.stringify(cart));
    };

    const getCart = () => JSON.parse(localStorage.getItem("relouis_cart"));

    return { addToCart, getCart };
};

export default useCart;
