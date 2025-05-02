import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllVideos, getProgress, updateProgress } from "../http/index.js";
import { formatTime } from "../utils/formatTime.js";

const VideoPlayer = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [progress, setProgress] = useState(null);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const lastUpdateTimeRef = useRef(0);
    const checkpoint = 5; // Save progress every 5 seconds
    const debounceTimeout = useRef(null); // Ref to store the debounce timeout
    const isSeeking = useRef(false);

    // Fetch video and progress data
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch video details
                const { data } = await getAllVideos();

                const selectedVideo = data.data.videos.find(
                    (v) => v.id === videoId
                );
                console.log(selectedVideo);
                setVideo(selectedVideo);

                // Fetch progress
                const res = await getProgress(videoId);
                console.log(res.data.data);
                if (res.data.data) {
                    setProgress(res.data.data);
                    lastUpdateTimeRef.current = res.data.data.lastPosition;
                    setTimeout(() => {
                        if (videoRef.current && res.data.data.lastPosition) {
                            videoRef.current.currentTime =
                                res.data.data.lastPosition;
                        }
                    }, 300);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [videoId]);

    // Handle video events
    const handlePlay = () => {
        setIsPlaying(true);
    };

    //handle video pause
    const handlePause = () => {
        setIsPlaying(false);
        saveProgress();
    };

    //handle video time update
    const handleTimeUpdate = () => {
        if (!isPlaying || !videoRef.current || isSeeking.current) return;

        const currentTime = videoRef.current.currentTime;

        // Check if we've passed a checkpoint
        if (currentTime - lastUpdateTimeRef.current >= checkpoint) {
            saveProgress();
        }
    };

    // Save progress to the backend
    const saveProgress = async () => {
        if (!videoRef.current) return;

        const currentTime = videoRef.current.currentTime;
        const startTime = lastUpdateTimeRef.current;
        const endTime = currentTime;
        if (startTime === endTime) return;
        try {
            // Send the current interval to backend
            // Backend will handle merging and calculating totals
            const newProgress = await updateProgress(videoId, {
                startTime,
                endTime,
                currentTime,
            });
            console.log("Strat Time:", startTime);
            console.log("End Time:", endTime);
            console.log("Progress updated:", newProgress.data.data);
            setProgress(newProgress.data.data);
            lastUpdateTimeRef.current = currentTime;
        } catch (error) {}
    };

    //handle the skeep of video
    const handleSeek = () => {
        isSeeking.current = true;
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current); // Clear the previous timeout
        }

        debounceTimeout.current = setTimeout(() => {
            lastUpdateTimeRef.current = videoRef.current.currentTime;
            saveProgress(); // Save progress after debounce delay
            isSeeking.current = false;
        }, 500); // 300ms debounce delay
    };

    if (!video) {
        return <p>Loading...</p>;
    }
   

    return (
        <div className="min-h-screen w-full bg-gray-900 text-gray-100 p-5 flex flex-col items-center">
            <div className="w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-4 text-white">
                    {video.title}
                </h1>

                {/* Video Player */}
                <div className="relative">
                    <video
                        ref={videoRef}
                        src={video.url}
                        controls
                        className="w-full rounded-t-lg shadow-xl"
                        onPlay={handlePlay}
                        onPause={handlePause}
                        onTimeUpdate={handleTimeUpdate}
                        onSeeked={handleSeek}
                    ></video>

                    {/* Watched Segments Timeline */}
                    {progress?.watchedInterval && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-lg bg-gray-700 overflow-hidden ">
                            <div className="relative w-full h-full ">
                                {progress.watchedInterval.map(
                                    (interval, index) => (
                                        <div
                                            key={index}
                                            className="absolute h-full bg-blue-500"
                                            style={{
                                                left: `${
                                                    (interval.start /
                                                        progress.totalDuration) *
                                                    100
                                                }%`,
                                                width: `${
                                                    ((interval.end -
                                                        interval.start) /
                                                        progress.totalDuration) *
                                                    100
                                                }%`,
                                            }}
                                        ></div>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    {/* Completion Badge */}
                    {progress?.isCompleted && (
                        <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full flex items-center text-sm font-semibold">
                            <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            Completed
                        </div>
                    )}
                </div>

                {/* Description */}
                <p className="mt-4 font-bold text-gray-300">
                    {video.description}
                </p>

                {/* Progress Section */}
                <div className="mt-6 w-full bg-gray-800 rounded-lg p-4 shadow-lg">
                    <h2 className="text-xl font-bold mb-3 flex items-center">
                        <svg
                            className="w-5 h-5 mr-2 text-blue-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Your Progress
                    </h2>

                    {progress ? (
                        <div className="space-y-4">
                            {/* Enhanced Progress Bar with Tooltip */}
                            <div className="relative w-full bg-gray-700 rounded-full h-2.5">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full relative"
                                    style={{
                                        width: `${progress.percentageWatched}%`,
                                    }}
                                >
                                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full"></div>
                                </div>

                                {/* Watched segments indicators */}
                                <div className="absolute inset-0 flex">
                                    {progress.watchedIntervals?.map(
                                        (interval, i) => {
                                            const startPercent =
                                                (interval.start /
                                                    video.duration) *
                                                100;
                                            const endPercent =
                                                (interval.end /
                                                    video.duration) *
                                                100;
                                            const widthPercent =
                                                endPercent - startPercent;

                                            return (
                                                <div
                                                    key={i}
                                                    className="h-full bg-blue-400 rounded-full"
                                                    style={{
                                                        left: `${startPercent}%`,
                                                        width: `${widthPercent}%`,
                                                    }}
                                                ></div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 text-sm">
                                <div className="bg-gray-700 p-3 rounded-lg">
                                    <div className="text-gray-400">
                                        Current Time
                                    </div>
                                    <div className="font-mono text-white">
                                        {formatTime(progress.lastPosition)}
                                    </div>
                                </div>
                                <div className="bg-gray-700 p-3 rounded-lg">
                                    <div className="text-gray-400">Watched</div>
                                    <div className="font-mono text-white">
                                        {formatTime(progress.totalWatched)}
                                    </div>
                                </div>
                                <div className="bg-gray-700 p-3 rounded-lg">
                                    <div className="text-gray-400">
                                        Completion
                                    </div>
                                    <div className="font-mono text-white">
                                        {progress.percentageWatched.toFixed(1)}%
                                    </div>
                                </div>
                            </div>

                            {/* Completion Message */}
                            {progress.isCompleted && (
                                <div className="mt-4 p-3 bg-green-900/30 border border-green-700 rounded-lg flex items-center">
                                    <svg
                                        className="w-6 h-6 mr-2 text-green-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <span className="text-green-300">
                                        You've completed this video! Great job!
                                    </span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-gray-400 italic">
                            No progress data available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default VideoPlayer;
