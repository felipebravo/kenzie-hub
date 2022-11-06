import { createContext, Dispatch, ReactNode, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

interface iTechProviderProps {
  children: ReactNode;
}

export interface iAddNewTech {
  title: string;
  status: string;
}

export interface iUpdateTech {
  status: string;
}

export interface iTechList {
  id: string;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface iTechContext {
  addTech(dataForm: iAddNewTech): Promise<void>;
  updateTech(dataForm: iUpdateTech): Promise<void>;
  removeTech(techId: string | null): Promise<void>;
  techToUpdate: iUpdateTech | null;
  setTechToUpdate: Dispatch<React.SetStateAction<iUpdateTech | null>>;
  addModal: boolean | null;
  setAddModal: Dispatch<React.SetStateAction<boolean | null>>;
  updateModal: boolean | null;
  setUpdateModal: Dispatch<React.SetStateAction<boolean | null>>;
  removeModal: boolean | null;
  setRemoveModal: Dispatch<React.SetStateAction<boolean | null>>;
}

export const TechContext = createContext<iTechContext>({} as iTechContext);

const TechProvider = ({ children }: iTechProviderProps) => {
  const [techToUpdate, setTechToUpdate] = useState<iUpdateTech | null>(null);
  const [addModal, setAddModal] = useState<boolean | null>(null);
  const [updateModal, setUpdateModal] = useState<boolean | null>(null);
  const [removeModal, setRemoveModal] = useState<boolean | null>(null);

  const errorNotify = (message: string) =>
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

  const successNotify = (message: string) =>
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

  const addTech = async (dataForm: iAddNewTech) => {
    try {
      await api.post("users/techs", dataForm);
      successNotify("Tecnologia cadastrada com sucesso!");
      setAddModal(null);
    } catch (error: any) {
      error.response.data.message ===
      "User Already have this technology created you can only update it"
        ? errorNotify(
            "Tecnologia já existe, só é possível atualizar seu status"
          )
        : errorNotify("Ops! Algo deu errado");
    }
  };

  const updateTech = async (dataForm: iUpdateTech) => {
    const techId = localStorage.getItem("@techId");
    try {
      await api.put(`users/techs/${techId}`, dataForm);
      successNotify("Tecnologia atualizada!");
      localStorage.removeItem("@techId");
      setUpdateModal(null);
    } catch (error) {
      errorNotify("Ops! Algo deu errado");
    }
  };

  const removeTech = async (techId: string | null) => {
    try {
      await api.delete(`/users/techs/${techId}`);
      successNotify("Tecnologia removida com sucesso!");
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
