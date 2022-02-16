import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import Forum from "../components/Forum";

const NewsWall = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"));
    axios
      .get("http://localhost:5000/api/messages/all", {
        headers: { Authorization: "bearer " + token },
      })
      .then((res) => setApiData(res.data));
  }, []);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="forum">
      <div className="header-forum">
        <div className="logo">
          <h1>Groupomania</h1>
        </div>
        <div className="nav">
          <button>
            <ImProfile />
            Mon compte
          </button>
          <button onClick={logout}>
            <FaSignOutAlt /> Se déconnecter
          </button>
        </div>
      </div>

      <div className="allposts">
        {apiData.map((message) => (
          <Forum key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
};

export default NewsWall;
