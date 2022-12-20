import React from "react";
import { useSelector } from "react-redux";
import { getCategoriesList } from "../../store/categories";
import BreadCrumbs from "../common/breadcrumbs";
import HeaderNavLink from "../ui/header/headerNavLink";
import PageContent from "../ui/pageContent";

const CategoryPage = () => {
    const categories = useSelector(getCategoriesList);
    return <PageContent>
        <BreadCrumbs />
        <div className="flex flex-col justify-center items-center gap-6 flex-wrap text-lg">
            {categories.map(({ _id, path, name }) => <HeaderNavLink
                key={_id}
                to={`/catalog/${path}`}>
                {name}
            </HeaderNavLink>)}
        </div>
    </PageContent>;
};

export default CategoryPage;
