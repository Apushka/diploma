import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { validator } from "../../utils/validator";
import AppButton from "../common/appButton";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";
import { getDeliveryLists, getDeliveryLoadingStatus, loadDeliveryLists } from "../../store/delivery";
import Loader from "../common/loader";

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
        country: "",
        city: "",
        street: "",
        address: "",
        building: "",
        apartment: "",
        index: ""
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
        return <Loader />;
    }

    return <form>
        <div className="mx-auto w-full md:w-1/2">

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
                label="Улица"
                onChange={handleChange}
                error={errors.street} />
            <TextField
                name="address"
                value={data.address}
                type="number"
                label="Дом"
                onChange={handleChange}
                error={errors.address} />
            <TextField
                name="building"
                value={data.building}
                label="Корпус"
                onChange={handleChange}
                error={errors.building} />
            <TextField
                name="apartment"
                value={data.apartment}
                label="Квартира"
                onChange={handleChange}
                error={errors.apartment} />
            <TextField
                name="index"
                value={data.index}
                type="number"
                label="Индекс"
                onChange={handleChange}
                error={errors.index} />
        </div>
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
