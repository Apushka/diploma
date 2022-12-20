import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCart, getCartTotalSum } from "../../../store/cart";
import AppButton from "../../common/appButton";
import CartItem from "./cartItem";

const Cart = ({ onProceed, onOrder }) => {
    const cart = useSelector(getCart());
    const totalSum = useSelector(getCartTotalSum).toFixed(2);

    const handleOrder = () => {
        onOrder();
    };

    const handleProceed = () => {
        const products = Object.keys(cart).map(key => ({
            product: key,
            amount: cart[key]
        }));
        onProceed({ products, total: totalSum });
    };

    return <div>
        {Object.keys(cart).map(id => <CartItem productId={id} key={id} />)}
        <div className="flex justify-around uppercase text-lg m-6">
            <p className="uppercase">Общая сумма заказа: </p>
            <p>{totalSum} BYN</p>
        </div>
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
