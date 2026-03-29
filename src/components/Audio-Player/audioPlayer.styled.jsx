import styled from 'styled-components';

export const AudioPlayerContainerStyled = styled.div`
  width: calc(100% - 220px);
  height: 90px;
  background-color: #121212;
  position: fixed;
  bottom: 0;
  left: 220px;
  color: white;
  z-index: 999;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: calc(100% - 200px);
    left: 200px;
  }

  @media (max-width: 480px) {
    width: 100%;
    left: 0;
    height: auto;
    min-height: 100px;
    padding: 10px 15px;
  }
`;

export const AudioPlayerWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  height: 100%;
  width: 100%;
  padding: 0 20px;

  @media (max-width: 480px) {
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    height: auto;
    padding: 0;
  }
`

export const ActiveSongWrapperStyled = styled.div`
    display: flex;
    align-items: center;
    width: 240px;
    height: 70px;
    flex-shrink: 0;
    overflow: hidden;
    margin: 0;

    @media (max-width: 768px) {
      width: 200px;
    }

    @media (max-width: 480px) {
      width: 100%;
      height: auto;
      order: 1;
      margin-bottom: 8px;
      overflow: visible;
    }
`;

export const ActiveSongImageContainerStyled = styled.div`
  width: 60px;
  height: 60px;
  flex-shrink: 0;

  > img {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 480px) {
    width: 55px;
    height: 55px;
  }
`;

export const ActiveSongDetailsStyled = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  flex: 1;

  > p:nth-child(1) {
    font-size: 13px;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
  }

  > p:nth-child(2) {
    font-size: 11px;
    color: #b3b2b2;
    margin: 2px 0 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 480px) {
    margin-left: 10px;

    > p:nth-child(1) {
      font-size: 12px;
    }

    > p:nth-child(2) {
      font-size: 10px;
    }
  }
`;

export const ActiveSongLikeButtonStyled = styled.button`
  background: none;
  border: none;
  color: ${props => props.$isFavorite ? '#f83821' : '#b3b2b2'};
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, color 0.2s ease;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.15);
    color: #f83821;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    margin-left: 6px;
  }
`