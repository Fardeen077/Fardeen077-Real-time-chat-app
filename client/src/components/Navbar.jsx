import React from 'react'
import useAuthStore from '../store/useAuthStore'
import toast from 'react-hot-toast';

function Navbar() {
    const logout = useAuthStore((state)=> state.logout);
    const authError = useAuthStore((state)=> state.authError);
    const hanldeLogout = async()=> {
        try {
            await logout();
            toast.success("Logout successfully");
        } catch (error) {
            toast.error(authError || "Intrnal error")
        }
    }
    return (
        <button onClick={hanldeLogout}>Logout</button>
    )
}

export default Navbar
