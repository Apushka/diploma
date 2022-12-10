import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getCategoryByPath } from "../../store/categories";
import {
    getCollectionByPath,
    getCollectionLoadingStatus,
    loadCollection
} from "../../store/collections";
// import BreadCrumbs from "../common/breadcrumbs";
import Catalog from "../ui/catalog";

const CatalogPage = () => {
    const { category } = useParams();
    const currentCategory = useSelector(getCategoryByPath(category));
    const collection = useSelector(getCollectionByPath(category));
    const isCollectionLoading = useSelector(getCollectionLoadingStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!collection) {
            dispatch(
                loadCollection({
                    field: "category",
                    value: currentCategory._id,
                    path: category
                })
            );
        }
    }, [category]);

    if (!collection?.length && !isCollectionLoading) {
        return <div>Ничего не найдено...</div>;
    }

    return (
        <div className="w-full">
            {/* <BreadCrumbs /> */}
            <div>{currentCategory.name}</div>
            {!collection ? <Catalog.Skeleton /> : <Catalog collection={collection} />}
        </div>
    );
};

export default CatalogPage;
