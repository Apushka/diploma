import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCategory from "../../hooks/useCategory";

import {
    getCollectionByPath,
    getCollectionLoadingStatus,
    loadCollection
} from "../../store/collections";
import BreadCrumbs from "../common/breadcrumbs";
import Catalog from "../ui/catalog";
import PageContent from "../ui/pageContent";
import PageHeader from "../ui/pageHeader";

const CatalogPage = () => {
    const { category, queryObject } = useCategory();
    const collection = useSelector(getCollectionByPath(category));
    const isCollectionLoading = useSelector(getCollectionLoadingStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!collection && queryObject) {
            dispatch(
                loadCollection(queryObject));
        }
    }, [queryObject]);

    return (
        <div className="w-full">
            <PageHeader title={queryObject?.name} />
            <PageContent >
                <BreadCrumbs />
                {!collection?.length && !isCollectionLoading
                    ? <div>Ничего не найдено...</div>
                    : <p className="text-xs mb-12">
                        Количество продуктов: {collection?.length}
                    </p>}
                {!collection ? <Catalog.Skeleton /> : <Catalog collection={collection} />}
            </PageContent>
        </div>
    );
};

export default CatalogPage;
