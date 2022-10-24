import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;

  padding: 42px 22px;
  max-height: 80vh;
  width: 370px;

  overflow-y: auto;

  background-color: var(--grey-3);
  border: 1px solid var(--grey-3);
  border-radius: 4px;

  label {
    width: 98%;
  }

  a {
    width: 100%;
  }
`;
