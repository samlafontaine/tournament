import { Button } from "@/components/ui/button";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

export default async function Page() {
  const user = await currentUser();
  return (
    <main>
      <ClerkProvider>
        <div className="flex flex-row w-full justify-between items-center py-5 px-20">
          <div className="flex flex-row gap-2">
            <div>about</div>
            <div>features</div>
          </div>
          <SignedIn>
            <Link href="/app">
              <Button size={"sm"} variant={"secondary"} className="text-xs">
                Go to app {user?.firstName}
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href="/app">
              <Button size={"sm"} className="text-xs">
                Sign up
              </Button>
            </Link>
          </SignedOut>
        </div>
        <div className="p-5 md:pt-24 flex flex-col items-center">
          <div className="flex flex-col w-full md:w-6/12">
            <div className="flex flex-col gap-6 items-center">
              <div className="flex flex-col gap-2 items-center">
                <h1 className="text-4xl">Create and manage a tournament</h1>
                <p className="text-muted-foreground text-center">
                  Office ping pong tournament, fifa championship with friends or
                  the annual block street hockey tournament - create and track
                  any kind of tournament with tournify.
                </p>
              </div>
              <SignedIn>
                <Link href="/app">
                  <Button size={"sm"} variant={"secondary"} className="text-xs">
                    Go to app
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <Link href="/app">
                  <Button size={"sm"} className="text-xs">
                    Sign up
                  </Button>
                </Link>
              </SignedOut>
            </div>
          </div>
        </div>
      </ClerkProvider>
    </main>
  );
}
