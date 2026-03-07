import React from 'react'
import Navbar from '../components/Navbar'
import UsersList from '../components/sidebar/UsersList'
import ChatBox from '../components/chat/ChatBox'
function Home() {
    return (
            <div className="flex items-center justify-center pt-20 px-4">
                <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                    <div className="flex h-full rounded-lg overflow-hidden">
                        <UsersList />
                        <ChatBox />
                    </div>
                </div>
            </div>
    )
};

export default Home
