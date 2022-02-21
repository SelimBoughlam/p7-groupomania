import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  if (user) {
    navigate("/actualites");
  }

  return (
    <div className="home-page">
      <Header />
      <div className="presentation">
        <h1>Bienvenue sur votre réseau social d'entreprise!</h1>
        <p>
          Afin de profiter de la version test de votre nouvel outil,Veuillez
          créer un compte et vous identifier.
        </p>
      </div>
    </div>
  );
};

export default Home;
