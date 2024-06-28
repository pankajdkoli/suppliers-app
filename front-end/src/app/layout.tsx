import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Supplier App",
  description: "next app",
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
          <div>
            <Link href={"/"}>
              <h1>Supplier App</h1>
            </Link>
          </div>
          <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton showName />
            </SignedIn>

            <main className="container mx-auto">
              <div className="flex items-start justify-center min-h-screen">
                <div className="mt-20">{children}</div>
              </div>
            </main>
          </header>
        </body>
      </html>
    </ClerkProvider>
  );
}
