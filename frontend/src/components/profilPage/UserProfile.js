import axios from "axios";
import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const userInfos = JSON.parse(localStorage.getItem("user"));
    const userId = userInfos.userId;
    const headers = {
      Authorization: "bearer " + userInfos.token,
    };

    axios
      .get(`http://localhost:5000/api/users/${userId}`, {
        headers: headers,
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return (
    <div className="user-profile">
      <div className="profil-container"></div>
      <p>nom:{data.firstName}</p>
      <p>prenom:{data.lastName}</p>
      <img src={data.profileImage} alt="" />
    </div>
  );
};

export default UserProfile;
