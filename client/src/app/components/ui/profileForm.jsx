import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getUserData, updateUserData } from "../../store/user";
import { validator } from "../../utils/validator";
import AppButton from "../common/appButton";
import TextField from "../common/form/textField";

const ProfileForm = ({ onFinish }) => {
    const userData = useSelector(getUserData);
    const [data, setData] = useState({
        ...userData
    });
    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length === 0;
    const dispatch = useDispatch();

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
        tel: {
            isTel: {
                message: "Некорретный номер телефона"
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
        dispatch(updateUserData(data));
        onFinish();
    };

    return <form onSubmit={handleSubmit}>
        <div className="mx-auto w-full md:w-1/2">
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
                label="Телефон"
                name="tel"
                type="number"
                value={data.tel}
                onChange={handleChange}
                error={errors.tel}
            />
            <div className="flex gap-3">
                <AppButton
                    type="button"
                    title="Отмена"
                    onClick={onFinish} />
                <AppButton
                    type="submit"
                    title="Сохранить"
                    isDisabled={!isValid} />
            </div>
        </div>
    </form>;
};

ProfileForm.propTypes = {
    onFinish: PropTypes.func
};

export default ProfileForm;
