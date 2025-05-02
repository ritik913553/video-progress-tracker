import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "../http/index.js";
import { useAuth } from "../context/AuthProvider.jsx";

function Login() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redirect to /home if the user is already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home");
        }
    }, [isAuthenticated, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const { setUser, setIsAuthenticated } = useAuth();

    const handleLogin = async (data) => {
        console.log("Handled  login triggered");
        console.log(data);
        console.log(import.meta.env.VITE_API_URL);

        try {
            const res = await login(data);
            console.log(res);
            if (res.status === 200) {
                setUser(res.data.data.user);
                setIsAuthenticated(true);
                toast.success("Login successful");
                navigate("/");
            }
            reset();
        } catch (error) {
            reset();
        }
    };

    return (
        <div className="w-full flex flex-col items-center sm:justify-center h-screen">
            <section className="view w-full rounded-lg flex items-center justify-center p-4 sm:px-3 sm:mt-5 mt-2 sm:mb-0 mb-2 ">
                <div className="form sm:w-[500px] md:w-[500px] sm:h-[80%] w-[98%] rounded-lg ">
                    <div className="top text-white font-semibold text-xl w-fit ">
                        <h1 className="w-fit  font-semibold text-4xl mb-8 sm:mb-5">
                            Sign In
                        </h1>
                    </div>

                    <form
                        onSubmit={handleSubmit(handleLogin)}
                        className="space-y-3 sm:space-y-4 rounded-lg px-5 py-2 "
                        style={{
                            boxShadow:
                                "0 1px 1px rgba(255, 255, 255, 0.3), 0 1px 3px rgba(255, 255, 255, 0.3)",
                        }}
                    >
                        {/* Email Input */}
                        <div className="space-y-2 ">
                            <label className="text-gray-300 text-sm">
                                Email address
                            </label>
                            <div className="relative flex items-center mt-1">
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                    })}
                                    placeholder="Enter your email address"
                                    className="w-full bg-[#1E1E1E] text-white px-4 py-2 rounded-md outline-none border border-transparent focus:border-gray-500"
                                />

                                {/* <span className="absolute right-4 text-gray-400">
                  <FaTumblr className="text-gray-400" size={20} />
                </span> */}
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2 ">
                            <label className="text-gray-300 text-sm">
                                Password
                            </label>
                            <div className="relative flex items-center mt-1">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Minimum 6 characters required",
                                        },
                                    })}
                                    placeholder="Enter your password here"
                                    className="w-full bg-[#1E1E1E] text-white px-4 py-2 rounded-md outline-none border border-transparent focus:border-gray-500"
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

                            <span className="text-gray-400 text-sm ">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="w-fit text-xs text-blue-600 cursor-pointer"
                                >
                                    Signup
                                </Link>
                            </span>
                        </div>

                        {/* Button */}
                        <div className="  flex items-center justify-end">
                            <button
                                type="submit"
                                className="px-5 py-1 bg-[#5c4cf0] hover:bg-[#6c72c5] font-semibold rounded-full text-center  cursor-pointer w-fit"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Login;
