import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

const AccordionItem = ({ title, onToggle, isActive, component }) => {
    const ref = useRef();
    const [style, setStyle] = useState({
        height: "0px"
    });

    useEffect(() => {
        setTimeout(() => {
            setStyle(isActive
                ? {
                    height: ref.current.scrollHeight + 300 + "px"
                }
                : {
                    height: "0px"
                });
        }, 100);
    }, [isActive]);

    return <div>
        <button
            onClick={onToggle}>
            {title}
            <span>{isActive ? "-" : "+"}</span>
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
    component: PropTypes.node
};

export default AccordionItem;
