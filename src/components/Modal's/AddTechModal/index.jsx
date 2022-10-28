import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useRef } from "react";
import { ButtonDefault, ButtonSmall } from "../../../styles/button";
import { InputDefault, SelectDefault } from "../../../styles/input";
import {
  StyledHeadline,
  StyledHeadlineItalic,
  StyledTitle,
} from "../../../styles/typography";
import { Form } from "../../Form/style";
import {
  DivHeaderModal,
  StyledContent,
  StyledModal,
  StyledOverlay,
} from "../style";
import { useForm } from "react-hook-form";
import { TechContext } from "../../../contexts/TechContext";

const schema = yup.object({
  title: yup
    .string()
    .max(20, "A tecnologia deve conter no máximo 20 caracteres")
    .required("Adicione uma tecnologia"),
  status: yup
    .string()
    .oneOf(
      ["Iniciante", "Intermediário", "Avançado"],
      "Selecione seu nível de conhecimento"
    ),
});

const AddTechModal = () => {
  const { addTech, setAddModal } = useContext(TechContext);

  const contentRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const handleOutclick = (evt) => {
      const target = evt.target;
      !contentRef.current.contains(target) && setAddModal(null);
    };

    document.addEventListener("mousedown", handleOutclick);

    return () => {
      document.removeEventListener("mousedown", handleOutclick);
    };
  }, []);

  return (
    <StyledModal>
      <StyledOverlay>
        <StyledContent ref={contentRef}>
          <DivHeaderModal>
            <StyledTitle>Cadastrar Tecnologia</StyledTitle>
            <ButtonSmall
              onClick={() => {
                setAddModal(null);
              }}
            >
              x
            </ButtonSmall>
          </DivHeaderModal>
          <Form onSubmit={handleSubmit(addTech)}>
            <label htmlFor="title">
              <StyledHeadline>Tecnologia</StyledHeadline>
              <InputDefault
                type="text"
                placeholder="Typescript"
                {...register("title")}
              />
              <StyledHeadlineItalic>
                {errors.title?.message}
              </StyledHeadlineItalic>
            </label>
            <label htmlFor="status">
              <StyledHeadline>Selecionar status</StyledHeadline>
              <StyledHeadlineItalic>
                {errors.status?.message}
              </StyledHeadlineItalic>
              <SelectDefault {...register("status")}>
                <option value="-">-</option>
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </SelectDefault>
            </label>
            <ButtonDefault type="submit">Cadastrar Tecnologia</ButtonDefault>
          </Form>
        </StyledContent>
      </StyledOverlay>
    </StyledModal>
  );
};

export default AddTechModal;
