import { ReactNode } from "react";
import { To } from "react-router-dom";
import { LinkStyled } from "./style";

interface iLinkProps {
  variant: "login" | "signin";
  children: ReactNode;
  to: To;
}

const Link = ({ variant, children, to }: iLinkProps) => {
  return (
    <LinkStyled variant={variant} to={to}>
      {children}
    </LinkStyled>
  );
};

export default Link;
