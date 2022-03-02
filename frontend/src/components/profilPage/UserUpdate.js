import axios from "axios";
import React, { useState } from "react";

const UserUpdate = () => {
  const [image, setImage] = useState();

  const userInfos = JSON.parse(localStorage.getItem("user"));
  const headers = {
    Authorization: "bearer " + userInfos.token,
  };
  const userId = userInfos.userId;
  const data = new FormData();
  data.append("image", image);

  const modify = () => {
    axios
      .put(`http://localhost:5000/api/users/${userId}`, data, {
        headers: headers,
      })
      .then(() => window.location.reload());
  };
  return (
    <div className="user-update">
      <div>
        <label htmlFor="file" className="label">
          Choisir une image de profil
        </label>
        <input
          id="file"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <button onClick={modify}>Valider mes changements</button>
    </div>
  );
};

export default UserUpdate;
