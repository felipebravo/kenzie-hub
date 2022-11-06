import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import SignIn from "../pages/SignIn";
import Dashboard from "../pages/Dashboard";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default MainRoutes;
