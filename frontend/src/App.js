import { Route, Routes } from "react-router-dom";
import Login from "./components/users/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import NewsWall from "./pages/NewsWall";
import Profile from "./pages/Profile";
import Modal from "react-modal";
import SignupForm from "./components/users/SignupForm";

Modal.setAppElement("#root");

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/s'inscrire" element={<SignupForm />} />
      <Route path="/connexion" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/actualites" element={<NewsWall />} />
        <Route path="/mon-profil" element={<Profile />} />
      </Route>

      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default App;
