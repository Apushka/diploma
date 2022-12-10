import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { getCollectionByPath, getCollectionLoadingStatus, loadCollection } from "../../store/collections";
import Catalog from "../ui/catalog";

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

    if (!collection?.length && !isCollectionLoading) {
        return <div>Ничего не найдено...</div>;
    }

    return (
        <div className="w-full">
            <div>{value}</div>
            {!collection ? <Catalog.Skeleton /> : <Catalog collection={collection} />}
        </div>
    );
};

export default SearchPage;
