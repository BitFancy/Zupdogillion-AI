import { signIn } from "next-auth/react";
import GoogleIcon from "@/shared/assets/google.svg";
import Image from "next/image";
const SigninWithGoogleButton = () => {
    return (
        <button
            onClick={() =>
                signIn("google", {
                    callbackUrl: "/generate",
                })
            }
            className="flex justify-center bg-white text-gray-900 mx-24 py-2 rounded-full items-center gap-4"
        >
            <Image src={GoogleIcon} width={25} height={25} alt="google icon" />
            Sign in with Google
        </button>
    );
};

export default SigninWithGoogleButton;
