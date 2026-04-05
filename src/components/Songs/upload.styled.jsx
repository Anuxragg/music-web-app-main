import styled from 'styled-components';

export const UploadContainerStyled = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 40px;
  background: #121212;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

export const UploadHeaderStyled = styled.div`
  margin-bottom: 30px;
  h1 { font-size: 32px; font-weight: 800; color: white; margin-bottom: 10px; }
  p { color: #b3b3b3; font-size: 14px; }
`;

export const ToggleGroupStyled = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 35px;
`;

export const ToggleBtnStyled = styled.button`
  flex: 1;
  padding: 14px;
  border-radius: 8px;
  background: ${props => props.$active ? 'rgba(248, 56, 33, 0.1)' : '#181818'};
  border: 1px solid ${props => props.$active ? '#f83821' : 'rgba(255,255,255,0.05)'};
  color: ${props => props.$active ? '#f83821' : '#b3b3b3'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover { border-color: ${props => props.$active ? '#f83821' : 'rgba(255,255,255,0.2)'}; }
`;

export const DropZoneStyled = styled.div`
  width: 100%;
  height: 200px;
  border: 2px dashed rgba(255,255,255,0.1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s;
  background: rgba(255,255,255,0.02);
  margin-bottom: 30px;

  &:hover {
    border-color: #f83821;
    background: rgba(248, 56, 33, 0.03);
  }

  .icon { font-size: 40px; color: #f83821; }
  p { color: white; font-weight: 500; }
  span { color: #b3b3b3; font-size: 13px; }
`;

export const FormGridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 30px;

  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

export const InputGroupStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label { font-size: 13px; color: #b3b3b3; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }
  
  input, select {
    background: #181818;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 12px 16px;
    border-radius: 6px;
    color: white;
    font-size: 14px;
    outline: none;
    
    &:focus { border-color: #f83821; }
  }
`;

export const CoverUploadStyled = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: #181818;
  border-radius: 8px;
  margin-bottom: 20px;

  .preview-box {
    width: 100px;
    height: 100px;
    background: #282828;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    svg { font-size: 32px; color: #404040; }
    img { width: 100%; height: 100%; object-fit: cover; }
  }

  .details {
    flex: 1;
    p { margin-bottom: 8px; font-weight: 600; color: white; }
    span { color: #b3b3b3; font-size: 13px; }
  }

  button {
    background: #f83821;
    color: white;
    border: none;
    padding: 10px 18px;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
  }
`;

export const ActionRowStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.05);

  .cancel { background: transparent; color: #b3b3b3; border: 1px solid #333; padding: 12px 24px; border-radius: 4px; cursor: pointer; }
  .publish { background: #f83821; color: white; border: none; padding: 12px 36px; border-radius: 4px; font-weight: 700; cursor: pointer; }
`;
