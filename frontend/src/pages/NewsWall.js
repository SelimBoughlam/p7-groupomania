import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import PostMessage from "../components/posts/PostMessage";
import Post from "../components/posts/Post";

const NewsWall = () => {
  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const header = JSON.parse(localStorage.getItem("user"));
    axios
      .get("http://localhost:5000/api/messages/all", {
        headers: { Authorization: "bearer " + header.token },
      })
      .then((res) => setApiData(res.data));
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/connexion");
  };

  const goToProfile = () => {
    navigate("/mon-profil");
  };

  return (
    <div className="newsWall">
      <div className="newsWall-header">
        <button onClick={logout}>
          <FaSignOutAlt className="icon" />
          <span>Se déconnecter</span>
        </button>

        <button onClick={goToProfile}>
          <ImProfile className="icon" />
          <span>Mon compte</span>
        </button>
      </div>
      <PostMessage />

      <div className="allposts">
        {apiData.map((message) => (
          <Post key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
};

export default NewsWall;
