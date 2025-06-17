import ELibraryWithIcon from "@/app/home/elibrary-icon";
import { BookOpen, LogIn, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "@/components/context/AuthContext";

export default function Header() {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <div className="bg-charcoal-blue px-3 py-4 flex flex-col gap-5">
      <div className="flex gap-6 items-center justify-around">
        <ELibraryWithIcon />

        <div className="flex gap-1 w-3/5 items-center">
          <Input
            name="pesquisa"
            type="text"
            placeholder="Pesquisar livros, autores, categorias..."
            className="bg-white"
          />
          <Button type="submit" className="bg-white">
            <Search className="text-charcoal-blue" />
          </Button>
        </div>

        {/* <div className="flex justify-between">
        </div> */}
      </div>

      <hr className="border border-t-0 border-slate-500 opacity-90"></hr>

      <div className="flex justify-center gap-20">
        <button
          className="cursor-pointer flex flex-col items-center text-white"
          onClick={() => {
            router.push("/cliente/emprestimos");
          }}
        >
          <BookOpen />
          Empréstimos ativos
        </button>
        <button
          className="cursor-pointer flex flex-col items-center text-white"
          onClick={() => {
            logout();
            router.push("/");
          }}
        >
          <LogIn className="text-white" />
          Log Out
        </button>
      </div>
    </div>
  );
}
