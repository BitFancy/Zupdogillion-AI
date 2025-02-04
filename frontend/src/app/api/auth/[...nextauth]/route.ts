// import NextAuth, {AuthOptions} from "next-auth";
// import GoogleProvider from 'next-auth/providers/google'

// export const authOptions: AuthOptions = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID!,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//             authorization: {
//                 params: { prompt: 'select_account' },
//             },
//         }),
//     ],
//     secret: process.env.NEXTAUTH_SECRET,
//     session: {
//         strategy: "jwt",
//     },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST};

// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authOptions } from "@/lib/auth/authUtils"

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
