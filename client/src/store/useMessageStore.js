import {
    sendMessageApi,
    getMessagesApi,
    getUsersApi
} from "../api/messageApi";
import useAuthStore from "./useAuthStore";
import { create } from "zustand"

const useMessageStore = create((set, get) => ({
    users: [],
    messages: [],
    selectUser: null,
    isMessageLoading: false,
    isUsersLoading: false,
    isMessageError: null,

    sendMessage: async (messageData) => {
        const { selectUser } = get();
        if (!selectUser?._id) {
            throw new Error("No user selected to send a message");
        }
        set({ isMessageLoading: true, isMessageError: null });
        try {
            const response = await sendMessageApi(selectUser._id, messageData);
            set((state) => ({
                messages: [...state.messages, response.data],
                isMessageLoading: false
            }));
            return response.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Message not sent";
            set({ isMessageLoading: false, isMessageError: message });
            throw new Error(message);
        };
    },

    getMessages: async (id) => {
        set({ isMessageLoading: true, isMessageError: null });
        try {
            const response = await getMessagesApi(id);
            set({ messages: response.data, isMessageLoading: false });
            return response.data;
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
            set({ users: response.data, isUsersLoading: false });
            return response.data;
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
            set({
                messages: [...get().messages, newMessage],
            });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectUser) => set({ selectUser }),
}));

export default useMessageStore;