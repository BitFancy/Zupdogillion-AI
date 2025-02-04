"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

import type { Session } from "next-auth";
import type { FC } from "react";

type Props = {
    session: Session | null;
    children: React.ReactNode;
};

const AuthSessionProvider: FC<Props> = ({ session, children }) => {
    return (
        <SessionProvider session={session} refetchOnWindowFocus={false}>
            {children}
        </SessionProvider>
    );
};

export default AuthSessionProvider;
