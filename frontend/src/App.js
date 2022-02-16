import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Signup from "./components/Signup";
import Home from "./pages/Home";
import NewsWall from "./pages/NewsWall";
import ProfilUpdate from "./pages/ProfilUpdate";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/s'inscrire" element={<Signup />} />
      <Route path="/connexion" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/actualites" element={<NewsWall />} />
      </Route>

      <Route path="/modifiez-votre-profil" element={<ProfilUpdate />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default App;
