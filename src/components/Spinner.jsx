import styled, { keyframes } from "styled-components";

// Define animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrap = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SytledSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-grey-300);
  border-top: 4px solid var(--color-brand-500);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

function Spinner() {
  return (
    <SpinnerWrap>
      <SytledSpinner />
    </SpinnerWrap>
  );
}

export default Spinner;
