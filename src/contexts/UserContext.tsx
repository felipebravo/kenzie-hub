import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import { iTechList } from "./TechContext";

interface iUserProviderProps {
  children: ReactNode;
}

export interface iNewUserResgister {
  email: string;
  password: string;
  name: string;
  bio: string;
  contact: string;
  course_module: string;
}

interface iNewUserResponse {
  id: string;
  name: string;
  email: string;
  course_module: string;
  bio: string;
  contact: string;
  created_at: string;
  updated_at: string;
  avatar_url: null;
}

export interface iHandleLogin {
  email: string;
  password: string;
}

interface iHandleLoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    course_module: string;
    bio: string;
    contact: string;
    created_at: string;
    updated_at: string;
    techs: [] | null;
    works: [];
    avatar_url: null;
  };
  token: string;
}

export interface iHandleUser {
  id: string;
  name: string;
  email: string;
  course_module: string;
  bio: string;
  contact: string;
  created_at: string;
  updated_at: string;
  techs: iTechList[] | null;
  works: [];
  avatar_url: null;
}

export interface iUserContext {
  registerUser(data: iNewUserResgister): Promise<void>;
  handleLogin(data: iHandleLogin): Promise<void>;
  user: iHandleUser | null;
  loading: boolean;
}

export const UserContext = createContext<iUserContext>({} as iUserContext);

const UserProvider = ({ children }: iUserProviderProps) => {
  const [user, setUser] = useState<iHandleUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const errorNotify = (error: string) =>
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
          const res = await api.get<iHandleUser>(`/profile`);
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

  const registerUser = async (data: iNewUserResgister): Promise<void> => {
    try {
      const res = await api.post<iNewUserResponse>("users", data);
      res.data.id && successNotify();
      navigate("/");
    } catch (error: any) {
      error.response.data.message === "Email already exists"
        ? errorNotify("E-mail já está cadastrado!")
        : errorNotify("Erro ao cadastrar usuário, verifique os dados!");
    }
  };

  const handleLogin = async (data: iHandleLogin): Promise<void> => {
    try {
      const res = await api.post<iHandleLoginResponse>("sessions", data);
      const { user, token } = res.data;
      setUser(user);
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
