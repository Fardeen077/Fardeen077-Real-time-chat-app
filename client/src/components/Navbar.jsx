import React from 'react'
import useAuthStore from '../store/useAuthStore'
import toast from 'react-hot-toast';
import { RxAvatar } from "react-icons/rx";
import { Link } from 'react-router-dom';

function Navbar() {
    const logout = useAuthStore((state) => state.logout);
    const authUser = useAuthStore((state) => state.authUser);

    const hanldeLogout = async () => {
        try {
            await logout();
            toast.success("Logout successfully");
        } catch (error) {
            toast.error(error.message || "Intrnal error")
        }
    }
    return (
        <nav className="w-full bg-base-200 border-b border-base-300 p-4 shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* Logo */}
                <Link to={"/"}>
                    <div className="text-xl font-semibold text-primary">
                        Logo
                    </div>
                </Link>

                {/* Right section */}
                <div className="flex items-center gap-6">

                    <Link to={"/profile"}>
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-base-300">
                            {authUser?.profileImage ? (
                                <img
                                    src={authUser.profileImage}
                                    alt="User Avatar"
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <RxAvatar className="object-cover w-full h-full bg-gray-200" />
                            )}
                        </div>
                    </Link>

                    <button
                        onClick={hanldeLogout}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
