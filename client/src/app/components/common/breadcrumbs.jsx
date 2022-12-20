import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getCategoriesList } from "../../store/categories";
import { getProductsList } from "../../store/products";
import { getTagsList } from "../../store/tags";

const defaultRoutes = {
    "": "Главная",
    catalog: "Каталог",
    shops: "Магазины"
};

const BreadCrumbs = () => {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const categories = useSelector(getCategoriesList);
    const tags = useSelector(getTagsList);
    const products = useSelector(getProductsList);

    useEffect(() => {
        const routes = { ...defaultRoutes };
        categories.forEach(c => {
            routes[c.path] = c.name;
        });
        tags.forEach(c => {
            routes[c.path] = c.name;
        });
        Object.values(products).forEach(p => {
            routes[p._id] = p.title;
        });

        const breads = [{
            to: "/",
            breadcrumb: routes[""]
        }];

        const { pathname } = location;
        const params = pathname.split("/").filter(param => param);
        params.forEach(param => {
            const to = "/" + pathname.substring(1, pathname.indexOf(param) + param.length);
            breads.push({
                to,
                breadcrumb: routes[param]
            });
        });

        setBreadcrumbs(breads);
    }, [location, tags, categories, products]);

    return <div className="mb-2">
        {breadcrumbs.map((br, index) => <span key={br.to}>
            <Link
                className={"uppercase text-xs" + (index === breadcrumbs.length - 1 ? "font-bold underline" : "")}
                to={br.to}>{br.breadcrumb}</Link>
            {index !== breadcrumbs.length - 1 && <span className="mx-3">/</span>}
        </span>)}
    </div>;
};

export default BreadCrumbs;
