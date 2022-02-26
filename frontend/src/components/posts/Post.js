import React from "react";
import DeleteMessage from "./DeleteMessage";
import UpdateMessage from "./UpdateMessage";
import randomUser from "./random-user.png";

const Post = ({ message }) => {
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
    </div>
  );
};

export default Post;
