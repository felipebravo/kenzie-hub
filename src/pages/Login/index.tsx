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
import { useContext, useState } from "react";
import { LinkStyled } from "../../components/Link/style";
import { iHandleLogin, UserContext } from "../../contexts/UserContext";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { HeaderStyled } from "../../components/Header/style";
import { Logo } from "../../components/Logo";

const schema = yup.object({
  email: yup
    .string()
    .email("Insira um e-mail válido")
    .required("Insira seu e-mail de acesso"),
  password: yup.string().required("Insira sua senha de acesso"),
});

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { handleLogin } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iHandleLogin>({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <HeaderStyled variant="login">
        <Logo />
      </HeaderStyled>
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
            type={isVisible ? "text" : "password"}
            placeholder="Senha de acesso"
            {...register("password")}
          />
          {isVisible ? (
            <MdVisibilityOff onClick={() => setIsVisible(false)} />
          ) : (
            <MdVisibility onClick={() => setIsVisible(true)} />
          )}
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
