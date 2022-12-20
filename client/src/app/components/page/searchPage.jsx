import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { getCollectionByPath, getCollectionLoadingStatus, loadCollection } from "../../store/collections";
import Catalog from "../ui/catalog";
import PageHeader from "../ui/pageHeader";
import PageContent from "../ui/pageContent";

const SearchPage = () => {
    const { search } = useLocation();
    const { field, value } = qs.parse(search);
    const collection = useSelector(
        getCollectionByPath("search")
    );
    const isCollectionLoading = useSelector(getCollectionLoadingStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            loadCollection({
                field,
                value,
                path: "search"
            })
        );
    }, [search]);

    return (
        <div className="w-full">
            <PageHeader title={value} />
            <PageContent>
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

export default SearchPage;
