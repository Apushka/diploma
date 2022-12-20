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
        month: "long",
        hour: "2-digit",
        minute: "2-digit"
    };

    const handleDelete = () => {
        history.push(`/profile/remove`);
    };

    return <div>
        <PageHeader title="Личный кабинет" />
        <PageContent>
            {isEdit
                ? <ProfileForm onFinish={() => setIsEdit(false)} />
                : <ProfileInfo onEdit={() => setIsEdit(true)} />}
            {isEdit && <button
                className="block ml-auto italic text-xs my-3 hover:text-red-600"
                onClick={handleDelete}>
                Удалить аккаунт
            </button>}
            {isOrdersLoading
                ? <Loader />
                : orders.length > 0 && <div className="flex flex-col items-center">
                    <p className="text-lg uppercase mb-5">Мои заказы:</p>
                    {orders.map(order => <div className="mb-5"
                        key={order._id}>
                        <Link to={`/order/${order._id}`}>
                            Заказ от {new Date(order.createdAt).toLocaleString("ru", dateOptions)}
                        </Link>
                    </div>)}
                </div>}
        </PageContent>
    </div>;
};

export default ProfilePage;
