import Logo from "../../assets/Logo.svg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form } from "../../components/Form/style";
import { InputDefault } from "../../styles/input";
import { ButtonDefault } from "../../styles/button";
import {
  StyledHeadline,
  StyledHeadlineItalic,
  StyledTitle,
} from "../../styles/typography";

import Header from "../../components/Header";
import { useContext } from "react";
import { LinkStyled } from "../../components/Link/style";
import { UserContext } from "../../contexts/UserContext";

const schema = yup.object({
  email: yup.string().required("Insira seu e-mail de acesso"),
  password: yup.string().required("Insira sua senha de acesso"),
});

const Login = () => {
  const { handleLogin } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Header variant="login">
        <img src={Logo} alt="KenzieHub" />
      </Header>
      <Form onSubmit={handleSubmit(handleLogin)}>
        <StyledTitle>Login</StyledTitle>
        <label>
          <StyledHeadline>E-mail</StyledHeadline>
          <InputDefault
            type="email"
            placeholder="E-mail de usuário"
            {...register("email")}
          />
          <StyledHeadlineItalic>{errors.email?.message}</StyledHeadlineItalic>
        </label>
        <label>
          <StyledHeadline>Senha</StyledHeadline>
          <InputDefault
            type="password"
            placeholder="Senha de acesso"
            {...register("password")}
          />
          <StyledHeadlineItalic>
            {errors.password?.message}
          </StyledHeadlineItalic>
        </label>
        <ButtonDefault type="submit">Entrar</ButtonDefault>
        <StyledHeadline>Ainda não possui uma conta?</StyledHeadline>
        <LinkStyled variant="login" to={"/signin"}>
          Cadastrar
        </LinkStyled>
      </Form>
    </>
  );
};

export default Login;
