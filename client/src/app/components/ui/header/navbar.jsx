import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HeaderNavLink from "./headerNavLink";
import { getTagsList } from "../../../store/tags";
import { useLocation } from "react-router-dom";

const NavBar = () => {
    const location = useLocation();
    const tagsList = useSelector(getTagsList);
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(false);
        document.body.classList.remove("overflow-hidden");
    }, [location]);

    const handleClick = () => {
        setActive(prevState => !prevState);
        document.body.classList.toggle("overflow-hidden");
    };

    return <>
        <div
            className={"block order-first lg:hidden cursor-pointer relative z-10 w-6 h-4 before:absolute before:content-[''] before:bg-white before:left-0 before:top-0 before:w-full before:h-[2px] before:transition-all before:duration-300 before:ease-in-out after:absolute after:content-[''] after:bg-white after:left-0 after:bottom-0 after:w-full after:h-[2px] after:transition-all after:duration-300 after:ease-in-out " + (active ? "before:top-[6px] before:rotate-45 after:-rotate-45 after:bottom-[8px]" : "")}
            onClick={handleClick}>
            <span className={"absolute bg-white top-[7px] left-0 w-full h-[2px] transition-all duration-300 ease-in-out " + (active ? "scale-0" : "")}></span>
        </div>
        <ul className={"flex lg:relative lg:left-0 lg:flex-row lg:w-full lg:h-full lg:bg-black lg:text-white lg:border-none border border-black bg-white text-black absolute flex-col h-screen w-2/3 top-full -left-full justify-center items-center gap-12 font-light select-none z-20 transition-all duration-200 ease-in-out " + (active ? "-left-0" : "")}>
            <li>
                <HeaderNavLink to="/" >ГЛАВНАЯ</HeaderNavLink>
            </li>
            <li>
                <HeaderNavLink to="/catalog">КАТАЛОГ</HeaderNavLink>
            </li>
            <li>
                <HeaderNavLink to="/shops">МАГАЗИНЫ</HeaderNavLink>
            </li>
            {tagsList.map(({ _id, name, path }) => <li key={_id}>
                <HeaderNavLink to={`/catalog/${path}`}>
                    {name.toUpperCase()}
                </HeaderNavLink>
            </li>)}
        </ul >
    </>;
};

export default NavBar;
