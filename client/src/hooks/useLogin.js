import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const { dispatch } = useAuthContext();

    const login = async ({ email, password }) => {
        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                console.log(data);
                // save user data in local storage
                localStorage.setItem("user", JSON.stringify(data));
                // update user context
                dispatch({ type: "LOGIN", payload: data });
            }
            else {
                throw data.error;
            }
        }
        catch (err) {
            throw err;
        }
    }

    return { login }
}
