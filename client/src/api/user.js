import axiosMessage from "./axiosMessage"

const getUsersApi = async () => {
    const response = await axiosMessage.get("/users");
    return response.data;
};

const getMessagesApi = async (id) => {
    const response = await axiosMessage.get(`/message/${id}`);
    return response.data;
};

const sendMessageApi = async (message, id) => {
    const response = await axiosMessage.post(`/send/${id}`, message);
    return response.data;
};


export {
    getMessagesApi,
    sendMessageApi,
    getUsersApi
};