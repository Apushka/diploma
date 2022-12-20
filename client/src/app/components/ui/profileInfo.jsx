import React from "react";
import PropTypes from "prop-types";
import settingsIcon from "../../assets/settings.png";
import { useSelector } from "react-redux";
import { getUserData } from "../../store/user";

const ProfileInfo = ({ onEdit }) => {
    const { name, surname, email, tel } = useSelector(getUserData);

    return <div className="relative ">
        <div
            className="absolute right-0 w-4 h-4 cursor-pointer"
            style={{
                background: `url(${settingsIcon}) no-repeat center/contain`
            }}
            onClick={onEdit}
        />
        <p className="uppercase text-lg">{name} {surname}</p>
        <p className="uppercase text-lg">{email}</p>
        <p className="uppercase text-lg">{tel}</p>
    </div>;
};

ProfileInfo.propTypes = {
    onEdit: PropTypes.func
};

export default ProfileInfo;
