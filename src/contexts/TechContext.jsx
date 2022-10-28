import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { UserContext } from "./UserContext";

export const TechContext = createContext({});

const TechProvider = ({ children }) => {
  const { setUserTechs } = useContext(UserContext);
  const [techToUpdate, setTechToUpdate] = useState({});
  const [addModal, setAddModal] = useState(null);
  const [updateModal, setUpdateModal] = useState(null);
  const [removeModal, setRemoveModal] = useState(null);
  // const [loading, setLoading] = useState("");

  const errorNotify = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const successNotify = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const addTech = async (dataForm) => {
    try {
      await api.post("users/techs", dataForm);
      successNotify("Tecnologia cadastrada com sucesso!");
      const { data } = await api.get("/profile");
      setUserTechs(data.techs);
      setAddModal(null);
    } catch (error) {
      error.response.data.message ===
      "User Already have this technology created you can only update it"
        ? errorNotify(
            "Tecnologia já existe, só é possível atualizar seu status"
          )
        : errorNotify("Ops! Algo deu errado");
    }
  };

  const updateTech = async (dataForm) => {
    const techId = localStorage.getItem("@techId");
    try {
      await api.put(`users/techs/${techId}`, dataForm);
      successNotify("Tecnologia atualizada!");
      const { data } = await api.get("/profile");
      setUserTechs(data.techs);
      localStorage.removeItem("@techId");
      setUpdateModal(null);
    } catch (error) {
      errorNotify("Ops! Algo deu errado");
    }
  };

  const removeTech = async (techId) => {
    try {
      await api.delete(`/users/techs/${techId}`);
      successNotify("Tecnologia removida com sucesso!");
      const { data } = await api.get("/profile");
      setUserTechs(data.techs);
      localStorage.removeItem("@techId");
      setRemoveModal(null);
    } catch (error) {
      errorNotify("Ops! Algo deu errado");
    }
  };

  return (
    <TechContext.Provider
      value={{
        addTech,
        updateTech,
        removeTech,
        addModal,
        setAddModal,
        updateModal,
        setUpdateModal,
        removeModal,
        setRemoveModal,
        techToUpdate,
        setTechToUpdate,
      }}
    >
      {children}
    </TechContext.Provider>
  );
};

export default TechProvider;
