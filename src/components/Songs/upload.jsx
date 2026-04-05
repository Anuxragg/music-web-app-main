/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import { 
    UploadContainerStyled, UploadHeaderStyled, ToggleGroupStyled, ToggleBtnStyled, 
    DropZoneStyled, FormGridStyled, InputGroupStyled, CoverUploadStyled, ActionRowStyled 
} from './upload.styled';
import { MdCloudUpload, MdImage, MdCheckCircle, MdLibraryMusic, MdAlbum } from 'react-icons/md';

export default function UploadSongs({ user, onCancel }) {
    const [mode, setMode] = useState('single'); // 'single' or 'album'
    const [file, setFile] = useState(null);
    const [cover, setCover] = useState(null);
    const [preview, setPreview] = useState(null);
    const [metadata, setMetadata] = useState({
        title: '',
        artist: user?.username || '',
        album: '',
        genre: 'Pop'
    });

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
        // Logic for backend upload will go here
        console.log('Publishing:', { file, cover, metadata, mode });
        alert('Ready to publish! Connect backend API next.');
    };

    return (
        <UploadContainerStyled>
            <UploadHeaderStyled>
                <h1>Upload Music</h1>
                <p>Add {mode === 'album' ? 'an entire album' : 'a new track'} to the Vocalz Library</p>
            </UploadHeaderStyled>

            <ToggleGroupStyled>
                <ToggleBtnStyled $active={mode === 'single'} onClick={() => setMode('single')}>
                    <MdLibraryMusic style={{marginRight: '8px'}} /> Single Track
                </ToggleBtnStyled>
                <ToggleBtnStyled $active={mode === 'album'} onClick={() => setMode('album')}>
                    <MdAlbum style={{marginRight: '8px'}} /> Create Album
                </ToggleBtnStyled>
            </ToggleGroupStyled>

            {!file ? (
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
            )}

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
                    <label>{mode === 'album' ? 'Album Title' : 'Track Title'}</label>
                    <input 
                        value={metadata.title} 
                        placeholder="Enter catchy name..." 
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
                    <label>Genre</label>
                    <select 
                        value={metadata.genre} 
                        onChange={(e) => setMetadata(m => ({...m, genre: e.target.value}))}
                    >
                        <option>Pop</option>
                        <option>Romance</option>
                        <option>Hip Hop</option>
                        <option>Bollywood</option>
                        <option>Rap</option>
                        <option>Rock</option>
                        <option>Phonk</option>
                    </select>
                </InputGroupStyled>
                {mode === 'single' && (
                    <InputGroupStyled>
                        <label>Album (Optional)</label>
                        <input 
                            value={metadata.album} 
                            placeholder="Part of a collection?" 
                            onChange={(e) => setMetadata(m => ({...m, album: e.target.value}))}
                        />
                    </InputGroupStyled>
                )}
            </FormGridStyled>

            <ActionRowStyled>
                <button className="cancel" onClick={onCancel}>Cancel</button>
                <button className="publish" onClick={handlePublish}>Publish to Vocalz</button>
            </ActionRowStyled>
        </UploadContainerStyled>
    );
}
