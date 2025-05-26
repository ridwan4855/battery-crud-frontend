"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem("authToken");
    if (token) {
      router.replace("/");
    } else {
      setIsChecking(false);
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>; // Add loading state
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const credentials = {
      username: formData.get("username")?.toString() || "", // Handle null/undefined
      password: formData.get("password")?.toString() || "",
    };

    // Add frontend validation
    if (!credentials.username || !credentials.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (!response.ok) {
        alert("Username Or Password Invalid");
        return;
      }

      localStorage.setItem("authToken", data.token);
      router.replace("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  if (isChecking) return null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="p-4 border rounded">
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="block mb-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="block mb-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Login
        </button>
      </form>
    </div>
  );
}
