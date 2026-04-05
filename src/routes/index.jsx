import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import AuthPage from '../pages/AuthPage';
import PrivateRoute from './PrivateRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute element={<Home />} />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />
    </Routes>
  );
}

export default AppRoutes;
