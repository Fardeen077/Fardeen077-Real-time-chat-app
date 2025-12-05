import { create } from "zustand";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { checkAuthApi, registerApi, loginApi, logoutApi, updateProfileApi } from "../api/auth";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    isUpdatingProfile: false,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            // 1 correct externel api call
            // 2 User data set in zustand 
            // 3 socket conn after auth success
            const response = await checkAuthApi();
            set({ authUser: response.data });
            console.log("AUTH RESPONSE => ", response);
            get().connectSocket()
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });  // in case of failure remove user 
        } finally {
            set({ isCheckingAuth: false }); // loading off 
        }
    },

    signup: async (userData) => {
        set({ isSigningUp: true });
        try {
            const response = await registerApi(userData);
            set({ authUser: response.data });
            toast.success("Account created Successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
            return { success: false }
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async () => {
        set({ isLoggingIn: true });
        try {
            const response = await loginApi();
            set({ authUser: response.data });
            toast.success("Logged in Successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await logoutApi();
            set({ authUser: null });
            toast.success("Logged Out Successfully");
            get().disconnectSocket();
          } catch (error) {
            toast.error("Logout failed");
        }
    },

    updateProfile: async (userData) => {
        set({ isUpdatingProfile: true });
        try {
            const response = await updateProfileApi(userData);
            set({ authUser: response.data });
            toast.success("Profile updated Successfully");
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
            transports: ["websocket", "polling"],
            withCredentials: true,
        });
        socket.connect();
        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },

}));