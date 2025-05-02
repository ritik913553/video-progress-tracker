import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProgress } from "../http/index.js"; // Import your API function
import CardLoader from "./CardLoader.jsx";

const VideoCard = ({ video }) => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);

   
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const progressData = await getProgress(video.id);
                setProgress(progressData.data.data);
            } catch (error) {
                console.error("Error fetching progress:", error);
                setProgress(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProgress();
    }, [video.id]);

    if (loading) {
        return <CardLoader />;
    }

    return (
        <div
            key={video.id}
            className="bg-[#1D1D1D] shadow-md rounded-lg overflow-hidden relative hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate(`/${video.id}`)}
        >
            {/* Thumbnail with progress overlay */}
            <div className="relative">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-40 object-cover"
                />

                {/* Progress bar at the bottom of thumbnail */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-700">
                    <div
                        className="h-full bg-green-500 rounded-r-2xl transition-all duration-300"
                        style={{
                            width: `${progress?.percentageWatched || 0}%`,
                        }}
                    ></div>
                </div>

                {/* Duration badge */}
                <p className="text-xs text-white font-bold absolute top-2 right-2 bg-black/70 px-2 py-1 rounded">
                    {video.duration}
                </p>

                {/* Completion checkmark */}
                {progress?.isCompleted && (
                    <div className="absolute top-2 left-2 bg-green-600 text-white p-1 rounded-full">
                        <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                )}
            </div>

            {/* Card content */}
            <div className="p-4">
                <h2 className="text-lg font-bold text-white line-clamp-1">
                    {video.title}
                </h2>
                <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                    {video.description}
                </p>

                {/* Progress percentage text */}
                {progress?.percentageWatched > 0 && (
                    <div className="mt-2 flex items-center">
                        <span className="text-xs text-green-400 font-medium">
                            {Math.round(progress.percentageWatched)}% watched
                        </span>
                    </div>
                )}

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/${video.id}`);
                    }}
                    className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                >
                    {progress?.percentageWatched > 0 ? "Continue" : "Watch Now"}
                </button>
            </div>
        </div>
    );
};

export default VideoCard;
