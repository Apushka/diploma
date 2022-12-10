import React from "react";
import NavBar from "./navbar";
import { Link } from "react-router-dom";
import NavSearch from "../search/NavSearch";
import NavAccount from "./navAccount";
import NavCart from "../cart/navCart";

const Header = () => {
    return (
        <header className="bg-rblack flex relative justify-between text-rwhite p-6">
            <Link to="/">LOGO</Link>
            <NavBar />
            <div className="flex items-center gap-5">
                <NavSearch />
                <NavAccount />
                <NavCart />
            </div>
        </header>
    );
};

export default Header;
