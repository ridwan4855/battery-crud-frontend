"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.replace("/login");
      } else {
        setIsAllowed(true);
      }
    };

    checkAuth();

    const storageListener = () => checkAuth();
    window.addEventListener("storage", storageListener);

    return () => window.removeEventListener("storage", storageListener);
  }, [router]);

  if (!isAllowed) return null;

  return <>{children}</>;
}
