
import { useState } from "react";
import Image from "next/image";
import { Meme } from "@/lib/types";
import MemeModal from "../modal/Modal";
interface MemeCardProps {
    meme: Meme;
}

export const MemeCard: React.FC<MemeCardProps> = ({ meme }) => {
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
                        <button className="px-3 rounded-full font-bold bg-blue-400 text-gray-800 hover:text-gray-200 flex items-center">
                            Share on <X />
                        </button>
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
