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

        <div className="name-container">
          <h4>{message.User.firstName + " " + message.User.lastName}</h4>
        </div>

        <div className="date">
          <span>{message.createdAt}</span>
        </div>
      </div>

      <div className="message-container">
        <p>{message.content}</p>
        <img src={message.image} alt="" />
      </div>
      <DeleteMessage message={message} />
      <UpdateMessage message={message} />
    </div>
  );
};

export default Post;
