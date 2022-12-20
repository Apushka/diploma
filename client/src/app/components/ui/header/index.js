import React from "react";
import NavBar from "./navbar";
import logoIcon from "../../../assets/logo.png";
import NavSearch from "../search/navSearch";
import NavAccount from "./navAccount";
import NavCart from "../cart/navCart";
import HeaderNavIcon from "./headerNavIcon";

const Header = () => {
    return (
        <header className="bg-black flex relative justify-between items-center text-white px-3 py-2">
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
