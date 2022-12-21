import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { decreaseCartProductQuantity, getCartProductQuantity, increaseCartProductQuantity } from "../../../store/cart";

const EditQuantity = ({ productId }) => {
    const dispatch = useDispatch();
    const productQuantity = useSelector(getCartProductQuantity(productId));

    const handleAddToCart = () => {
        dispatch(increaseCartProductQuantity(productId));
    };

    const handleRemoveFromCart = () => {
        dispatch(decreaseCartProductQuantity(productId));
    };

    return <div className="w-[25%] py-2 text-center">
        <button onClick={handleRemoveFromCart}>-</button>
        <span className="inline-block w-5">{productQuantity}</span>
        <button onClick={handleAddToCart}>+</button>
    </div>;
};

EditQuantity.propTypes = {
    productId: PropTypes.string
};

export default EditQuantity;
