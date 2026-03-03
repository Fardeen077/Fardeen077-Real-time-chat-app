import { axiosInstance } from "./axiosInstance";

const sendMessageApi = async (id, messageData) => {
    const response = await axiosInstance.post(`/messages/send/${id}`, messageData);
    return response.data;
};

const getMessagesApi = async (id) => {
    const response = await axiosInstance.get(`/messages/message/${id}`, id);
    return response.data;
};

const getUsersApi = async () => {
    const response = await axiosInstance.get("/messages/users");
    return response.data;
}
export {
    sendMessageApi,
    getMessagesApi,
    getUsersApi
};