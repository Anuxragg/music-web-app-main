import { styled } from "styled-components";

export const NavContainerStyled = styled.div`
  position: fixed;
  height: 100%;
  width: ${props => props.$collapsed ? '84px' : '220px'};
  background-color: #121212;
  overflow-y: auto;
  z-index: 1000;
  transition: width 0.25s ease;

  @media (max-width: 768px) {
    width: ${props => props.$collapsed ? '78px' : '200px'};
  }

  @media (max-width: 480px) {
    width: 100%;
    height: ${props => props.$menuOpen ? '100vh' : '60px'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: ${props => props.$menuOpen ? '0' : '0 15px'};
    overflow-y: ${props => props.$menuOpen ? 'auto' : 'visible'};
    transition: height 0.3s ease;
  }
`

export const NavHeadStyled = styled.div`
    display: flex;
    color: white;
    align-items: center;

    @media (max-width: 480px) {
      width: 100%;
      justify-content: space-between;
      height: 60px;
      padding: 0 15px;
      flex-shrink: 0;
    }
`

export const AppLogoContainerStyled = styled.div`
  height: 80px;
  width: 80px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  > img{
    height: 100%;
    width: 100%;
    animation: spin 5s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 480px) {
    height: 50px;
    width: 50px;
  }
`

export const AppNameContainerStyled = styled.div`
  margin: 15px 0 0 0;
  font-family: 'Dela Gothic One', sans-serif;
  cursor: pointer;
  transition: color 0.2s ease;
  display: ${props => props.$collapsed ? 'none' : 'block'};

  &:hover {
    color: #f83821;
  }

  > p:nth-child(1) {
    margin: 0;
  }

  > p:nth-child(2) {
    margin: -10px 0  0 0;
  }

  @media (max-width: 480px) {
    display: none;
  }
`

export const EdgeHandleStyled = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 14px;
  height: 100%;
  cursor: ew-resize;
  background: transparent;

  @media (max-width: 480px) {
    display: none;
  }
`

export const HamburgerMenuStyled = styled.button`
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: auto;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    display: flex;
    z-index: 1001;
  }
`

export const HamburgerLineStyled = styled.span`
  width: 28px;
  height: 3px;
  background-color: white;
  border-radius: 2px;
  transition: all 0.3s ease;
  display: block;
  position: relative;
  transform-origin: center;

  /* First line */
  &:nth-child(1) {
    transform: ${props => props.$menuOpen ? 'rotate(45deg) translateY(15px)' : 'rotate(0deg) translateY(0px)'};

    ${HamburgerMenuStyled}:hover & {
      transform: rotate(45deg) translateY(15px);
      background-color: #f83821;
    }
  }

  /* Middle line */
  &:nth-child(2) {
    opacity: ${props => props.$menuOpen ? '0' : '1'};

    ${HamburgerMenuStyled}:hover & {
      opacity: 0;
      background-color: #f83821;
    }
  }

  /* Third line */
  &:nth-child(3) {
    transform: ${props => props.$menuOpen ? 'rotate(-45deg) translateY(-15px)' : 'rotate(0deg) translateY(0px)'};

    ${HamburgerMenuStyled}:hover & {
      transform: rotate(-45deg) translateY(-15px);
      background-color: #f83821;
    }
  }
`