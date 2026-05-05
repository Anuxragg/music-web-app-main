import styled from 'styled-components';
import { SongSliderContainerStyled } from './audioControls.styled';

export const AudioPlayerContainerStyled = styled.div`
  width: 100%;
  height: 75px;
  background-color: #121212;
  position: fixed;
  bottom: 0;
  left: 0;
  color: white;
  z-index: 9999;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    left: 0;
  }

  @media (max-width: 480px) {
    width: 100%;
    left: 0;
    height: 60px;
    min-height: 60px;
    padding: 0 5px;
  }
`;

export const AudioPlayerWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px; /* Base horizontal spacing between functional groups */
  height: 100%;
  width: 100%;
  padding: 0 40px;

  @media (max-width: 1200px) {
    gap: 20px;
    padding: 0 20px;
  }

  @media (max-width: 1024px) {
    gap: 15px;
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    gap: 15px;
    padding: 0 10px 0 0; 
    justify-content: space-between;
  }
`

export const PlaybackControlsGroupStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  width: auto;
  flex-shrink: 0;

  // Icon sizing
  span, svg, .react-icon {
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;

    // Default sizing for shuffle/repeat
    font-size: 16px; 

    // Larger sizing for Next/Prev to match visual weight
    &:nth-child(1), &:nth-child(3) {
      font-size: 28px;
    }

    &:hover {
      color: white;
      /* removed scale effect */
    }
    &.active, &.active svg {
      color: #f83821;
    }
  }

  @media (max-width: 1024px) {
    width: auto;
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 12px;
    width: auto;
    justify-content: flex-end;
    margin-right: 0;
    
    // Hide shuffle and repeat on mobile
    & > span:nth-last-child(1), /* Repeat span */
    & > span:nth-last-child(2), /* Shuffle span */
    & > :nth-child(2) /* BiSkipPrevious */ { 
        display: none !important; 
    }
  }
`;

export const CenterGroupStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Center the seeker bar */
  flex: 1;
  gap: 20px;
  min-width: 0;

  & > ${SongSliderContainerStyled} {
    flex: 1;
    max-width: 450px; /* Reduced from 650px to make the bar 'a bit small' */
    margin: 0;
  }

  @media (max-width: 1200px) {
    gap: 15px;
    & > ${SongSliderContainerStyled} {
      max-width: 500px;
    }
  }

  @media (max-width: 480px) {
    display: none;
  }
`

export const IdentityGroupStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 280px; /* Fixed width on desktop to keep seeker centered */
  min-width: 0;
  flex-shrink: 0;

  @media (max-width: 1200px) {
    width: 220px;
  }

  @media (max-width: 480px) {
    width: auto;
    flex: 1;
    min-width: 0;
  }
`;

export const ActiveSongWrapperStyled = styled.div`
    display: flex;
    align-items: center;
    width: auto;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: auto;
    max-width: 300px;
    height: 70px;
    flex-shrink: 0;
    margin: 0;

    @media (max-width: 1200px) {
      max-width: 250px;
    }

    @media (max-width: 768px) {
      display: flex;
      max-width: 100%;
      height: 60px;
      justify-content: flex-start;
    }
`;

export const ActionGroupStyled = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    flex-shrink: 0;
    color: white; /* Changed from #b3b3b3 */

    > span {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            color: white;
            /* removed scale effect */
        }

        &.active {
            color: #f83821;
        }
    }

    @media (max-width: 1024px) {
        gap: 10px;
        > span {
            font-size: 18px;
        }
    }

    @media (max-width: 768px) {
        display: none;
    }
`

export const ActiveSongImageContainerStyled = styled.div`
  width: 60px;
  height: 60px;
  flex-shrink: 0;

  > img {
    border-radius: 4px;
    width: 50px; /* Smaller, cleaner square */
    height: 50px;
    object-fit: cover;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    > img {
        width: 40px;
        height: 40px;
    }
  }
`;

export const ActiveSongDetailsStyled = styled.div`
  margin-left: 8px;
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
    font-size: 12px;
    color: #b3b3b3;
    margin: 2px 0 0 0;
  }

  .album-name {
    font-size: 12px;
    color: #888;
    margin: 1px 0 0 0;
    font-weight: 300;
  }

  @media (max-width: 480px) {
    margin-left: 10px;

    > p:nth-child(1) {
      font-size: 14px;
      font-weight: 600;
      max-width: none;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    > p:nth-child(2) {
      font-size: 12px;
      color: #b3b3b3;
      max-width: none;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
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
    /* removed scale effect */
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
`;

export const MobileProgressBarContainerStyled = styled.div`
  display: none;
  
  @media (max-width: 480px) {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background-color: transparent;
    z-index: 10;
    cursor: pointer;

    & > div {
        height: 3px;
        border-radius: 0;
    }
  }
`;

export const MobileTimerStyled = styled.div`
  display: none;

  @media (max-width: 480px) {
    display: none;
  }
`;