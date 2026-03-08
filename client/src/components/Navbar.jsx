import React from 'react'
import useAuthStore from '../store/useAuthStore'
import toast from 'react-hot-toast';
import useMessageStore from '../store/useMessageStore';

function Navbar() {
    const logout = useAuthStore((state) => state.logout);
    const authUser = useAuthStore((state) => state.authUser);
    const authError = useAuthStore((state) => state.authError);

    const hanldeLogout = async () => {
        try {
            await logout();
            toast.success("Logout successfully");
        } catch (error) {
            toast.error(authError || "Intrnal error")
        }
    }
    return (
        <nav className="w-full bg-base-200 border-b border-base-300 p-4 shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* Logo */}
                <div className="text-xl font-semibold text-primary">
                    Logo
                </div>

                {/* Right section */}
                <div className="flex items-center gap-6">

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-base-300">
                        <img
                            src={authUser?.profileImage || ""}
                            alt="User Avatar"
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={hanldeLogout}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
