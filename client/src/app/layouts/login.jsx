import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(type === "register" ? type : "login");

    const toggleFormType = () => {
        setFormType(prevState => prevState === "register" ? "login" : "register");
    };

    return <div>
        {formType === "register"
            ? <>
                <h3>Зарегистрироваться</h3>
                <RegisterForm />
                <p>Уже есть аккаунт?
                    <a
                        role="button"
                        onClick={toggleFormType}>
                        Войти
                    </a>
                </p>
            </>
            : <>
                <h3>Войти</h3>
                <LoginForm />
                <p>Ещё нет аккаунта?
                    <a
                        role="button"
                        onClick={toggleFormType}>
                        Зарегистрироваться
                    </a>
                </p>
            </>
        }
    </div>;
};

export default Login;
