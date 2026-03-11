import React from 'react'
import { CiChat1 } from "react-icons/ci";
function UnchatBox() {
    return (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                <div className="text-5xl"><CiChat1 /></div>

                <h2 className="text-xl font-semibold">
                    Welcome to Chat
                </h2>

                <p className="text-gray-500">
                    Select a conversation from the sidebar to start chatting
                </p>
            </div>
    )
}

export default UnchatBox
