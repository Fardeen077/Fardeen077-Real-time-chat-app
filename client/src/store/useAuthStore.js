import {
    registerApi,
    loginApi,
    logoutApi,
    updateProfileApi,
    getMeApi
} from "../api/authApi"

import { create } from "zustand";

const useAuthStore = create((set) => ({
    isAuth: false,
    isAuthLoading: false,
    authError: null,
    authUser: null,

    register: async (userData) => {
        set({ isAuthLoading: true, authError: null });
        try {
            const response = await registerApi(userData);
            set({
                authUser: response.data, isAuth: true, isAuthLoading: false
            });
            return response.data;
        } catch (error) {
            set({ isAuthLoading: false, authError: error?.response?.data?.message || "Register failed" });
            throw error
        }
    },

    login: async (userData) => {
        set({ isAuthLoading: true, authError: null });
        try {
            const response = await loginApi(userData);
            set({ authUser: response.data, isAuth: true, isAuthLoading: false });
            return response.data;
        } catch (error) {
            set({ isAuthLoading: false, authError: error?.response?.data?.message || "Login failed" });
            throw error
        }
    },

    updateProfile: async (userData) => {
        set({ isAuthLoading: true, authError: null });
        try {
            const response = await updateProfileApi(userData);
            set({ authUser: response.data, isAuth: true, isAuthLoading: false });
            return response.data;
        } catch (error) {
            set({ isAuthLoading: false, authError: error?.response?.data?.message || "Update profile failed" });
            throw error
        }
    },

    getMe: async () => {
        set({ isAuthLoading: true, authError: null });
        try {
            const response = await getMeApi();
            set({ authUser: response.data.user, isAuth: true, isAuthLoading: false });
            return response.data;
        } catch (error) {
            set({ isAuthLoading: false, authError: error?.response?.data?.message || "Failed to fetch" });
            throw error
        }
    },

    logout: async () => {
        set({ isAuthLoading: true, authError: null });
        try {
            const response = await logoutApi();
            set({ authUser: null, isAuth: false, isAuthLoading: false });
            return response.data;
        } catch (error) {
            set({ isAuthLoading: false, authError: error?.response?.data?.message || "Logout failed" });
            throw error
        }
    },
}));

export default useAuthStore;