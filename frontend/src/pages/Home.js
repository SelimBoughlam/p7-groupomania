import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Signup from "../components/users/Signup";

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
      <Signup />
    </div>
  );
};

export default Home;
