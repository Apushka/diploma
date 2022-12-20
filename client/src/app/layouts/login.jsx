import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import PageContent from "../components/ui/pageContent";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(type === "register" ? type : "login");

    const toggleFormType = () => {
        setFormType(prevState => prevState === "register" ? "login" : "register");
    };

    return <PageContent>
        <div className="w-1/2 mx-auto">
            {formType === "register"
                ? <>
                    <h3 className="uppercase text-lg text-center mb-3">Зарегистрироваться</h3>
                    <RegisterForm />
                    <p className="m-2">Уже есть аккаунт?
                        <a
                            className="mx-2 uppercase"
                            role="button"
                            onClick={toggleFormType}>
                            Войти
                        </a>
                    </p>
                </>
                : <>
                    <h3 className="uppercase text-lg text-center mb-3">Войти</h3>
                    <LoginForm />
                    <p className="m-2">Ещё нет аккаунта?
                        <a
                            className="mx-2 uppercase"
                            role="button"
                            onClick={toggleFormType}>
                            Зарегистрироваться
                        </a>
                    </p>
                </>
            }
        </div>
    </PageContent>;
};

export default Login;
