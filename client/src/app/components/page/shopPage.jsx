import React, { useState } from "react";
import { useSelector } from "react-redux";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { getShopsList } from "../../store/shops";
import BreadCrumbs from "../common/breadcrumbs";
import PageContent from "../ui/pageContent";
import PageHeader from "../ui/pageHeader";

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
        <PageHeader title="Наши магазины" />
        <PageContent>
            <BreadCrumbs />
            <div className="flex flex-col md:flex-row items-center text-center">
                <YMaps className="">
                    <Map
                        className="w-full h-[50vh] md:w-1/2 mb-6 outline outline-gray-300"
                        state={state}
                        modules={["control.ZoomControl", "control.FullscreenControl"]}>
                        <Placemark geometry={[currentShop.lat, currentShop.long]} />
                    </Map>
                </YMaps>
                <div className="w-1/2">
                    {shops.map(shop => <div
                        className={"cursor-pointer mb-6 text-black opacity-50 " + (currentShop === shop ? "opacity-100 font-semibold" : "")}
                        key={shop._id}
                        onClick={() => handleClick(shop)}>
                        <p>{shop.country.name}, {shop.city.name}</p>
                        <p>{shop.address}</p>
                    </div>)}
                </div>
            </div>
        </PageContent>
    </div>;
};

export default ShopPage;
