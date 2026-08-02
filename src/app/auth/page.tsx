"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/agenda");
      }
    });
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      router.replace("/agenda");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "No se pudo completar la autenticación",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-xl border p-6 shadow-sm">
        <div className="mb-6 space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Ingresar
          </p>
          <h1 className="text-2xl font-semibold">Bienvenido de nuevo</h1>
          <p className="text-sm text-muted-foreground">
            Accede para gestionar clientes y turnos.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Procesando..." : "Ingresar"}
          </Button>
        </form>
      </div>
    </main>
  );
}
