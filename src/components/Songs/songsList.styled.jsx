import styled from 'styled-components';

export const SongsListWrapperStyled = styled.div`
  margin:30px 0 120px 300px;
  max-width: 100%;

  @media (max-width: 768px) {
    margin: 30px 0 30px 220px;
  }

  @media (max-width: 480px) {
    margin: 30px auto;
    width: calc(100% - 20px);
  }
`

export const ViewHeadingStyled = styled.h1`
  color: white;
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 20px 0;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    margin: 0 0 15px 0;
  }
`

export const SongContainerStyled = styled.div`
  width: 450px;
  height: 60px;
  margin-top: 20px;
  padding: 0 20px 0 20px;
  background-color: #121212;
  color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover{
    background-color: #1A1A1A;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 400px;
    height: 55px;
    margin-top: 15px;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 50px;
    margin-top: 12px;
    padding: 0 15px;
  }
`

export const SongDetailsContainerStyled = styled.div`
  align-items: center;
  display: flex;
`

export const SongDurationContainerStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  > p{
    font-size: 13px;
    font-weight: 300;
    margin: 0;
  }

  @media (max-width: 480px) {
    gap: 10px;

    > p {
      font-size: 11px;
    }
  }
`

export const SongImgContainerStyled = styled.div`
  width: 40px;
  height: 40px;

  > img{
  border-radius: 3px;
  width: 100%;
  height: 100%;
}

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
  }
`

export const SongNameArtistStyled = styled.div`
  margin-left: 15px;

  > p:nth-child(1){
    font-size: 14px;
    margin: 0;
  }
  > p:nth-child(2){
    font-size: 12px;
    color: #b3b2b2;
    margin: 0;
}

  @media (max-width: 480px) {
    margin-left: 10px;

    > p:nth-child(1) {
      font-size: 12px;
    }

    > p:nth-child(2) {
      font-size: 11px;
    }
  }
`

export const LikeButtonStyled = styled.button`
  background: none;
  border: none;
  color: ${props => props.$isFavorite ? '#f83821' : '#b3b2b2'};
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.$isFavorite ? '1' : '0'};
  transition: opacity 0.2s ease, transform 0.2s ease, color 0.2s ease;

  ${SongContainerStyled}:hover & {
    opacity: 1;
  }

  &:hover {
    transform: scale(1.15);
    color: #f83821;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 480px) {
    font-size: 18px;
    opacity: 1;
  }
`