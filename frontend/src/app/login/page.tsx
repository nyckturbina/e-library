"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; //Necessário para linkar a página de register

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@admin.com" && password === "qwe123") {
      localStorage.setItem("loggedIn", "true");
      router.push("/dashboard"); //Chama dashboard se o login tiver correto
    } else {
      setError("E-mail ou senha incorretos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-black text-center">Login necessário</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="email" //Detecta se o que está escrito está com a formatação de email (ter @)
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-2 rounded"
          required
        />
        <input
          type="password" //Adiciona a máscara e o olho para ver a senha
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
          required
        />
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Entrar
        </button>

        <p className="text-center text-black">
            Não tem uma conta?<br></br>
            <Link href="/register" className="text-black hover:text-blue-500">
                Crie uma agora!
            </Link>
        </p>

      </form>
    </div>
  );
}
