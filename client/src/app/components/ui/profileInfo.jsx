import React from "react";
import PropTypes from "prop-types";
import settingsIcon from "../../assets/settings.png";
import { useSelector } from "react-redux";
import { getUserData } from "../../store/user";

const ProfileInfo = ({ onEdit }) => {
    const { name, surname, email, tel } = useSelector(getUserData);

    return <div className="relative inline-block border border-black p-10">
        <div
            className="absolute top-2 right-2 w-3 h-3 cursor-pointer"
            style={{
                background: `url(${settingsIcon}) no-repeat center/contain`
            }}
            onClick={onEdit}
        />
        <p className="uppercase text-lg mb-2">{name} {surname}</p>
        <p className="uppercase text-xs mb-2 ">{email}</p>
        {tel && <p className="uppercase text-xs">тел: {tel}</p>}
    </div>;
};

ProfileInfo.propTypes = {
    onEdit: PropTypes.func
};

export default ProfileInfo;
