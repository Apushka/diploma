import React from "react";
import { useSelector } from "react-redux";
import accountIcon from "../../../assets/account.png";
import { getUserData } from "../../../store/user";
import HeaderNavIcon from "./headerNavIcon";
import NavProfile from "./navProfile";

const NavAccount = () => {
    const userData = useSelector(getUserData);

    return !userData
        ? <HeaderNavIcon
            iconUrl={accountIcon}
            to="/login"
        />
        : <NavProfile />;
};

export default NavAccount;
