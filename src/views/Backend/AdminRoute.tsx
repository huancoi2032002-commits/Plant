import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }: any) {
    const isAdmin = localStorage.getItem("admin")

    if (!isAdmin) {
        return <Navigate to="/admin/login" replace />
    }

    if (isAdmin) return children
    return children
}