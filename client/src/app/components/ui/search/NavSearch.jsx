import React, { useState } from "react";
import searchIcon from "../../../assets/search.png";
import SearchForm from "./searchForm";
import HeaderNavIcon from "../header/headerNavIcon";

const NavSearch = () => {
    const [isOpen, setIsOpen] = useState(false);

    return <div className="text-black relative w-4 h-4">
        {isOpen
            ? <span
                className="absolute w-56 -top-0.5 right-0 z-20">
                <SearchForm onClose={() => setIsOpen(false)} />
            </span>
            : <HeaderNavIcon
                iconUrl={searchIcon}
                onClick={() => setIsOpen(true)}
            />
        }
    </div >;
};

export default NavSearch;
