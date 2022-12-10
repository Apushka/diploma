import React from "react";
import { useSelector } from "react-redux";
import HeaderNavLink from "./headerNavLink";
import { getTagsList } from "../../../store/tags";

const NavBar = () => {
    const tagsList = useSelector(getTagsList);

    return (
        <ul className="flex justify-center gap-12 font-light text-base select-none z-20">
            <li>
                <HeaderNavLink to="/catalog">КАТАЛОГ</HeaderNavLink>
            </li>
            <li>
                <HeaderNavLink to="/shops">МАГАЗИНЫ</HeaderNavLink>
            </li>
            {tagsList.map(({ _id, name, path }) => <li key={_id}>
                <HeaderNavLink to={`/filter/${path}?field=tags&value=${_id}`}>
                    {name.toUpperCase()}
                </HeaderNavLink>
            </li>)}
        </ul >
    );
};

export default NavBar;
