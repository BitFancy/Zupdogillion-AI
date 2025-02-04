"use client";

import { signinAction } from "@/app/actions/signinAction";

export default function SigninButton() {
    const handleLogin = async () => {
        try {
            const user = await signinAction();
            console.log("User logged in:", user);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return <button onClick={handleLogin}>Sign In</button>;
}
