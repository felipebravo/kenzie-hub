import styled from "styled-components";

export const InputDefault = styled.input`
  background-color: var(--grey-2);

  border: 1px solid var(--grey-2);
  border-radius: 4px;

  height: 48px;
  width: 100%;
  padding: 0 16px;

  color: var(--grey-0);

  ::placeholder {
    color: var(--grey-1);

    font-size: 16px;
  }

  &:focus {
    border-color: var(--grey-0);

    ::placeholder {
      color: var(--grey-0);
    }
  }
`;

export const SelectDefault = styled.select`
  background-color: var(--grey-2);

  border: 1px solid var(--grey-2);
  border-radius: 4px;

  height: 48px;
  width: 100%;
  padding: 0 16px;

  color: var(--grey-0);

  &:focus {
    border-color: var(--grey-0);
  }
`;
