"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import MainContent from "@/components/main-content";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3">
      <Header />

      <MainContent />

      <Footer />
    </div>
  );
}
