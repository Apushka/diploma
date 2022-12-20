import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const HeaderNavLink = ({ to, children }) => {
    return (
        <NavLink
            activeClassName="after:border after:border-1 after:-bottom-2 after:border-gray-400 after:absolute after:content-[''] after:w-full after:h-0 lg:after:border-2 lg:after:-bottom-3 after:left-0 after:rounded-t-lg lg:after:border-white"
            className="relative uppercase"
            to={to}
            exact>
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
