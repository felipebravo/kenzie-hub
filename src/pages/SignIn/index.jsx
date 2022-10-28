import Logo from "../../assets/Logo.svg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Form } from "../../components/Form/style";
import { InputDefault, SelectDefault } from "../../styles/input";
import { ButtonDefault } from "../../styles/button";
import {
  StyledHeadline,
  StyledHeadlineItalic,
  StyledTitle,
} from "../../styles/typography";
import api from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { LinkStyled } from "../../components/Link/style";

const schema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup
    .string()
    .email("O e-mail não é válido")
    .required("E-mail é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .matches(
      /(^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,})/,
      "A senha deve conter no mínimo 8 caracteres. Necessário ter letras, números e ao menos um símbolo"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas devem ser iguais"),
  bio: yup.string().max(150).required("Descrição é obrigatória"),
  contact: yup
    .string()
    .required("Contato é obrigatório")
    .matches(
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
      "Contato inválido"
    ),
});

const SignIn = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const registerUser = async (data) => {
    try {
      const res = await api.post("users", data);
      console.log(res);
      res.data.id && successNotify();
      navigate("/");
    } catch (error) {
      error.response.data.message === "Email already exists"
        ? errorNotify("E-mail já está cadastrado!")
        : errorNotify("Erro ao cadastrar usuário, verifique os dados!");
    }
  };

  const successNotify = () =>
    toast.success("Usuário cadastrado com sucesso!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const errorNotify = (error) =>
    toast.error(`${error}`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <>
      <Header variant="signin">
        <img src={Logo} alt="KenzieHub" />
        <LinkStyled variant="signin" to={"/"}>
          Voltar
        </LinkStyled>
      </Header>
      <Form onSubmit={handleSubmit(registerUser)}>
        <StyledTitle>Crie sua conta</StyledTitle>
        <StyledHeadline>Rápido e grátis, vamos nessa!</StyledHeadline>
        <label>
          <StyledHeadline>Digite seu nome</StyledHeadline>
          <InputDefault
            type="text"
            placeholder="Digite aqui seu nome"
            {...register("name")}
          />
          <StyledHeadlineItalic>{errors.name?.message}</StyledHeadlineItalic>
        </label>
        <label>
          <StyledHeadline>Digite seu e-mail</StyledHeadline>
          <InputDefault
            type="email"
            placeholder="Digite aqui seu email"
            {...register("email")}
          />
          <StyledHeadlineItalic>{errors.email?.message}</StyledHeadlineItalic>
        </label>
        <label>
          <StyledHeadline>Digite sua senha</StyledHeadline>
          <InputDefault
            type="password"
            placeholder="Digite aqui sua senha"
            {...register("password")}
          />
          <StyledHeadlineItalic>
            {errors.password?.message}
          </StyledHeadlineItalic>
        </label>
        <label>
          <StyledHeadline>Digite novamente sua senha</StyledHeadline>
          <InputDefault
            type="password"
            placeholder="Digite novamente sua senha"
            {...register("confirmPassword")}
          />
          <StyledHeadlineItalic>
            {errors.confirmPassword?.message}
          </StyledHeadlineItalic>
        </label>
        <label>
          <StyledHeadline>Fale sobre você</StyledHeadline>
          <InputDefault
            type="text"
            placeholder="Fale sobre você"
            {...register("bio")}
          />
          <StyledHeadlineItalic>{errors.bio?.message}</StyledHeadlineItalic>
        </label>
        <label>
          <StyledHeadline>Digite uma opção de contato</StyledHeadline>
          <InputDefault
            type="text"
            placeholder="Digite seu contato telefônico"
            {...register("contact")}
          />
          <StyledHeadlineItalic>{errors.contact?.message}</StyledHeadlineItalic>
        </label>
        <label>
          <StyledHeadline>Selecione um módulo</StyledHeadline>
          <SelectDefault {...register("course_module")}>
            <option value="Primeiro módulo (Introdução ao Frontend)">
              Primeiro módulo (Introdução ao Frontend)
            </option>
            <option value="Segundo módulo (Frontend Avançado)">
              Segundo módulo (Frontend Avançado)
            </option>
            <option value="Terceiro módulo (Introdução ao Backend)">
              Terceiro módulo (Introdução ao Backend)
            </option>
            <option value="Quarto módulo (Backend Avançado)">
              Quarto módulo (Backend Avançado)
            </option>
          </SelectDefault>
        </label>
        <ButtonDefault type="submit">Cadastrar</ButtonDefault>
      </Form>
    </>
  );
};

export default SignIn;
