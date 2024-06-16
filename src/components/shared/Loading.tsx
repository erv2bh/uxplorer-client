import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const spinReverse = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const Overlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Spinner = styled.div`
  width: 32px;
  height: 32px;
  position: relative;
  animation: ${spin} 1s linear infinite;

  &::before,
  &::after {
    content: "";
    border: 4px solid white;
    border-radius: 50%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &::after {
    border-color: transparent;
    border-top-color: blue;
    animation: ${spinReverse} 1.5s linear infinite;
  }
`;

const LoadingText = styled.p`
  color: #4a5568;
  font-weight: semibold;
  margin-top: 16px;
`;

function Loading() {
  return (
    <Overlay>
      <LoaderContainer>
        <Spinner />
        <LoadingText>Loading...</LoadingText>
      </LoaderContainer>
    </Overlay>
  );
}

export default Loading;
