import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Link from "next/link"; //Necessário para linkar a página de register
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <div className="h-svh flex flex-col items-center justify-center gap-3">
      <main className="max-w-2/6">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Login necessário! Preencha todos os campos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter className="flex items-center justify-center">
          </CardFooter>
        </Card>
      </main>
      <footer className="text-center">
        Não tem uma conta?<br></br>
        <Link href="/register" className="text-black hover:text-blue-500">
          Crie uma agora!
        </Link>
      </footer>
    </div>
  );
}
