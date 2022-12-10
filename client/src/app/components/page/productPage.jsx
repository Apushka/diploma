import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getError, getProductById, loadProduct } from "../../store/products";

const ProductPage = () => {
    const { productId } = useParams();
    const product = useSelector(getProductById(productId));
    const error = useSelector(getError());
    const dispatch = useDispatch();

    useEffect(() => {
        if (!product) {
            dispatch(loadProduct(productId));
        }
    }, []);

    if (error) return <div>Что-то пошло не так...</div>;

    return <div>
        {/* <BreadCrumbs /> */}
        {product && <>
            <div>{product.title}</div>
            <div>{product.description}</div>
            <img src={product.image} alt={product.title} />
        </>}
    </div>;
};

export default ProductPage;
