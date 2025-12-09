import { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Register from "./pages/Register"
import Login from "./pages/Login";
import SettingsPage from './pages/SettingsPage';
import Profile from "./pages/Profile";
import { useAuthStore } from './store/useAuth';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemes';


function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth)
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    );

  return (
    <div data-theme={theme}>
      {authUser && <Navbar />}
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />

        {/* FIXED: Correct spelling */}
        <Route path='/register' element={!authUser ? <Register /> : <Navigate to="/" />} />

        <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />

        <Route path='/settings' element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />

        <Route path='/profile' element={authUser ? <Profile /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
