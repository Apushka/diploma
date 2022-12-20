import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import arrowIcon from "../../../assets/arrow.png";

const AccordionItem = ({ title, onToggle, isActive, isAvailable, component }) => {
    const ref = useRef();
    const [style, setStyle] = useState({
        height: "0px"
    });

    useEffect(() => {
        setTimeout(() => {
            setStyle(isActive
                ? {
                    minHeight: ref.current.scrollHeight + "px"
                }
                : {
                    height: "0px"
                });
        }, 100);
    }, [isActive, ref.current?.scrollHeight]);

    return <div className={"mb-6 border-b-2 border-black " + (!isAvailable ? "opacity-30" : "")}>
        <button
            className={"text-lg uppercase tracking-widest mb-3 " + (!isAvailable ? "cursor-default" : "")}
            onClick={isAvailable ? onToggle : null}>
            {title}
            <span
                style={{
                    background: `url(${arrowIcon}) no-repeat center/contain`
                }}
                className={"inline-block w-3 h-3 mx-2 " + (isActive ? "rotate-180" : "")}
            />
        </button>
        <div
            ref={ref}
            style={style}
            className="transition-all ease duration-500 overflow-hidden">
            {component}
        </div>
    </div>;
};

AccordionItem.propTypes = {
    title: PropTypes.string,
    onToggle: PropTypes.func,
    isActive: PropTypes.bool,
    component: PropTypes.node,
    isAvailable: PropTypes.bool
};

export default AccordionItem;
