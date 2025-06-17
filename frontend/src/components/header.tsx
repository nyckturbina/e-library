import ELibraryWithIcon from "@/app/home/elibrary-icon";
import { BookOpen, LogIn, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "@/components/context/AuthContext";
import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  searchType: string;
  setSearchType: Dispatch<SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export default function Header({
  searchType,
  setSearchType,
  searchTerm,
  setSearchTerm,
}: HeaderProps) {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <div className="bg-charcoal-blue px-3 py-4 flex flex-col gap-5">
      <div className="flex gap-6 items-center justify-around">
        <ELibraryWithIcon />

        <div className="flex gap-1 w-3/5 items-center">
          {/* Combo box de opções de pesquisa */}
          <select
            name="searchType"
            className="bg-white border border-slate-300 rounded-xl px-2 py-2 text-charcoal-blue focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="titulo">Título</option>
            <option value="autor">Autor</option>
            <option value="genero">Gênero</option>
            <option value="isbn">ISBN</option>
          </select>

          <Input
            name="pesquisa"
            type="text"
            placeholder="Pesquisar livros, autores, categorias..."
            className="bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
