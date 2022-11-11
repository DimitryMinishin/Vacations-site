import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/homepage";
import Vacations from "../components/vacations/Vacations";
import LoginPage from "../components/login/Login";
import LogoutPage from "../components/logout/logout";

function PathRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vacations" element={<Vacations />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </div>
  );
}

export default PathRouter;
