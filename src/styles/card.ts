import styled from "styled-components";

export const CardDefault = styled.div`
  background-color: var(--grey-4);

  border: 1px solid var(--grey-4);
  border-radius: 4px;

  color: var(--grey-0);

  height: 48px;
  width: 98%;
  padding: 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: var(--grey-2);
  }
`;
