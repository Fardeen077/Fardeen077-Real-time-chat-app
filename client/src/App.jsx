import React from 'react'
import Register from './pages/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import useAuthStore from './store/useAuthStore';
import { useEffect } from 'react';

function App() {
    const getMe = useAuthStore((state) => state.getMe);
    useEffect(() => {
        getMe();
    }, [])
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
