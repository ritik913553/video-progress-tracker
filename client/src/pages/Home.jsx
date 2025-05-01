import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider.jsx";
import { logout } from "../http/index.js";

function Home() {
    const { user ,setUser,setIsAuthenticated} = useAuth();
    const logoutHandler = async () => {
        try {
            const res = await logout();
            console.log(res);
            if (res.status === 200) {
                console.log("Logout successful");
                setUser(null); 
                setIsAuthenticated(false);
                toast.success("Logout successful");
            }
            
        } catch (error) {
            console.error("Logout failed", error);
            toast.error("Logout failed");
        }
    };
    return (
        <>
            <button onClick={logoutHandler}>Logout</button>
            <div className="w-full h-screen flex items-center justify-center">
                <h1 className="text-3xl font-bold">
                    Welcome, {user?.fullName || "User"}!
                </h1>
            </div>
        </>
    );
}

export default Home;
