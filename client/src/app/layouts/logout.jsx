import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../store/user";

const Logout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logOut());
    }, []);

    return <div>Loading...</div>;
};

export default Logout;
