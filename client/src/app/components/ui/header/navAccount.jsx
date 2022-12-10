import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserData } from "../../../store/user";
import NavProfile from "./navProfile";

const NavAccount = () => {
    const userData = useSelector(getUserData);

    return !userData
        ? <NavLink to="/login">login</NavLink>
        : <NavProfile />;
};

export default NavAccount;
