import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

import SignupForm from "../components/users/SignupForm";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/actualites");
    }
  });

  return (
    <div className="home-page">
      <Logo />
      <SignupForm />
    </div>
  );
};

export default Home;
