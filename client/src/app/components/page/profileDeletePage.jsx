import React from "react";
import AccountDeleteForm from "../ui/accountDeleteForm";
import PageContent from "../ui/pageContent";
import PageHeader from "../ui/pageHeader";

const ProfileDeletePage = () => {
    return <div>
        <PageHeader title="Удаление аккаунта" />
        <PageContent>
            <div className="w-full md:w-1/2 mx-auto">
                <p className="text-base text-red-500 mb-5 text-center">ВНИМАНИЕ! После удаления аккаунта все связанные с ним данные будут утрачены</p>
                <p className="mb-3">Для подтверждения удаления введите Вашу почту и пароль</p>
                <AccountDeleteForm />
            </div>
        </PageContent>
    </div>;
};

export default ProfileDeletePage;
