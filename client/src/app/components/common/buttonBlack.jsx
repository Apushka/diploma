import React from "react";
import PropTypes from "prop-types";

const AppButton = ({ type, onClick, title, isDisabled }) => {
    return <button
        className={"w-full bg-black text-white py-5 uppercase " + (isDisabled ? "opacity-50" : "")}
        type={type}
        onClick={onClick}
        disabled={isDisabled}>
        {title}
    </button>;
};

AppButton.defaultProps = {
    type: "button",
    isDisabled: false
};

AppButton.propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
    title: PropTypes.string,
    isDisabled: PropTypes.bool
};

export default AppButton;
