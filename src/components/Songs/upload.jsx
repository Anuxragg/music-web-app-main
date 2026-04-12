/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import api from '../../services/api';
import { 
    UploadContainerStyled, UploadHeaderStyled, ToggleGroupStyled, ToggleBtnStyled, 
    DropZoneStyled, FormGridStyled, InputGroupStyled, CoverUploadStyled, ActionRowStyled 
} from './upload.styled';
import { MdCloudUpload, MdImage, MdCheckCircle, MdLibraryMusic, MdAlbum } from 'react-icons/md';

export default function UploadSongs({ onCancel, user, songToEdit, prefillAlbum, onDelete, existingAlbums, notify, setGlobalLoading }) {
    const [mode, setMode] = useState('single'); // 'single' or 'album'
    const [file, setFile] = useState(null);
    const [cover, setCover] = useState(null);
    const [preview, setPreview] = useState(songToEdit?.coverUrl || null);
    const [metadata, setMetadata] = useState({
        title: songToEdit?.songName || '',
        artist: songToEdit?.artist || user?.username || '',
        album: prefillAlbum || songToEdit?.albumText || '',
        genre: songToEdit?.genre || 'Pop'
    });

    const [loading, setLoading] = useState(false);
    
    const fileInputRef = useRef(null);
    const coverInputRef = useRef(null);

    const handleFileDrop = (e) => {
        const droppedFile = e.target.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            // Pre-fill title from filename
            const cleanName = droppedFile.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
            setMetadata(prev => ({ ...prev, title: cleanName }));
        }
    };

    const handleCoverChange = (e) => {
        const droppedCover = e.target.files[0];
        if (droppedCover) {
            setCover(droppedCover);
            setPreview(URL.createObjectURL(droppedCover));
        }
    };

    const handlePublish = async () => {
        // If mode is 'single', we MUST have a track file
        // If mode is 'album', and we HAVE a track file, we upload the track to that album
        // If mode is 'album', and we DON'T HAVE a track file, we just create the Album shell
        
        if (mode === 'single' && !songToEdit && !file) {
            notify('Please select an audio file first.', 'error');
            return;
        }

        if (mode === 'album' && !metadata.album.trim()) {
            notify('Please enter an Album Name.', 'error');
            return;
        }

        if (setGlobalLoading) setGlobalLoading(songToEdit ? 'Updating track details...' : 'Publishing your track to Vocalz...');
        setLoading(true);
        try {
            if (songToEdit) {
                // Update existing song with FormData to support cover upload
                const formData = new FormData();
                formData.append('title', metadata.title);
                formData.append('artist', metadata.artist);
                formData.append('genre', metadata.genre);
                formData.append('albumText', metadata.album || '');
                if (cover) formData.append('cover', cover);

                await api.patch(`/songs/${songToEdit.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                
                notify('Song updated successfully!');
                onCancel();
                window.location.reload();
                return;
            }

            // Case 1: Create an empty Album shell (No song file uploaded)
            if (mode === 'album' && !file) {
                const formData = new FormData();
                if (cover) formData.append('cover', cover);
                formData.append('title', metadata.album); // The album's title
                formData.append('artist', metadata.artist);
                formData.append('genre', metadata.genre);
                
                const res = await api.post('/albums', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                if (res.data?.success) {
                    notify('Album shell created! You can now upload songs to this album.');
                    onCancel();
                    window.location.reload();
                }
                return;
            }

            // Case 2: Upload a track (and optionally link/create album)
            const formData = new FormData();
            formData.append('audio', file);
            if (cover) formData.append('cover', cover);
            formData.append('title', metadata.title);
            formData.append('artist', metadata.artist);
            formData.append('genre', metadata.genre);
            formData.append('albumText', metadata.album || '');
            formData.append('isPublic', 'true');

            const res = await api.post('/songs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.data?.success) {
                notify('Success! Your track is now live on Vocalz.');
                onCancel(); // Close the upload view
                window.location.reload(); 
            }
        } catch (err) {
            console.error('Upload error:', err);
            notify(err.response?.data?.message || 'Failed to process request.', 'error');
        } finally {
            setLoading(false);
            if (setGlobalLoading) setGlobalLoading(null);
        }
    };

    return (
        <UploadContainerStyled>
            <UploadHeaderStyled>
                <h1>{songToEdit ? 'Edit Song' : 'Upload Music'}</h1>
                <p>Add {mode === 'album' ? 'an entire album' : 'a new track'} to the Vocalz Library</p>
            </UploadHeaderStyled>

            {!songToEdit && (
                <ToggleGroupStyled>
                    <ToggleBtnStyled $active={mode === 'single'} onClick={() => setMode('single')}>
                        <MdLibraryMusic style={{marginRight: '8px'}} /> Single Track
                    </ToggleBtnStyled>
                    <ToggleBtnStyled $active={mode === 'album'} onClick={() => setMode('album')}>
                        <MdAlbum style={{marginRight: '8px'}} /> Create Album
                    </ToggleBtnStyled>
                </ToggleGroupStyled>
            )}

            {!songToEdit && (!file ? (
                <DropZoneStyled onClick={() => fileInputRef.current?.click()}>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{display: 'none'}} 
                        accept="audio/*" 
                        onChange={handleFileDrop}
                        multiple={mode === 'album'}
                    />
                    <div className="icon"><MdCloudUpload /></div>
                    <p>Click to select or drag {mode === 'album' ? 'multiple files' : 'a file'}</p>
                    <span>High quality WAV or MP3 preferred</span>
                </DropZoneStyled>
            ) : (
                <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(30,215,96,0.05)', borderRadius: '8px', border: '1px solid #1ed760', marginBottom: '20px' }}>
                    <MdCheckCircle style={{ color: '#1ed760', fontSize: '24px', verticalAlign: 'middle', marginRight: '10px' }} />
                    <span style={{ color: 'white', fontWeight: '500' }}>{file.name} ready for upload</span>
                </div>
            ))}

            <CoverUploadStyled>
                <div className="preview-box">
                    {preview ? <img src={preview} alt="cover" /> : <MdImage />}
                </div>
                <div className="details">
                    <p>{mode === 'album' ? 'Album' : 'Track'} Artwork</p>
                    <span>Recommended: 1000x1000px JPG or PNG</span>
                </div>
                <button onClick={() => coverInputRef.current?.click()}>Choose Cover</button>
                <input 
                    type="file" 
                    ref={coverInputRef} 
                    style={{display: 'none'}} 
                    accept="image/*" 
                    onChange={handleCoverChange}
                />
            </CoverUploadStyled>

            <FormGridStyled>
                <InputGroupStyled>
                    <label>Track Name</label>
                    <input 
                        value={metadata.title} 
                        placeholder="e.g. Blinding Lights" 
                        onChange={(e) => setMetadata(m => ({...m, title: e.target.value}))}
                    />
                </InputGroupStyled>
                <InputGroupStyled>
                    <label>Artist</label>
                    <input 
                        value={metadata.artist} 
                        placeholder="Who is this?" 
                        onChange={(e) => setMetadata(m => ({...m, artist: e.target.value}))}
                    />
                </InputGroupStyled>
                <InputGroupStyled>
                    <label>Album Name</label>
                    <input 
                        list="album-list"
                        value={metadata.album} 
                        placeholder={mode === 'album' ? "Enter album name..." : "Optional: Add to an album"} 
                        disabled={!!prefillAlbum}
                        style={prefillAlbum ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
                        onChange={(e) => setMetadata(m => ({...m, album: e.target.value}))}
                    />
                </InputGroupStyled>
                <InputGroupStyled>
                    <label>Genre</label>
                    <select 
                        value={metadata.genre} 
                        onChange={(e) => setMetadata(m => ({...m, genre: e.target.value}))}
                    >
                        <option>Pop</option>
                        <option>Romance</option>
                        <option>Sad</option>
                        <option>Hip Hop</option>
                        <option>Bollywood</option>
                        <option>Rap</option>
                        <option>Rock</option>
                        <option>Phonk</option>
                    </select>
                </InputGroupStyled>
                <datalist id="album-list">
                    {existingAlbums?.map(name => (
                        <option key={name} value={name} />
                    ))}
                </datalist>
            </FormGridStyled>

            <ActionRowStyled>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="cancel" onClick={onCancel} disabled={loading}>Cancel</button>
                    {songToEdit && onDelete && (
                        <button 
                            className="cancel" 
                            style={{ color: '#ff4d4d', border: '1px solid #333' }} 
                            onClick={() => {
                                onDelete(songToEdit.id);
                                onCancel();
                            }}
                            disabled={loading}
                        >
                            Delete Track
                        </button>
                    )}
                </div>
                <button className="publish" onClick={handlePublish} disabled={loading}>
                    {loading ? 'Processing...' : (songToEdit ? 'Update Details' : 'Publish Track')}
                </button>
            </ActionRowStyled>
        </UploadContainerStyled>
    );
}
