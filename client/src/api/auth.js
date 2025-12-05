import axiosInstance from "./axiosInstance"

const registerApi = async (userData) => {
    const response = await axiosInstance.post("/register", userData);
    return response.data;
};

const loginApi = async (userData) => {
    const response = await axiosInstance.post("/login", userData);
    return response.data;
};

const logoutApi = async () => {
    const response = await axiosInstance.post("/logout");
    return response.data;
}

const updateProfileApi = async(userData) => {
    const response = await axiosInstance.put("/update-profile", userData);
    return response.data;
}

const checkAuthApi = async() => {
    const response = await axiosInstance.get("/check");
    return response.data;
}

export {
checkAuthApi,
updateProfileApi,
logoutApi,
loginApi,
registerApi,
};