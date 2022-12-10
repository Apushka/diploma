import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../store/products";
import { getCartProductQuantity, increaseCartProductQuantity } from "../../store/cart";
import EditQuantity from "../common/editQuantity";
import AppButton from "../common/buttonBlack";

const ProductCard = ({ productId }) => {
    const product = useSelector(getProductById(productId));
    const productQuantity = useSelector(getCartProductQuantity(productId));
    const history = useHistory();
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(increaseCartProductQuantity(productId));
    };

    return <div className="w-80 flex flex-col flex-nowrap justify-between border border-solid border-slate-900">
        <div
            className="cursor-pointer"
            onClick={() => history.push("/catalog/" + product.category + "/" + productId)}>
            <img
                className="w-64 h-72 mx-8 mt-6 mb-2"
                src={product.image} alt={product.title} />
            <div>
                <h4 className="uppercase m-0 whitespace-pre-line">{product.title}</h4>
                <p>Цена</p>
            </div>
        </div>
        {productQuantity
            ? <div className="flex border-t-[1px] border-solid border-slate-900 bg-gray-100">
                <div className="w-[75%] py-5 border-r-[1px] border-slate-900">Добавлено в корзину</div>
                <EditQuantity productId={productId} />
            </div>
            : <AppButton onClick={handleAddToCart} title="Добавить в корзину" />}
    </div >;
};

ProductCard.propTypes = {
    productId: PropTypes.string.isRequired
};

const ProductCardSkeleton = () => {
    return <>
        {new Array(3)
            .fill("")
            .map((_, index) => <div className="w-80 flex flex-col flex-nowrap justify-between border border-solid rounded-lg animate-pulse bg-slate-200" key={index}>
                <div
                    className="w-64 h-[458px]"
                />
            </div>)}
    </>;
};

ProductCard.Skeleton = ProductCardSkeleton;

export default ProductCard;
