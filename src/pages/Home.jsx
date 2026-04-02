import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoPersonCircleOutline } from 'react-icons/io5';
import Navbar from '../components/Navbar/navbar'
import Search from '../components/Search/search'
import Songs from '../components/Songs/songsList'

function Home() {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const [favorites, setFavorites] = useState([]);
  const [currentView, setCurrentView] = useState('Home');
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/session`, {
          method: 'GET',
          credentials: 'include',
        });
        setIsLoggedIn(res.ok);
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, [API_BASE]);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      // Proceed with local logout UI state even if network fails.
    }

    setIsLoggedIn(false);
    setProfileOpen(false);
    setCurrentView('Home');
    navigate('/login');
  };

  return (
    <div className="App">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      <div className="app-comp-wrap">
        <div className="home-topbar">
          <div className="profile-menu" ref={profileMenuRef}>
            <button className="profile-trigger" onClick={() => setProfileOpen(prev => !prev)}>
              <IoPersonCircleOutline />
              <span>Profile</span>
            </button>

            {profileOpen && (
              <div className="profile-dropdown">
                {isLoggedIn ? (
                  <>
                    <button
                      className="profile-action"
                      onClick={() => {
                        setCurrentView('Listen History');
                        setProfileOpen(false);
                      }}
                    >
                      Listen History
                    </button>
                    <button className="profile-action logout" onClick={handleLogout}>Logout</button>
                  </>
                ) : (
                  <>
                    <button className="profile-action" onClick={() => navigate('/login')}>Login</button>
                    <button className="profile-action" onClick={() => navigate('/register')}>Sign Up</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <Search />
        <Songs
          favorites={favorites}
          setFavorites={setFavorites}
          currentView={currentView}
        />
      </div>
    </div>
  );
}

export default Home;
