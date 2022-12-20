import React, { useEffect } from "react";
import AppButton from "../common/appButton";
import { useHistory } from "react-router-dom";
import PageContent from "../ui/pageContent";
import { useSelector } from "react-redux";
import { getOrdersList, getOrdersLoadingStatus } from "../../store/orders";
import Loader from "../common/loader";
import { restoreScroll } from "../../utils/scrollRestore";

const OrderSuccessPage = () => {
    const orders = useSelector(getOrdersList);
    const isOrdersLoading = useSelector(getOrdersLoadingStatus);
    const history = useHistory();

    useEffect(() => {
        restoreScroll();
    }, []);

    const handleContinue = () => {
        history.replace("/catalog");
    };

    return <div>
        <PageContent>
            {isOrdersLoading
                ? <Loader />
                : <div className="">
                    <p className="flex h-[70vh] items-center justify-center uppercase text-xl text-center">
                        Заказ {orders[0]._id} успешно сформирован
                    </p>
                    <AppButton
                        title="Продолжить покупки"
                        onClick={handleContinue}
                    />
                </div>}
        </PageContent>
    </div>;
};

export default OrderSuccessPage;
