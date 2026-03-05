import { useState } from "react"
import useAuthStore from "../store/useAuthStore";
import { validateRegister } from "../validations/authValidation";
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });
    const handleForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const register = useAuthStore((state) => state.register);
    const authError = useAuthStore((state) => state.authError);
    const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const validation = validateRegister(form);
        if (!validation.ok) {
            toast.error(validation.message);
            return;
        };
        try {
            await register(form);
            toast.success("Register successfully");
            console.log(form);

            navigate("/");

        } catch (error) {
            toast.error(authError);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-neutral-800 w-80 rounded-2xl shadow-2xl">
                <form onSubmit={handleRegister}
                    className="flex flex-col gap-6 p-6 w-full">

                    <div className="text-center mb-2">
                        <h1 className="text-2xl font-semibold">Create Account</h1>
                        <p className="text-sm">
                            Sign up to get started
                        </p>
                    </div>

                    <input type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleForm}
                        className="p-2 rounded border-2 border-gray-500 focus:outline-none focus:ring-0
                   focus:border-gray-300" />

                    <input type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleForm}
                        className="p-2 rounded border-2 border-gray-500 focus:outline-none focus:ring-0
                   focus:border-gray-300" />

                    <input type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleForm}
                        className="p-2 rounded border-2 border-gray-500 focus:outline-none focus:ring-0
                   focus:border-gray-300" />

                    <button type="submit" disabled={isAuthLoading}
                        className="bg-black text-white p-2 rounded transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                        {isAuthLoading ? (
                            <div>
                                <span className="loading loading-spinner text-info"></span>
                                Register
                            </div>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                    <p className="text-sm text-center mt-4">
                        you have already account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )

};
export default Register;