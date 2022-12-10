import React from "react";
import { useParams } from "react-router-dom";
import NewOrderPage from "../components/page/newOrderPage";
import OrderPage from "../components/page/orderPage";
import OrderSuccessPage from "../components/page/orderSuccessPage";

const Order = () => {
    const { orderId } = useParams();

    return orderId
        ? orderId === "success"
            ? <OrderSuccessPage />
            : <OrderPage />
        : <NewOrderPage />;
};

export default Order;
