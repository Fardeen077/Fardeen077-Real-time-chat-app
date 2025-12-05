import axiosInstance from "./axiosInstance";

const getUsersApi = async () => {
    const response = await axiosInstance.get("/users");
    return response.data;
};

const getMessagesApi = async (id) => {
    const response = await axiosInstance.get(`/message/${id}`);
    return response.data;
};

const sendMessageApi = async (message, id) => {
    const response = await axiosInstance.post(`/send/${id}`, message);
    return response.data;
};


export {
    getMessagesApi,
    sendMessageApi,
    getUsersApi
};