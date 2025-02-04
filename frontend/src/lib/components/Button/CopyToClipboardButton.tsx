import { useState } from "react";
import copy from "clipboard-copy";
import { Copy, CopyCheck } from "lucide-react";

interface CopyToClipboardButtonProps {
    text: string;
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
    text,
}) => {
    const [isCopied, setIsCopied] = useState<boolean>(false); // State to track if text is copied

    const handleCopyClick = async () => {
        try {
            await copy(text);
            setIsCopied(true);
        } catch (error) {
            console.error("Failed to copy text to clipboard", error); // Log any errors
        }
    };

    return (
        <button onClick={handleCopyClick}>
            {isCopied ? <CopyCheck /> : <Copy />}
        </button>
    );
};

export default CopyToClipboardButton;
