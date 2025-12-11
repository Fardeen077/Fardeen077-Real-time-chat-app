// axiosMessage.js
import axios from "axios";

const axiosMessage = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/messages`,
    withCredentials: true
});

export default axiosMessage;
