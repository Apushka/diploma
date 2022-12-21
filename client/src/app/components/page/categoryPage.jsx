import React from "react";
import { useSelector } from "react-redux";
import { getCategoriesList } from "../../store/categories";
import BreadCrumbs from "../common/breadcrumbs";
import HeaderNavLink from "../ui/header/headerNavLink";
import PageContent from "../ui/pageContent";
import PageHeader from "../ui/pageHeader";

const CategoryPage = () => {
    const categories = useSelector(getCategoriesList);
    return <div>
        <PageHeader title="Категории" />
        <PageContent>
            <BreadCrumbs />
            <div className="flex flex-col md:flex-row justify-center md:items-center gap-5 md:gap-10 flex-wrap mt-5 md:mt-10">
                {categories.map(({ _id, path, name }) => <div
                    key={_id}
                    className="border border-black p-3 md:opacity-40 hover:opacity-100">
                    <HeaderNavLink
                        to={`/catalog/${path}`}>
                        {name}
                    </HeaderNavLink>
                </div>)}
            </div>
        </PageContent>
    </div>;
};

export default CategoryPage;
