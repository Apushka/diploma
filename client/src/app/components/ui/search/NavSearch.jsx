import React, { useState } from "react";
import searchIcon from "../../../assets/search.png";
import SearchForm from "./searchForm";

const NavSearch = () => {
    const [isOpen, setIsOpen] = useState(false);

    return <div className="text-black relative">
        {isOpen
            ? <SearchForm onClose={() => setIsOpen(false)} />
            : <span
                onClick={() => setIsOpen(true)}
                style={{
                    background: `url(${searchIcon}) no-repeat center/contain`,
                    filter: "invert(1)"
                }}
                className="block w-6 h-6 cursor-pointer"
            ></span>}
    </div>;
};

export default NavSearch;
