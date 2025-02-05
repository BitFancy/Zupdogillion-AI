// components/ImageModal.tsx

import { useState } from "react";
import {
    Modal,
    ModalContent,
    // ModalHeader,
    ModalBody,
    // ModalFooter,
    Button,
    Image,
} from "@nextui-org/react";
import { Heart, MoreHorizontal, Share2, X } from "lucide-react";
import CopyToClipboardButton from "../Button/CopyToClipboardButton";

interface MemeModalProps {
    isOpen: boolean;
    onClose: () => void;
    meme: {
        id: string;
        meme_url: string;
        meme_name: string;
        owner_name: string;
        prompt: string;
        likes: number;
    };
}

export function MemeModal({ isOpen, onClose, meme }: MemeModalProps) {
    const [isShowMore, setIsShowMore] = useState(false);
    // const [likes, setLikes] = useState(meme.likes);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        if (isLiked) {
            // setLikes(likes - 1);
        } else {
            // setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    };
    return (
        <Modal
    isOpen={isOpen}
    onClose={onClose}
    size="xl"
    scrollBehavior="inside"
    classNames={{
        base: "bg-[#0f1115] text-white flex justify-center items-center",
        closeButton: "text-white hover:bg-white/20",
    }}
>
    <ModalContent className="w-[800px] h-[600px]">
        {(onClose) => (
            <ModalBody className="p-0 overflow-hidden">
                <div className="flex flex-col md:flex-row h-[90vh] md:h-[80vh]">
                    {/* Image Section */}
                    <div className="relative flex-1 bg-black justify-between">
                        <Button
                            isIconOnly
                            className={`text-white bg-transparent hover:bg-white/20 ${
                                isLiked && "text-red-500 hover:text-red-600"
                            }`}
                            onPress={handleLike}
                        >
                            <Heart className="h-5 w-5" />
                        </Button>
                        <Image
                            src={meme.meme_url}
                            alt={meme.meme_name}
                            className="object-contain w-full h-full"
                            width={600}
                            height={500}
                        />
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-[400px] p-6 flex flex-col mt-8">
                        {/* Header */}
                        <Button
                            isIconOnly
                            className="absolute top-2 right-2 text-white bg-transparent hover:bg-white/20"
                            onPress={onClose}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-500" />
                                <div>
                                    <p className="font-medium">
                                        {meme.owner_name}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <Button
                                    isIconOnly
                                    className="text-white bg-transparent hover:bg-white/20"
                                >
                                    <Share2 className="h-5 w-5" />
                                </Button>

                                <Button
                                    isIconOnly
                                    className="text-white bg-transparent hover:bg-white/20"
                                >
                                    <MoreHorizontal className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Prompt */}
                        <h2 className="text-xl font-bold">
                            {meme.meme_name}
                        </h2>
                        <div className="flex-1 mt-5">
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="flex justify-between">
                                    <p className="text-sm text-gray-300 disabled">
                                        Prompt
                                    </p>
                                    <CopyToClipboardButton
                                        text={meme.prompt}
                                    />
                                </div>
                                <p
                                    className={`mt-2 text-sm ${
                                        !isShowMore && "line-clamp-3"
                                    }`}
                                >
                                    {meme.prompt}
                                </p>
                                {meme.prompt.length > 150 && (
                                    <button
                                        onClick={() =>
                                            setIsShowMore(!isShowMore)
                                        }
                                        className="text-sm text-blue-400 mt-2 hover:text-blue-300"
                                    >
                                        {isShowMore
                                            ? "Show less"
                                            : "Show more"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBody>
        )}
    </ModalContent>
</Modal>
    );
}

export default MemeModal;
