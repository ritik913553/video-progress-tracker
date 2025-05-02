import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider.jsx";
import { getAllVideos, logout } from "../http/index.js";
import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard.jsx";

function Home() {
    const { user, setUser, setIsAuthenticated } = useAuth();
    const [videos, setVideos] = useState([]);
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
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const { data } = await getAllVideos();
                setVideos(data.data.videos);
            } catch (error) {
                console.error("Error fetching videos", error);
                toast.error("Error fetching videos");
            }
        };
        fetchVideos();
    }, []);
    return (
        <>
            <div className="h-screen w-full p-5 sm:p-10  max-w-[1350px] mx-auto  ">
                <div className="flex  items-center justify-between  px-1">
                    <h1 className="text-xl sm:text-3xl font-bold mb-4">
                        Welcome ,👋 <span>{user.fullName}</span>{" "}
                    </h1>

                    <button
                        onClick={logoutHandler}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Logout
                    </button>
                </div>
                <h1 className="text-xl mt-10 font-bold border-b-4  border-blue-600  w-fit">All Lectures</h1>
                
                <div className="allvideo grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pb-10">
                    {videos.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
