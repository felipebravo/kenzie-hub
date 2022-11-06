import styled, { css } from "styled-components";

interface iHeaderTypeVariationsProps {
  variant?: "dashboard" | "login" | "signin";
}

const HeaderTypeVariations = {
  login: css`
    text-align: center;

    width: 370px;
  `,
  signin: css`
    display: flex;
    justify-content: space-between;

    width: 370px;
  `,
  dashboard: css`
    display: flex;
    justify-content: space-around;

    width: 100vw;

    border-bottom: 1px solid var(--grey-2);

    div {
      display: flex;
      justify-content: space-between;
      gap: 10px;

      width: 50%;
      height: 100%;

      @media (max-width: 769px) {
        width: 80%;
      }
    }

    @media (max-width: 490px) {
      h1,
      img,
      a,
      p {
        max-width: 50%;
        text-align: center;
      }
    }
  `,
};

export const HeaderStyled = styled.header<iHeaderTypeVariationsProps>`
  ${({ variant }) => HeaderTypeVariations[variant || "login"]}

  min-height: fit-content;
  padding: 20px 0;
`;
