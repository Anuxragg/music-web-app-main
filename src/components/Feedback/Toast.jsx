import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { MdCheckCircle, MdError, MdInfo, MdClose } from 'react-icons/md';

const slideIn = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-radius: 12px;
  background: ${props => props.$type === 'success' ? '#1ed760' : props.$type === 'error' ? '#ff4d4d' : '#333'};
  color: ${props => props.$type === 'success' ? 'black' : 'white'};
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  min-width: 300px;
  animation: ${slideIn} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

const IconWrapper = styled.div`
  font-size: 24px;
  margin-right: 12px;
  display: flex;
`;

const Message = styled.p`
  margin: 0;
  font-weight: 600;
  flex-grow: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 5px;
  display: flex;
  opacity: 0.7;
  transition: opacity 0.2s;
  &:hover { opacity: 1; }
`;

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const Icon = type === 'success' ? MdCheckCircle : type === 'error' ? MdError : MdInfo;

  return (
    <ToastContainer $type={type}>
      <IconWrapper><Icon /></IconWrapper>
      <Message>{message}</Message>
      <CloseButton onClick={onClose}><MdClose /></CloseButton>
    </ToastContainer>
  );
}
