import React from "react";
import { useDispatch, useSelector } from "react-redux";
import bin from "../../../assets/bin.png";
import PropTypes from "prop-types";
import { removeProductFromCart } from "../../../store/cart";
import { getProductById } from "../../../store/products";
import EditQuantity from "./editQuantity";
import { Link } from "react-router-dom";
import Loader from "../../common/loader";

export const CartItem = ({ productId }) => {
    const product = useSelector(getProductById(productId));
    const dispatch = useDispatch();
    if (!product) return <Loader />;

    const handleRemoveProduct = () => {
        dispatch(removeProductFromCart(productId));
    };

    return <div className="flex justify-between items-center border border-solid border-black mb-2 p-3">
        <img
            className="w-20"
            src={product.image} />
        <Link
            to={`/catalog/${product.category}/${product._id}`}
            className="inline-block text-left w-1/3 text-ellipsis overflow-hidden hover:underline">
            {product.title}
        </Link>
        <EditQuantity productId={productId} />
        <div className="whitespace-nowrap mx-6 font-bold">{product.price} BYN</div>
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
