import { styled } from "styled-components";

export const NavContainerStyled = styled.div`
  position: fixed;
  height: 100%;
  width: 220px;
  background-color: #121212;
  overflow-y: auto;
  z-index: 1000;

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 0 15px;
    overflow-y: visible;
  }
`

export const NavHeadStyled = styled.div`
    display: flex;
    color: white;

    @media (max-width: 480px) {
      width: 100%;
      justify-content: space-between;
    }
`

export const AppLogoContainerStyled = styled.div`
  height: 80px;
  width: 80px;

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