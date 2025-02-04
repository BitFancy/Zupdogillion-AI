"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const ResetPasswordPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post(
                `https://zupdogollion-ai-backend.vercel.app/auth/reset-password/${token}`,
                {
                    password,
                }
            );
            setMessage("Password has been reset successfully!");
            router.push("/signin"); // Redirect to sign-in page after successful reset
        } catch (error) {
            setMessage("Failed to reset password.");
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleResetPassword} className="space-y-4">
            <h1 className="text-2xl font-bold mb-4 text-center">
                Reset Password
            </h1>
            <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-600 transition"
            >
                Reset Password
            </button>
            {message && <p className="text-center text-red-500">{message}</p>}
        </form>
    );
};

export default ResetPasswordPage;
