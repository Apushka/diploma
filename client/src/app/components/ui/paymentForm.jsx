import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createOrder } from "../../store/orders";
import { paymentFormatter } from "../../utils/paymentFormatter";
import { validator } from "../../utils/validator";
import AppButton from "../common/appButton";
import TextField from "../common/form/textField";

const PaymentForm = () => {
    const [isTrySubmit, setIsTrySubmit] = useState(false);
    const [data, setData] = useState({
        cardNumber: "",
        expiryDate: "",
        code: "",
        cardholderName: ""
    });
    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length === 0;
    const dispatch = useDispatch();

    useEffect(() => {
        if (isTrySubmit) {
            validate();
        }
    }, [data]);

    const validatorConfig = {
        cardNumber: {
            isRequired: {
                message: "Введите номер вашей карты"
            },
            isCardNumber: {
                message: "Номер карты должен состоять из 16 цифр",
                value: 16
            }
        },
        expiryDate: {
            isRequired: {
                message: "Введите срок окончания действия Вашей карты"
            },
            isExpiryFormat: {
                message: "Срок окончания действия карты должен содержать только цифры"
            },
            isExpiryDate: {
                message: "Срок окончания действия карты неккоректен"
            }
        },
        code: {
            isRequired: {
                message: "Введите секретный код"
            },
            isSecretCode: {
                message: "Код должен содержать 3 цифры",
                value: 3
            }
        },
        cardholderName: {
            isRequired: {
                message: "Введите имя, как написано на карте"
            },
            isCardholderName: {
                message: "Полное имя должно быть написано латиницей"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (target) => {
        setData(prevState => ({ ...prevState, [target.name]: paymentFormatter(target) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsTrySubmit(true);
        const isValid = validate();
        if (!isValid) return;
        dispatch(createOrder());
    };

    return <form onSubmit={handleSubmit}>
        <div className="mx-auto w-full md:w-1/2">
            <TextField
                label="Номер карты"
                type="number"
                placeholder="0000 0000 0000 0000"
                name="cardNumber"
                value={data.cardNumber}
                onChange={handleChange}
                error={errors.cardNumber} />
            <TextField
                label="Срок окончания"
                placeholder="00/00"
                name="expiryDate"
                value={data.expiryDate}
                onChange={handleChange}
                error={errors.expiryDate} />
            <TextField
                label="CVV"
                placeholder="000"
                type="number"
                name="code"
                value={data.code}
                onChange={handleChange}
                error={errors.code} />
            <TextField
                label="Имя владельца (латиницей)"
                placeholder="Ivan Ivanov"
                name="cardholderName"
                value={data.cardholderName}
                onChange={handleChange}
                error={errors.cardholderName} />
        </div>
        <AppButton
            onClick={handleSubmit}
            title="Оплатить"
            isDisabled={!isValid} />
    </form>;
};

export default PaymentForm;
