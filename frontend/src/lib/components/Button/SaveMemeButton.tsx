import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";

const SaveMemeButton = () => {
    const { data: session } = useSession();
    const handleSaveMeme = async () => {
        try {
            console.log("save meme clicked ---------");
            console.log("user  email -> ", session?.user?.email);
            const response = await fetch(
                "https://mongoose-infinite-truly.ngrok-free.app/api/save_memes",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_email: session?.user?.email,
                        meme_url:
                            "https://res.cloudinary.com/dbd6zdijk/image/upload/c_fit,h_200,l_text:Arial_140:Your%20Text%20Here,w_1000,x_0,y_0/c_fit,h_400,l_text:Arial_40:Your%20Text%20Here,w_1000,x_0,y_400/quickstart_butterfly",
                        prompt: "Create cate meme",
                        meme_name: "Cate Meme",
                        category: "Funny",
                    }),
                }
            );
            console.log("response - > ", response);
        } catch (error) {
            console.error("error : ", error);
        }
    };
    return (
        <Button className=" bg-blue-500 rounded-md" onPress={handleSaveMeme}>
            Save
        </Button>
    );
};
export default SaveMemeButton;
