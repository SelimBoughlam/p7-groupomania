import axios from "axios";
import React, { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import Modal from "react-modal";

const UpdateMessage = ({ message }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
    <div className="update-message">
      {userChecking() && (
        <div onClick={() => setModalIsOpen(true)}>
          <BsFillPencilFill />
        </div>
      )}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>modal Title</h2>
        <p>modal body</p>
        <input type="text" />
        <button onClick={() => setModalIsOpen(false)}>Fermer</button>
      </Modal>
    </div>
  );
};

export default UpdateMessage;
