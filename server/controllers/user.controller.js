import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User, validateUser } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating refresh and access tokens"
        );
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        throw new ApiError(400, errorMessages.join(", "));
    }

    const { fullName, email, password } = req.body;

    if (
        [fullName, email, password].some(
            (field) => !field || field.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fileds are required");
    }

    const existedUser = await User.findOne({
        email: email,
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    const user = await User.create({
        fullName,
        email,
        password,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while registering the user"
        );
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, "User registered successfully", createdUser)
        );
});
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new ApiError(400, " email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const ispasswordValid = await user.isPasswordCorrect(password);

    if (!ispasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, "User logged in successfully", {
                user: loggedInUser,
                accessToken,
                refreshToken,
            })
        );
});
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { refreshToken: 1 }, //this removes the field from  document
        },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, "User logged out successfully", {}));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        };

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshTokens(user._id);

        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );
        if (!loggedInUser) {
            throw new ApiError(401, "Invalid refresh token");
        }
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200, "Access token refreshed successfully", {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                })
            );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
