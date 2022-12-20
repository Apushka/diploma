import React from "react";
import PropTypes from "prop-types";
import CartButton from "./cart/cartButton";
import { useSelector } from "react-redux";
import { getTagsByIds } from "../../store/tags";

const Product = ({ product }) => {
    const tags = useSelector(getTagsByIds(product.tags));

    return <div className="flex flex-col md:flex-row items-center">
        <img
            className="w-1/2"
            src={product.image}
            alt={product.title} />
        <div className="flex flex-col justify-center">
            <p className="uppercase mb-2">{product.title}</p>
            <div className="flex gap-2 mb-3 text-xs">
                {tags?.map(tag => <span
                    key={tag._id}
                    className="p-1 border border-black uppercase">
                    {tag.name}
                </span>)}
            </div>
            <p className="mb-2">{product.description}</p>
            <p className="font-bold mb-2">{product.price} BYN</p>
            <CartButton productId={product._id} />
        </div>
    </div>;
};

Product.propTypes = {
    product: PropTypes.object
};

export default Product;
