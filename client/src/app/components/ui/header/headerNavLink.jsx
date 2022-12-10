import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const HeaderNavLink = ({ to, children }) => {
    return (
        <NavLink
            activeClassName="after:absolute after:content-[''] after:w-full after:h-0 after:border-4 after:-bottom-6 after:left-0 after:rounded-t-lg after:border-white"
            className="relative"
            to={to}>
            {children}
        </NavLink>
    );
};

HeaderNavLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default HeaderNavLink;
