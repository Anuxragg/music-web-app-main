import { styled } from "styled-components";

export const NavListContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px 0px 0px 20px;

    @media (max-width: 480px) {
      display: ${props => props.$menuOpen ? 'flex' : 'none'};
      margin: 20px 0;
      width: 100%;
    }
`

export const NavListStyled = styled.div`

  display: flex;
  align-items: center;
  height: 40px;
  width: 150px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  background-color: ${props => props.$isActive ? '#1A1A1A' : 'transparent'};

    &:hover {
    background-color: #1A1A1A;
  }

  > p,span {
      margin: 0 0 0 20px;
      font-size: 13px;
      color: ${props => props.$isActive ? '#f83821' : 'white'};
      transition: color 0.5s ease, letter-spacing 0.3s ease;
      letter-spacing: ${props => props.$isActive ? '2px' : '0px'};
    }

    > span{
      color: ${props => props.$isActive ? '#f83821' : 'white'};
      font-size: 18px;
    }


  &:hover > p,
  &:hover > span {
    color: #f83821;
    letter-spacing: 2px;
  }

  @media (max-width: 768px) {
    width: 130px;
    height: 36px;

    > p, span {
      margin: 0 0 0 15px;
      font-size: 12px;
    }

    > span {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    width: calc(100% - 40px);
    margin: 0 20px;
  }
`;

export const UserPlaylistContainerStyled = styled.div`
    margin: 40px 0 0 30px;

    @media (max-width: 480px) {
      display: ${props => props.$menuOpen ? 'block' : 'none'};
      margin: 20px 20px;
      width: auto;
    }
`

export const UserPlaylistHeadingStyled = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    color: white;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 14px;
    }
`

export const UserPlayListWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const UserPlaylistStyled = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;

    > p,span{
    margin: 0 0 0 10px;
    font-size: 13px;
    color: white;
  }

  >span{
    font-size: 16px;
  }

  @media (max-width: 768px) {
    > p, span {
      font-size: 12px;
    }

    > span {
      font-size: 14px;
    }
  }
`