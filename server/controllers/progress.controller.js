import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {
    Progress,
    progressValidationSchema,
} from "../models/progress.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { preprocessProgressData } from "../services/progress.service.js";
import { getVideoById } from "./video.controller.js";

const getProgress = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    if (!userId) {
        throw new ApiError(401, "Unauthorized");
    }
    const { videoId } = req.params;
    if (!videoId) {
        throw new ApiError(400, "Video ID is required");
    }

    const progress = await Progress.findOne({ userId, videoId });
    if (!progress) {
        throw new ApiError(404, "Progress not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, "Progress fetched successfully", progress));
});
const updateProgress = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { interval, lastPosition } = req.body;
    const { videoId } = req.params;
    if (!userId) {
        throw new ApiError(401, "Unauthorized");
    }

    const { error } = progressValidationSchema.validate({
        videoId,
        lastPosition,
        watchedInterval: [interval],
    });

    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        throw new ApiError(400, errorMessages.join(", "));
    }

    const video = getVideoById(videoId);
    const videoDuration = video?.duration
        .split(":") // Split the duration into [hours, minutes, seconds]
        .map(Number) //Convert each part to a number
        .reduce((acc, time) => acc * 60 + time); // Convert to total seconds

    if (!videoDuration) {
        throw new ApiError(404, "Video not found");
    }

    const progress = await Progress.findOne({ userId, videoId });

    if (!progress) {
        const newProgress = await Progress.create({
            userId,
            videoId,
            watchedInterval: { start: 0, end: 0 },
            totalDuration: videoDuration,
        });
    }

    if (progress.isCompleted) {
        return res
            .status(200)
            .json(new ApiResponse(200, "Progress already completed", progress));
    }

    const { merged, percentageWatched, totalWatched } =
        await preprocessProgressData(userId, videoId, interval);

    // Update or create progress in the database
    const isCompleted = percentageWatched >= 100;
    const newProgress = await Progress.findOneAndUpdate(
        { userId, videoId },
        {
            watchedInterval: merged,
            percentageWatched,
            totalWatched,
            lastPosition,
            isCompleted,
        },
        { new: true, upsert: true }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Progress updated successfully", newProgress)
        );
});

export { getProgress, updateProgress };
