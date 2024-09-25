import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;




`;

export const ModalContainer = styled.div<{ maxWidth?: string }>`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: ${({ maxWidth }) => maxWidth ?? '95%'};
  max-height: 80%;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);


  
`;

export const ModalBody = styled.div`
  margin-top: 20px;
`;

export const CloseModalButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  
  &:hover {
    color: #000;
  }
`;