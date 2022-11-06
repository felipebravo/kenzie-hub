import styled from "styled-components";

export const StyledModal = styled.div`
  position: fixed;
  inset: 0;

  width: 100%;
  height: 100vh;

  z-index: 101;
`;

export const StyledOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;

  background-color: var(--color-primary-op);
`;

export const StyledContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  width: 370px;
  min-height: 250px;

  border-radius: 4px;

  background-color: var(--grey-3);
  border: 1px solid var(--grey-3);
`;

export const DivHeaderModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 370px;
  padding: 10px;

  border-radius: 4px 4px 0 0;

  background-color: var(--grey-2);
`;

export const DivButtonsModal = styled.div`
  display: flex;
  gap: 10px;
`;
