import { Button } from "@nextui-org/react";

const ShareOnTwitterButton = () => {
    const handleShareMemeOnX = () => {
        
        console.log("share button clicked -> ");
    };
    return (
        <Button
            onPress={() => handleShareMemeOnX}
            className="px-3 rounded-full font-bold bg-blue-400 text-gray-800 hover:text-gray-200 flex items-center"
        >
            Share on X
        </Button>
    );
};

export default ShareOnTwitterButton;
