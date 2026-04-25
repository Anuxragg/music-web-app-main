import { styled, keyframes } from "styled-components";
import { SongSliderContainerStyled } from '../Audio-Player/audioControls.styled';

export const NavContainerStyled = styled.div`
  position: relative;
  height: 100vh;
  width: ${props => props.$collapsed ? '84px' : '280px'}; /* Slightly wider for library items */
  background-color: #000000; /* Solid black sidebar per Spotify style */
  overflow-y: auto;
  z-index: 1000;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    width: ${props => props.$collapsed ? '78px' : '200px'};
    height: 100vh;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: ${props => props.$menuOpen ? '100vh' : '70px'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    overflow-y: ${props => props.$menuOpen ? 'auto' : 'visible'};
    transition: height 0.3s ease;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
`

export const NavHeadStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${props => props.$collapsed ? 'center' : 'flex-start'};
    padding: 24px;
    gap: 15px;
    color: white;

    @media (max-width: 480px) {
      flex-direction: row;
      justify-content: space-between;
      height: 60px;
      padding: 0 15px;
      align-items: center;
    }
`

export const SidebarToggleStyled = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  color: #b3b3b3;
  transition: all 0.2s ease;
  width: 40px;
  height: 40px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 480px) {
    display: none;
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const AppLogoContainerStyled = styled.div`
  height: ${props => props.$collapsed ? '40px' : '55px'};
  width: ${props => props.$collapsed ? '40px' : '55px'};
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 10px;

  &:hover {
    transform: scale(1.05);
  }

  > img{
    height: 100%;
    width: 100%;
    object-fit: contain;
    animation: ${rotate} 8s linear infinite;
  }

  @media (max-width: 480px) {
    height: 40px;
    width: 40px;
  }
`

export const AppNameContainerStyled = styled.div`
  margin-top: 2px;
  font-family: 'Plus Jakarta Sans', sans-serif; /* Clean premium font */
  font-weight: 700;
  cursor: pointer;
  transition: color 0.2s ease;
  display: ${props => props.$collapsed ? 'none' : 'block'};

  &:hover {
    color: #f83821;
  }

  > p:nth-child(1) {
    margin: 0;
    font-size: 1.4rem;
    line-height: 1.1;
    letter-spacing: -1px;
  }

  > p:nth-child(2) {
    margin: 0;
    font-size: 0.8rem;
    opacity: 0.6;
    text-transform: uppercase;
  }

  @media (max-width: 480px) {
    display: none;
  }
`

export const TopNavContainerStyled = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 16px 32px;
  height: 80px;
  width: 100%;
  background-color: rgba(18, 18, 18, 0.98);
  backdrop-filter: blur(10px);
  z-index: 1000;
  position: sticky;
  top: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    padding: 12px 20px;
    height: 70px;
  }

  @media (max-width: 480px) {
    padding: 10px 15px;
    height: 60px;
    position: sticky;
    top: 0;
    background-color: #121212;
  }
`;

export const TopNavLinksStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const NavPillStyled = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${props => props.$isActive ? '#282828' : 'transparent'};
  border: ${props => props.children[1].props.children === 'Upload' ? '1px solid #f83821' : 'none'};
  border-radius: 30px; /* more rounded pill */
  padding: 12px 24px; /* increased padding for premium feel */
  color: ${props => props.$isActive ? 'white' : props.children[1].props.children === 'Upload' ? '#f83821' : '#b3b3b3'};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.$isActive ? '#3e3e3e' : props.children[1].props.children === 'Upload' ? 'rgba(248, 56, 33, 0.1)' : 'rgba(255,255,255,0.12)'}; /* subtle hover */
    color: white;
    transform: scale(1.02);
  }

  .icon {
    font-size: 22px;
    display: flex;
    align-items: center;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 13px;
    .icon { font-size: 20px; }
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 12px;
    gap: 6px;
    .icon { font-size: 18px; }
    .label {
      display: ${props => props.$isActive ? 'block' : 'none'};
    }
  }
`;

export const SearchInputPillStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #282828;
  border-radius: 30px;
  padding: 10px 20px;
  color: white;
  flex-shrink: 0;

  input {
    background: transparent;
    border: none;
    color: white;
    font-size: 15px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    outline: none;
    width: 200px;
    &::placeholder {
      color: #b3b3b3;
      font-weight: 400;
    }
  }

  .icon {
    font-size: 22px;
    display: flex;
    align-items: center;
    color: white;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    gap: 6px;
    input {
      width: 120px; /* Smaller width for mobile */
      font-size: 13px;
    }
    .icon {
      font-size: 18px;
    }
  }
`;
export const SideNavHeaderStyled = styled.p`
  color: #b3b3b3;
  font-size: 13px;
  font-weight: 700;
  text-transform: capitalize; /* Spotify uses 'My Library' with caps */
  padding: 24px 24px 8px 24px;
  margin: 0;
  display: ${props => props.$collapsed ? 'none' : 'flex'};
  opacity: 0.8;
  align-items: center;
  gap: 12px;

  svg { font-size: 24px; }
`;

/* Reuse existing hamburger styles for mobile compatibility */
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
`;

export const EdgeHandleStyled = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 14px;
  height: 100%;
  cursor: ew-resize;
  background: transparent;
`