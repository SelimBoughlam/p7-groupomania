import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <NavLink to="/">
        <img src="./img/logo.png" alt="" />
      </NavLink>

      <nav>
        <ul>
          <NavLink
            to="/s'inscrire"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Inscription</li>
          </NavLink>
          <NavLink
            to="/connexion"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Se connecter</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
