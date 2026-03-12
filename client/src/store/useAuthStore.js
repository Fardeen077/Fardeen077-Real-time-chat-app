import {
    registerApi,
    loginApi,
    logoutApi,
    updateProfileApi,
    getMeApi
} from "../api/authApi"
import connSocket from "../lib/socket"
import { create } from "zustand";

const useAuthStore = create((set, get) => ({
    isAuth: false,
    isAuthLoading: true,
    isUpdatingProfile: false,
    authError: null,
    authUser: null,
    onlineUsers: [],
    socket: null,

    register: async (userData) => {
        set({ isAuthLoading: true, authError: null });
        try {
            const response = await registerApi(userData);
            set({
                authUser: response.data.user, isAuth: true, isAuthLoading: false
            });
            return response.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Register Failed";
            set({ isAuthLoading: false, authError: message });
            throw new Error(message);
        }
    },

    login: async (userData) => {
        set({ isAuthLoading: true, authError: null });
        try {
            const response = await loginApi(userData);
            set({ authUser: response.data.user, isAuth: true, isAuthLoading: false });
            // console.log(response.data);
            // console.log(response);
            // console.log(response.data.user);
            return response.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Login Failed";
            set({ isAuthLoading: false, authError: message });
            throw new Error(message);
        }
    },

    updateProfile: async (userData) => {
        set({ isUpdatingProfile: true, authError: null });
        try {
            const response = await updateProfileApi(userData);
            set({ authUser: response.data.user, isAuth: true, isUpdatingProfile: false });
            // console.log(response.data.user);
            // console.log(response);
            return response.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Update Profile Failed";
            set({ isUpdatingProfile: false, authError: message });
            throw new Error(message);
        }
    },

    getMe: async () => {
        set({ isAuthLoading: true, authError: null });
        try {
            const response = await getMeApi();
            set({ authUser: response.data.user, isAuth: true, isAuthLoading: false });
            return response.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Internal Server Error";
            set({ isAuthLoading: false, authError: message });
            throw new Error(message);
        }
    },

    logout: async () => {
        set({ isAuthLoading: true, authError: null });
        try {
            const response = await logoutApi();
            set({ authUser: null, isAuth: false, isAuthLoading: false });
            return response.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Logout Failed";
            set({ isAuthLoading: false, authError: message });
            throw new Error(message);
        }
    },

    connectSocket: () => {
        const { authUser, socket } = get();
        if (!authUser || socket?.connected) return;

        connSocket.io.opts.query = {
            userId: authUser._id,
        };
        connSocket.on("connect", () => {
            // console.log("Socket connected! ID:", connSocket.id);
        });

        connSocket.on("connect_error", (err) => {
            console.error("Socket failed to connect:", err.message);
        });

        connSocket.connect();
        // connSocket.on("connect", () => console.log("Socket connected:", connSocket.id));
        connSocket.off("getOnlineUsers").on("getOnlineUsers", (userIds) => {
            // console.log("store userid", userIds);
            // console.log("socket connected:", connSocket.id)
            set({ onlineUsers: userIds });
        });
        connSocket.emit("requestOnlineUsers");
        set({ socket: connSocket })
    },

    disconnectSocket: () => {
        const { socket } = get();
        if (socket?.connected) socket.disconnect()
    },
}));

export default useAuthStore;