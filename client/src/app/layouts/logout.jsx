import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loader from "../components/common/loader";
import { logOut } from "../store/user";

const Logout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logOut());
    }, []);

    return <Loader />;
};

export default Logout;
