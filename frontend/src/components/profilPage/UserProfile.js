import axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";

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
        {data.profileImage && (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img src={data.profileImage} alt="photo de profil" />
        )}
        <h1>{data.firstName + " " + data.lastName}</h1>
        <p>{data.email}</p>
        <span>
          inscrit depuis{" "}
          {dayjs(data.createdAt).locale("fr").format(`le DD/MM/YY à HH[h]mm`)}
        </span>
      </div>
    </div>
  );
};

export default UserProfile;
