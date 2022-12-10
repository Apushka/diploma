import React, { useState } from "react";
import { useSelector } from "react-redux";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { getShopsList } from "../../store/shops";

const ShopPage = () => {
    const shops = useSelector(getShopsList);
    const [currentShop, setCurrentShop] = useState(shops[0]);

    const handleClick = (shop) => {
        setCurrentShop(shop);
    };

    const state = {
        center: [currentShop.lat, currentShop.long],
        zoom: 10,
        controls: ["zoomControl", "fullscreenControl"]
    };

    return <div>
        <h3 className="uppercase">Наши магазины</h3>
        <div className="flex items-center">
            <YMaps>
                <Map
                    className="w-[50vw] h-[50vh]"
                    state={state}
                    modules={["control.ZoomControl", "control.FullscreenControl"]}>
                    <Placemark geometry={[currentShop.lat, currentShop.long]} />
                </Map>
            </YMaps>
            <div className="w-1/2">
                {shops.map(shop => <div
                    className={"cursor-pointer " + (currentShop === shop ? "text-red-500" : "")}
                    key={shop._id}
                    onClick={() => handleClick(shop)}>
                    <p>{shop.country.name}, {shop.city.name}</p>
                    <p>{shop.address}</p>
                </div>)}
            </div>
        </div>
    </div>;
};

export default ShopPage;
