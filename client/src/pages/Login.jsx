import { useState } from "react"
import useAuthStore from "../store/useAuthStore";
import { validateLogin } from "../validations/authValidation";
// import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const handleForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const Login = useAuthStore((state) => state.Login);
    const authError = useAuthStore((state) => state.authError);
    const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
    // const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const validation = validateLogin(form);
        if (!validation.ok) {
            toast.error(validation.message);
            return;
        };
        try {
            await Login(form);
            toast.success("Register successfully");
            console.log(form);

            // navigate("/");

        } catch (error) {
            toast.error(authError);
        }
    };

    return (
        <div>
            <div>
                <form onSubmit={handleLogin}>
                    <input type="email"
                        name="email"
                        value={form.email}
                        onChange={handleForm}
                        className="" />

                    <input type="password"
                        name="password"
                        value={form.password}
                        onChange={handleForm}
                        className="" />

                    <button type="submit" >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )

};
export default Login;