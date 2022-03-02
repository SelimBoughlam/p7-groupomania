import React from "react";
import UserDelete from "../components/profilPage/UserDelete";
import UserProfile from "../components/profilPage/UserProfile";
import UserUpdate from "../components/profilPage/UserUpdate";

const Profile = () => {
  return (
    <div className="profile">
      <UserProfile />
      <UserUpdate />
      <UserDelete />
    </div>
  );
};

export default Profile;
