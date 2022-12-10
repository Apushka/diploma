import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signUp } from "../../store/user";
import { validator } from "../../utils/validator";
import AppButton from "../common/buttonBlack";
import TextField from "../common/form/textField";

const RegisterForm = () => {
    const [data, setData] = useState({
        name: "",
        surname: "",
        email: "",
        tel: "",
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
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должно состоять минимум из 2-х символов",
                value: 2
            }
        },
        surname: {
            isRequired: {
                message: "Фамилия обязательна для заполнения"
            },
            min: {
                message: "Фамилия должна состоять минимум из 2-х символов",
                value: 2
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введён некорректно"
            }
        },
        tel: {
            isTel: {
                message: "Некорретный номер телефона"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapital: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                message: "Пароль должен состоять минимум из 8-ми символов",
                value: 8
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
        const isValid = validate();
        if (!isValid) return;
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";
        dispatch(signUp({ payload: data, redirect }));
    };

    return <form onSubmit={handleSubmit}>
        <TextField
            label="Имя"
            name="name"
            value={data.name}
            onChange={handleChange}
            error={errors.name} />
        <TextField
            label="Фамилия"
            name="surname"
            value={data.surname}
            onChange={handleChange}
            error={errors.surname} />
        <TextField
            label="Электронная почта"
            name="email"
            value={data.email}
            onChange={handleChange}
            error={errors.email} />
        <TextField
            label="Телефон"
            name="tel"
            type="number"
            value={data.tel}
            onChange={handleChange}
            error={errors.tel}
        />
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

export default RegisterForm;
