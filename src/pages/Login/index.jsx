import Logo from "../../assets/Logo.svg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form } from "../../components/Form/style";
import { InputDefault } from "../../styles/input";
import { ButtonDefault, ButtonDisable } from "../../styles/button";
import {
  StyledHeadline,
  StyledHeadlineItalic,
  StyledTitle,
} from "../../styles/typography";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import Header from "../../components/Header";
import { useEffect, useState } from "react";

const schema = yup.object({
  email: yup
    .string()
    .email("O e-mail não é válido")
    .required("Insira seu e-mail de acesso"),
  password: yup.string().required("Insira sua senha de acesso"),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data) => {
    try {
      const res = await api.post("sessions", data);
      window.localStorage.setItem("@authToken", res.data.token);
      window.localStorage.setItem("@userId", res.data.user.id);
      res.data.token && navigate("/dashboard");
    } catch (error) {
      errorNotify();
      reset();
    }
  };

  const errorNotify = () =>
    toast.error("E-mail e(ou) senha de login inválido(s)", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  useEffect(() => {
    const token = window.localStorage.getItem("@authToken");

    token && navigate("/dashboard");
  }, []);

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
        <Link to={"/signin"}>
          <ButtonDisable>Cadastrar</ButtonDisable>
        </Link>
        <ToastContainer />
      </Form>
    </>
  );
};

export default Login;
