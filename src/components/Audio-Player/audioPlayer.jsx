/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import { AudioPlayerContainerStyled, AudioPlayerWrapperStyled, ActiveSongWrapperStyled, ActiveSongImageContainerStyled, ActiveSongDetailsStyled, ActiveSongLikeButtonStyled, ActionGroupStyled, PlaybackControlsGroupStyled, CenterGroupStyled, IdentityGroupStyled } from "./audioPlayer.styled";
import { AudioPlayerDefaultStyled } from "./audioPlayerDefault.styled";
import { AudioControlsContainerStyled, MainPlayButtonStyled, ControlIconStyled, VolumeControlContainerStyled, VolumeControlBarStyled, VolumeChangeStyled, SongSliderContainerStyled, ProgressBarContainerStyled, ProgressBarStyled } from "./audioControls.styled";
import { IoPlay, IoPause, IoShuffleOutline, IoRepeatOutline } from "react-icons/io5";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { MdVolumeUp, MdVolumeMute, MdFavorite, MdFavoriteBorder, MdAddCircleOutline, MdPlaylistAdd, MdDevices, MdQueueMusic, MdMoreHoriz, MdOpenInFull } from "react-icons/md";

export default function AudioPlayer({ pickedSong, isPlaying, setIsPlaying, isSongFavorite, onToggleFavorite }) {

    const [audioMetaData, setAudioMetaData] = useState(false);
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [isMuted, setIsMuted] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [previousVolume, setPreviousVolume] = useState(0.5);
    const audioRef = useRef(null);
    const progressBarRef = useRef(null);
    const songBarRef = useRef(null);
    const volumeControlBarRef = useRef(null);
    const volumeChangeRef = useRef(null);

    useEffect(() => {
        if (audioRef.current && pickedSong) {
            const audioUrl = pickedSong.audioFile || pickedSong.audioUrl;
            if (audioUrl) {
                audioRef.current.src = audioUrl;
                audioRef.current.load();
                if (isPlaying) {
                    audioRef.current.play().catch(err => console.error('Audio play error:', err));
                }
            }
        }
    }, [pickedSong]);

    useEffect(() => {
        if (audioRef.current && pickedSong) {
            if (isPlaying) {
                audioRef.current.play().catch(err => console.error('Audio play error:', err));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    // Scroll wheel volume control
    useEffect(() => {
        const handleWheel = (e) => {
            if (volumeControlBarRef.current && volumeControlBarRef.current.contains(e.target)) {
                e.preventDefault();
                const currentVolume = audioRef.current.volume;
                // Determine linear width value backward from perceived quadratic curve
                const currentVisualVolume = Math.sqrt(currentVolume);
                const scrollDirection = e.deltaY > 0 ? -0.1 : 0.1;
                const newVisualVolume = Math.max(0, Math.min(1, currentVisualVolume + scrollDirection));

                // Square the visual volume to simulate logarithmic perception
                audioRef.current.volume = newVisualVolume * newVisualVolume;
                volumeChangeRef.current.style.width = `${newVisualVolume * 100}%`;

                if (newVisualVolume > 0 && isMuted) {
                    setIsMuted(false);
                }
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [isMuted]);

    const handlePlayPause = () => {
        setIsPlaying(prev => !prev);
    }
    const handleNext = () => {
        console.log('next clicked')
    }
    const handlePrevious = () => {
        console.log('previous clicked')
    }

    const handleMetaDataLoad = () => {
        setAudioMetaData(true);
        const totalSeconds = Math.floor(audioRef.current.duration)
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        setDuration({ minutes, seconds });
    }

    const handleTimeUpdate = () => {
        const currentSeconds = Math.floor(audioRef.current.currentTime);
        const minutes = Math.floor(currentSeconds / 60);
        const seconds = currentSeconds % 60;
        const progressBarWidth = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        if (progressBarRef.current) {
            progressBarRef.current.style.width = `${progressBarWidth}%`;
        }
        setCurrentTime({ minutes, seconds });
    }

    const handleProgressBarClick = (e) => {
        const clickPosition = e.pageX - songBarRef.current.getBoundingClientRect().left;
        const clickPositionInPercent = (clickPosition / songBarRef.current.offsetWidth) * 100;

        //we get one percentage of seconds of current song from its total duration by dividing it with 100
        //we multiply it with the clicked position percentage of progress bar to get the seconds of song at clicked position
        const clickTimeInSeconds = (audioRef.current.duration / 100) * clickPositionInPercent;

        audioRef.current.currentTime = clickTimeInSeconds;
        // tho the OnTimeUpdateEvent event calls the below function on every current time change
        // calling the time update handling function on progress bar click so that there is no delay in updating the UI
        handleTimeUpdate();
    }

    const handleVolumeChange = (e) => {
        const volumeClickPosition = e.pageX - volumeControlBarRef.current.getBoundingClientRect().left;
        const volumeChangeInPercentage = (volumeClickPosition / volumeControlBarRef.current.offsetWidth) * 100;
        const visualVolume = 0.01 * volumeChangeInPercentage;

        // Square the visual volume to simulate logarithmic audio perception
        const actualVolume = visualVolume * visualVolume;

        audioRef.current.volume = actualVolume;
        volumeChangeRef.current.style.width = `${volumeChangeInPercentage}%`
        if (actualVolume > 0 && isMuted) {
            setIsMuted(false);
        }
    }

    const handleMuteToggle = () => {
        if (isMuted) {
            // Unmute
            audioRef.current.volume = previousVolume;
            const visualVolume = Math.sqrt(previousVolume);
            volumeChangeRef.current.style.width = `${visualVolume * 100}%`;
            setIsMuted(false);
        } else {
            // Mute
            setPreviousVolume(audioRef.current.volume);
            audioRef.current.volume = 0;
            volumeChangeRef.current.style.width = '0%';
            setIsMuted(true);
        }
    }

    if (!pickedSong) {
        return null;
    }

    return (
        <AudioPlayerContainerStyled>
            <AudioPlayerWrapperStyled>
                <audio onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleMetaDataLoad} style={{ display: "none" }} ref={audioRef}></audio>

                {/* 1. Playback Controls (Pinned Left) */}
                <PlaybackControlsGroupStyled>
                    <MainPlayButtonStyled onClick={handlePlayPause}>
                        {isPlaying ? <IoPause /> : <IoPlay style={{ marginLeft: '3px' }} />}
                    </MainPlayButtonStyled>

                    <ControlIconStyled className="prev-next" onClick={handlePrevious}>
                        <BiSkipPrevious />
                    </ControlIconStyled>
                    <ControlIconStyled className="prev-next" onClick={handleNext}>
                        <BiSkipNext />
                    </ControlIconStyled>

                    <ControlIconStyled $active={isShuffle} onClick={() => setIsShuffle(!isShuffle)}>
                        <IoShuffleOutline />
                    </ControlIconStyled>
                    <ControlIconStyled $active={isRepeat} onClick={() => setIsRepeat(!isRepeat)}>
                        <IoRepeatOutline />
                    </ControlIconStyled>
                </PlaybackControlsGroupStyled>

                {/* 2. Center Group (Pinned Center: Time, Bar, Vol, Art, Info) */}
                <CenterGroupStyled>
                    <SongSliderContainerStyled>
                        {audioMetaData && (
                            <>
                                <p className="current-time">{currentTime.minutes}:{currentTime.seconds < 10 ? '0' : ''}{currentTime.seconds}</p>
                                <ProgressBarContainerStyled ref={songBarRef} onClick={handleProgressBarClick}>
                                    <ProgressBarStyled ref={progressBarRef}></ProgressBarStyled>
                                </ProgressBarContainerStyled>
                                <p className="duration-text">{duration.minutes}:{duration.seconds < 10 ? '0' : ''}{duration.seconds}</p>
                            </>
                        )}
                    </SongSliderContainerStyled>

                    <VolumeControlContainerStyled>
                        <span className="react-icon" onClick={handleMuteToggle}>
                            {isMuted ? <MdVolumeMute /> : <MdVolumeUp />}
                        </span>
                        <VolumeControlBarStyled volumePercent={audioRef.current?.volume ? Math.sqrt(audioRef.current.volume) * 100 : 50} ref={volumeControlBarRef} onClick={handleVolumeChange}>
                            <VolumeChangeStyled ref={volumeChangeRef}></VolumeChangeStyled>
                        </VolumeControlBarStyled>
                    </VolumeControlContainerStyled>

                    <IdentityGroupStyled>
                        <ActiveSongWrapperStyled>
                            <ActiveSongImageContainerStyled>
                                <img src={pickedSong.songImage} alt="albumImage" />
                            </ActiveSongImageContainerStyled>
                            <ActiveSongDetailsStyled>
                                <p>{pickedSong.songName}</p>
                                <p>{pickedSong.artist}</p>
                                {pickedSong.album && <p className="album-name">{pickedSong.album}</p>}
                            </ActiveSongDetailsStyled>
                        </ActiveSongWrapperStyled>
                    </IdentityGroupStyled>
                </CenterGroupStyled>

                {/* 5. Action Icons */}
                <ActionGroupStyled>
                    {onToggleFavorite && (
                        <ActiveSongLikeButtonStyled onClick={onToggleFavorite} $isFavorite={isSongFavorite}>
                            {isSongFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
                        </ActiveSongLikeButtonStyled>
                    )}
                    <span><MdAddCircleOutline /></span>
                    
                    <span style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', marginLeft: '10px', paddingLeft: '15px' }}>
                        <MdOpenInFull />
                    </span>
                </ActionGroupStyled>
            </AudioPlayerWrapperStyled>
        </AudioPlayerContainerStyled>
    )
}