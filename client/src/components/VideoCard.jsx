import React from "react";

const VideoCard = ({ video }) => {
    return (
        <div
            key={video.id}
            className="bg-[#1D1D1D] shadow-md rounded-lg overflow-hidden relative"
        >
            <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-40 object-cover "
            />
            <p className="text-sm text-white mt-2 absolute top-[37%] font-bold  p-1 right-0">
                {video.duration}
            </p>
            <div className="p-4 ">
                <h2 className="text-lg font-bold">{video.title}</h2>
                <p className="text-sm text-gray-300 mt-2">
                    {video.description.split(" ").slice(0, 12).join(" ")}...
                </p>

                <button
                    onClick={() => window.open(video.url, "_blank")}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Watch Now
                </button>
            </div>
        </div>
    );
};

export default VideoCard;
