import { HeaderStyled } from "./style";

const Header = ({ variant, children }) => {
  return <HeaderStyled variant={variant}>{children}</HeaderStyled>;
};

export default Header;
