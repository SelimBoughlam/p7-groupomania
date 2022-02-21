import axios from "axios";
import React from "react";

const UserProfile = () => {
  const userInfos = JSON.parse(localStorage.getItem("user"));
  const userId = userInfos.userId;
  const headers = {
    Authorization: "bearer " + userInfos.token,
  };

  axios
    .get(`http://localhost:5000/api/users/${userId}`, {
      headers: headers,
    })
    .then((res) => console.log(res));

  return (
    <div className="user-profile">
      <div className="profil-container"></div>
      <p>nom:</p>
      <p>prenom:</p>
    </div>
  );
};

export default UserProfile;
