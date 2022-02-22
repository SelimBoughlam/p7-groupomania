import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import Forum from "../components/posts/Forum";
import PostMessage from "../components/posts/PostMessage";

const NewsWall = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const header = JSON.parse(localStorage.getItem("user"));
    axios
      .get("http://localhost:5000/api/messages/all", {
        headers: { Authorization: "bearer " + header.token },
      })
      .then((res) => setApiData(res.data));
  }, []);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/connexion");
  };

  return (
    <div className="forum">
      <div className="header-forum">
        <div className="logo">
          <h1>Groupomania</h1>
        </div>
        <div className="nav">
          <button onClick={() => navigate("/mon-profil")}>
            <ImProfile />
            Mon compte
          </button>
          <button onClick={logout}>
            <FaSignOutAlt /> Se déconnecter
          </button>
        </div>
      </div>

      <div className="allposts">
        <PostMessage message={apiData} />
        {apiData.map((message) => (
          <Forum key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
};

export default NewsWall;
