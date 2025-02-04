"use server"

import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth/authUtils'

export const signinAction = async () => {
    const session = await getServerSession(authOptions);
    if (session) {
        return { user: session.user};
    } else {
        throw new Error("Authentication failed");
    }
};