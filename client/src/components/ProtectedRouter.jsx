import useAuthStore from "../store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRouter = () => {
    const isAuth = useAuthStore((state) => state.isAuth);
    const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

    if (isAuthLoading) return <div className='h-screen flex flex-col items-center justify-center'>
        <span className="loading loading-spinner text-info"></span>
    </div>

    if (!isAuth) return <Navigate to="/login" replace />
    return <Outlet />;
}

export default ProtectedRouter;