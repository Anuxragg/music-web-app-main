import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
`;

const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
`;

const SpinnerWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`;

const Ring = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 4px solid #f83821;
  border-radius: 50%;
  animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #f83821 transparent transparent transparent;

  &:nth-child(1) { animation-delay: -0.45s; }
  &:nth-child(2) { animation-delay: -0.3s; }
  &:nth-child(3) { animation-delay: -0.15s; }
`;

const LoadingText = styled.p`
  color: white;
  margin-top: 20px;
  font-weight: 500;
  letter-spacing: 1px;
  animation: ${pulse} 2s infinite ease-in-out;
`;

export default function Loader({ message = "Processing..." }) {
  return (
    <LoaderOverlay>
      <SpinnerWrapper>
        <Ring />
        <Ring />
        <Ring />
        <Ring />
      </SpinnerWrapper>
      <LoadingText>{message}</LoadingText>
    </LoaderOverlay>
  );
}
