import React from "react";
import mailIcon from "../../assets/gmail.png";

const Footer = () => {
    return (
        <footer className="bg-black flex justify-between items-center text-white px-6 py-3">
            <p>&#169; Alex Pushkin</p>
            <a
                style={{
                    background: `url(${mailIcon}) no-repeat center/contain`
                }}
                className="block w-6 h-6"
                href="mailto:apushkaa@gmail.com" ></a>
        </footer>
    );
};

export default Footer;
