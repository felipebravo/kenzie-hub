import Logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";
import { ButtonMedium } from "../../styles/button";
import { DivDashboard, DivMenu, MainDashboard, Nav } from "./style";
import { StyledHeadline, StyledTitle } from "../../styles/typography";
import Header from "../../components/Header/index";
import { useEffect, useState } from "react";
import api from "../../services/api";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    window.localStorage.removeItem("@authToken");
    window.localStorage.removeItem("@userId");
  };

  const handleUser = async (id) => {
    try {
      const res = await api.get(`/users/${id}`);
      setUser(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userId = window.localStorage.getItem("@userId");

    handleUser(userId);
  }, []);

  return (
    <DivDashboard>
      <DivMenu>
        <Header variant="dashboard">
          <div>
            <img src={Logo} alt="KenzieHub" />
            <Link to={"/"}>
              <ButtonMedium type="button" onClick={() => handleLogout()}>
                Sair
              </ButtonMedium>
            </Link>
          </div>
        </Header>
        {loading ? (
          <StyledTitle>Carregando...</StyledTitle>
        ) : (
          <Nav>
            <div>
              <StyledTitle>Olá, {user.name}</StyledTitle>
              <StyledHeadline>{user.course_module}</StyledHeadline>
            </div>
          </Nav>
        )}
      </DivMenu>
      <MainDashboard>
        <StyledTitle>Que pena! Estamos em desenvolvimento :(</StyledTitle>
        <StyledHeadline>
          Nossa aplicação está em desenvolvimento, em breve teremos novidades
        </StyledHeadline>
      </MainDashboard>
    </DivDashboard>
  );
};

export default Dashboard;
