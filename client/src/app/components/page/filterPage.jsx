import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { getCollectionByPath, getCollectionLoadingStatus, loadCollection } from "../../store/collections";
import Catalog from "../ui/catalog";
import { getTagById } from "../../store/tags";

const FilterPage = () => {
    const { search } = useLocation();
    const { field, value } = qs.parse(search);
    const { path, name } = useSelector(getTagById(value));
    const collection = useSelector(
        getCollectionByPath(path)
    );
    const isCollectionLoading = useSelector(getCollectionLoadingStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!collection) {
            dispatch(
                loadCollection({
                    field,
                    value,
                    path
                })
            );
        }
    }, [search]);

    if (!collection?.length && !isCollectionLoading) {
        return <div>Ничего не найдено...</div>;
    }

    return (
        <div className="w-full">
            <div>{name}</div>
            {!collection ? <Catalog.Skeleton /> : <Catalog collection={collection} />}
        </div>
    );
};

export default FilterPage;
