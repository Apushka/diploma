import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import arrowIcon from "../../../assets/arrow.png";
import ProductCard from "../productCard";

const Slider = ({ collection }) => {
    const ref = useRef();
    const [isPrev, setIsPrev] = useState(false);
    const [isNext, setIsNext] = useState(false);

    useEffect(() => {
        if (collection.length > 0) {
            const { parentWidth, elementWidth } = getElemParams(
                ref.current
            );
            setIsNext(() => elementWidth > parentWidth);
        }
    }, [collection]);

    const getElemParams = (element) => {
        return {
            element,
            offsetLeft: element.offsetLeft,
            parentWidth: element.offsetParent.offsetWidth,
            elementWidth: element.offsetWidth,
            elementChildMarginRight: Number(
                getComputedStyle(element.children[0]).marginRight.replaceAll(/\D/g, "")
            ),
            elementChildWidth: Number(
                getComputedStyle(element.children[0]).width.replaceAll(/\D/g, "")
            )
        };
    };

    const handleNext = () => {
        const {
            element,
            offsetLeft,
            parentWidth,
            elementWidth,
            elementChildWidth,
            elementChildMarginRight
        } = getElemParams(ref.current);

        if (elementWidth + offsetLeft > parentWidth) {
            element.style.left = offsetLeft - (elementChildWidth + elementChildMarginRight) + "px";
            setIsPrev(true);
        }

        setIsNext(
            elementWidth + offsetLeft - elementChildWidth >
            parentWidth
        );
    };

    const handlePrev = (e) => {
        const { element, offsetLeft, elementChildMarginRight, elementChildWidth } = getElemParams(
            ref.current
        );

        if (offsetLeft !== 0) {
            element.style.left = offsetLeft + elementChildWidth + elementChildMarginRight + "px";
            setIsPrev(offsetLeft + elementChildWidth + elementChildMarginRight !== 0);
            setIsNext(true);
        }
    };
    return <div className="h-full w-full relative">
        <div className="flex overflow-hidden">
            <div
                className="flex relative left-0 transition-all duration-500 ease-in-out"
                ref={ref}>
                {collection.map(productId => <div
                    className="flex"
                    key={productId}>
                    <ProductCard productId={productId} />
                </div>)}
            </div>
        </div>
        {isPrev && <div
            className="absolute flex items-center h-full top-0 -left-5 cursor-pointer"
            onClick={handlePrev}>
            <div
                style={{
                    background: `url(${arrowIcon}) no-repeat center/contain`
                }}
                className="w-4 h-4 rotate-90"
            />
        </div>}
        {isNext && <div
            className="absolute flex items-center h-full top-0 -right-5 cursor-pointer"
            onClick={handleNext}>
            <div
                style={{
                    background: `url(${arrowIcon}) no-repeat center/contain`
                }}
                className="w-4 h-4 -rotate-90"
            />
        </div>}
    </div>;
};

Slider.propTypes = {
    collection: PropTypes.array
};

export default Slider;
