import { ButtonSmall } from "../../styles/button";
import { StyledHeadline, StyledHeadlineBold } from "../../styles/typography";
import { DivTech, StyledTech, StyledTechs } from "./style";
import { IoTrashBinOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import { useContext } from "react";
import { TechContext } from "../../contexts/TechContext";

const Techs = ({ techs }) => {
  const { setRemoveModal, setUpdateModal, setTechToUpdate } =
    useContext(TechContext);

  const modalRemove = (techId) => {
    setRemoveModal(true);
    localStorage.setItem("@techId", techId);
  };

  const modalUpdate = (techId, techTitle, techStatus) => {
    setUpdateModal(true);
    localStorage.setItem("@techId", techId);
    setTechToUpdate({ title: techTitle, status: techStatus });
  };

  return (
    <StyledTechs>
      {techs.map((tech) => (
        <StyledTech key={tech.id}>
          <StyledHeadlineBold>{tech.title}</StyledHeadlineBold>
          <DivTech>
            <StyledHeadline>{tech.status}</StyledHeadline>
            <ButtonSmall onClick={() => modalRemove(tech.id)}>
              <IoTrashBinOutline />
            </ButtonSmall>
            <ButtonSmall
              onClick={() => modalUpdate(tech.id, tech.title, tech.status)}
            >
              <RiEditLine />
            </ButtonSmall>
          </DivTech>
        </StyledTech>
      ))}
    </StyledTechs>
  );
};

export default Techs;
