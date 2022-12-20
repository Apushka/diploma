import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, type, name, value, onChange, placeholder }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (<div className="mb-4">
        {label && <label
            className="block uppercase mb-2"
            htmlFor={label}>{label}</label>}
        <div className="input-group has-validation">
            <textarea
                className="border border-solid border-black w-full focus:outline-none rounded-lg px-2 mb-1"
                type={type}
                id={name}
                value={value}
                onChange={handleChange}
                name={name}
                placeholder={placeholder}
                rows="3" />
        </div>
    </div >);
};

TextAreaField.defaultProps = {
    type: "text"
};
TextAreaField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string
};

export default TextAreaField;
