import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCart } from "../../../store/cart";
import cartIcon from "../../../assets/cart.png";
import Cart from "./cart";

const NavCart = () => {
    const cart = useSelector(getCart());
    const productsQuantity = Object.values(cart).reduce((prev, current) => prev + current, 0);
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        let timer;
        const over = () => {
            clearTimeout(timer);
            setOpen(true);
        };
        const leave = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                setOpen(false);
            }, 500);
        };
        ref.current.addEventListener("mouseover", over);
        ref.current.addEventListener("mouseleave", leave);
    }, []);

    const handleGoToCart = () => {
        setOpen(false);
        history.push("/order");
    };

    return <div
        style={{
            background: `url(${cartIcon}) no-repeat center/contain`
        }}
        className="w-6 h-6"
        ref={ref}>
        <p
            className="relative top-1.5 text-xs cursor-pointer"
            onClick={handleGoToCart}>
            {productsQuantity || ""}
        </p>
        {productsQuantity > 0 && <div
            className={`absolute top-20 p-6 ${open ? "right-2" : "-right-[100%]"} border border-solid border-black bg-white text-black z-10`}>
            <Cart onOrder={handleGoToCart} />
        </div>}
    </div>;
};

export default NavCart;
