import styled from "styled-components";

export const StyledLoading = styled.h1`
  width: 250px;
  height: 250px;

  border: 6px solid var(--grey-2);
  border-radius: 50%;
  border-top-color: var(--color-primary);

  animation: is-rotating 1s infinite;

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }
`;
