import { useState } from "react"
import useAuthStore from "../store/useAuthStore";
import { validateRegister } from "../validations/authValidation";
// import { Link, useNavigate } from "react-router-dom"
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
    // const navigate = useNavigate();

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
            
            // navigate("/");

        } catch (error) {
            toast.error(authError);
        }
    };

    return (
        <div>
            <div>
                <form onSubmit={handleRegister}>
                    <input type="text"
                        name="username"
                        value={form.username}
                        onChange={handleForm}
                        className="" />

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
                        Register
                    </button>
                </form>
            </div>
        </div>
    )

};
export default Register;