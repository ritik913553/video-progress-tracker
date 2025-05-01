import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import videos from "../utils/videos.js";

const getAllVideos = (req, res) => {
    const user = req.user;
    if (!user) {
        throw new ApiError(401, "Unauthorized");
    }
    const allVideos = videos;
    if (!allVideos) {
        return ApiError(404, "Videos not found");
    }
    return res.status(200).json(
        new ApiResponse(200, "User logged in successfully", {
            videos: allVideos,
        })
    );
};
export { getAllVideos };
