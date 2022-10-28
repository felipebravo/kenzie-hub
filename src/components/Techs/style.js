import styled from "styled-components";

export const StyledTechs = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 50%;
  min-width: 370px;
  max-height: 60vh;
  padding: 20px;

  overflow-y: auto;

  background-color: var(--grey-3);

  border-radius: 4px;
`;

export const StyledTech = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  min-height: 50px;
  padding: 0 10px;

  background-color: var(--grey-4);

  border-radius: 4px;

  cursor: pointer;

  &:hover {
    background-color: var(--grey-2);

    transition: 0.5s;
  }
`;

export const DivTech = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;

  width: 20%;
  min-width: fit-content;
  height: 100%;

  button {
    &:hover {
      background-color: var(--grey-4);
      border-color: var(--grey-4);

      transition: 0.5s;

      svg {
        scale: 1.5;
        transition: 0.5s;
      }
    }
  }
`;
