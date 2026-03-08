import React from 'react'
import toast from 'react-hot-toast'
import useMessageStore from '../../store/useMessageStore'
import { useState, useRef } from 'react';
import { IoSend } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { MdAttachFile } from "react-icons/md";

function MessageInput() {
    const sendMessage = useMessageStore((state) => state.sendMessage);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const [text, setText] = useState("");

    const handleLoadImage = async (e) => {
        try {
            const file = e.target.files?.[0];
            if (!file) return;
            if (!file.type.startsWith("image/")) {
                toast.error("Please select an image file");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview,
            });
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <div className='p-4 w-full'>
            {imagePreview && (
                <div className='mb-3 flex item-center gap-2'>
                    <div className='relative'>
                        <img src={imagePreview}
                            alt="Preview"
                            className='w-20 h-20 object-cover rounded-lg border border-zinc-700' />

                        <button onClick={removeImage}
                            className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300'>
                            <IoMdClose />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage}
                className='flex items-center gap-2'>
                <div className='flex-1 flex gap-2'>
                    <input type="text"
                        placeholder='Type a message'
                        className='input w-full bg-base-300 input-bordered rounded-lg input-sm sm:input-md'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <input type="file"
                        accept='image/*'
                        className='hidden'
                        ref={fileInputRef}
                        onChange={handleLoadImage} />

                    <button
                        type='button'
                        className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-500"}`} onClick={() => fileInputRef.current?.click()}>
                        <MdAttachFile />
                    </button>
                </div>
                <button
                    type='submit'
                    className='btn btn-sm btn-circle'
                    disabled={!text.trim() && !imagePreview}
                >
                    <IoSend />
                </button>
            </form>
        </div>
    )
}

export default MessageInput
