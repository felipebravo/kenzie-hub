import { ReactNode } from "react";
import { HeaderStyled } from "./style";

interface iHeader {
  variant: "dashboard" | "login" | "signin";
  children: ReactNode;
}

const Header = ({ variant, children }: iHeader) => {
  return <HeaderStyled variant={variant}>{children}</HeaderStyled>;
};

export default Header;
