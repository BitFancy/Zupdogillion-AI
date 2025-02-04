"use client";

import Image from "next/image";
import { useState } from "react";
import BannerGif from "@/shared/assets/JB4o.gif";
import { signIn } from "next-auth/react";
import GoogleIcon from "@/shared/assets/google.svg";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    // const { data: session } = useSession();

    const handleSignIn = () => {
        console.log("Signing in with email:", email);
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="lg:flex mt-[100px] items-center lg:mt-[270px] lg:gap-0 mx-auto xl:gap-10">
                <div className="mx-5 rounded-md">
                    <Image
                        src={BannerGif}
                        unoptimized={true}
                        height={400}
                        alt="signin image"
                        className="rounded-[10px]"
                    />
                </div>
                <div className="flex mt-10 lg:mt-0 flex-col justify-center rounded-lg mx-5 lg:w-[500px]">
                    <h1 className="text-4xl text-center font-bold text-white mb-8">
                        Ready to meet your Meme Generator?
                    </h1>
                    {/* <button
                        onClick={() => signIn("google")}
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Sign in with Google
                    </button> */}
                    <button
                        onClick={() =>
                            signIn("google", {
                                callbackUrl: "/generate",
                            })
                        }
                        className="flex justify-center bg-white text-gray-900 mx-24 py-2 rounded-full items-center gap-4"
                    >
                        <Image
                            src={GoogleIcon}
                            width={25}
                            height={25}
                            alt="google icon"
                        />
                        Sign in with Google
                    </button>
                    <div className="relative flex py-5 items-center mx-32">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">
                            or
                        </span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>

                    <div className="mb-4 mt-2">
                        <label
                            htmlFor="email"
                            className="block text-gray-400 font-medium mb-2"
                        >
                            Login with another e-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-700 text-white rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <button
                        onClick={handleSignIn}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full"
                    >
                        Sign In
                    </button>

                    <div className="flex justify-center mt-4">
                        Don&apos;t have an account?
                        <a
                            href="/signup"
                            className="text-gray-400 hover:text-gray-300"
                        >
                            &nbsp;{" "}
                            <span className="text-[#89B8EF]">
                                {" "}
                                Create Account{" "}
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
