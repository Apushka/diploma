import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (<div className="mb-4">
        {label && <label htmlFor={label}>{label}</label>}
        <div>
            <input
                className="border border-solid border-black w-full focus:outline-none"
                type={showPassword ? "text" : type}
                id={name}
                value={value}
                onChange={handleChange}
                name={name}
                placeholder={placeholder} />
            {type === "password" && <button
                type="button"
                onClick={toggleShowPassword}>
                <i>показать пароль</i>
            </button>}
            {error && <div
                className="text-red-400">{error}</div>}
        </div>
    </div >);
};

TextField.defaultProps = {
    type: "text"
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onChange: PropTypes.func,
    placeholder: PropTypes.string
};

export default TextField;
