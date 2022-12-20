import React from "react";
import NavBar from "./navbar";
import logoIcon from "../../../assets/logo.png";
import NavSearch from "../search/navSearch";
import NavAccount from "./navAccount";
import NavCart from "../cart/navCart";
import HeaderNavIcon from "./headerNavIcon";

const Header = () => {
    return (
        <header className="fixed top-0 w-full bg-black flex justify-between items-center text-white px-3 py-2 z-20">
            <HeaderNavIcon iconUrl={logoIcon} to="/" />
            <NavBar />
            <div className="flex gap-5">
                <NavSearch />
                <NavAccount />
                <NavCart />
            </div>
        </header>
    );
};

export default Header;
