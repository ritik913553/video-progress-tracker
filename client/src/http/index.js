import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export const signup =  (data)=>api.post('/users/register',data)
export const login =  (data)=>api.post('/users/login',data)
export const logout = ()=>api.get('/users/logout')
export const getAllVideos =  () => api.get('/videos/getAllVideos')


export default api;