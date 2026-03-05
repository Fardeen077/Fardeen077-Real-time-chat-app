import useAuthStore from "../store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom"

const PublicRouter = () => {
    const isAuth = useAuthStore((state) => state.isAuth);

    if (isAuth) return <Navigate to="/" replace />
    return <Outlet />;
}

export default PublicRouter;