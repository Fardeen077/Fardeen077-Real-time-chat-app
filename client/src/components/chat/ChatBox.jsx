import React from 'react'
import Messages from "./Messages"
import ChatHeader from './ChatHeader'
function ChatBox() {
    return (
        <div className='w-full'>
            <ChatHeader />
            <Messages />
        </div>
    )
}

export default ChatBox
