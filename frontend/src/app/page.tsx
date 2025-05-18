import Footer from "@/components/footer";
import Header from "@/components/header";
import MainContent from "@/components/main-content";

export default function Home() {
  return (
    <div className="flex flex-col gap-3">
      <Header />

      <MainContent />

      <Footer />
    </div>
  );
}
