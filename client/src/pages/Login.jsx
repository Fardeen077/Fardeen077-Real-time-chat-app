import React, { useState } from "react";
import { login as loginUser } from "../api/authApi"
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAuthStore();
    const [formData, setFormData] = useState({ email: "", password: "", });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser(formData);
            // const token = data?.data.accessToken;
            const token = data?.data?.accessToken;
            const user = data?.data?.user;

            if (token && user) {
                // 💾 store token and user
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
            }
            // Optionally store user details
            // localStorage.setItem("user", JSON.stringify(res.data.user));
            console.log("login", token);
            dispatch(setUser(data.data.user)); // save user in Redux
            // console.log(dispatch(setUser(data.data.user)));

            navigate("/"); // redirect to home/dashboard
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="max-w-md mx-10 p-4 border rounded mt-24 md:mx-auto">
            <h1 className="text-2xl font-bold  mb-4 flex justify-center">Login</h1>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-all mt-5">
                    Login
                </button>
            </form>

            <p className="text-sm text-center text-gray-600 mb-4">
                Already have account? {""}
                <span onClick={() => navigate("/register")}
                    className="text-blue-500 cursor-pointer hover:underline">
                    register
                </span>
            </p>
        </div>
    );
};

export default Login;