import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { validator } from "../../utils/validator";
import AppButton from "../common/appButton";
import TextAreaField from "../common/form/textAreaField";
import TextField from "../common/form/textField";
import { useSelector } from "react-redux";
import { getUserData } from "../../store/user";

const ContactForm = ({ onProceed }) => {
    const [isTrySubmit, setIsTrySubmit] = useState(false);
    const userData = useSelector(getUserData);
    const [data, setData] = useState({
        ...userData,
        comment: ""
    });
    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        if (isTrySubmit) {
            validate();
        }
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
            isRequired: {
                message: "Номер телефона обязателен для заполения"
            },
            isTel: {
                message: "Номер телефона введён некорректно"
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
        const { _id, ...rest } = data;
        onProceed({ userId: _id, ...rest });
    };

    return <form
        onSubmit={handleSubmit}>
        <div className="mx-auto w-full md:w-1/2">
            <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Фамилия"
                name="surname"
                value={data.surname}
                onChange={handleChange}
                error={errors.surname}
            />
            <TextField
                label="Адрес электронной почты"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Телефон"
                name="tel"
                type="number"
                value={data.tel}
                onChange={handleChange}
                error={errors.tel}
            />
            <TextAreaField
                label="Комментарии к заказу"
                name="comment"
                value={data.comment || ""}
                onChange={handleChange} />
        </div>
        <AppButton
            onClick={handleSubmit}
            title="Продолжить"
            isDisabled={!isValid} />
    </form>;
};

ContactForm.propTypes = {
    onProceed: PropTypes.func
};

export default ContactForm;
