import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/navbar'
import TopNav from '../components/Navbar/TopNav';
import Search from '../components/Search/search'
import Songs from '../components/Songs/songsList'
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [currentView, setCurrentView] = useState('Home');
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      api.get('/users/me/likes')
        .then(res => {
          if (res.data?.success) {
            setFavorites(res.data.data.map(String));
          }
        })
        .catch(err => console.error("Error fetching favorites", err));
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated, user?.username]);

  return (
    <div className="App">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      
      <div className="app-comp-wrap">
        {/* Spotify-style Top Nav Pill Navigation */}
        <TopNav 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          onSearch={setSearchResults}
        />
        
        <Songs
          user={user}
          favorites={favorites}
          setFavorites={setFavorites}
          currentView={currentView}
          setCurrentView={setCurrentView}
          searchResults={searchResults}
        />
      </div>
    </div>
  );
}

export default Home;
