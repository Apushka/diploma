import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getOrdersList, getOrdersLoadingStatus } from "../../store/orders";
import Loader from "../common/loader";
import PageContent from "../ui/pageContent";
import PageHeader from "../ui/pageHeader";
import ProfileForm from "../ui/profileForm";
import ProfileInfo from "../ui/profileInfo";

const ProfilePage = () => {
    const orders = useSelector(getOrdersList);
    const isOrdersLoading = useSelector(getOrdersLoadingStatus);
    const [isEdit, setIsEdit] = useState(false);
    const history = useHistory();

    const dateOptions = {
        year: "numeric",
        day: "2-digit",
        month: "long"
    };

    const handleDelete = () => {
        history.push(`/profile/remove`);
    };

    return <div>
        <PageHeader title="Личный кабинет" />
        <PageContent>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {isEdit
                    ? <div className="md:w-1/3 w-full">
                        <ProfileForm onFinish={() => setIsEdit(false)} />
                        <button
                            className="block ml-auto italic text-xs my-3 hover:text-red-600"
                            onClick={handleDelete}>
                            Удалить аккаунт
                        </button>
                    </div>
                    : <ProfileInfo onEdit={() => setIsEdit(true)} />}
                {isOrdersLoading
                    ? <Loader />
                    : orders.length > 0 && <div className="flex flex-col w-full">
                        <p className="text-lg uppercase mb-5">История заказов</p>
                        {orders.map(order => <div className="flex justify-between border border-black p-8 box-border hover:underline"
                            key={order._id}>
                            <Link to={`/order/${order._id}`}>
                                № {order._id} от {new Date(order.createdAt).toLocaleString("ru", dateOptions)}
                            </Link>
                            <p className="font-bold">{order.total} BYN</p>
                        </div>)}
                    </div>}
            </div>
        </PageContent>
    </div>;
};

export default ProfilePage;
