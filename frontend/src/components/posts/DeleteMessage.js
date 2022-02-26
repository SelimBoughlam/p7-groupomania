import axios from "axios";
import React from "react";
import { BsTrash } from "react-icons/bs";
import { IconContext } from "react-icons/lib";

const DeleteMessage = ({ message }) => {
  const deleteMessage = () => {
    const messageId = message.id;
    const userInfos = JSON.parse(localStorage.getItem("user"));
    const headers = {
      Authorization: "bearer " + userInfos.token,
    };
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Etes-vous sûr de vouloir supprimer votre publication?")) {
      axios
        .delete(`http://localhost:5000/api/messages/${messageId}`, {
          headers: headers,
        })
        .then((res) => window.location.reload());
    }
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
      <IconContext.Provider
        value={{ size: "1.5em", color: "red", className: "trash" }}
      >
        <div onClick={deleteMessage}>{userChecking() && <BsTrash />}</div>
      </IconContext.Provider>
    </div>
  );
};

export default DeleteMessage;
