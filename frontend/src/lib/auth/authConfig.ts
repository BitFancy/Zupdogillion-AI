import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import type { AuthOptions } from "next-auth";

type AuthData = {
    user: string;
    token: string;
}

const authConfig: AuthOptions = {
    providers: [
        Credentials({
            id: 'siwe',
            name: "SIWE",
            type: "credentials",
            credentials: {
                message: {
                    label: "Message",
                    type: "text",
                    placeholder: '0x0',
                },
                signature: {
                    label: "Signature",
                    type: "text",
                    placeholder: "0x0"
                },
            },
            async authorize(credentials) {
                const message = credentials?.message;
                const signature = credentials?.signature;

                try{
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/verify`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                message,
                                signature,
                            }),
                        }
                    );

                    const authData : AuthData = await res.json();

                    console.log('authData -> ', authData)

                    return {
                        id: authData.user,
                        jwt: authData.token,
                    };
                } catch (e) {
                    console.log(e);
                    return null;
                }
            }
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            httpOptions: {
                timeout: 60000,
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/login",
    },
    callbacks :{
        async jwt({ token, user, account, trigger}) {
            if(trigger === "signIn") {
                if (account) {
                    token.accessToken = account.access_token!;
                    token.refreshToken = account.refresh_token;

                    if(account.provider === "google") {
                        token.idToken = account.id_token;
                    }

                    // token.provider = account.provider as Provider;
                    token.providerAccountId = account.providerAccountId;
                }

                if (user) {
                    token.username = user.id;
                    // token.accountToken = user.jwt;
                }
            }
            return token;
        },

        async session({ session, token}) {
            return {
                ...session,
                idToken: token.idToken,
                username : token.username,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                provider: token.provider,
                providerAccountID: token.providerAccountId,
            }
        }
    }
}

export default authConfig;