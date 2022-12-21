import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getUserData } from "../../../store/user";
import { Link } from "react-router-dom";

const NavProfile = () => {
    const { name } = useSelector(getUserData);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };
    return <div
        className="relative"
        onClick={toggleMenu}>
        <button
            className="flex items-center">
            <p
                className="flex items-center justify-center w-4 h-4 rounded-full border border-white text-xs">
                {`${name[0]}`.toUpperCase()}
            </p>
            <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7">
                </path>
            </svg>
        </button>

        <div className={"fixed w-screen h-screen bg-transparent top-0 left-0 " + (isOpen ? "block" : "hidden")}>
            <div
                className="absolute right-3 top-10 z-10 bg-white rounded shadow dark:bg-gray-700">
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                    <li>
                        <Link
                            to="/profile"
                            className="block py-2 px-6 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Профиль
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/logout"
                            className="block py-2 px-6 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Выйти
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>;
};

export default NavProfile;
