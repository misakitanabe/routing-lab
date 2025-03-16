import { useActionState } from "react";

export function UsernamePasswordForm({ onSubmit }) {
    const [result, submitAction, isPending] = useActionState(
        async (previousState, formData) => {
            const username = formData.get("username");
            const password = formData.get("password");

            // const delay = (ms) => new Promise(res => setTimeout(res, ms));
            // await delay(3000);

            if (!username || !password) {
                return {
                    type: "error",
                    message: `Please fill in your username and password.`,
                };
            }

            const submitResult = await onSubmit(username, password);
            // console.log(`submitResult: ${submitResult}`);

            return submitResult;
        },
        null
    );

    return (
        <>
            {result && (
                <p style={{ color: result.type === "error" ? 'red' : 'black' }}>
                    {result.message}
                </p>
            )}
            <form action={submitAction} disabled={isPending} >
                <label>
                    <span>Username</span>
                    <input id="username" name="username" disabled={isPending} />
                </label>

                <label>
                    <span>Password</span>
                    <input type="password" id="password" name="password" disabled={isPending} />
                </label>
                
                <button disabled={isPending}>submit</button>
            </form>
        </>
        
    );
}