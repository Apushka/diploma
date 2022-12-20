import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ value, onChange, defaultOption, options, error, name }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return <div className="mb-3">
        <select
            className="uppercase focus:outline-none rounded-lg px-2 mb-1"
            id={name}
            value={value}
            name={name}
            onChange={handleChange}>

            <option disabled value="">
                {defaultOption}
            </option>

            {options.length > 0 && options.map(option => <option
                value={option._id}
                key={option._id}>
                {option.name}
            </option>)}
        </select>
        {error && <div className="text-red-400">
            {error}
        </div>}
    </div>;
};

SelectField.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    options: PropTypes.array,
    error: PropTypes.string,
    name: PropTypes.string
};

export default SelectField;
