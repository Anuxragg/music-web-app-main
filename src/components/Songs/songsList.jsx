/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import AudioPlayer from '../Audio-Player/audioPlayer';
import api from '../../services/api';
import { 
    SongsListWrapperStyled, SongContainerStyled, SongDetailsContainerStyled, SongDurationContainerStyled, SongImgContainerStyled, 
    SongNameArtistStyled, LikeButtonStyled, ViewHeadingStyled, GenreGridStyled, GenreCardStyled,
    TopSongsGridStyled, AlbumsScrollContainerStyled, AlbumCardStyled, SongIndexStyled,
    AlbumViewContainerStyled, AlbumLeftColStyled, AlbumRightColStyled, AlbumHeaderInfoStyled,
    AlbumActionsRowStyled, AlbumTracklistHeaderStyled, AlbumGenreGridStyled, AlbumFeaturedArtistsStyled
} from './songsList.styled';
import { MdFavoriteBorder, MdFavorite, MdMusicNote, MdRecordVoiceOver, MdPlayArrow, MdOutlineFileDownload, MdMoreHoriz, MdAddCircleOutline, MdShuffle, MdLoop, MdSearch, MdVolumeUp, MdVolumeMute, MdPlaylistAdd, MdDevices, MdQueueMusic, MdOpenInFull } from 'react-icons/md';
import { IoPlay, IoPause, IoShuffleOutline, IoRepeatOutline } from "react-icons/io5";
import { GiLovers, GiBoombox, GiViolin, GiCarKey } from 'react-icons/gi';
import UploadSongs from './upload';

