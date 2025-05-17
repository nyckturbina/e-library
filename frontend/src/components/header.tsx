import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LogIn, Menu, Search } from "lucide-react";

export default function Header() {
  return (
    <div className="bg-charcoal-blue px-3 py-4 flex flex-col gap-5">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <Menu className="text-white" />
          <div className="flex gap-2.5 justify-center items-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-book-fill text-celestial-blue"
              viewBox="0 0 16 16"
            >
              <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
            </svg>
            E-Library
          </div>
        </div>
        <div className="flex gap-1">
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
      </div>

      <hr className="border border-t-0 border-slate-500 opacity-90"></hr>

      <div className="flex justify-center gap-20">
        <div className="flex flex-col items-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
          Conta
        </div>
        <div className="flex flex-col items-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-heart-fill text-white"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
            />
          </svg>
          Favoritos
        </div>

        <div className="flex flex-col items-center text-white">
          <LogIn className="text-white" />
          Login
        </div>
      </div>
    </div>
  );
}
