import React from "react";

const Loader = ({ message }) => {
    return (
        <div className="flex items-center justify-center h-screen bg-[#121212]">
            <div className="w-[450px] max-w-[90%] min-h-[250px] bg-[#1D1D1D] p-8 rounded-2xl flex flex-col items-center justify-center">
            <svg
                    className="animate-spin mb-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="none"
                >
                    <path
                        fill="#5453E0"
                        d="M19.778.001A20 20 0 1 1 .542 24.627l3.876-.922a16.016 16.016 0 1 0 15.404-19.72L19.778.001Z"
                    />
                </svg>
                <span className="font-bold text-lg">Loading</span>
        </div>
        </div>
    );
};

export default Loader;
