import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCartProductsAmount } from "../../../store/cart";
import cartIcon from "../../../assets/cart.png";
import Cart from "./cart";
import HeaderNavIcon from "../header/headerNavIcon";

const NavCart = () => {
    const productsQuantity = useSelector(getCartProductsAmount);
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const history = useHistory();
    const isProducts = productsQuantity > 0;

    useEffect(() => {
        if (!isProducts) setOpen(false);
    }, [productsQuantity]);

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
        return () => {
            ref.current.removeEventListener("mouseover", over);
            ref.current.removeEventListener("mouseleave", leave);
        };
    }, []);

    const handleGoToCart = () => {
        setOpen(false);
        history.push("/order");
    };

    return <span
        className={"relative " + (productsQuantity > 0 ? "after:absolute after:w-1.5 after:h-1.5 after:top-0 after:bg-red-500 after:rounded-lg" : "")}
        ref={ref}>
        <HeaderNavIcon
            iconUrl={cartIcon}
            onClick={isProducts ? handleGoToCart : () => { }}
            pointer={isProducts} />
        {isProducts && open && <div
            className={`hidden md:block absolute top-8 p-6 ${open ? "right-0" : "-right-[100%]"} border border-solid border-black bg-white text-black z-10 max-h-[70vh] overflow-scroll`}>
            <Cart onOrder={handleGoToCart} />
        </div>}
    </span>;
};

export default NavCart;
