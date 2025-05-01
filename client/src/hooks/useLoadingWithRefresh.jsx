import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";

export function useLoadingWithRefresh() {
    const {setLoading,setUser,setIsAuthenticated}=useAuth();
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}/users/refresh`,
                    {
                        withCredentials: true,
                    }
                );
                setUser(data.data.user);
                setIsAuthenticated(true)
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        })();
    }, []);

    return null;
}
