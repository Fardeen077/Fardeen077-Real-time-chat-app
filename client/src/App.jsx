import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register'
import Home from './pages/Home';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import useAuthStore from './store/useAuthStore';
import { useEffect } from 'react';
import PublicRouter from './components/PublicRouter';
import ProtectedRouter from './components/ProtectedRouter';

function App() {
    const getMe = useAuthStore((state) => state.getMe);
    const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
    const connectSocket = useAuthStore((state)=> state.connectSocket);
    const authUser = useAuthStore((state)=> state.authUser)
    
    useEffect(() => {
        getMe()
    }, []);

    useEffect(()=> {
        if(authUser) {
            connectSocket()
            // console.log(authUser);
        }
    }, [authUser]);

    if (isAuthLoading) {
        return <span className="loading loading-spinner text-info"></span>
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRouter />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>

                {/* PUBLIC ROUTES  */}
                <Route element={<PublicRouter />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route path="*" element={< NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
