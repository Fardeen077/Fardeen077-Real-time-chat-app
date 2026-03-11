import React from 'react'
import ChatHeader from './ChatHeader';
import useMessageStore from '../../store/useMessageStore';
import useAuthStore from '../../store/useAuthStore';
import { useEffect, useRef } from 'react';
import MessageInput from './MessageInput';
import formatMessageTime from '../../lib/formatMessageTime';

function Messages() {
    const messages = useMessageStore((state) => state.messages);
    const selectUser = useMessageStore((state) => state.selectUser);
    const isMessageLoading = useMessageStore((state) => state.isMessageLoading);
    const getMessages = useMessageStore((state) => state.getMessages);
    const subscribeToMessages = useMessageStore((state) => state.subscribeToMessages);
    const unsubscribeFromMessages = useMessageStore((state) => state.unsubscribeFromMessages);

    const authUser = useAuthStore((state) => state.authUser);
    const messageEndRef = useRef(null);

    useEffect(() => {
        if (!selectUser?._id) return;
        getMessages(selectUser?._id);
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    }, [selectUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (isMessageLoading) return <div>Loading...</div>

    return (
        <div className='flex flex-1 flex-col overflow-auto '>

            {messages.map((message) => (
                    <div key={message._id}
                        className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                    ref={messageEndRef}>

                        <div className='chat-image avatar'>
                            <div className='size-10 rounded-full border'>
                                <img src={message.senderId === authUser._id ? authUser.profileImage : selectUser.profileImage} alt="profile impage" />
                            </div>
                        </div>

                        <div className='chat-header mb-1'>
                            <time className='text-sm opacity-50 ml-1'>
                                {formatMessageTime(message.createdAt)}
                            </time>
                        </div>
                        <div className='chat-bubble flex flex-col'>
                            {message.image && (
                                <img src={message.image} alt="Attachment"
                                    className='sm:max-w-[200px] rounded-md mb-2' />
                            )}
                            {message.text && <p>{message.text}</p>}
                        </div>
                    </div>
            ))}
            {/* <MessageInput /> */}
        </div>
    );
}

export default Messages
