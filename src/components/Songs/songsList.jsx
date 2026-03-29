/* eslint-disable react/prop-types */
import { useState } from 'react'
import Songs from '../songs'
import AudioPlayer from '../Audio-Player/audioPlayer';
import { SongsListWrapperStyled, SongContainerStyled, SongDetailsContainerStyled, SongDurationContainerStyled, SongImgContainerStyled, SongNameArtistStyled, LikeButtonStyled, ViewHeadingStyled } from './songsList.styled';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

export default function SongsList({ favorites, setFavorites, currentView }) {

    const [clickedSong, setClickedSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const handleSongClick = (song) => {
        setClickedSong(song);
        if (!isPlaying) {
            setIsPlaying(isPlaying => !isPlaying)
        }
    }

    const handleLikeClick = (e, songId) => {
        e.stopPropagation(); // Prevent song from playing when clicking like
        setFavorites(prevFavorites => {
            if (prevFavorites.includes(songId)) {
                return prevFavorites.filter(id => id !== songId);
            } else {
                return [...prevFavorites, songId];
            }
        });
    }

    const isFavorite = (songId) => favorites.includes(songId);

    // Filter songs based on current view
    const displayedSongs = currentView === 'Favorites'
        ? Songs.filter(song => favorites.includes(song.id))
        : Songs;

    return (
        <SongsListWrapperStyled>
            <ViewHeadingStyled>{currentView}</ViewHeadingStyled>
            {displayedSongs.length === 0 && currentView === 'Favorites' ? (
                <p style={{ color: '#b3b2b2', marginTop: '20px', fontSize: '14px' }}>
                    No favorite songs yet. Click the heart icon on any song to add it to your favorites!
                </p>
            ) : (
                displayedSongs.map(song => (
                    <SongContainerStyled key={song.id} onClick={() => { handleSongClick(song) }}>
                        <SongDetailsContainerStyled>
                            <SongImgContainerStyled>
                                <img src={song.songImage} alt="albumImage" />
                            </SongImgContainerStyled>
                            <SongNameArtistStyled>
                                <p>{song.songName}</p>
                                <p>{song.artist}</p>
                            </SongNameArtistStyled>
                        </SongDetailsContainerStyled>
                        <SongDurationContainerStyled>
                            <p>{song.duration}</p>
                            <LikeButtonStyled
                                onClick={(e) => handleLikeClick(e, song.id)}
                                $isFavorite={isFavorite(song.id)}
                            >
                                {isFavorite(song.id) ? <MdFavorite /> : <MdFavoriteBorder />}
                            </LikeButtonStyled>
                        </SongDurationContainerStyled>
                    </SongContainerStyled>
                ))
            )}
            {/* <AudioPlayer /> */}
            {clickedSong ?
                (<AudioPlayer
                    pickedSong={clickedSong}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    isSongFavorite={isFavorite(clickedSong.id)}
                    onToggleFavorite={() => handleLikeClick({ stopPropagation: () => {} }, clickedSong.id)}
                />
                ) : (
                    <AudioPlayer />)}
        </SongsListWrapperStyled>
    )
}