"use client";

import { useState } from "react";
import axios from "axios";

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleForgotPassword = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        try {
            await axios.post(
                "https://zupdogollion-ai-backend.vercel.app/auth/forgot-password",
                {
                    email,
                }
            );
            setMessage("Reset password link sent! Please check your email.");
        } catch (error) {
            setMessage("Failed to send reset link.");
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleForgotPassword} className="space-y-4">
            <h1 className="text-2xl font-bold mb-4 text-center">
                Forgot Password
            </h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-600 transition"
            >
                Send Reset Link
            </button>
            {message && <p className="text-center text-red-500">{message}</p>}
        </form>
    );
};

// export async function generateStaticParams() {
//     return [];
// }

export default ForgotPasswordPage;
