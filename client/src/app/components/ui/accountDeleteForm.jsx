import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getCurrentUserId } from "../../store/user";
import { validator } from "../../utils/validator";
import AppButton from "../common/appButton";
import TextField from "../common/form/textField";

const AccountDeleteForm = () => {
    const userId = useSelector(getCurrentUserId);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [isTrySubmit, setIsTrySubmit] = useState(false);
    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length === 0;
    const dispatch = useDispatch();

    useEffect(() => {
        if (isTrySubmit) {
            validate();
        }
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Введите e-mail"
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
        setIsTrySubmit(true);
        const isValid = validate();
        if (!isValid) return;
        dispatch(deleteUser({ ...data, _id: userId }));
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
            title="Удалить аккаунт"
            isDisabled={!isValid} />
    </form>;
};

export default AccountDeleteForm;
