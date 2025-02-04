"use client";

import Image from "next/image";
import {
    ThumbsUp,
    MoreHorizontal,
    UserCircle,
    Bookmark,
} from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Header from "@/lib/components/layout/header";
import Footer from "@/lib/components/layout/footer";
import MemeModal from "@/lib/components/modal/Modal"; // Ensure this path is correct
import "./index.css";
import { Meme } from "@/lib/types";
import ShareOnTwitterButton from "@/lib/components/Button/ShareOnTwitterButton";

const AllMemes: React.FC = () => {
    const [memes, setMemes] = useState<Meme[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visibleCount, setVisibleCount] = useState<number>(12);

    useEffect(() => {
        const fetchMemes = async () => {
            setLoading(true);
            try {
                // const res = await fetch("https://mongoose-infinite-truly.ngrok-free.app/api/all_memes");
                const res = await fetch(
                    "https://zupdogollion-ai.onrender.com/api/all_memes"
                );
                if (!res.ok) {
                    throw new Error("Failed to fetch memes!");
                }

                const data: Meme[] = await res.json();
                console.log("memes from backend ------------>", data);
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
            <>
                <Header />
                <div className="flex items-center justify-center h-screen">
                    <p className="text-xl text-gray-100 dark:text-white">
                        Loading memes...
                    </p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-6xl font-bold mb-4 text-gray-100 dark:text-white">
                    All Memes
                </h1>
                <h1 className="text-2xl font-bold mb-4 text-gray-100 dark:text-white">
                    Explore all memes
                </h1>

                <div className="mb-8">
                    <div className="flex relative">
                        <input
                            type="text"
                            className="bg-gray-700 text-white rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Search Memes"
                        />
                        <Button className="bg-[#89B8EF] text-blue-950 rounded-r-md">
                            Search
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {memes.slice(0, visibleCount).map((meme) => (
                        <MemeCard key={meme.id} meme={meme} />
                    ))}
                </div>

                {visibleCount < memes.length && (
                    <div className="flex items-center justify-center mt-6 text-blue-400">
                        <Button onClick={handleLoadMore}>Load More</Button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

interface MemeCardProps {
    meme: Meme;
}

const MemeCard: React.FC<MemeCardProps> = ({ meme }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [selectedMeme, setSelectedMeme] = useState<Meme | undefined>(
        undefined
    );
    const openModal = (meme: Meme) => {
        setSelectedMeme(meme); // Set the selected meme
        console.log("clicked modal -------------", meme); // Log the selected meme
    };

    const closeModal = () => {
        setSelectedMeme(undefined); // Reset the selected meme
    };

    return (
        <div
            className="relative border shadow-inner dark:bg-gray-700 rounded-lg overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Image
                src={meme.meme_url}
                alt="memes"
                width={400}
                height={400}
                className="w-full h-48 object-cover cursor-pointer"
                unoptimized={true}
            />
            {isHovered && (
                <div
                    onClick={() => openModal(meme)}
                    className="absolute inset-0 flex flex-col justify-between p-4 bg-black bg-opacity-50"
                >
                    <div className="flex justify-between text-gray-300 mb-2">
                        <div className="flex gap-2">
                            <UserCircle /> {meme.owner_name}
                        </div>
                        <button className="text-gray-200 hover:text-gray-500">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4">
                            <button className="text-blue-500 hover:text-blue-600 flex items-center">
                                <ThumbsUp size={20} className="mr-1" />
                                {"  "}
                                {meme.likes}
                            </button>
                            <button className="text-gray-200 hover:text-gray-500 flex items-center">
                                <Bookmark />
                            </button>
                        </div>
                        {/* <button className="px-3 rounded-full font-bold bg-blue-400 text-gray-800 hover:text-gray-200 flex items-center">
                            Share on <X />
                        </button> */}
                        <ShareOnTwitterButton />
                    </div>
                </div>
            )}
            {selectedMeme && (
                <MemeModal
                    isOpen={!!selectedMeme}
                    onClose={closeModal}
                    meme={selectedMeme}
                />
            )}
        </div>
    );
};

export default AllMemes;
