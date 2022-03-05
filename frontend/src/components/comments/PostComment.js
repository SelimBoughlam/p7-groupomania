import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const PostComment = ({ message }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const messageId = message.id;
  const userInfos = JSON.parse(localStorage.getItem("user"));
  const headers = {
    Authorization: "bearer " + userInfos.token,
  };

  const onSubmit = (data) => {
    console.log(data);
    if (isValid) {
      axios
        .post(`http://localhost:5000/api/messages/${messageId}/comment`, data, {
          headers: headers,
        })

        .then((res) => {
          window.location.reload();
        });
    }
  };

  return (
    <div className="post-comment">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="content"
          type="text"
          aria-label="écrivez un commentaire..."
          placeholder="écrivez un commentaire..."
          {...register("content", {
            required: true,
            pattern: /^(\s+\S+\s*)*(?!\s).*$/,
          })}
        />
        <input type="submit" value="publier" />
        <div className="errors">
          {errors.content && errors.content.type === "required" && (
            <span>Votre message ne peut être vide</span>
          )}
          {errors.content && errors.content.type === "pattern" && (
            <span>Votre message ne peut être vide</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostComment;
