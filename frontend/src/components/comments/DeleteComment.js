import axios from "axios";
import React from "react";
import { BsTrash } from "react-icons/bs";
import jwt_decode from "jwt-decode";

const DeleteComment = ({ comment }) => {
  const userChecking = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.userId;
    const token = user.token;
    const decoded = jwt_decode(token);

    if (comment.userId === userId || decoded.isAdmin === true) {
      return true;
    } else {
      return false;
    }
  };

  const deleteComment = () => {
    const messageId = comment.messageId;
    const commentId = comment.id;
    const userInfos = JSON.parse(localStorage.getItem("user"));
    const headers = {
      Authorization: "bearer " + userInfos.token,
    };
    axios
      .delete(
        `http://localhost:5000/api/messages/${messageId}/comments/${commentId}`,
        {
          headers: headers,
        }
      )
      .then((res) => window.location.reload());
  };
  return (
    <div className="delete-comment">
      <div onClick={deleteComment}>{userChecking() && <BsTrash />}</div>
    </div>
  );
};

export default DeleteComment;
