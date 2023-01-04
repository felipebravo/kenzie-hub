import styled from "styled-components";

export const StyledLogo = styled.div`
  display: inline-block;
  max-width: fit-content;

  h1 {
    overflow: hidden;
    border-right: 0.08em solid white;
    white-space: nowrap;
    width: 0;
    animation: typing 3s steps(20, end) forwards, blink 1s infinite;

    color: var(--color-primary);
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @keyframes blink {
    from {
      border-color: transparent;
    }
    to {
      border-color: white;
    }
  }
`;
