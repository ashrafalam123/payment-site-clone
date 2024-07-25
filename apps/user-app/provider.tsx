"use client";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <RecoilRoot>
            <SessionProvider>
                {children}
            </SessionProvider>
        </RecoilRoot>
    );
};
