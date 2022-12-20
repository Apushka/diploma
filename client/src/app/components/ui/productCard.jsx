import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductById } from "../../store/products";

import CartButton from "./cart/cartButton";

const ProductCard = ({ productId }) => {
    const product = useSelector(getProductById(productId));
    const history = useHistory();

    return <div className="w-40 md:w-52 m-2 flex flex-col flex-nowrap justify-between border border-solid border-slate-900 text-xs">
        <div
            className="flex flex-col justify-between p-3 h-full cursor-pointer"
            onClick={() => history.push("/catalog/" + product.category + "/" + productId)}>
            <img
                className="w-full"
                src={product.image} alt={product.title} />
            <div className="text-center">
                <h4 className="uppercase m-0 text-ellipsis overflow-hidden">{product.title}</h4>
                <p className="font-bold">{product.price} BYN</p>
            </div>
        </div>
        <CartButton productId={productId} />
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
