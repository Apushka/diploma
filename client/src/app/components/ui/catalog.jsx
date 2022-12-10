import React from "react";
import PropTypes from "prop-types";
import ProductCard from "./productCard";

const Catalog = ({ collection }) => {
    return <div className="flex flex-wrap justify-center gap-5">
        {collection.map(productId => <ProductCard key={productId} productId={productId} />)}
    </div>;
};

const CatalogSkeleton = () => {
    return <div className="flex flex-wrap justify-center gap-5">
        {new Array(3)
            .fill("")
            .map((_, index) => <div
                className="w-80 h-[458px] rounded-lg animate-pulse bg-slate-200"
                key={index}
            />
            )}
    </div>;
};

Catalog.Skeleton = CatalogSkeleton;

Catalog.propTypes = {
    collection: PropTypes.array
};

export default Catalog;
