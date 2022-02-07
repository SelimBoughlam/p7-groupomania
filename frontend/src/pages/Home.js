import React from "react";
import Header from "../components/Header";

const Home = () => {
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
