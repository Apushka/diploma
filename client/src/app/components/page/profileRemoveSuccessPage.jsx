import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { restoreScroll } from "../../utils/scrollRestore";
import PageContent from "../ui/pageContent";

const ProfileRemoveSuccessPage = () => {
    const [full, setFull] = useState(false);
    const history = useHistory();
    const redirectTime = 2000;

    useEffect(() => {
        restoreScroll();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setFull(true);
        }, 4);

        setTimeout(() => {
            history.push("/logout");
        }, redirectTime);
    }, []);

    return <PageContent>
        <p className="flex h-[70vh] items-center justify-center uppercase text-xl text-center">
            Профиль удалён
        </p>
        <div
            className={`h-1 bg-black transition-all duration-[${redirectTime}ms] ease-linear ` + (full ? "w-full" : "w-0")}
        />
    </PageContent>;
};

export default ProfileRemoveSuccessPage;
