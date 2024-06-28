"use client";
import { SignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("✌️isSignedIn --->", isSignedIn);
    if (isSignedIn === true) {
      router.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <div>
      <SignIn />
    </div>
  );
}
