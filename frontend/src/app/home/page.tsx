"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import MainContent from "@/components/main-content";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  // Estado para pesquisa
  const [searchType, setSearchType] = useState("titulo");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <Header
        searchType={searchType}
        setSearchType={setSearchType}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <MainContent searchType={searchType} searchTerm={searchTerm} />

      <Footer />
    </div>
  );
}
