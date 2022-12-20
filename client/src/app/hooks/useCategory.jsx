import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategoryByPath } from "../store/categories";
import { getTagByPath } from "../store/tags";

const useCategory = () => {
    const [queryObject, setQueryObject] = useState(null);
    const { category } = useParams();
    const currentCategory = useSelector(getCategoryByPath(category));
    const currentTag = useSelector(getTagByPath(category));

    useEffect(() => {
        const query = currentCategory
            ? {
                field: "category",
                value: currentCategory._id,
                path: category,
                name: currentCategory.name
            }
            : {
                field: "tags",
                value: currentTag._id,
                path: category,
                name: currentTag.name
            };
        setQueryObject(query);
    }, [category]);

    return { category, queryObject };
};

export default useCategory;
