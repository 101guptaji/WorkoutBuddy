import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {

        // remove user from local storage
        localStorage.removeItem("user");

        // update context
        dispatch({ type: "LOGOUT" });
    }

    return {logout};
}