import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./footerNavLink.module.scss";
import PropTypes from "prop-types";

const FooterNavLink = ({ to, children }) => {
    return (
        <NavLink
            className={styles.link}
            activeClassName={styles.link__active}
            to={to}
        >
            {children}
        </NavLink>
    );
};

FooterNavLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default FooterNavLink;
