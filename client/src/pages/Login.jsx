import { useState,} from "react"
import useAuthStore from "../store/useAuthStore";
import { validateLogin } from "../validations/authValidation";
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const handleForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const login = useAuthStore((state) => state.login);
    const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (isAuthLoading) return;

        const validation = validateLogin(form);
        if (!validation.ok) {
            toast.error(validation.message);
            return;
        };
        try {
            await login(form)
            toast.success("Login successfully");
            navigate("/");

        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center ">
            <div className="bg-neutral-800 w-80 rounded-2xl shadow-2xl">
                <form onSubmit={handleLogin}
                    className="flex flex-col gap-6 p-6 w-full">
                    <div className="text-center mb-2">
                        <h1 className="text-2xl font-semibold">Welcome Back</h1>
                        <p className="text-sm">
                            Please login to your account
                        </p>
                    </div>

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
                                Login
                            </div>
                        ) : (
                            "Login Account"
                        )}
                    </button>
                    <p className="text-sm text-center mt-4">
                        you don't have account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )

};
export default Login;