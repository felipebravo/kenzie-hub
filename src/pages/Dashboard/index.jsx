import Logo from "../../assets/Logo.svg";
import { Navigate, useNavigate } from "react-router-dom";
import { ButtonSmall } from "../../styles/button";
import {
  DivAddTechs,
  DivDashboard,
  DivMenu,
  MainDashboard,
  Nav,
} from "./style";
import { StyledHeadline, StyledTitle } from "../../styles/typography";
import Header from "../../components/Header/index";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { StyledLoading } from "../../components/Loading/style";
import { TechContext } from "../../contexts/TechContext";
import { MdAddToQueue, MdOutlineLogout } from "react-icons/md";
import Techs from "../../components/Techs";
import AddTechModal from "../../components/Modal's/AddTechModal";
import RemoveTechModal from "../../components/Modal's/RemoveTechModal";
import UpdateTechModal from "../../components/Modal's/UpdateTechModal";

const Dashboard = () => {
  const { user, loading } = useContext(UserContext);
  const { addModal, setAddModal, updateModal, removeModal, setRemoveModal } =
    useContext(TechContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("@authToken");

    navigate("/");
  };

  if (loading) {
    return <StyledLoading />;
  }

  return (
    <>
      {user ? (
        <DivDashboard>
          <DivMenu>
            <Header variant="dashboard">
              <div>
                <img src={Logo} alt="KenzieHub" />
                <ButtonSmall type="button" onClick={() => handleLogout()}>
                  <MdOutlineLogout />
                </ButtonSmall>
              </div>
            </Header>
            <Nav>
              <div>
                <StyledTitle>Olá, {user.name}</StyledTitle>
                <StyledHeadline>{user.course_module}</StyledHeadline>
              </div>
            </Nav>
          </DivMenu>
          <MainDashboard>
            <DivAddTechs>
              <StyledTitle>Tecnologias</StyledTitle>
              <ButtonSmall onClick={() => setAddModal(true)}>
                <MdAddToQueue />
              </ButtonSmall>
            </DivAddTechs>
            {addModal && <AddTechModal setAddModal={setAddModal} />}
            {updateModal && <UpdateTechModal></UpdateTechModal>}
            {removeModal && <RemoveTechModal setRemoveModal={setRemoveModal} />}
            {user.techs.length === 0 ? (
              <>
                <StyledTitle>
                  Você ainda não possui nenhuma tecnologia :(
                </StyledTitle>
                <StyledHeadline>
                  Adicione e atualize de acordo com seu nível de conhecimento
                </StyledHeadline>
              </>
            ) : (
              <Techs techs={user.techs} />
            )}
          </MainDashboard>
        </DivDashboard>
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
};

export default Dashboard;
