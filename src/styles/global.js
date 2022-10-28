import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --color-primary: #FF577F;
    --color-primary-op: #FF577F20;
    --color-primary-focus: #FF427F;
    --color-primary-negative: #59323F;
    --grey-4: #121214;
    --grey-3: #212529;
    --grey-2: #343B41;
    --grey-1: #868E96;
    --grey-0: #F8F9FA;
  }

  * {
    margin:0;
    padding: 0;
    outline:0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }

  body,html{
    width: 100vw;
    height: 100vh;
  }

  body {
    background-color: var(--grey-4);

    display: flex;
    align-items: center;
    justify-content: center;
  }

  button, select {
    cursor: pointer;
    border: none;
  }

  label {
    display: inline-flex;
    flex-direction: column;
    gap: 4px;
  }

  ::-webkit-scrollbar{
    width: 10px;
  }
  
  ::-webkit-scrollbar-track{
    background-color: var(--grey-2);
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb{
    background-color: var(--color-primary-negative);
    border-radius: 2px;

    &:hover{
      background-color: var(--color-primary);
    }
  }
`;
