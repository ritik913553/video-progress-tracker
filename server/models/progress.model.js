import mongoose from "mongoose";
import Joi from "joi";

const progressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        videoId: {
            type: String,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        lastPosition: {
            type: Number,
            default: 0,
        },
        totalWatched: {
            type: Number,
            default: 0,
        },
        percentageWatched: {
            type: Number,
            default: 0,
        },
        totalDuration: {
            type: Number,
            default: 0,
        },
        watchedInterval: [
            {
                start: {
                    type: Number,
                    required: true,
                },
                end: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);

// Joi schema for validating progress data
const progressValidationSchema = Joi.object({
    
    videoId: Joi.string().required().messages({
        "string.empty": "Video ID is required",
    }),
    isCompleted: Joi.boolean().default(false),
    lastPosition: Joi.number().min(0).default(0).messages({
        "number.min": "Last position cannot be negative",
    }),
    totalWatched: Joi.number().min(0).default(0).messages({
        "number.min": "Total watched cannot be negative",
    }),
    percentageWatched: Joi.number().min(0).max(100).default(0).messages({
        "number.min": "Percentage watched cannot be less than 0",
        "number.max": "Percentage watched cannot be more than 100",
    }),
    totalDuration: Joi.number().min(0).default(0).messages({
        "number.min": "Total duration cannot be negative",
    }),
    watchedInterval: Joi.array()
        .items(
            Joi.object({
                start: Joi.number().min(0).required().messages({
                    "number.min": "Start time cannot be negative",
                    "any.required": "Start time is required",
                }),
                end: Joi.number().min(0).required().messages({
                    "number.min": "End time cannot be negative",
                    "any.required": "End time is required",
                }),
            }).custom((value, helpers) => {
                if (value.start > value.end) {
                    return helpers.error("any.invalid", {
                        message: "Start time cannot be greater than end time",
                    });
                }
                return value;
            })
        )
        .default([]),
});

export { progressValidationSchema };

export const Progress = mongoose.model("Progress", progressSchema);