export default function SongsList({ user, favorites, setFavorites, currentView, setCurrentView, searchResults }) {

    const [clickedSong, setClickedSong] = useState(null);
    const [recentHistory, setRecentHistory] = useState(() => {
        try { return JSON.parse(localStorage.getItem('vocalz_history')) || []; }
        catch { return []; }
    });
    const [playingPlaylist, setPlayingPlaylist] = useState([]);
    const [isPlaying, setIsPlaying] = useState(true);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [liveSongs, setLiveSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    const genres = [
        { name: 'Pop', image: '/media/genres/genre_pop.png', bgColor: '#FF0080' },
        { name: 'Bollywood', image: '/media/genres/genre_bollywood.png', bgColor: '#F9D423' },
        { name: 'Romance', image: '/media/genres/genre_romance.png', bgColor: '#ee0979' },
        { name: 'Hip-Hop', image: '/media/genres/genre_hiphop.png', bgColor: '#11998e' },
        { name: 'Classic Rock', image: '/media/genres/genre_rock.png', bgColor: '#8e9eab' },
        { name: 'Rap', image: '/media/genres/genre_rap.png', bgColor: '#00c6ff' },
        { name: 'Phonk', image: '/media/genres/genre_phonk.png', bgColor: '#200122' },
        { name: 'Classic', image: '/media/genres/genre_classic.png', bgColor: '#eef2f3' },
    ];

    useEffect(() => {
        async function fetchSongs() {
            try {
                const res = await api.get('/songs?limit=50');
                if (res.data?.success) {
                    // Map backend fields to UI fields
                    const normalized = res.data.data.map(song => ({
                        id: song._id,
                        songName: song.title,
                        artist: song.artist,
                        duration: song.durationFormatted || '0:00',
                        songImage: song.coverUrl,
                        audioUrl: song.audioUrl
                    }));
                    setLiveSongs(normalized);
                }
            } catch (err) {
                console.error("Error fetching live library", err);
            } finally {
                setLoading(false);
            }
        }
        fetchSongs();
    }, []);

    useEffect(() => {
        if (currentView !== 'Artists' && currentView !== 'Album') {
            setSelectedArtist(null);
        }
        if (currentView !== 'Discover') {
            setSelectedGenre(null);
        }
    }, [currentView]);

    const handleSongClick = (song, contextPlaylist) => {
        setClickedSong(song);
        if (contextPlaylist) {
            setPlayingPlaylist(contextPlaylist);
        }
        setIsPlaying(true);
        setRecentHistory(prev => {
            const newHist = [song.id, ...prev.filter(id => id !== song.id)].slice(0, 50);
            localStorage.setItem('vocalz_history', JSON.stringify(newHist));
            return newHist;
        });
    }

    const handleLikeClick = async (e, songId) => {
        e.stopPropagation();
        setFavorites(prevFavorites => {
            if (prevFavorites.includes(String(songId))) {
                return prevFavorites.filter(id => id !== String(songId));
            } else {
                return [...prevFavorites, String(songId)];
            }
        });

        try {
            await api.post(`/users/me/likes/${songId}`);
        } catch (error) {
            console.error("Error syncing favorite to backend", error);
        }
    }

    const isFavorite = (songId) => favorites.includes(String(songId));

    // Determine which songs to display
    let displayedSongs = [];
    let heading = currentView;
    let isArtistView = false;
    let artistsList = [];

    if (searchResults && searchResults.songs && searchResults.songs.length > 0) {
        // Display search results
        displayedSongs = searchResults.songs.map(song => ({
            id: song._id,
            songName: song.title,
            artist: song.artist,
            duration: song.durationFormatted || '0:00',
            songImage: song.coverUrl || 'https://via.placeholder.com/100',
            audioUrl: song.audioUrl
        }));
        heading = `Search Results (${displayedSongs.length})`;
    } else if (currentView === 'Listen History') {
        displayedSongs = recentHistory.map(id => liveSongs.find(song => String(song.id) === String(id))).filter(Boolean);
        heading = 'Listen History';
    } else if (currentView === 'Liked Songs') {
        displayedSongs = liveSongs.filter(song => favorites.includes(String(song.id)));
    } else if (currentView === 'Artists') {
        if (selectedArtist) {
            displayedSongs = liveSongs.filter(song => song.artist === selectedArtist);
            heading = (
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span 
                        style={{ cursor: 'pointer', fontSize: '24px', opacity: 0.7, transform: 'translateY(-2px)' }} 
                        onClick={() => setSelectedArtist(null)}
                        onMouseEnter={(e) => e.target.style.opacity = 1}
                        onMouseLeave={(e) => e.target.style.opacity = 0.7}
                        title="Back to Artists"
                    >←</span>
                    {selectedArtist}
                </div>
            );
        } else {
            isArtistView = true;
            heading = 'Artists';
            artistsList = Array.from(new Set(liveSongs.map(song => song.artist))).map(artist => ({
                name: artist,
                image: liveSongs.find(song => song.artist === artist)?.songImage
            }));
        }
    } else if (currentView === 'Album') {
        if (selectedArtist) {
            displayedSongs = liveSongs.filter(song => song.artist === selectedArtist);
        }
    } else if (currentView === 'Discover') {
        if (selectedGenre) {
            displayedSongs = liveSongs.filter(song => song.genre?.toLowerCase() === selectedGenre.toLowerCase());
            heading = (
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span 
                        style={{ cursor: 'pointer', fontSize: '24px', opacity: 0.7, transform: 'translateY(-2px)' }} 
                        onClick={() => setSelectedGenre(null)}
                        onMouseEnter={(e) => e.target.style.opacity = 1}
                        onMouseLeave={(e) => e.target.style.opacity = 0.7}
                        title="Back to Categories"
                    >←</span>
                    {selectedGenre}
                </div>
            );
        } else {
            heading = 'Explore Categories';
        }
    } else {
        displayedSongs = liveSongs;
    }

    const isExploreGrid = currentView === 'Discover' && !selectedGenre;
    const isHomeView = currentView === 'Home';
    const isAlbumView = currentView === 'Album';
    const isUploadView = currentView === 'Upload';

    if (loading && !isArtistView && !searchResults && !isExploreGrid && !isHomeView && !isAlbumView && !isUploadView) {
        return (
            <SongsListWrapperStyled>
                <ViewHeadingStyled>{heading}</ViewHeadingStyled>
                <p style={{ color: '#b3b2b2', marginTop: '20px' }}>Loading your cloud library...</p>
            </SongsListWrapperStyled>
        );
    }

    const handleNext = () => {
        const activeList = playingPlaylist.length > 0 ? playingPlaylist : displayedSongs;
        const currentIndex = activeList.findIndex(s => s.id === clickedSong?.id);
        if (currentIndex !== -1) {
            const nextIndex = currentIndex + 1 >= activeList.length ? 0 : currentIndex + 1;
            setClickedSong(activeList[nextIndex]);
            setIsPlaying(true);
        }
    };

    const handlePrevious = () => {
        const activeList = playingPlaylist.length > 0 ? playingPlaylist : displayedSongs;
        const currentIndex = activeList.findIndex(s => s.id === clickedSong?.id);
        if (currentIndex !== -1) {
            const prevIndex = currentIndex - 1 < 0 ? activeList.length - 1 : currentIndex - 1;
            setClickedSong(activeList[prevIndex]);
            setIsPlaying(true);
        }
    };

    return (
        <SongsListWrapperStyled>
            {!isHomeView && <ViewHeadingStyled>{heading}</ViewHeadingStyled>}
            
            {isHomeView && !loading ? (
                <>
                    <ViewHeadingStyled style={{ fontSize: '24px', marginBottom: '15px' }}>Top Songs</ViewHeadingStyled>
                    <TopSongsGridStyled>
                        {liveSongs.slice(0, 10).map((song, index) => (
                            <SongContainerStyled key={song.id} onClick={() => { handleSongClick(song, liveSongs.slice(0, 10)) }}>
                                <SongDetailsContainerStyled>
                                    <SongIndexStyled>
                                        {clickedSong?.id === song.id ? <IoPlay style={{ color: '#f83821', fontSize: '18px' }} /> : index + 1}
                                    </SongIndexStyled>
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
                        ))}
                    </TopSongsGridStyled>

                    <ViewHeadingStyled style={{ fontSize: '24px', marginTop: '40px', marginBottom: '15px' }}>Music Albums</ViewHeadingStyled>
                    <AlbumsScrollContainerStyled>
                        {Array.from(new Set(liveSongs.map(s => s.artist))).slice(0, 8).map(artist => {
                            const artistSong = liveSongs.find(s => s.artist === artist);
                            return (
                                <AlbumCardStyled key={artist} onClick={() => { setCurrentView('Album'); setSelectedArtist(artist); }}>
                                    <img src={artistSong?.songImage} alt="album" className="album-image" />
                                    <p className="album-title">{artist} Mix</p>
                                    <p className="album-artist">Vocalz Music</p>
                                </AlbumCardStyled>
                            );
                        })}
                    </AlbumsScrollContainerStyled>
                </>
            ) : (isAlbumView && selectedArtist) ? (
                (() => {
                    const albumSongs = displayedSongs;
                    const firstSong = albumSongs[0];
                    return (
                        <AlbumViewContainerStyled>
                            <AlbumLeftColStyled>
                                <AlbumHeaderInfoStyled>
                                    <h1>{selectedArtist} Mix</h1>
                                    <div className="album-subinfo">
                                        <img src={firstSong?.songImage} alt="artist" className="album-artist-icon" />
                                        <span>{selectedArtist} • 2024 • {albumSongs.length} songs</span>
                                    </div>
                                </AlbumHeaderInfoStyled>
                                <AlbumActionsRowStyled>
                                    <button className="play-btn" onClick={() => handleSongClick(albumSongs[0], albumSongs)}>
                                        <IoPlay style={{ marginLeft: '3px' }} />
                                    </button>
                                    <button className="icon-action"><IoShuffleOutline /></button>
                                    <button className="icon-action"><IoRepeatOutline /></button>
                                    <button className="icon-action"><MdAddCircleOutline /></button>
                                    <button className="icon-action"><MdOutlineFileDownload /></button>
                                    <button className="icon-action"><MdMoreHoriz /></button>
                                    <div style={{flex: 1}}></div>
                                    <button className="icon-action"><MdSearch /></button>
                                </AlbumActionsRowStyled>
                                <AlbumTracklistHeaderStyled>
                                    <span>#</span>
                                    <span>Title</span>
                                    <span style={{textAlign: 'right', paddingRight: '40px'}}>Duration</span>
                                </AlbumTracklistHeaderStyled>
                                {albumSongs.map((song, index) => (
                                    <SongContainerStyled key={song.id} onClick={() => { handleSongClick(song, albumSongs) }} style={{backgroundColor: 'transparent', height: '50px', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                                        <SongDetailsContainerStyled>
                                            <SongIndexStyled style={{width: '20px'}}>
                                                {clickedSong?.id === song.id ? <IoPlay style={{ color: '#f83821', fontSize: '18px' }} /> : index + 1}
                                            </SongIndexStyled>
                                            <SongNameArtistStyled style={{marginLeft: '0'}}>
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
                                ))}
                            </AlbumLeftColStyled>
                            <AlbumRightColStyled>
                                <img src={firstSong?.songImage} alt="Album Art" className="big-album-art" />
                                <AlbumGenreGridStyled>
                                    <button className="genre-pill">Vocalz Mix</button>
                                    <button className="genre-pill">Trending</button>
                                    <button className="genre-pill">Pop</button>
                                    <button className="genre-pill">Essential</button>
                                </AlbumGenreGridStyled>
                                <AlbumFeaturedArtistsStyled>
                                    <div className="artist-row" onClick={() => setCurrentView('Artists')}>
                                        <img src={firstSong?.songImage} alt={selectedArtist} />
                                        <p>{selectedArtist}</p>
                                    </div>
                                </AlbumFeaturedArtistsStyled>
                            </AlbumRightColStyled>
                        </AlbumViewContainerStyled>
                    );
                })()
            ) : isUploadView ? (
                <UploadSongs user={user} onCancel={() => setCurrentView('Home')} />
            ) : isExploreGrid ? (
                <GenreGridStyled>
                    {genres.map(genre => (
                        <GenreCardStyled 
                            key={genre.name} 
                            $image={genre.image}
                            $bgColor={genre.bgColor}
                            onClick={() => setSelectedGenre(genre.name)}
                        >
                            <h3>{genre.name}</h3>
                        </GenreCardStyled>
                    ))}
                </GenreGridStyled>
            ) : isArtistView ? (
                artistsList.length === 0 ? (
                    <p style={{ color: '#b3b2b2', marginTop: '20px', fontSize: '14px' }}>No artists found.</p>
                ) : (
                    artistsList.map(artist => (
                        <SongContainerStyled key={artist.name} onClick={() => setSelectedArtist(artist.name)}>
                            <SongDetailsContainerStyled>
                                <SongImgContainerStyled>
                                    <img src={artist.image} alt="artistImage" style={{ borderRadius: '50%' }} />
                                </SongImgContainerStyled>
                                <SongNameArtistStyled>
                                    <p>{artist.name}</p>
                                    <p>Artist</p>
                                </SongNameArtistStyled>
                            </SongDetailsContainerStyled>
                        </SongContainerStyled>
                    ))
                )
            ) : displayedSongs.length === 0 && currentView === 'Listen History' ? (
                <p style={{ color: '#b3b2b2', marginTop: '20px', fontSize: '14px' }}>
                    Your play history is empty. Start streaming songs to see them appear here!
                </p>
            ) : displayedSongs.length === 0 && currentView === 'Liked Songs' ? (
                <p style={{ color: '#b3b2b2', marginTop: '20px', fontSize: '14px' }}>
                    No favorite songs yet. Click the heart icon on any song to add it to your favorites!
                </p>
            ) : displayedSongs.length === 0 && selectedGenre ? (
                <p style={{ color: '#b3b2b2', marginTop: '20px', fontSize: '14px' }}>
                    No songs found in the {selectedGenre} category yet.
                </p>
            ) : displayedSongs.length === 0 && searchResults ? (
                <p style={{ color: '#b3b2b2', marginTop: '20px', fontSize: '14px' }}>
                    No songs found. Try a different search.
                </p>
            ) : (
                displayedSongs.map(song => (
                    <SongContainerStyled key={song.id} onClick={() => { handleSongClick(song, displayedSongs) }}>
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
            {clickedSong ?
                (<AudioPlayer
                    pickedSong={clickedSong}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    isSongFavorite={isFavorite(clickedSong.id)}
                    onToggleFavorite={() => handleLikeClick({ stopPropagation: () => {} }, clickedSong.id)}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                />
                ) : (
                    <AudioPlayer />)}
        </SongsListWrapperStyled>
    )
}