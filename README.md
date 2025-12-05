LIVE LINK: NOT NOW
# 💬 Real-Time Chat Application  

A fully responsive real-time chat application built using the **MERN Stack**, **Socket.IO**, **Zustand**, and **DaisyUI**.  
The app supports **real-time messaging**, **online/offline status**, **JWT authentication**, **themes**, and a clean UI built with **DaisyUI + TailwindCSS**.

---

## 🚀 Features

### 🔐 **Authentication**
- Register & Login
- JWT Token-based auth
- Protected routes
- Password hashing with bcrypt
- Auto login on refresh

### 💬 **Real-Time Messaging (Socket.IO)**
Frontend integrates **Socket.IO client** to provide:
- Instant message sending
- “Message received” events
- Real-time user online/offline updates
- Auto scroll to latest message
- Live status indicator in chat header

### 🎨 **Modern UI (DaisyUI + Tailwind)**
- DaisyUI components for beautiful UI
- Theme support (light/dark/custom)
- Clean chat design
- Skeleton loaders
- Responsive UI for all devices

### 🧠 **State Management (Zustand)**
Used for:
- Auth store  
- Chat store (active user, messages, online status)
- Theme store  
- Socket connection handling

---

## 🛠 Tech Stack

### **Frontend**
- React (Vite)
- Zustand (state management)
- Socket.IO Client
- Axios
- TailwindCSS
- DaisyUI

### **Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO Server
- Cloudinary (for profile uploads)

---

## ⚡ Socket.IO Frontend Logic

### ✓ Connect to server
```js
import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_URL, {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});
