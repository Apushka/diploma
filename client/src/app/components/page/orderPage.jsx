import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrderById, getOrdersLoadingStatus } from "../../store/orders";
import Loader from "../common/loader";
import PageContent from "../ui/pageContent";
import PageHeader from "../ui/pageHeader";

const OrderPage = () => {
    const { orderId } = useParams();
    const order = useSelector(getOrderById(orderId));
    const isOrdersLoading = useSelector(getOrdersLoadingStatus);

    const dateOptions = {
        year: "numeric",
        day: "2-digit",
        month: "long",
        hour: "2-digit",
        minute: "2-digit"
    };

    if (isOrdersLoading) {
        return <Loader />;
    }

    return <div>
        <PageHeader title={`Заказ номер ${order._id}`} />
        <PageContent>
            <i className="block text-xs mb-8">{new Date(order.createdAt).toLocaleString("ru", dateOptions)}</i>
            <ul className="m-3 md:w-2/3 mx-auto">
                {order.products.map(product => <li
                    className="flex justify-between items-center md:p-3"
                    key={product._id}>
                    <img
                        className="block w-10 md:w-40 mb-5"
                        src={product.product.image} />
                    <Link
                        className="uppercase w-1/2 hover:underline text-ellipsis overflow-auto"
                        to={`/catalog/${product.product.category}/${product.product._id}`}>
                        {product.product.title}
                    </Link>
                    <div>
                        {product.amount}шт.
                    </div>
                    <div className="font-bold">
                        {product.product.price} BYN
                    </div>
                </li>
                )}
            </ul>
            <div className="uppercase p-3 text-end text-lg">
                Сумма заказа:
                <p className="font-bold">
                    {order.total} BYN
                </p>
            </div>
        </PageContent>
    </div >;
};

export default OrderPage;
