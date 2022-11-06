import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { iUpdateTech, TechContext } from "../../../contexts/TechContext";
import { ButtonDefault, ButtonSmall } from "../../../styles/button";
import { InputDefault, SelectDefault } from "../../../styles/input";
import { StyledHeadline, StyledTitle } from "../../../styles/typography";
import { Form } from "../../Form/style";
import {
  DivHeaderModal,
  StyledContent,
  StyledModal,
  StyledOverlay,
} from "../style";

const schema = yup.object({
  status: yup.string(),
});

const UpdateTechModal = () => {
  const { setUpdateModal, updateTech, techToUpdate } = useContext(TechContext);

  const contentRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iUpdateTech>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const handleOutclick = (evt: MouseEvent) => {
      const target = evt.target as HTMLDivElement;
      !contentRef.current?.contains(target) && handleNoUpdate();
    };

    document.addEventListener("mousedown", handleOutclick);

    return () => {
      document.removeEventListener("mousedown", handleOutclick);
    };
  }, []);

  const handleNoUpdate = () => {
    setUpdateModal(null);
    localStorage.removeItem("@techId");
  };

  return (
    <StyledModal>
      <StyledOverlay>
        <StyledContent ref={contentRef}>
          <DivHeaderModal>
            <StyledTitle>Atualizar Tecnologia</StyledTitle>
            <ButtonSmall
              onClick={() => {
                setUpdateModal(null);
                localStorage.removeItem("@techId");
              }}
            >
              x
            </ButtonSmall>
          </DivHeaderModal>
          <Form onSubmit={handleSubmit(updateTech)}>
            <label htmlFor="title">
              <StyledHeadline>Tecnologia</StyledHeadline>
              <InputDefault value="-" disabled />
            </label>
            <label htmlFor="status">
              <StyledHeadline>Selecionar status</StyledHeadline>
              <SelectDefault
                {...register("status")}
                defaultValue={techToUpdate?.status}
              >
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </SelectDefault>
            </label>
            <ButtonDefault type="submit">Atualizar</ButtonDefault>
          </Form>
        </StyledContent>
      </StyledOverlay>
    </StyledModal>
  );
};

export default UpdateTechModal;
