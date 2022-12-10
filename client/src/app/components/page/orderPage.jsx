import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrderById, getOrdersLoadingStatus } from "../../store/orders";

const OrderPage = () => {
    const { orderId } = useParams();
    const order = useSelector(getOrderById(orderId));
    const isOrdersLoading = useSelector(getOrdersLoadingStatus);

    if (isOrdersLoading) {
        return <div>Loading...</div>;
    }

    return <div>
        <p>Заказ номер {order._id}</p>
        {order.products.map(product => <Link
            key={product._id}
            to={`/catalog/${product.product.category}/${product.product._id}`}>
            {product.product.title}
        </Link>)}
    </div>;
};

export default OrderPage;
