import React from "react";
import PropTypes from "prop-types";

const PageContent = ({ children }) => {
    return <div className="p-3 md:p-6 mb-6 min-h-[100vh]">
        {children}
    </div>;
};

PageContent.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default PageContent;
