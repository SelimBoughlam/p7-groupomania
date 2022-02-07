import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./pages/Home";
import NewsWall from "./pages/NewsWall";
import ProfilUpdate from "./pages/ProfilUpdate";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/s'inscrire" element={<Signup />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/actualites" element={<NewsWall />} />
        <Route path="/modifiez-votre-profil" element={<ProfilUpdate />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
