import React, { useState } from "react";
import ProfileForm from "../ui/profileForm";
import ProfileInfo from "../ui/profileInfo";

const ProfilePage = () => {
    const [isEdit, setIsEdit] = useState(false);

    return <div>
        {isEdit
            ? <ProfileForm onFinish={() => setIsEdit(false)} />
            : <ProfileInfo onEdit={() => setIsEdit(true)} />}
    </div>;
};

export default ProfilePage;
