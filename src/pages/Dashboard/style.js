import styled from "styled-components";

export const DivDashboard = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const DivMenu = styled.div`
  h1 {
    text-align: center;
  }
`;

export const Nav = styled.nav`
  width: 100vw;
  min-height: fit-content;
  padding: 20px 0;

  display: flex;
  justify-content: space-around;
  align-items: center;

  border-bottom: 1px solid var(--grey-2);

  div {
    display: flex;
    justify-content: space-between;
    gap: 10px;

    width: 50%;
    height: 100%;

    @media (max-width: 768px) {
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
`;

export const MainDashboard = styled.main`
  width: 100vw;
  min-height: 20%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  @media (max-width: 460px) {
    text-align: center;
  }
`;
