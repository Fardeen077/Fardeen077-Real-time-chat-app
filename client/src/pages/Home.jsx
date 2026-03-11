import React from 'react'
import UsersList from '../components/sidebar/UsersList'
import ChatBox from '../components/chat/ChatBox'
import UnchatBox from '../components/chat/UnchatBox'
import useMessageStore from '../store/useMessageStore'
function Home() {
    const selectUser = useMessageStore(state => state.selectUser)
    return (
        <div className="flex justify-center lg:mt-2">
            <div className="bg-base-100 lg:rounded-lg shadow-cl w-full max-w-6xl h-[100vh] lg:h-[calc(100vh-6rem)]">
                <div className="flex rounded-lg overflow-hidden h-full">
                    <UsersList />
                    <div className="flex-1 h-full">
                        {selectUser ? <ChatBox /> : <UnchatBox />}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home
