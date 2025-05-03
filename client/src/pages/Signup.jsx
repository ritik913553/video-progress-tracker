import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaTumblr } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { signup } from "../http";

function AccountDetails() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
          const response = await signup(data);
          if(response.status === 201){
            toast.success("Account created!",{duration:4000,})
            navigate('/')
          }
        } catch (error) {
          console.log((error));

          toast.error("Something went wrong during account creation!")
        }
        reset();
    };

    return (
        <div className="w-full h-screen flex justify-center items-center  text-white">
            <div className=" -mt-25 w-full p-2 sm:w-[45%]">
                <div className="w-full flex flex-col sm:mt-10  sm:px-4 px-2">
                    <h1 className="text-4xl font-semibold mb-1 text-white ">
                        Sign Up
                    </h1>
                    <div className="flex items-center text-zinc-400 ">
                        <p className="text-sm">Already have an account?</p>
                        <Link
                            onClick={() => navigate(-1)}
                            className="text-sm ml-2 text-blue-600"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>

                <div className="px-1 py-2  rounded mt-3">
                    <div
                        style={{
                            boxShadow:
                                "0 1px 1px rgba(255, 255, 255, 0.3), 0 1px 3px rgba(255, 255, 255, 0.3)",
                        }}
                        className="bg-[#121212] p-6 shadow-lg w-full min-h-[90px] flex flex-col justify-center mt-5 sm:mt-1 mb-5 rounded-xl"
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Name */}
                            <div className="flex flex-col mb-3">
                                <label className="text-gray-300 text-sm mb-1">
                                    Full Name *
                                </label>
                                <input
                                    {...register("fullName", {
                                        required: "Name is required",
                                    })}
                                    placeholder="Enter Your Full Name"
                                    className="w-full bg-[#1E1E1E] text-white px-4 py-1 rounded-md outline-none border border-transparent focus:border-gray-500"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="flex flex-col mb-3">
                                <label className="text-gray-300 text-sm">
                                    Email Address *
                                </label>
                                <div className="relative flex items-center mt-1">
                                    <input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message:
                                                    "Invalid email address",
                                            },
                                        })}
                                        placeholder="Enter your email address"
                                        className="w-full bg-[#1E1E1E] text-white px-4 py-1 rounded-md outline-none border border-transparent focus:border-gray-500"
                                    />
                                    <span className="absolute right-4 text-gray-400">
                                        <FaTumblr size={20} />
                                    </span>
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-sm">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/*  Password */}
                            <div className="flex flex-col mb-3">
                                <label className="text-gray-300 text-sm">
                                    Password *
                                </label>
                                <div className="relative flex items-center mt-1">
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message:
                                                    "Password must be at least 6 characters",
                                            },
                                        })}
                                        placeholder="Enter your password here"
                                        className="w-full bg-[#1E1E1E] text-white px-4 py-1 rounded-md outline-none border border-transparent focus:border-gray-500"
                                    />
                                    <span
                                        className="absolute right-4 text-gray-400 cursor-pointer"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <FiEyeOff size={20} />
                                        ) : (
                                            <FiEye size={20} />
                                        )}
                                    </span>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-sm">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                           

                            {/* Submit Button */}
                            <div className="flex items-center justify-center mt-4">
                                <button
                                    type="submit"
                                    className="w-full px-10 py-1 rounded bg-[#5c4cf0] hover:bg-[#6c72c5] text-black cursor-pointer"
                                >
                                    Create Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountDetails;
