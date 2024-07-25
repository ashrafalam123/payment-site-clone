"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function AppbarClient() {
    const session = useSession();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <div>
            <Appbar
                onSignin={signIn}
                onSignout={async () => {
                    await signOut();
                    router.push("/api/auth/signin");
                }}
                user={session.data?.user}
            />
        </div>
    );
}
