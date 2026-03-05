import useAuthStore from "../store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRouter = () => {
    const isAuth = useAuthStore((state) => state.isAuth);

    if (!isAuth) return <Navigate to="/login" replace />
    return <Outlet />;
}

export default ProtectedRouter;