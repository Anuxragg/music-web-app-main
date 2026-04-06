import styled from 'styled-components';

export const SongsListWrapperStyled = styled.div`
  margin: 30px 40px;
  max-width: 100%;

  @media (max-width: 768px) {
    margin: 30px 20px;
  }

  @media (max-width: 480px) {
    margin: 30px 10px;
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
  width: 100%;
  max-width: 800px;
  height: 60px;
  margin-top: 15px;
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

export const GenreGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 25px;
  padding-right: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding-right: 0;
  }
`

export const GenreCardStyled = styled.div`
  aspect-ratio: 1.7 / 1;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${props => props.$bgColor || '#2c3e50'};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%);
    z-index: 1;
    transition: background 0.3s ease;
  }

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  }

  &:hover::before {
    background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%);
  }

  h3 {
    color: white;
    font-size: 22px;
    font-weight: 800;
    margin: 0;
    z-index: 2;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    letter-spacing: -0.5px;
  }

  @media (max-width: 768px) {
    padding: 12px;
    h3 { font-size: 18px; }
  }

  @media (max-width: 480px) {
    padding: 10px;
    h3 { font-size: 14px; }
  }
`

export const TopSongsGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 30px;
  row-gap: 5px;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const SongIndexStyled = styled.div`
  width: 30px;
  color: #b3b2b2;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 15px;
`;

export const AlbumsScrollContainerStyled = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding-bottom: 20px;
  margin-top: 15px;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const AlbumCardStyled = styled.div`
  min-width: 160px;
  max-width: 160px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03);
  }

  .album-image {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 6px;
    object-fit: cover;
    margin-bottom: 12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  }

  .album-title {
    color: white;
    font-size: 14px;
    font-weight: 600;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .album-artist {
    color: #b3b2b2;
    font-size: 12px;
    margin: 4px 0 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const AlbumViewContainerStyled = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin-top: 20px;
  @media (max-width: 1024px) {
    flex-direction: column-reverse;
  }
`;

export const AlbumLeftColStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const AlbumRightColStyled = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media (max-width: 1024px) {
    width: 100%;
    align-items: center;
  }

  .big-album-art {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5);
    background-color: #282828;
    object-fit: cover;
  }
`;

export const AlbumHeaderInfoStyled = styled.div`
  margin-bottom: 25px;
  
  h1 {
    font-size: 48px;
    font-weight: 800;
    margin: 0 0 10px 0;
    color: white;
    letter-spacing: -1px;
  }
  
  .album-subinfo {
    font-size: 14px;
    color: #b3b3b3;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .album-artist-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
`;

export const AlbumActionsRowStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
  
  @media (max-width: 480px) {
    gap: 12px;
  }
  
  .play-btn {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #f83821;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    font-size: 24px;
    border: none;
    flex-shrink: 0;
    transition: transform 0.2s, background-color 0.2s;
    
    &:hover {
      transform: scale(1.05);
      background-color: #ff4d3a;
    }
  }
  
  .icon-action {
    color: #b3b3b3;
    font-size: 28px;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    
    &:hover {
      color: white;
    }
  }
`;

export const AlbumTracklistHeaderStyled = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 100px;
  padding: 0 20px 10px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  color: #b3b3b3;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 15px;
`;

export const AlbumGenreGridStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  
  .genre-pill {
    padding: 6px 16px;
    border-radius: 20px;
    border: 1px solid #535353;
    font-size: 12px;
    color: white;
    background: transparent;
    cursor: pointer;
    &:hover { border-color: white; }
  }
`;

export const AlbumFeaturedArtistsStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  .artist-row {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    
    &:hover {
      p { text-decoration: underline; }
    }
  }
  
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    color: white;
    font-weight: 500;
  }
`;