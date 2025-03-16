import { Navigate } from "react-router";

export function ProtectedRoute(props) {
    if (!props.authToken) {
        console.log("redirecting to login");
        return <Navigate to="/login" replace />
    }

    return props.children;
}