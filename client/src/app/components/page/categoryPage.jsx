import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategoriesList } from "../../store/categories";

const CategoryPage = () => {
    const categories = useSelector(getCategoriesList);
    return <div>
        {categories.map(({ _id, path, name }) => <p key={_id}>
            <Link to={`/catalog/${path}`}>
                {name}
            </Link>
        </p>)}
    </div>;
};

export default CategoryPage;
