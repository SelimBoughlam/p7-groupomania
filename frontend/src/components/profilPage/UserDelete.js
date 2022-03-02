import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserDelete = () => {
  const navigate = useNavigate();
  const userInfos = JSON.parse(localStorage.getItem("user"));
  const headers = {
    Authorization: "bearer " + userInfos.token,
  };
  const userId = userInfos.userId;

  const deleteAccount = () => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm("vous etes sur le point de supprimer votre compte.Etes vous sur?")
    ) {
      axios
        .delete(`http://localhost:5000/api/users/${userId}`, {
          headers: headers,
        })

        .then((res) => {
          localStorage.clear();
          navigate("/");
        });
    } else {
      navigate("/mon-profil");
    }
  };
  return (
    <div>
      <div className="delete-account">
        <button onClick={deleteAccount}>Supprimer votre compte</button>
      </div>
    </div>
  );
};

export default UserDelete;
