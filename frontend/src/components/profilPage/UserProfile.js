import axios from "axios";
import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [data, setData] = useState([]);
  console.log(data);

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
      <div className="profil-container">
        <img src={data.profileImage} alt="" />
        <h1>{data.firstName + " " + data.lastName}</h1>
        <p>{data.email}</p>
        <span>inscrit depuis {data.createdAt}</span>
      </div>
    </div>
  );
};

export default UserProfile;
