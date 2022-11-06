import { ButtonSmall } from "../../styles/button";
import { StyledHeadline, StyledHeadlineBold } from "../../styles/typography";
import { DivTech, StyledTech, StyledTechs } from "./style";
import { IoTrashBinOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import { useContext } from "react";
import { iTechList, TechContext } from "../../contexts/TechContext";

const Techs = ({ techs }: any) => {
  const { setRemoveModal, setUpdateModal, setTechToUpdate } =
    useContext(TechContext);

  const modalRemove = (techId: string) => {
    setRemoveModal(true);
    localStorage.setItem("@techId", techId);
  };

  const modalUpdate = (
    techId: string,
    techTitle: string,
    techStatus: string
  ) => {
    setUpdateModal(true);
    localStorage.setItem("@techId", techId);
    setTechToUpdate({ status: techStatus });
  };

  return (
    <StyledTechs>
      {techs.map((tech: iTechList) => (
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
