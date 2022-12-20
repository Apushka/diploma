import React from "react";
import PropTypes from "prop-types";

const PageHeader = ({ title }) => {
    return <div
        className="flex justify-center items-center h-48 bg-rnude">
        <h3
            className="uppercase text-xl w-full text-center tracking-widest text-white">
            {title}
        </h3>
    </div>;
};

PageHeader.propTypes = {
    title: PropTypes.string
};

export default PageHeader;
