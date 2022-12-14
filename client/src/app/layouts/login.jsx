import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import PageContent from "../components/ui/pageContent";
import PageHeader from "../components/ui/pageHeader";
import RegisterForm from "../components/ui/registerForm";
import { restoreScroll } from "../utils/scrollRestore";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(type === "register" ? type : "login");

    const toggleFormType = () => {
        setFormType(prevState => prevState === "register" ? "login" : "register");
    };

    useEffect(() => {
        restoreScroll();
    }, []);

    return <div>
        <PageHeader title="Вход" />
        <PageContent>
            <div className="w-full md:w-1/2 mx-auto">
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
                        <p className="m-2">
                            Ещё нет аккаунта? <a
                                className="uppercase hover:underline"
                                role="button"
                                onClick={toggleFormType}>
                                Зарегистрироваться
                            </a>
                        </p>
                    </>
                }
            </div>
        </PageContent>
    </div>;
};

export default Login;
