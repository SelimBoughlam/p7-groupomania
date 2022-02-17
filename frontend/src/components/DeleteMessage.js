import axios from "axios";
import React from "react";
import { BsTrash } from "react-icons/bs";

const DeleteMessage = ({ message }) => {
  const deleteMessage = () => {
    const messageId = message.id;
    const userInfos = JSON.parse(localStorage.getItem("user"));
    const headers = {
      Authorization: "bearer " + userInfos.token,
    };

    axios
      .delete(`http://localhost:5000/api/messages/${messageId}`, {
        headers: headers,
      })
      .then((res) => window.location.reload());
  };

  const userChecking = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.userId;

    if (message.userId === userId) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="deleteMessage">
      <div onClick={deleteMessage}>{userChecking() && <BsTrash />}</div>
    </div>
  );
};

export default DeleteMessage;
