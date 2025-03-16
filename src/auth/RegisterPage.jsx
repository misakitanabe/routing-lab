import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { sendPostRequest } from "./sendPostRequest";
import { useNavigate } from 'react-router';

export function RegisterPage({ setAuthToken }) {
    const navigate = useNavigate();

    // async function onSubmit(username, password) {
    //     const response = await sendPostRequest('/auth/register', { username: username, password: password });
    //     const data = await response.json();
    //     if (response.status === 400) {
    //         console.log("USER ALR EXISTS");
    //         return({
    //             type: "error",
    //             message: "User already exists!",
    //         });
    //     } else if (response.status >= 500) {
    //         return({
    //             type: "error",
    //             message: "Server error",
    //         });
    //     } else if (response.status === 201) {
    //         console.log('token:', data.token);
    //         setAuthToken(data.token);
    //         navigate("/");
    //         return({
    //             type: "success",
    //             message: `You have succesfully registered!`,
    //         });
    //     }
    // }

    async function onSubmit(username, password) {
        return sendPostRequest('/auth/register', { username: username, password: password })
            .then((response) => {
                console.log('status: ', response.status);
                if (response.status === 400) {
                    console.log("USER ALR EXISTS");
                    return({
                        type: "error",
                        message: "User already exists!",
                    });
                } else if (response.status >= 500) {
                    return({
                        type: "error",
                        message: "Server error",
                    });
                } else if (response.status === 201) {
                    response.json()
                        .then((data) => {
                            console.log('token:', data.token);
                            setAuthToken(data.token);
                            navigate("/");
                            return({
                                type: "success",
                                message: `You have succesfully registered!`,
                            });
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                }
            }).catch((err) => {
                console.error(err);
            });
    }

    return (
        <>
            <h1>Register a New Account</h1>
            <UsernamePasswordForm onSubmit={onSubmit} />
        </>
    );
}