import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { sendPostRequest } from "./sendPostRequest";
import { Link } from "react-router";
import { useNavigate } from 'react-router';

export function LoginPage({ setAuthToken }) {
    const navigate = useNavigate();

    async function onSubmit(username, password) {
        const response = await sendPostRequest('/auth/login', { username: username, password: password });
        const data = await response.json();

        if (response.status === 400) {
            return({
                type: "error",
                message: data.message,
            });
        } else if (response.status >= 500) {
            return({
                type: "error",
                message: "Server error",
            });
        } else if (response.status === 401) {
            return({
                type: "error",
                message: data.message,
            });
        } else {
            console.log('token:', data.token);
            setAuthToken(data.token);
            navigate("/");
            return({
                type: "success",
                message: "successful login",
            });
        }
    }

    return (
        <>
            <h1>Login</h1>
            <UsernamePasswordForm onSubmit={onSubmit} />
            <p>
                Don't have an account? 
                <Link to="/register"> Register Here</Link>
            </p>
        </>
    );
}