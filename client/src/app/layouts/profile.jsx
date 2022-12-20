import React from "react";
import { useParams } from "react-router-dom";
import ProfileDeletePage from "../components/page/profileDeletePage";
import ProfilePage from "../components/page/profilePage";
import ProfileRemoveSuccessPage from "../components/page/profileRemoveSuccessPage";

const Profile = () => {
    const { remove, success } = useParams();
    return <div>
        {remove
            ? success
                ? <ProfileRemoveSuccessPage />
                : <ProfileDeletePage />
            : <ProfilePage />}
    </div>;
};

export default Profile;
