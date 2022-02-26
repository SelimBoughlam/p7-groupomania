import axios from "axios";
import React, { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { IconContext } from "react-icons/lib";

const UpdateMessage = ({ message }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [image, setImage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const messageId = message.id;
  const userInfos = JSON.parse(localStorage.getItem("user"));
  const headers = {
    Authorization: "bearer " + userInfos.token,
  };

  const onSubmit = (content) => {
    const data = new FormData();
    data.append("content", content.content);
    data.append("image", image);

    axios
      .put(`http://localhost:5000/api/messages/${messageId}`, data, {
        headers: headers,
      })
      .then((res) => {
        setModalIsOpen(false);
        window.location.reload();
      })
      .catch((error) => console.log(error.response));
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
    <div className="update-message">
      <IconContext.Provider value={{ size: "1.5em", className: "editIcon" }}>
        {userChecking() && (
          <div onClick={() => setModalIsOpen(true)}>
            <BsFillPencilFill />
          </div>
        )}
      </IconContext.Provider>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>modal Title</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <img className="update-img" src={message.image} alt="" />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <input
            type="text"
            defaultValue={message.content}
            {...register("content", {
              required: true,
              pattern: /^(\s+\S+\s*)*(?!\s).*$/,
            })}
          />
          {errors.content && errors.content.type === "required" && (
            <span>Votre message ne peut être vide</span>
          )}
          {errors.content && errors.content.type === "pattern" && (
            <span>Votre message ne peut être vide</span>
          )}
          <button type="submit" className="update-btn">
            Modifier mon message
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UpdateMessage;
