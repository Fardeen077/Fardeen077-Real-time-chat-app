import React from 'react'
import Messages from "./Messages"
import ChatHeader from './ChatHeader'
function ChatBox() {
    return (
        <div className='bg-blue-600 w-full'>
            <ChatHeader/>
            <Messages/>
        </div>
    )
}

export default ChatBox
