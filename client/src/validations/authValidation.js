export const validateRegister = ({ username, email, password }) => {

    if (!username || !password || !email) {
        return { ok: false, message: "All fileds are required" }
    }
    if (!username.trim()) {
        return { ok: false, message: "username is required" };
    }

    if (!email.trim()) {
        return { ok: false, message: "Email is required" };
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        return { ok: false, message: "Invalid email format" };
    }

    if (password.length < 6) {
        return { ok: false, message: "Password must be at least 6 characters" };
    }

    return { ok: true };
};

export const validateLogin = ({ email, password }) => {

    if (!password || !email) {
        return { ok: false, message: "All fileds are required" }
    }

    if (!email.trim()) {
        return { ok: false, message: "Email is required" };
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        return { ok: false, message: "Invalid email format" };
    }

    if (password.length < 6) {
        return { ok: false, message: "Password must be at least 6 characters" };
    }

    return { ok: true };
};