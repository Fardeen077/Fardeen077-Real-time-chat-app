import { useChatStore } from "../store/useChat";
import toast from "react-hot-toast";
import { Image, Send, X } from "lucide-react";
import { useRef, useState } from "react";

const MessageInput = () => {
    // states
    const [text, setText] = useState("");
    const { sendMessage } = useChatStore();
    const [imagePreview, setimagePreview] = useState(null);
    const [isUploading, setIsUplaoding] = useState(false);
    const [isSending, setIsSending] = useState(false)
    const fileInputRef = useRef();

    // target device local image file only not pdf not url , movies file any zip file 
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const rander = new FileReader(); // convert url
        rander.onloadend = () => {
            setimagePreview(rander.result);
        }
        rander.readAsDataURL(file);
    };

    // Clear file or imagePreview file
    const removeImage = () => {
        setimagePreview(null); // Remove image preview from UI
        // Reset file input so user can reselect the same file
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        // check image or text is not present 
        if (!text.trim() && !imagePreview) return // stop code
        if (isSending || isUploading) return
        setIsSending(true);

        // send image or text
        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview
            });

            // clear text
            setText("");
            setimagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to send message:", error);
        } finally {
             setIsSending(false);
        }
    };
    return (
        <div className="p-4 w-full">
            {imagePreview && (
                <div>
                    <div>
                        <img src={imagePreview} alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700" />

                        <button onClick={removeImage}
                            className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300'>
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
                <div className='flex-1 flex gap-2'>
                    <input
                        type="text"
                        placeholder='Type a message...'
                        className='input w-full bg-base-300 input-bordered rounded-lg input-sm sm:input-md'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <input
                        type="file"
                        accept='image/*'
                        className='hidden'
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20} />
                    </button>
                </div>
                <button
                    type="submit"
                    className="btn btn-sm btn-circle"
                    disabled={
                        (!text.trim() && !imagePreview) ||
                        isUploading ||
                        isSending
                    }
                >
                    {(isUploading || isSending)
                        ? <span className="loading loading-spinner loading-sm"></span>
                        : <Send size={22} />
                    }
                </button>
            </form>
        </div>
    )
}
export default MessageInput