import { io } from "socket.io-client";

const connSocket = io(import.meta.env.VITE_SOCKET_URL, {
    withCredentials: true,
    autoConnect: false
});

export default connSocket