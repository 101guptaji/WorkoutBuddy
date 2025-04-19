import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const { dispatch } = useAuthContext();

    const signup = async (user) => {
        if (user) {
            try {
                const response = await fetch("http://localhost:8080/api/users/signup", {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ ...user })
                })

                const data = await response.json();
                // console.log(data);
                if(response.ok){
                    console.log(data);
                    // save user data in local storage
                    localStorage.setItem("user", JSON.stringify(data));
                    // update user context
                    dispatch({ type: "LOGIN", payload: data });
                }
                else{
                    throw data.error;
                }
            }
            catch (err) {
                throw err;
            }
        }
    }

    return { signup }
}
