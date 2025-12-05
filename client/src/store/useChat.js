import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import { useAuthStore } from "./useAuth";
import {
    getMessagesApi,
    sendMessageApi,
    getUsersApi
} from "../api/user";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await getUsersApi();
            set({ users: response });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Fetching users failed");
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMessages: async () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
        set({ isMessagesLoading: true });
        try {
            const response = await getMessagesApi(selectedUser._id);
            set({ messages: response });
        } catch (error) {
            toast.error(error?.response?.data?.message || "message is not Recived");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        if (!selectedUser) return;
        try {
            const response = await sendMessageApi(messageData, selectedUser._id);
            set({ messages: [...messages, response] });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Message not Send");
        }
    },

    subscribeToMessages: () => {
        const {selectedUser}= get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        
        socket.on("newMessage", (newMessage)=> {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if(!isMessageSentFromSelectedUser) return;
            set({
                messages: [...get().messages, newMessage],
            });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));