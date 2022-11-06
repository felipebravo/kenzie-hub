import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

interface iLinkTypeVariationsProps {
  variant?: "login" | "signin";
}

const LinkTypeVariations = {
  login: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    background-color: var(--grey-1);

    border: 1px solid var(--grey-1);
    border-radius: 4px;

    color: var(--grey-0);
    text-decoration: none;

    font-size: 16px;

    padding: 0 22px;
    height: 48px;
    width: 98%;

    &:hover {
      transition: 0.5s;

      background-color: var(--grey-2);

      border-color: var(--grey-2);
    }
  `,
  signin: css`
    display: inline-flex;
    align-items: center;

    background-color: var(--grey-3);

    border: 1px solid var(--grey-3);
    border-radius: 4px;

    color: var(--grey-0);
    text-decoration: none;

    font-size: 12px;

    padding: 0 16px;
    height: 32px;
    width: fit-content;

    &:hover {
      transition: 0.5s;

      background-color: var(--grey-2);

      border-color: var(--grey-2);
    }
  `,
};

export const LinkStyled = styled(Link)<iLinkTypeVariationsProps>`
  ${({ variant }) => LinkTypeVariations[variant || "login"]}
`;
