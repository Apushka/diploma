import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getUserData } from "../../store/user";
import AppButton from "../common/buttonBlack";
import { Link } from "react-router-dom";
import { getOrdersList, getOrdersLoadingStatus } from "../../store/orders";

const ProfileInfo = ({ onEdit }) => {
    const { name, surname, email } = useSelector(getUserData);
    const orders = useSelector(getOrdersList);
    const isOrdersLoading = useSelector(getOrdersLoadingStatus);

    return <div>
        <AppButton
            title="Редактировать"
            onClick={onEdit}
        />
        <p>{name}</p>
        <p>{surname}</p>
        <p>{email}</p>
        {isOrdersLoading
            ? <div>Loading...</div>
            : orders && orders.map(order => <div key={order._id}>
                <Link to={`/order/${order._id}`}>Заказ от {new Date(order.createdAt).toLocaleString()}</Link>
            </div>)}
    </div>;
};

ProfileInfo.propTypes = {
    onEdit: PropTypes.func
};

export default ProfileInfo;
