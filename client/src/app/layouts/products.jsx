import React from "react";
import { useParams } from "react-router-dom";
import CatalogPage from "../components/page/catalogPage";
import CategoryPage from "../components/page/categoryPage";
import ProductPage from "../components/page/productPage";

const Products = () => {
    const { category, productId } = useParams();

    return category
        ? productId
            ? <ProductPage />
            : <CatalogPage />
        : <CategoryPage />;
};

export default Products;
