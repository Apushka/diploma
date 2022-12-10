import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCart } from "../../../store/cart";
import AppButton from "../../common/buttonBlack";
import CartItem from "./cartItem";

const Cart = ({ onProceed, onOrder }) => {
    const cart = useSelector(getCart());

    const handleOrder = () => {
        onOrder();
    };

    const handleProceed = () => {
        const products = Object.keys(cart).map(key => ({
            product: key,
            amount: cart[key]
        }));
        onProceed({ products });
    };

    return <div>
        {Object.keys(cart).map(id => <CartItem productId={id} key={id} />)}
        {onProceed && <AppButton
            onClick={handleProceed}
            title="Продолжить"
            isDisabled={false} />}
        {onOrder && <AppButton
            onClick={handleOrder}
            title="Оформить заказ" />
        }
    </div>;
};

Cart.propTypes = {
    onProceed: PropTypes.func,
    onOrder: PropTypes.func
};

export default Cart;
