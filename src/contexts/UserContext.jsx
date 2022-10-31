import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const errorNotify = (error) =>
    toast.error(error, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const successNotify = () =>
    toast.success("Usuário cadastrado com sucesso!", {
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
        } catch (error) {
          localStorage.removeItem("@authToken");
          console.log(error);
        }
      }
      setLoading(false);
    };
    handleUser();
  }, [user]);

  const registerUser = async (data) => {
    try {
      const res = await api.post("users", data);
      console.log(res);
      res.data.id && successNotify();
      navigate("/");
    } catch (error) {
      error.response.data.message === "Email already exists"
        ? errorNotify("E-mail já está cadastrado!")
        : errorNotify("Erro ao cadastrar usuário, verifique os dados!");
    }
  };

  const handleLogin = async (data) => {
    try {
      const res = await api.post("sessions", data);
      const { user: userRes, token } = res.data;
      setUser(userRes);
      localStorage.setItem("@authToken", token);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      errorNotify("E-mail e(ou) senha de login inválido(s)");
    }
  };

  return (
    <UserContext.Provider value={{ registerUser, handleLogin, user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
