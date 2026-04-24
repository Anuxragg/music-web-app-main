/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import api from '../../services/api';
import { 
    UploadContainerStyled, UploadHeaderStyled, ToggleGroupStyled, ToggleBtnStyled, 
    DropZoneStyled, FormGridStyled, InputGroupStyled, CoverUploadStyled, ActionRowStyled 
} from './upload.styled';
import { MdCloudUpload, MdImage, MdCheckCircle, MdLibraryMusic, MdAlbum } from 'react-icons/md';

export default function UploadSongs({ onCancel, user, songToEdit, prefillAlbum, onDelete, existingAlbums, notify, setGlobalLoading }) {
    const [mode, setMode] = useState('single'); // 'single' or 'album'
    const [files, setFiles] = useState([]);
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

    // Auto-inherit album cover preview
    useEffect(() => {
        if (mode === 'single' && !cover && metadata.album) {
            const match = existingAlbums?.find(a => 
                (a.title || a).toString().toLowerCase() === metadata.album.trim().toLowerCase()
            );
            if (match?.coverUrl) setPreview(match.coverUrl);
        }
    }, [metadata.album, cover, mode, existingAlbums]);

    const handleFileDrop = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 0) {
            setFiles(selectedFiles);
            // Pre-fill title from filename
            if (selectedFiles.length === 1) {
                const cleanName = selectedFiles[0].name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
                setMetadata(prev => ({ ...prev, title: cleanName }));
            } else {
                setMetadata(prev => ({ ...prev, title: 'Multiple Tracks' }));
            }
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
        
        if (mode === 'single' && !songToEdit && files.length === 0) {
            notify('Please select an audio file first.', 'error');
            return;
        }

        if (mode === 'album' && !metadata.album.trim()) {
            notify('Please enter an Album Name.', 'error');
            return;
        }

        if (setGlobalLoading) setGlobalLoading(songToEdit ? 'Updating track details...' : (files.length > 1 ? `Publishing ${files.length} tracks to Vocalz...` : 'Publishing your track to Vocalz...'));
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

                await api.patch(`/songs/${songToEdit.id}`, formData);
                
                notify('Song updated successfully!');
                onCancel();
                window.location.reload();
                return;
            }

            let createdAlbumId = null;
            if (mode === 'album') {
                const albumFormData = new FormData();
                if (cover) albumFormData.append('cover', cover);
                albumFormData.append('title', metadata.album || metadata.title || 'Untitled Album');
                albumFormData.append('artist', metadata.artist);
                albumFormData.append('genre', metadata.genre);
                
                const res = await api.post('/albums', albumFormData);

                if (res.data?.success) {
                    createdAlbumId = res.data.data._id;
                    if (files.length === 0) {
                        notify('Album created! You can now upload songs to this album.');
                        onCancel();
                        window.location.reload();
                        return;
                    }
                }
            }

            // Case 2: Upload a track (and optionally link/create album)
            if (files.length === 0) {
                notify('Please select an audio file to upload.', 'error');
                return;
            }

            for (let i = 0; i < files.length; i++) {
                const currentFile = files[i];
                const cleanName = currentFile.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
                const trackTitle = files.length === 1 ? metadata.title : cleanName;

                const formData = new FormData();
                formData.append('audio', currentFile);
                if (cover && mode !== 'album') formData.append('cover', cover);
                formData.append('title', trackTitle);
                formData.append('artist', metadata.artist);
                formData.append('genre', metadata.genre);
                formData.append('albumText', metadata.album || '');
                if (createdAlbumId) formData.append('album', createdAlbumId);
                formData.append('isPublic', 'true');

                await api.post('/songs', formData);
            }

            notify(`Success! ${files.length} track(s) uploaded successfully.`);
            onCancel(); // Close the upload view
            window.location.reload(); 

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

            {!songToEdit && (files.length === 0 ? (
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
                <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(248,56,33,0.05)', borderRadius: '8px', border: '1px solid #f83821', marginBottom: '20px' }}>
                    <MdCheckCircle style={{ color: '#f83821', fontSize: '24px', verticalAlign: 'middle', marginRight: '10px' }} />
                    <span style={{ color: 'white', fontWeight: '500' }}>
                        {files.length === 1 ? `${files[0].name} ready for upload` : `${files.length} files ready for upload`}
                    </span>
                </div>
            ))}

            <CoverUploadStyled>
                <div className="preview-box">
                    {preview ? <img src={preview} alt="cover" /> : <MdImage />}
                </div>
                <div className="details">
                    <p>{mode === 'album' ? 'Album' : 'Track'} Artwork</p>
                    <span>Recommended: 1000x1000px JPG or PNG</span>
                    {!cover && metadata.album && (
                        <span style={{ 
                            color: '#f83821', 
                            display: 'block', 
                            marginTop: '6px', 
                            fontSize: '12px', 
                            fontWeight: '600',
                            background: 'rgba(248, 56, 33, 0.1)',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            width: 'fit-content'
                        }}>
                            ✨ Will inherit cover from "{metadata.album}"
                        </span>
                    )}
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
                        disabled={files.length > 1}
                        style={files.length > 1 ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
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
                    {existingAlbums?.map(alb => (
                        <option key={alb._id || alb} value={alb.title || alb} />
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
