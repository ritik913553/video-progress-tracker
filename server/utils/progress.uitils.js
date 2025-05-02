export const mergedIntervals = (intervals) => {
    if (!intervals || intervals.length === 0) {
        return { merged: [], totalWatched: 0 };
    }

    // Sort intervals by start time
    intervals.sort((a, b) => a.start - b.start);

    const merged = [intervals[0]];
    let totalWatched = merged[0].end - merged[0].start;

    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const lastMerged = merged[merged.length - 1];

        if (current.start <= lastMerged.end) {
            // Merge overlapping intervals
            totalWatched += Math.max(0, current.end - lastMerged.end);
            lastMerged.end = Math.max(lastMerged.end, current.end);
        } else {
            merged.push(current);
            totalWatched += current.end - current.start;
        }
    }

    return { merged, totalWatched };
};
export const calculatePercentage = (totalWatched, totalDuration) => {
    if (totalDuration === 0) {
        return 0;
    }
    const percentage = (totalWatched / totalDuration) * 100;
    return Math.min(percentage, 100);
};
