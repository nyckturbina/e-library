"use client";

import { useLoginForm } from "./useLoginForm";

export default function LoginForm() {
  const { register, handleSubmit, errors, isPending, onSubmit } =
    useLoginForm();

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="seu@email.com"
            className={`w-full p-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Senha
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Sua senha"
            className={`w-full p-2 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {errors.root && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.root.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-2 px-4 rounded text-white ${
            isPending
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isPending ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
