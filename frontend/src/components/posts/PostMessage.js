import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const PostMessage = () => {
  const [image, setImage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  const userInfos = JSON.parse(localStorage.getItem("user"));

  const onSubmit = (content) => {
    const data = new FormData();
    data.append("userId", userInfos.userId);
    data.append("content", content.content);
    data.append("image", image);

    const headers = {
      Authorization: "bearer " + userInfos.token,
    };

    axios
      .post("http://localhost:5000/api/messages/new", data, {
        headers: headers,
      })

      .then((res) => {
        window.location.reload();
        setImage("");
      })
      .catch((error) => console.log(error.response));
  };

  return (
    <div className="post-message">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="content"
          type="text"
          placeholder="Entrez votre message"
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
        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input type="submit" value="envoyer" />
      </form>
    </div>
  );
};

export default PostMessage;
