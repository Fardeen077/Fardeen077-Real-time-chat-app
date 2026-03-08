import { IoMdClose } from "react-icons/io";
import useAuthStore from "../../store/useAuthStore";
import useMessageStore from "../../store/useMessageStore";

const ChatHeader = () => {
    const selectUser = useMessageStore((state) => state.selectUser);
    const setSelectedUser = useMessageStore((state) => state.setSelectedUser);
    // const authUser = useAuthStore((state) => state.authUser)

    const onlineUsers = useAuthStore((state) => state.onlineUsers);
    // console.log(selectUser?.profileImage);
    // console.log(onlineUsers);
    // console.log(authUser);


    return (
        <div className="border-b border-base-300 p-2">
            <div className="flex items-center justify-between mx-5">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="size-10 rounded-full">
                            <img src={selectUser?.profileImage} alt={selectUser?.username} />
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium">{selectUser?.username}</h3>
                        <p className="text-sm text-base-content">{onlineUsers?.includes(selectUser?._id) ? "Online" : "Offline"}</p>
                    </div>
                </div>
                <button onClick={() => setSelectedUser(null)}><IoMdClose /></button>
            </div>
        </div>
    )
}
export default ChatHeader;