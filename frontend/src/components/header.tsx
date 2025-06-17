import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BookOpen, LogIn, Menu, Search } from "lucide-react";
import ELibraryWithIcon from "@/app/home/elibrary-icon";

export default function Header() {
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
        <div className="flex flex-col items-center text-white">
          <BookOpen />
          Empréstimos ativos
        </div>
        <div className="flex flex-col items-center text-white">
          <LogIn className="text-white" />
          Log Out
        </div>
      </div>
    </div>
  );
}
