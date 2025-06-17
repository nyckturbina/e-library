"use client";

import Link from "next/link";
import ClientLoansTable from "./table/table";

export default function EmprestimosAtivos() {
  return (
    <div className="p-10 justify-center min-h-screen flex items-center flex-col gap-5">
      <header>
        <h1 className="text-2xl">Histórico de empréstimos</h1>
      </header>
      <main>
        <ClientLoansTable />
      </main>
      <footer className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-3">
          <Link href={"/home"}>Voltar para página inicial</Link>
        </div>
      </footer>
    </div>
  );
}
