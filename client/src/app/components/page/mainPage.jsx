import React from "react";
import { useSelector } from "react-redux";
import { getCategoriesList } from "../../store/categories";
import { getTagsList } from "../../store/tags";
import { randomItemsPicker } from "../../utils/randomItemsPicker";
import Banners from "../common/banners";
import Carousel from "../ui/carousel";

const MainPage = () => {
    const tags = useSelector(getTagsList);
    const categories = useSelector(getCategoriesList);

    const randomCategories = randomItemsPicker(categories, 3);

    return (
        <div>
            <Banners />
            <Carousel filter="tags" options={tags} />
            <Carousel filter="category" options={randomCategories} />
        </div>
    );
};

export default MainPage;
