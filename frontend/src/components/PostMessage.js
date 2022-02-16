import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const PostMessage = ({ message }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
  });
  const userInfos = JSON.parse(localStorage.getItem("user"));

  const onSubmit = (content) => {
    const data = { userId: userInfos.userId, content: content.content };
    const headers = {
      Authorization: "bearer " + userInfos.token,
    };

    if (isValid) {
      axios
        .post("http://localhost:5000/api/messages/new", data, {
          headers: headers,
        })

        .then((res) => window.location.reload())
        .catch((error) => console.log(error.response));
    }
  };
  // TODO fonction qui récupère le token dans le LS

  // TODO fonction qui récupère user id de la personne connecté

  return (
    <div className="post-message">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="content"
          type="text"
          placeholder="Entrez votre message"
          {...register("content", { required: true })}
        />
        {errors.content && errors.content.type === "required" && (
          <span>Votre message ne peut être vide</span>
        )}
        <input type="submit" value="envoyer" />
      </form>
    </div>
  );
};

export default PostMessage;
