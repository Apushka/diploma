import React from "react";
import { useDispatch, useSelector } from "react-redux";
import bin from "../../../assets/bin.png";
import PropTypes from "prop-types";
import { removeProductFromCart } from "../../../store/cart";
import { getProductById } from "../../../store/products";
import EditQuantity from "../../common/editQuantity";

export const CartItem = ({ productId }) => {
    const product = useSelector(getProductById(productId));
    const dispatch = useDispatch();
    if (!product) return <div>Loading...</div>;

    const handleRemoveProduct = () => {
        dispatch(removeProductFromCart(productId));
    };

    return <div className="flex justify-between items-center border border-solid border-black mb-2 p-3">
        <span className="inline-block text-left w-1/2">{product.title}</span>
        <EditQuantity productId={productId} />
        <span
            className="inline-block w-4 h-4"
            style={{
                background: `url(${bin}) no-repeat center/contain`
            }}
            onClick={handleRemoveProduct}
        ></span>
    </div >;
};

CartItem.propTypes = {
    productId: PropTypes.string
};

export default CartItem;
