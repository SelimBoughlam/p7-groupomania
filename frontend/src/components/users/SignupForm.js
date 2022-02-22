import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const emailRegex =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,255}$/;

const SignupForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    if (isValid) {
      axios({
        method: "post",
        url: "http://localhost:5000/api/auth/signup",
        withCredentials: false,
        data: data,
      })
        .then((res) => {
          if (res.status === 201) {
            navigate("/connexion");
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            setError("email", {
              type: "server",
              message: error.response.data.message,
            });
          }
        });
    }
  };

  return (
    <div className="form-container ">
      <form onSubmit={handleSubmit(onSubmit)} id="signup-form">
        <div className="header">
          <h3>Bienvenue chez Groupomania </h3>
          <p>Créez votre compte dès maintenant!</p>
        </div>
        <div className="separator"></div>
        <div className="inputs">
          <input
            aria-label="Nom"
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Nom"
            {...register("lastName", {
              required: true,
              pattern: /^(\s+\S+\s*)*(?!\s).*$/,
            })}
          />
          {errors.lastName && errors.lastName.type === "required" && (
            <span>Veuillez entrer votre nom</span>
          )}
          {errors.lastName && errors.lastName.type === "pattern" && (
            <span>Veuillez entrer votre nom</span>
          )}

          <input
            aria-label="Prénom"
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Prénom"
            {...register("firstName", {
              required: true,
              pattern: /^(\s+\S+\s*)*(?!\s).*$/,
            })}
          />
          {errors.firstName && errors.firstName.type === "required" && (
            <span>Veuillez entrer votre prénom</span>
          )}
          {errors.firstName && errors.firstName.type === "pattern" && (
            <span>Veuillez entrer votre prénom</span>
          )}

          <input
            aria-label="email"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            {...register("email", { required: true, pattern: emailRegex })}
          />
          {errors.email && errors.email.type === "required" && (
            <span>Veuillez entrer votre email</span>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <span>Format non valide</span>
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
            {...register("password", {
              required: true,
              pattern: passwordRegex,
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <span>Veuillez entrer votre mot de passe</span>
          )}
          {errors.password && errors.password.type === "pattern" && (
            <span>
              Votre mot de passe doit contenir:8 caractères minimum,un
              chiffre,une majuscule et une minuscule
            </span>
          )}
          <NavLink to="/connexion">
            <p>déja un compte? connectez-vous</p>
          </NavLink>
          <input type="submit" value="créer un compte" />
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
