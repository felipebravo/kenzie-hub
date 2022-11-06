import { useContext, useEffect, useRef } from "react";
import { TechContext } from "../../../contexts/TechContext";
import { ButtonDefault, ButtonDisable } from "../../../styles/button";
import { StyledTitle } from "../../../styles/typography";
import {
  DivButtonsModal,
  StyledContent,
  StyledModal,
  StyledOverlay,
} from "../style";

const RemoveTechModal = () => {
  const { removeTech, setRemoveModal } = useContext(TechContext);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutclick = (evt: MouseEvent) => {
      const target = evt.target as HTMLDivElement;
      !contentRef.current?.contains(target) && handleNoAnswer();
    };

    document.addEventListener("mousedown", handleOutclick);

    return () => {
      document.removeEventListener("mousedown", handleOutclick);
    };
  }, []);

  const techId = localStorage.getItem("@techId");

  const handleNoAnswer = () => {
    setRemoveModal(null);
    localStorage.removeItem("@techId");
  };

  return (
    <StyledModal>
      <StyledOverlay>
        <StyledContent ref={contentRef}>
          <StyledTitle>Realmente deseja excluir esta tecnologia?</StyledTitle>
          <DivButtonsModal>
            <ButtonDefault onClick={() => handleNoAnswer()}>No</ButtonDefault>
            <ButtonDisable onClick={() => removeTech(techId)}>
              Yes
            </ButtonDisable>
          </DivButtonsModal>
        </StyledContent>
      </StyledOverlay>
    </StyledModal>
  );
};

export default RemoveTechModal;
