"use server"

import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'

export const signinAction = async () => {
    const session = await getServerSession(authOptions);
    if (session) {
        return { user: session.user};
    } else {
        throw new Error("Authentication failed");
    }
};