import { mergedIntervals, calculatePercentage } from "../utils/progress.uitils.js";
import { Progress } from "../models/progress.model.js";

export const preprocessProgressData = async (userId, videoId, newInterval) => {
    const progress = await Progress.findOne({ userId, videoId });

    let intervals = [];
    if (progress) {
        intervals = progress.watchedInterval || [];
    }

    // Add the new interval and merge overlapping intervals
    intervals.push(newInterval);
    const {merged,totalWatched} = mergedIntervals(intervals);

    // Calculate the percentage of the video watched
    const percentageWatched = calculatePercentage(totalWatched, progress?.totalDuration || 0);

    return { merged, percentageWatched,totalWatched };
};