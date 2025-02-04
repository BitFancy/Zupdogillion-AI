import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import AuthSessionProvider from "@/lib/auth/AuthSessionProvider";
import { getServerSession } from "next-auth";
import authConfig from "@/lib/auth/authConfig";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";
import AuthSessionProvider from "@/lib/auth/AuthSessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AI Meme Generator",
    description: "Transform Your Thoughts into Hilarious Memes in Seconds!",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authConfig);
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta
                    httpEquiv="Content-Security-Policy"
                    content="upgrade-insecure-requests"
                />
            </head>
            <body className={inter.className}>
                <Providers
                    themeProps={{ attribute: "class", defaultTheme: "dark" }}
                >
                    <AuthSessionProvider session={session}>
                        {children}
                        <ToastContainer />
                    </AuthSessionProvider>
                </Providers>
            </body>
        </html>
    );
}
