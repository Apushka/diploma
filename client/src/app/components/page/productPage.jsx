import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById, getProductsLoadingStatus, loadProduct } from "../../store/products";
import BreadCrumbs from "../common/breadcrumbs";
import PageHeader from "../ui/pageHeader";
import PageContent from "../ui/pageContent";
import Product from "../ui/product";
import { restoreScroll } from "../../utils/scrollRestore";
import Loader from "../common/loader";

const ProductPage = () => {
    const { productId } = useParams();
    const product = useSelector(getProductById(productId));
    const isProductLoading = useSelector(getProductsLoadingStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!product) {
            dispatch(loadProduct(productId));
        }
        restoreScroll();
    }, []);

    if (isProductLoading) return <Loader />;
    if (!product && !isProductLoading) return <div>Ничего не найдено...</div>;

    return <div>
        <PageHeader title={product.title} />
        <PageContent>
            <BreadCrumbs />
            {product && <Product product={product} />}
        </PageContent>
    </div>;
};

export default ProductPage;
