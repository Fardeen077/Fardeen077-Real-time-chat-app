import React, { useEffect, useState } from 'react'
import useMessageStore from '../../store/useMessageStore'
import useAuthStore from '../../store/useAuthStore';
import { FaRegUser } from "react-icons/fa";

function UsersList() {
    // const { selectUser, isUsersLoading, setSelectedUser } = useMessageStore((state) => ({
    //     // getUsers: state.getUsers,
    //     // users: state.users,
    //     isUsersLoading: state.isUsersLoading,
    //     selectUser: state.selectUser,
    //     setSelectedUser: state.setSelectedUser
    // }));
    const users = useMessageStore((state) => state.users);
    const getUsers = useMessageStore((state) => state.getUsers);
    const isUsersLoading = useMessageStore((state) => state.isUsersLoading);
    const selectUser = useMessageStore((state) => state.selectUser);
    const setSelectedUser = useMessageStore((state) => state.setSelectedUser);

    const onlineUsers = useAuthStore((state) => state.onlineUsers);
    const [showOnlineUsers, setShowOnlineUsers] = useState(false);


    useEffect(() => {
        getUsers();
        // console.log("users:", users);
        // console.log("onlineUsers:", onlineUsers);
        // console.log("filterUsers:", filterUsers);
    }, [getUsers]);

    console.log(onlineUsers);

    const filterUsers = showOnlineUsers ? users.filter((user) => onlineUsers.includes(user._id)) : users;

    if (isUsersLoading) return <div className="p-4">Loading...</div>;

    return (
        <aside className='w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
            <div className='border-b border-base-300 w-full p-5'>
                <div className='flex items-center gap-2'>
                    <FaRegUser />
                    <span className='font-medium hidden lg:block'>Contacts</span>
                </div>

                {/* Online filter  */}

                <div className='mt-3 hidden lg:flex items-center gap-2'>
                    <div className='cursor-pointer flex items-center gap-2'>
                        <input type="checkbox"
                            checked={showOnlineUsers}
                            onChange={(e) => setShowOnlineUsers(e.target.checked)}
                            className='checkbox checkbox-sm' />
                        <span className="text-sm">Show online only</span>
                    </div>
                    <span className='text-sm text-zinc-500'>({onlineUsers.length - 1}) online</span>
                </div>
            </div>

            <div>
                {filterUsers.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}>
                        <div className='relative mx-auto lg:mx-0'>
                            <img src={user.profileImage} alt={user.name}
                                className="size-12 object-cover rounded-full" />

                            {(onlineUsers || []).includes(user._id) && (
                                <span
                                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                                />
                            )}
                        </div>

                        <div className="hidden lg:block text-left min-w-0">
                            <div className='text-sm text-zinc-400'>
                                {user.username}

                                <div className='text-sm text-zinc-400'>
                                    {(onlineUsers || []).includes(user._id) ? "Online" : "Offline"}
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
                {filterUsers.length === 0 && (
                    <div className='text-center text-zinc-500 py-4'>
                        No online Users
                    </div>
                )}
            </div>
        </aside>
    )
}

export default UsersList
