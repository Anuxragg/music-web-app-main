import { styled } from "styled-components";

export const NavListContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 8px 12px;

    @media (max-width: 480px) {
      display: ${props => props.$menuOpen ? 'flex' : 'none'};
      margin: 20px 0;
      width: 100%;
    }
`

export const NavListStyled = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  width: ${props => props.$collapsed ? '56px' : '100%'};
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;
  padding: 0 12px;
  background-color: transparent;

  &:hover {
    background-color: #1a1a1a;
    p, span { color: white; }
  }

  > p, span {
      margin: 0;
      font-size: 14px;
      font-weight: 500;
      color: ${props => props.$isActive ? 'white' : '#b3b3b3'};
      transition: color 0.2s ease;
  }

  > p {
    display: ${props => props.$collapsed ? 'none' : 'block'};
    margin-left: 16px;
  }

  > span.react-icon {
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
  }

  @media (max-width: 768px) {
    height: 42px;
    > p, span { font-size: 13px; }
    > span.react-icon { font-size: 22px; }
  }
`;