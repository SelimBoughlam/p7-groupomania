import React, { useState } from "react";
import DeleteMessage from "./DeleteMessage";
import UpdateMessage from "./UpdateMessage";
import randomUser from "./random-user.png";
import Comment from "../comments/Comment";

const Post = ({ message }) => {
  const [showComments, setShowComments] = useState(false);
  return (
    <div className="message-modal">
      <div className="profil-container">
        <div className="image-container">
          <img
            src={
              message.User.profileImage ? message.User.profileImage : randomUser
            }
            alt=""
          />
        </div>
        <div className="name-date">
          <div className="name-container">
            <h4>{message.User.firstName + " " + message.User.lastName}</h4>
          </div>

          <div className="date">
            <span>{message.createdAt}</span>
          </div>
        </div>
      </div>

      <div className="message-container">
        <p>{message.content}</p>
        {message.image && <img src={message.image} alt="" />}
      </div>
      <div className="edit-delete">
        <div className="edit">
          <UpdateMessage message={message} />
        </div>
        <div className="delete">
          <DeleteMessage message={message} />
        </div>
      </div>

      <div className="comment-toggle">
        {message.Comments[0] && (
          <button
            onClick={() => {
              setShowComments(!showComments);
            }}
          >
            {showComments
              ? "Masquer les commentaires"
              : "Voir les commentaires"}
          </button>
        )}
      </div>
      {showComments ? (
        <div className="comment-container">
          <Comment message={message} />
        </div>
      ) : null}
    </div>
  );
};

export default Post;
