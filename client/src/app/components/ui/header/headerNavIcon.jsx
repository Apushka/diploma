import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HeaderNavIcon = ({ iconUrl, to, onClick, pointer }) => {
    return to
        ? <Link
            style={{
                background: `url(${iconUrl}) no-repeat center/contain`,
                filter: "invert(1)"
            }}
            className={"block w-4 h-4 " + (pointer ? "cursor-pointer" : "")}
            to={to}
        />
        : <span
            onClick={onClick}
            style={{
                background: `url(${iconUrl}) no-repeat center/contain`,
                filter: "invert(1)"
            }}
            className={"block w-4 h-4 " + (pointer ? "cursor-pointer" : "")}
        />;
};

HeaderNavIcon.defaultProps = {
    pointer: true
};

HeaderNavIcon.propTypes = {
    iconUrl: PropTypes.string,
    to: PropTypes.string,
    onClick: PropTypes.func,
    pointer: PropTypes.bool
};

export default HeaderNavIcon;
