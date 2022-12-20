import React, { useState, useRef } from "react";
import Cart from "../cart/cart";
import AccordionItem from "./accordionItem";
import ContactForm from "../contactForm";
import DeliveryForm from "../deliveryForm";
import PaymentForm from "../paymentForm";
import { useDispatch } from "react-redux";
import { constructNewOrder } from "../../../store/orders";
import { restoreScroll } from "../../../utils/scrollRestore";

const forms = [
    {
        title: "Корзина",
        component: <Cart />,
        disabled: false
    },
    {
        title: "Контактная информация",
        component: <ContactForm />,
        disabled: true
    },
    {
        title: "Доставка",
        component: <DeliveryForm />,
        disabled: true
    },
    {
        title: "Оплата",
        component: <PaymentForm />,
        disabled: true
    }
];

const Accordion = () => {
    const [currentPanel, setCurrentPanel] = useState(0);
    const ref = useRef(null);
    const dispatch = useDispatch();

    const onToggle = (index) => {
        if (index === currentPanel) {
            return setCurrentPanel(null);
        }
        setCurrentPanel(index);
    };

    const onProceed = (index, data) => {
        setCurrentPanel(prevState => prevState + 1);
        forms[index + 1].disabled = false;
        dispatch(constructNewOrder(data));
        restoreScroll();
    };

    return <div>
        <div className="flex w-1/2 mx-auto justify-around relative text-gray-300 mb-6" ref={ref}>
            {forms.map((form, index) => <React.Fragment key={index}>
                <button
                    className={index <= currentPanel ? "text-black" : ""}
                    onClick={() => setCurrentPanel(index)}
                    disabled={form.disabled}>
                    <div className="flex flex-col items-center w-6">
                        {index + 1}
                        <p className="text-xs whitespace-nowrap">{form.title}</p>
                    </div>
                </button>
                {index !== forms.length - 1 && <div
                    className={"relative top-3 h-[2px] w-full" + (index <= currentPanel - 1 ? " bg-black" : " bg-gray-300")} />}
            </React.Fragment>)}
        </div>
        {forms.map((form, index) => <AccordionItem
            key={index}
            title={form.title}
            isActive={index === currentPanel}
            isAvailable={!form.disabled}
            component={React.cloneElement(form.component, { onProceed: (data) => onProceed(index, data) })}
            onToggle={() => onToggle(index)} />)}
    </div>;
};

export default Accordion;
