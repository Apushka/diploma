import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCollectionByPath, loadCollection } from "../../store/collections";
import ProductCard from "./productCard";
import storageService from "../../services/localStorage.service";

const Carousel = ({ filter, options }) => {
    const [currentOption, setCurrentOption] = useState(storageService.getCarouselTab(filter) || options[0]);
    const collection = useSelector(getCollectionByPath(currentOption.path));
    const dispatch = useDispatch();

    const prevState = useRef(null);

    useEffect(() => {
        if (!collection) {
            dispatch(loadCollection({
                field: filter,
                value: currentOption._id,
                path: currentOption.path
            }));
        }
        storageService.setCarouselTab(filter, currentOption);
    }, [currentOption]);

    useEffect(() => {
        if (collection) {
            prevState.current = collection;
        }
    }, [collection]);

    return <div>
        <nav className="flex gap-12 justify-center mb-8">
            {options.map(option => <button
                key={option._id}
                className={"uppercase tracking-wider font-light " + (option._id === currentOption._id ? "font-normal underline" : "")}
                onClick={() => setCurrentOption(option)}
            >
                {option.name}
            </button>)}
        </nav>
        <div className="flex gap-5">
            {!collection
                ? !prevState.current
                    ? <ProductCard.Skeleton />
                    : prevState.current.map(productId =>
                        <div className="opacity-50" key={productId}>
                            <ProductCard productId={productId} />
                        </div>)
                : collection.map(productId => <ProductCard key={productId} productId={productId} />)}
        </div>
    </div>;
};

Carousel.propTypes = {
    options: PropTypes.array,
    filter: PropTypes.string
};

export default Carousel;
