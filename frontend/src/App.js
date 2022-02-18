import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Signup from "./components/Signup";
import Home from "./pages/Home";
import NewsWall from "./pages/NewsWall";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/s'inscrire" element={<Signup />} />
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
