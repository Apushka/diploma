import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { validator } from "../../utils/validator";
import AppButton from "../common/buttonBlack";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";
import { getDeliveryLists, getDeliveryLoadingStatus, loadDeliveryLists } from "../../store/delivery";

const DeliveryForm = ({ onProceed }) => {
    const isDeliveryLoading = useSelector(getDeliveryLoadingStatus);
    const deliveryLists = useSelector(getDeliveryLists);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!deliveryLists) {
            dispatch(loadDeliveryLists());
        }
    }, []);

    const [isTrySubmit, setIsTrySubmit] = useState(false);
    const [data, setData] = useState({
        country: "6392fc9087bc8a3dade1c1b3",
        city: "6392fe741a7c1c881fc77c3b",
        street: "sdf",
        address: "24",
        building: "234",
        apartment: "234",
        index: "234"
    });
    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length === 0;

    const countriesList = deliveryLists?.countries;
    const citiesList = deliveryLists?.cities.filter(c => c.country === data.country);

    const validatorConfig = {
        country: {
            isRequired: {
                message: "Выберите страну"
            }
        },
        city: {
            isRequired: {
                message: "Выберите город"
            }
        },
        street: {
            isRequired: {
                message: "Название улицы обязательно для заполнения"
            }
        },
        address: {
            isRequired: {
                message: "Номер дома обязателен для заполнения"
            }
        },
        index: {
            isRequired: {
                message: "Индекс обязателен для заполнения"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        if (isTrySubmit) {
            validate();
        }
    }, [data]);

    const handleChange = (target) => {
        setData(prevState => ({ ...prevState, [target.name]: target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsTrySubmit(true);
        const isValid = validate();
        if (!isValid) return;
        onProceed(data);
    };

    if (isDeliveryLoading) {
        return <div>Loading...</div>;
    }

    return <form>
        <SelectField
            defaultOption="Выбрать страну"
            options={countriesList}
            name="country"
            onChange={handleChange}
            value={data.country}
            error={errors.country}
        />
        <SelectField
            defaultOption="Выбрать город"
            options={citiesList}
            name="city"
            onChange={handleChange}
            value={data.city}
            error={errors.city}
        />
        <TextField
            name="street"
            value={data.street}
            placeholder="Улица"
            onChange={handleChange}
            error={errors.street} />
        <TextField
            name="address"
            value={data.address}
            type="number"
            placeholder="Дом"
            onChange={handleChange}
            error={errors.address} />
        <TextField
            name="building"
            value={data.building}
            placeholder="Корпус"
            onChange={handleChange}
            error={errors.building} />
        <TextField
            name="apartment"
            value={data.apartment}
            placeholder="Квартира"
            onChange={handleChange}
            error={errors.apartment} />
        <TextField
            name="index"
            value={data.index}
            type="number"
            placeholder="Индекс"
            onChange={handleChange}
            error={errors.index} />
        <AppButton
            onClick={handleSubmit}
            title="Продолжить"
            isDisabled={!isValid} />
    </form>;
};

DeliveryForm.propTypes = {
    onProceed: PropTypes.func
};

export default DeliveryForm;
