import { useState } from "react";
import { Sun, Lock, Mail } from "lucide-react";
import { Button } from "./ui/Button";

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl animate-fade-in-down">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-amber-500 rounded-2xl mb-4">
            <Sun className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">SolarManager</h1>
          <p className="text-slate-500 font-medium">
            Faça login para acessar o painel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">
              E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                required
                type="email"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-indigo-500"
                placeholder="usuario@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                required
                type="password"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button type="submit" isLoading={loading} className="w-full mt-4">
            Entrar no Sistema
          </Button>
        </form>
      </div>
    </div>
  );
}
