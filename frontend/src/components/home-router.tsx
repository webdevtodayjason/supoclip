"use client";

// Modified by Pressloom (modified SupoClip, AGPL-3.0), 2026-11-24: signed-out visitors go to
// sign-in instead of the SupoClip marketing landing page.
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { PageLoading } from "@/components/app/page-state";
import { useSession } from "@/lib/auth-client";

const HomeApp = dynamic(() => import("@/components/home-app"), {
  ssr: false,
});

export function HomeRouter() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const signedOut = !isPending && !session?.user;

  useEffect(() => {
    if (signedOut) router.replace("/sign-in");
  }, [router, signedOut]);

  if (!isPending && session?.user) {
    return <HomeApp />;
  }

  return <PageLoading />;
}
