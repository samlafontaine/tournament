import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import {
  ClerkProvider,
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tournament app",
  description: "Easily create a tournament with matches and general rankings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <SignedOut>
            <div>
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <main className="min-h-screen p-5 md:pt-24 flex flex-col items-center">
              <div className="items-start">
                <UserButton />
              </div>
              {children}
            </main>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
