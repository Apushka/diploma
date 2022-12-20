import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCartProductQuantity, increaseCartProductQuantity } from "../../../store/cart";
import AppButton from "../../common/appButton";
import EditQuantity from "./editQuantity";

const CartButton = ({ productId }) => {
    const productQuantity = useSelector(getCartProductQuantity(productId));
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(increaseCartProductQuantity(productId));
    };

    return productQuantity
        ? <div className="flex items-center outline outline-[1px] outline-slate-900 bg-gray-100">
            <div className="w-[75%] py-5 border-r-[1px] text-center border-slate-900 uppercase">Добавлено</div>
            <EditQuantity productId={productId} />
        </div>
        : <AppButton onClick={handleAddToCart} title="Добавить в корзину" />;
};

CartButton.propTypes = {
    productId: PropTypes.string
};

export default CartButton;
