import { axiosInstance } from "./axiosInstance"

const registerApi = async (userData) => {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
};

const loginApi = async (userData) => {
    const response = await axiosInstance.post("/auth/login", userData);
    return response.data
};

const logoutApi = async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
};

const updateProfileApi = async (userData) => {
    const response = await axiosInstance.put("/auth/update-profile", userData);
    return response.data;
};

const getMeApi = async () => {
    const response = await axiosInstance.get("/auth/check");
    return response.data;
};

export {
    registerApi,
    loginApi,
    logoutApi,
    updateProfileApi,
    getMeApi
};