"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn !== "true") {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="p-10 justify-center min-h-screen flex items-center text-white">
      <h1 className="text-2xl">Menu principal (em andamento)</h1>
      <p>Logado com sucesso</p>
    </div>
  );
}
