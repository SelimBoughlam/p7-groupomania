import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const emailRegex =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,255}$/;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    if (isSubmitSuccessful) {
      axios({
        method: "post",
        url: "http://localhost:5000/api/auth/signup",
        withCredentials: false,
        data: data,
      })
        .then((res) => {
          if (res.status === 201) {
            window.location = "/";
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
        <h1>Créer un compte</h1>
        <input
          aria-label="Nom"
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Nom"
          {...register("lastName", { required: true })}
        />
        {errors.lastName && errors.lastName.type === "required" && (
          <span>Veuillez entrer votre nom</span>
        )}

        <input
          aria-label="Prénom"
          type="text"
          name="firstname"
          id="firstname"
          placeholder="Prénom"
          {...register("firstName", { required: true })}
        />
        {errors.firstName && errors.firstName.type === "required" && (
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
          <span>le format de votre email n'est pas valide</span>
        )}
        {errors.email && errors.email.type === "server" && (
          <span>{errors.email.message}</span>
        )}

        <span className="error"></span>

        <input
          aria-label="mot de passe"
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
          {...register("password", { required: true, pattern: passwordRegex })}
        />
        {errors.password && errors.password.type === "required" && (
          <span>Veuillez entrer votre mot de passe</span>
        )}
        {errors.password && errors.password.type === "pattern" && (
          <span>
            Votre mot de passe doit contenir:8 caractères minimum,un chiffre,une
            majuscule et une minuscule
          </span>
        )}

        <input type="submit" value="créer un compte" />
      </form>
    </div>
  );
};

export default SignupForm;

// axios({
//     method: "post",
//     url: "http://localhost:5000/api/auth/signup",
//     withCredentials: false,
//     data: {
//       firstName,
//       lastName,
//       email,
//       password,
//     },
//   })
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((error) => console.log(error));
