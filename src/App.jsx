import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/navbar'
import Search from './components/Search/search'
import Songs from './components/Songs/songsList'
// import AudioPlayer from './components/audioPlayer'
function App() {
  const [favorites, setFavorites] = useState([]);
  const [currentView, setCurrentView] = useState('Home');

  return (
    <div className="App">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      <div className="app-comp-wrap">
        <Search />
        <Songs
          favorites={favorites}
          setFavorites={setFavorites}
          currentView={currentView}
        />
      </div>
      {/* <AudioPlayer /> */}
    </div>
  );
}

export default App;