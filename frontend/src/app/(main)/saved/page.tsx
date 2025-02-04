"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/lib/components/Sidebar";
import { Button } from "@nextui-org/react";
import Image from "next/image";

interface Meme {
    id: string;
    meme_url: string;
    meme_name: string;
}

export default function SavedMemes() {
    const [memes, setMemes] = useState<Meme[]>([]);
    // const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [visibleCount, setVisibleCount] = useState(12);

    useEffect(() => {
        const fetchMemes = async () => {
            setLoading(true);
            try {
                // const res = await fetch(
                //     "https://zupdogollion-ai-backend.vercel.app/api/all_memes"
                // );
                const res = await fetch(
                    "https://zupdogollion-ai.onrender.com/api/all_memes"
                );
                if (!res.ok) {
                    throw new Error("Failed to fetch memes!");
                }
                const data = await res.json();
                console.log("data ->", data);
                setMemes(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMemes();
    }, []);

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 12);
    };

    if (loading) {
        return (
            // <MainLayout showHeaderFooter={true}>
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl text-gray-100 dark:text-white">
                    Loading memes...
                </p>
            </div>
            // </MainLayout>
        );
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 bg-[#090e14]">
                <div className="flex flex-col h-[calc(100vh-2rem)] max-w-4xl mx-auto">
                    <div className="container mx-auto px-4 py-8 divide-y divide-dashed gap-6">
                        <div className="my-6">
                            <h1 className="text-5xl font-bold mb-4 text-gray-100 dark:text-white">
                                Saved Memes
                            </h1>
                            <h1 className="text-xl font-bold mb-4 text-gray-100 dark:text-white">
                                Explore all memes
                            </h1>
                        </div>

                        {/* <div className="mb-8">
                            <div className="flex relative">
                                <input
                                    type="text"
                                    placeholder="Search memes..."
                                    className="w-full p-2 border pl-4 text-white border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                />
                                <Button className="bg-white rounded-r-md">
                                    Search
                                </Button>
                            </div>
                        </div> */}
                        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {memes.slice(0, visibleCount).map((meme) => (
                                <div
                                    key={meme.id}
                                    className="border dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
                                >
                                    <Image
                                        src={meme.meme_url}
                                        alt="memes"
                                        width={400}
                                        height={400}
                                        className="object-contain"
                                        unoptimized={true}
                                    />
                                </div>
                            ))}
                        </div>
                        {visibleCount < memes.length && (
                            <div className="flex items-center justify-center mt-6 text-blue-400">
                                <Button onClick={handleLoadMore}>
                                    Load More
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
