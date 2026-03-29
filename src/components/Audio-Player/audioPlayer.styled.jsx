import styled from 'styled-components';

export const AudioPlayerContainerStyled = styled.div`
  width: 100%;
  height: 90px;
  background-color: #121212;
  position: fixed;
  bottom: 0;
  left: 0;
  color: white;
  z-index: 999;

  @media (max-width: 480px) {
    height: 80px;
  }
`;

export const AudioPlayerWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 25px 0 25px;

  @media (max-width: 480px) {
    margin: 0 15px;
    flex-wrap: wrap;
  }
`

export const ActiveSongWrapperStyled = styled.div`
    margin-top: 15px;
    width: 400px;
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
      width: 300px;
    }

    @media (max-width: 480px) {
      width: 100%;
      margin-top: 10px;
    }
`;

export const ActiveSongImageContainerStyled = styled.div`
  width: 60px;
  height: 60px;

  > img {
    border-radius: 5px;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;

export const ActiveSongDetailsStyled = styled.div`
  margin-left: 15px;

  > p:nth-child(1) {
    font-size: 14px;
    margin: 0;
  }

  > p:nth-child(2) {
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
`;