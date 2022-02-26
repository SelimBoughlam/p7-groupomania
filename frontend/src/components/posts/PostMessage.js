import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const PostMessage = () => {
  const [image, setImage] = useState();
  const [preview, setpreview] = useState();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setpreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setpreview(null);
    }
  }, [image]);

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

      .then(() => {
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

        <div className="buttons">
          <input type="submit" value="Publier" />
          <label htmlFor="file" className="label">
            image
          </label>
          <input
            id="file"
            type="file"
            accept="image/*"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="preview">
          {preview && <img src={preview} alt=""></img>}
        </div>
      </form>
    </div>
  );
};

export default PostMessage;
