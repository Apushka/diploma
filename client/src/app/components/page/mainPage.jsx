import React from "react";
import { useSelector } from "react-redux";
import { getCategoriesList } from "../../store/categories";
import { getTagsList } from "../../store/tags";
import { randomItemsPicker } from "../../utils/randomItemsPicker";
import Carousel from "../ui/carousel/carousel";
import PageContent from "../ui/pageContent";
import PageHeader from "../ui/pageHeader";

const MainPage = () => {
    const tags = useSelector(getTagsList);
    const categories = useSelector(getCategoriesList);

    const randomCategories = randomItemsPicker(categories, 3);

    return (
        <div>
            <PageHeader title="Главная" />
            <PageContent>
                <Carousel filter="tags" options={tags} />
                <Carousel filter="category" options={randomCategories} />
            </PageContent>
        </div>
    );
};

export default MainPage;
