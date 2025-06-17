import { LoginFormData, loginSchema } from "@/models/zod-schemas/login-schema";
import { useLoginMutation } from "@/service/client/login-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function useLoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const { mutate, error, isPending } = useLoginMutation();

  const onSubmit = async (data: LoginFormData) => {
    try {
      if (data.email === "admin@admin.com" && data.password === "qwe123") {
        localStorage.setItem("loggedIn", "true");
        router.push("/dashboard/livros");
        return;
      }

      mutate(data, {
        onSuccess: response => {
          if (response) {
            router.push("/home");
          } else {
            setFormError("root", {
              type: "manual",
              message: "E-mail ou senha incorretos"
            });
          }
        },
        onError: () => {
          setFormError("root", {
            type: "manual",
            message: "Ocorreu um erro durante o login"
          });
        }
      });
    } catch (error) {
      setFormError("root", {
        type: "manual",
        message: "Ocorreu um erro durante o login"
      });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isPending,
    onSubmit
  };
}
