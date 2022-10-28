import { LinkStyled } from "./style";

const Link = ({ variant, children }) => {
  return <LinkStyled variant={variant}>{children}</LinkStyled>;
};

export default Link;
