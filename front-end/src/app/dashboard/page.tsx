"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const Dashboard = () => {
  const router = useRouter();
  const { user } = useUser();

  // Client-side effect to handle redirection
  useEffect(() => {
    // sign-in page if user is not authenticated
    if (!user) {
      router.push("/sign-in");
    }
  }, [user, router]);

  // Render dashboard content if user is authenticated
  if (user) {
    return (
      <>
        <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
        <p className="mb-5">Welcome to the dashboard, {user.firstName}</p>
        {console.log(user)}
      </>
    );
  }

  // Optional: Render loading spinner
  return <p>Loading...</p>;
};

export default Dashboard;
