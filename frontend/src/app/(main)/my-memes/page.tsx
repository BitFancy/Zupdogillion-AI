"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/lib/components/Sidebar";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { Meme } from "@/lib/types";

export default function MyMemes() {
    const [memes, setMemes] = useState<Meme[]>([]);
    const [visibleCount, setVisibleCount] = useState(12);

    useEffect(() => {
        const fetchMemes = async () => {
            try {
                const res = await fetch(
                    "https://zupdogillion-ai-2ces.vercel.app/api/all_memes"
                );
                if (!res.ok) {
                    throw new Error("Failed to fetch memes!");
                }
                const data = await res.json();
                setMemes(data);
                console.log("memes -> ", memes);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMemes();
    }, [memes]);

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 12);
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 bg-[#090e14]">
                <div className="flex flex-col h-[calc(100vh-2rem)] max-w-4xl mx-auto">
                    <div className="container mx-auto px-4 py-8 divide-y divide-dashed gap-6">
                        <div className="my-6">
                            <h1 className="text-5xl font-bold mb-4 text-gray-100 dark:text-white">
                                My Memes
                            </h1>
                            <h1 className="text-xl font-bold mb-4 text-gray-100 dark:text-white">
                                Explore all memes
                            </h1>
                        </div>
                        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {memes.slice(0, visibleCount).map((meme) => (
                                <div
                                    key={meme.id}
                                    className="border dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
                                >
                                    <Image
                                        src={meme.meme_url}
                                        alt={meme.meme_name}
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
