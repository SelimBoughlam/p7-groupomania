import React from "react";
import DeleteMessage from "./DeleteMessage";

const Forum = ({ message }) => {
  const dateFormat = (date) => {
    const oldDate = new Date(date);
    return oldDate.toLocaleDateString();
  };

  return (
    <div className="message-modal">
      <div className="profil-container">
        <div className="image-container">
          <img src="" alt="" />
        </div>

        <div className="name-container">
          <h4>{message.User.firstName + " " + message.User.lastName}</h4>
        </div>

        <div className="date">
          <span>{dateFormat(message.createdAt)}</span>
        </div>
      </div>

      <div className="message-container">
        <p>{message.content}</p>
        <img src={message.image} alt="" />
      </div>
      <DeleteMessage message={message} />
    </div>
  );
};

export default Forum;
