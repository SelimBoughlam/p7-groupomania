import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    if (isValid) {
      await axios({
        method: "post",
        url: "http://localhost:5000/api/auth/login",
        withCredentials: false,
        data: data,
      })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data.token));
          navigate("/actualites");
        })
        .catch((error) => {
          if (error.response.data.message === "cet utilisateur n'existe pas") {
            setError("email", {
              type: "server",
              message: error.response.data.message,
            });
          }
          if (error.response.data.message === "mot de passe incorrect!") {
            setError("password", {
              type: "server",
              message: error.response.data.message,
            });
          }
        });
    }
  };

  return (
    <div className="form-container ">
      <form onSubmit={handleSubmit(onSubmit)} id="login-form">
        <h1>Se connecter</h1>

        <input
          aria-label="email"
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && errors.email.type === "required" && (
          <span>Veuillez entrer votre email</span>
        )}
        {errors.email && errors.email.type === "server" && (
          <span>{errors.email.message}</span>
        )}

        <input
          aria-label="mot de passe"
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
          {...register("password", { required: true })}
        />
        {errors.password && errors.password.type === "required" && (
          <span>Veuillez entrer votre mot de passe</span>
        )}
        {errors.password && errors.password.type === "server" && (
          <span>{errors.password.message}</span>
        )}
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
};

export default LoginForm;
