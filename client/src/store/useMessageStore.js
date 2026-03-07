import {
    sendMessageApi,
    getMessagesApi,
    getUsersApi
} from "../api/messageApi";
import useAuthStore from "./useAuthStore";
import {create} from "zustand"

const useMessageStore = create((set, get) => ({
    users: [],
    messages: [],
    selectUser: null,
    isMessageLoading: false,
    isUsersLoading: false,
    isMessageError: null,

    sendMessage: async (id, messageData) => {
        set({ isMessageLoading: true, isMessageError: null });
        try {
            const response = await sendMessageApi(id, messageData)
            set((state) => ({
                messages: [...state.messages, response.data],
                isMessageLoading: false
            }));
            console.log(response);
        } catch (error) {
            const message = error?.response?.data?.message || "Message not send";
            set({ isMessageLoading: false, isMessageError: message });
            throw new Error(message);
        };
    },

    getMessages: async (id) => {
        set({ isMessageLoading: true, isMessageError: null });
        try {
            const response = await getMessagesApi(id);
            set({ message: response.data, isMessageLoading: false });
        } catch (error) {
            const message = error?.response?.data?.message || "Message not received"
            set({ isMessageLoading: false, isMessageError: message });
            throw new Error(message);
        }
    },

    getUsers: async () => {
        set({ isUsersLoading: true, isMessageError: null });
        try {
            const response = await getUsersApi();
            console.log("store", response.data);
            set({ users: response.data, isUsersLoading: false });
            console.log("store", response.data);
            
        } catch (error) {
            const message = error?.response?.data?.message || "List not found"
            set({ isUsersLoading: false, isMessageError: message });
            throw new Error(message);
        }
    },

    subscribeToMessages: () => {
        const { selectUser } = get();
        if (!selectUser) return;

        const socket = useAuthStore.getState().socket;
        socket.on("newMessage", (newMessage) => {
            const isMessageSendFromSelectedUser = newMessage.senderId === selectUser._id;
            if (!isMessageSendFromSelectedUser) return;
        });
        set({
            messages: [...get().messages, message],
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

}));

export default useMessageStore;