import React, { useState } from 'react'
import useAuthStore from '../store/useAuthStore'
import { FaCamera, FaRegUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import toast from 'react-hot-toast';

function Profile() {
    const authUser = useAuthStore((state) => state.authUser);
    const [selectImage, setSelectImage] = useState(null);
    const updateProfile = useAuthStore((state) => state.updateProfile);
    const isUpdatingProfile = useAuthStore((state) => state.isUpdatingProfile);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const render = new FileReader();

        render.onloadend = async () => {
            const baseImage = render.result;
            setSelectImage(baseImage)
            try {
                await updateProfile({ profileImage: baseImage });
                toast.success("Profile update successfully")
            } catch (error) {
                toast.error(error.message || "Image upload faild");
            }
        }
        render.readAsDataURL(file);
    }
    if (isUpdatingProfile) return <div className='flex items-center justify-center mt-52 gap-2'>
        <span className="loading loading-spinner text-info"> </span>
        <p>Uploading image...</p>
    </div>
    return (
        <div className='flex p-10 justify-center'>
            <div className='bg-base-100 w-full max-w-md rounded-2xl shadow-lg p-8 flex flex-col items-center gap-5'>
                <div className='relative'>
                    <img src={selectImage || authUser?.profileImage}
                        alt="profile"
                        className='size-40 rounded-full object-cover' />

                    <label htmlFor="avatar-upload"
                        className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}>

                        <FaCamera className='w-5 h-5 text-base-200' />
                        <input type="file"
                            className='hidden'
                            accept='image/*'
                            id='avatar-upload'
                            onChange={handleUpload}
                            disabled={isUpdatingProfile} />
                    </label>
                </div>
                <p className="text-sm text-zinc-400 text-center">
                    {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
                </p>
                <div className="flex gap-3 bg-base-200 p-4 rounded-lg w-full">
                    <FaRegUser className="text-xl opacity-70" />
                    <div>
                        <p className="text-sm text-zinc-400">Username</p>
                        <p className="font-medium">{authUser?.username}</p>
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 bg-base-200 p-4 rounded-lg w-full">
                    <MdEmail className="text-xl opacity-70" />
                    <div>
                        <p className="text-sm text-zinc-400">Email</p>
                        <p className="font-medium">{authUser?.email}</p>
                    </div>
                </div>

                <div className="text-sm flex gap-4 flex-col justify-center w-full">
                    <div className="flex items-center justify-between border-zinc-700">
                        <span>Member Since: </span>
                        <span>{authUser?.createdAt?.split("T")[0]}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Account Status: </span>
                        <span className="text-green-500">Active</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
