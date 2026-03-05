import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import toast, { Toaster } from 'react-hot-toast';
import App from './App.jsx'
import "./index.css"

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
        <Toaster />
    </StrictMode>
);