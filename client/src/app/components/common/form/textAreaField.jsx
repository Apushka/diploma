import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, type, name, value, onChange, placeholder }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (<div className="mb-4">
        {label && <label htmlFor={label}>{label}</label>}
        <div className="input-group has-validation">
            <textarea
                className="border border-solid border-black"
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
