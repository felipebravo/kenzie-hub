import { ButtonSmall } from "../../styles/button";
import { StyledHeadline, StyledHeadlineBold } from "../../styles/typography";
import { DivTech, StyledTech, StyledTechs } from "./style";
import { IoTrashBinSharp } from "react-icons/io5";
import { useContext, useRef } from "react";
import { TechContext } from "../../contexts/TechContext";

const Techs = ({ techs }) => {
  const { setRemoveModal, setUpdateModal, setTechToUpdate } =
    useContext(TechContext);
  const ref = useRef();

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
        <StyledTech
          key={tech.id}
          onClick={(evt) => {
            ref.current === evt.target ||
            ref.current.childNodes[0] === evt.target
              ? modalRemove(tech.id)
              : modalUpdate(tech.id, tech.title, tech.status);
          }}
        >
          <StyledHeadlineBold>{tech.title}</StyledHeadlineBold>
          <DivTech>
            <StyledHeadline>{tech.status}</StyledHeadline>
            <ButtonSmall ref={ref} onClick={() => modalRemove(tech.id)}>
              <IoTrashBinSharp />
            </ButtonSmall>
          </DivTech>
        </StyledTech>
      ))}
    </StyledTechs>
  );
};

export default Techs;
