import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserUpdate = () => {
  const [image, setImage] = useState();
  const navigate = useNavigate();

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
      .then(() => navigate("/actualites"));
  };
  return (
    <div>
      <div>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </div>
      <button onClick={modify}>changer image</button>
    </div>
  );
};

export default UserUpdate;
