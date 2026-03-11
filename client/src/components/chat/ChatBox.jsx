import React from 'react'
import Messages from "./Messages"
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
function ChatBox() {
    return (
        <div className='flex flex-col h-full p-5'>
            <ChatHeader />
            <Messages />
            <MessageInput />
        </div>
    )
}

export default ChatBox
