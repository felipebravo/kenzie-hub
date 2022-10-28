import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userTechs, setUserTechs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const errorNotify = () =>
    toast.error("E-mail e(ou) senha de login inválido(s)", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  useEffect(() => {
    const handleUser = async () => {
      const token = localStorage.getItem("@authToken");

      if (token) {
        try {
          api.defaults.headers.authorization = `Bearer ${token}`;
          const res = await api.get(`/profile`);
          setUser(res.data);
          setUserTechs(res.data.techs);
        } catch (error) {
          localStorage.removeItem("@authToken");
          console.log(error);
        }
      }
      setLoading(false);
    };
    handleUser();
  }, []);

  const handleLogin = async (data) => {
    try {
      const res = await api.post("sessions", data);
      const { user: userRes, token } = res.data;
      setUser(userRes);
      localStorage.setItem("@authToken", token);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      errorNotify();
    }
  };

  return (
    <UserContext.Provider
      value={{ handleLogin, user, loading, userTechs, setUserTechs }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
