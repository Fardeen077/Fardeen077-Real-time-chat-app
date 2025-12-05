import { create } from "zustand"

export const useThemes = create((set) => ({
    theme: localStorage.getItem("chat-theme") || "luxury",

    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme);
        set({ theme });
    },
}));