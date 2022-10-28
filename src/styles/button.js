import styled from "styled-components";

export const ButtonDefault = styled.button`
  background-color: var(--color-primary);

  border: 1px solid var(--color-primary);
  border-radius: 4px;

  color: var(--grey-0);

  font-size: 16px;

  padding: 0 22px;
  min-height: 48px;
  width: 98%;

  &:hover {
    transition: 0.5s;

    background-color: var(--color-primary-focus);

    border-color: var(--color-primary-focus);
  }

  &:negative {
    background-color: var(--color-primary-negative);

    border-color: var(--color-primary-negative);
  }
`;

export const ButtonDisable = styled.button`
  background-color: var(--grey-1);

  border: 1px solid var(--grey-1);
  border-radius: 4px;

  color: var(--grey-0);

  font-size: 16px;

  padding: 0 22px;
  height: 48px;
  width: 98%;

  &:hover {
    transition: 0.5s;

    background-color: var(--grey-2);

    border-color: var(--grey-2);
  }
`;

export const ButtonMedium = styled.button`
  background-color: var(--grey-3);

  border: 1px solid var(--grey-3);
  border-radius: 4px;

  color: var(--grey-0);

  font-size: 12px;

  padding: 0 16px;
  height: 32px;
  width: fit-content;

  &:hover {
    transition: 0.5s;

    background-color: var(--grey-2);

    border-color: var(--grey-2);
  }
`;

export const ButtonSmall = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background-color: var(--grey-3);

  border: 1px solid var(--grey-3);
  border-radius: 4px;

  color: var(--grey-0);

  height: 32px;
  width: 32px;

  &:hover {
    transition: 0.5s;

    background-color: var(--grey-2);

    border-color: var(--grey-2);
  }
`;
