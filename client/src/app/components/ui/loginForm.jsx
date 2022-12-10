import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logIn } from "../../store/user";
import { validator } from "../../utils/validator";
import AppButton from "../common/buttonBlack";
import TextField from "../common/form/textField";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length === 0;
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Введите e-mail"
            },
            isEmail: {
                message: "E-mail введён некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Введите пароль"
            }
        }
    };

    const handleChange = (target) => {
        setData(prevState => ({ ...prevState, [target.name]: target.value }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";
        dispatch(logIn({ payload: data, redirect }));
    };

    return <form onSubmit={handleSubmit}>
        <TextField
            label="Электронная почта"
            name="email"
            value={data.email}
            onChange={handleChange}
            error={errors.email} />
        <TextField
            label="Пароль"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            error={errors.password} />
        <AppButton
            type="submit"
            title="Submit"
            isDisabled={!isValid} />
    </form>;
};

export default LoginForm;
