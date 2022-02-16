import React from "react";

const Forum = ({ message }) => {
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
          <span>{message.createdAt}</span>
        </div>
      </div>

      <div className="message-container">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed odio
          sequi nihil ipsam recusandae quos, fugiat reprehenderit quasi modi
          obcaecati id eligendi quaerat incidunt soluta eum eius odit inventore
          nulla, unde earum illo. Eos, veritatis commodi sequi voluptatibus
          autem animi, sunt iusto, debitis architecto adipisci quaerat eaque nam
          voluptate inventore.
        </p>
      </div>
    </div>
  );
};

export default Forum;
