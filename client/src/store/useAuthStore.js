import {
    registerApi,
    loginApi,
    logoutApi,
    updateProfileApi,
    getMeApi
} from "../api/authApi"
import connSocket from "../lib/socket";
import { create } from "zustand";

const useAuthStore = create((set, get) => ({
    isAuth: false,
    isAuthLoading: false,
    authError: null,
    authUser: null,
    onlineUsers: [],
    socket: null,

    register: async (userData) => {
        set({ isAuthLoading: true, authError: null });
        try {
            const response = await registerApi(userData);
            set({
                authUser: response.data, isAuth: true, isAuthLoading: false
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
            set({ authUser: response.data, isAuth: true, isAuthLoading: false });
            return response.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Login Failed";
            set({ isAuthLoading: false, authError: message });
            throw new Error(message);
        }
    },

    updateProfile: async (userData) => {
        set({ isAuthLoading: true, authError: null });
        try {
            const response = await updateProfileApi(userData);
            set({ authUser: response.data, isAuth: true, isAuthLoading: false });
            return response.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Update Profile Failed";
            set({ isAuthLoading: false, authError: message });
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
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;
        // console.log(authUser);

        connSocket.io.opts.query = {
            userId: authUser._id,
        };
        connSocket.connect();
        // set({ socket: connSocket });
        connSocket.on("getOnlineUsers", (userIds) => {
            console.log("store userid", userIds);
             console.log("socket connected:", connSocket.id)
            console.log("Online users",onlineUsers);
            
            set({ onlineUsers: userIds });
        });
        set({socket: connSocket})
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },
}));

export default useAuthStore;