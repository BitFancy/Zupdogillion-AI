"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/lib/components/Sidebar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import SaveMemeButton from "@/lib/components/Button/SaveMemeButton";

export default function Generate() {
    const [prompt, setPrompt] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState("");
    const [history, setHistory] = useState<string[]>([]);

    const { data: session } = useSession();

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await fetch("https://zupdogillion-ai-2ces.vercel.app/api/history");
            const text = await response.text();
            const data = JSON.parse(text);
            setHistory(data.history);
        } catch (error) {
            console.error("Error fetching history: ", error);
        }
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError("Please enter a prompt");
            return;
        }

        setError("");
        setIsGenerating(true);
        fetchHistory();

        try {
            const formData = new FormData();
            formData.append("prompt", prompt.trim());
            console.log('clicked generate button')

            const response = await fetch(
                "https://zupdogillion-ai-2ces.vercel.app/api/generate",
                // "http://localhost:5328/api/generate",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setImageUrl(data.image_url);
        } catch (error) {
            console.error("Error generating meme: ", error);
            setError("Failed to generate meme. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const MemeDisplay = () => {
        const [isHovered, setIsHovered] = useState(false);
        if (error) {
            return (
                <div
                    className="flex items-center justify-center text-red-500"
                    style={{ height: "calc(100vh - 400px)" }}
                >
                    {error}
                </div>
            );
        }

        if (isGenerating) {
            return (
                <div
                    className="flex items-center justify-center"
                    style={{ height: "calc(100vh - 400px)" }}
                >
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            );
        }

        if (imageUrl) {
            console.log("url from generated meme: ", imageUrl);
            return (
                <div
                    className="flex justify-center relative items-center w-full"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Image
                        src={imageUrl}
                        alt="Generated meme"
                        width={350}
                        height={300}
                        unoptimized={true}
                        className="rounded-lg"
                        priority
                    />
                    {isHovered && (
                        <div className="absolute bg-black bg-opacity-50">
                            <SaveMemeButton />
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div
                className="flex text-xl mt-5 items-center justify-center"
                style={{ height: "calc(100vh - 400px)" }}
            >
                {history.length == 0 && "Generate new meme with your idea"}
            </div>
        );
    };

    const HistoryDisplay = () => {
        const [isHovered, setIsHovered] = useState<number | null>(null);
        return (
            <div className="h-[220px] overflow-y-auto pr-1">
                <div className="flex flex-row flex-wrap gap-4">
                    {history.map((url, index) => (
                        <div
                            key={index}
                            className="relative flex justify-center items-center"
                            onMouseEnter={() => setIsHovered(index)}
                            onMouseLeave={() => setIsHovered(null)}
                        >
                            <Image
                                src={url}
                                alt={`Generated meme ${index + 1}`}
                                width={150}
                                height={150}
                                unoptimized={true}
                                className="rounded-lg"
                            />
                            {isHovered == index && (
                                <div className="absolute flex items-center justify-center bg-black bg-opacity-50 inset-0">
                                    <SaveMemeButton />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 bg-[#090e14] items-center">
                <div className="flex flex-col h-[100vh] pt-[30px] pb-[35px] box-border xl:mx-auto mx-5 xl:w-[1000px] p-4">
                    <div
                        className="flex flex-col border-2 border-dashed border-gray-700 rounded-lg w-full items-center justify-center relative text-center text-gray-300 p-4"
                        style={{ height: "calc(100% - 50px)" }}
                    >
                        {!session ? (
                            <div>
                                <div className="text-xl mb-4">
                                    If you want to create a meme{" "}
                                    <div>
                                        firstly{" "}
                                        <span className="text-blue-300">
                                            join us
                                        </span>
                                    </div>
                                </div>
                                <Link
                                    href="/signup"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col h-full justify-between">
                                <HistoryDisplay />
                                <MemeDisplay />
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex gap-2">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Write whatever you want for your meme..."
                            className="flex-1 bg-[#2a2d31] text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isGenerating || !session}
                        />
                        <Button
                            onPress={handleGenerate}
                            disabled={
                                isGenerating || !session || !prompt.trim()
                            }
                            className={`px-6 py-2 rounded-lg transition-colors ${
                                session
                                    ? "bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300 disabled:cursor-not-allowed"
                                    : "bg-blue-900 text-gray-300 cursor-not-allowed"
                            }`}
                        >
                            {isGenerating ? "Generating..." : "Generate"}
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
