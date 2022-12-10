import React from "react";
import AppButton from "../common/buttonBlack";
import { useHistory } from "react-router-dom";

const OrderSuccessPage = () => {
    const history = useHistory();

    const handleContinue = () => {
        history.replace("/catalog");
    };

    return <div>
        <p>Заказ успешно сформирован</p>
        <AppButton
            title="Продолжить покупки"
            onClick={handleContinue}
        />
    </div>;
};

export default OrderSuccessPage;
