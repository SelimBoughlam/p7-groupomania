import React, { useState } from "react";
import axios from "axios";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postSignup = (e) => {
    e.preventDeafault();
    axios({
      method: "post",
      url: "http://localhost:5000/api/auth/signup",
      withCredentials: true,
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    });
  };

  return (
    <div className="form-container">
      <form action="" onSubmit={postSignup} id="signup-form">
        <h1>Créer un compte</h1>
        <input
          type="text"
          name="lastname"
          id="lastname"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          placeholder="Nom"
        />

        <input
          type="text"
          name="firstname"
          id="firstname"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          placeholder="Prénom"
        />

        <input
          type="text"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        />

        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Mot de passe"
        />

        <input type="submit" value="créer un compte" />
      </form>
    </div>
  );
};

export default SignupForm;
