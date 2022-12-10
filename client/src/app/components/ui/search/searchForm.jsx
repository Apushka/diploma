import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import { useHistory } from "react-router-dom";
import TextField from "../../common/form/textField";

const SearchForm = ({ onClose }) => {
    const [data, setData] = useState({
        search: ""
    });
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const [isTrySubmit, setIsTrySubmit] = useState(false);

    useEffect(() => {
        if (isTrySubmit) {
            validate();
        }
    }, [data]);

    const validatorConfig = {
        search: {
            isRequired: {
                message: "Укажите, что вы хотите найти"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (target) => {
        setData(prevState => ({ ...prevState, [target.name]: target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsTrySubmit(true);
        const isValid = validate();
        if (!isValid) return;
        history.push(`/search?field=title&value=${data.search}`);
    };

    return <form
        onSubmit={handleSubmit}
        className="relative">
        <TextField
            name="search"
            value={data.search}
            onChange={handleChange}
            error={errors.search}
        />
        <div
            className="absolute right-1 top-0 cursor-pointer"
            onClick={onClose}
        >
            &times;
        </div>
    </form>;
};

SearchForm.propTypes = {
    onClose: PropTypes.func
};

export default SearchForm;
