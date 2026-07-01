import { useState } from "react";
import { Sun, User, Link as LinkIcon, BarChart3 } from "lucide-react"; // Adicionado BarChart3
import TelaUsinas from "./components/TelaUsinas";
import TelaConsumidores from "./components/TelaConsumidores";
import TelaVinculos from "./components/TelaVinculos";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [logado, setLogado] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<
    "dashboard" | "usinas" | "consumidores" | "vinculos"
  >("dashboard");

  if (!logado) {
    return <Login onLogin={() => setLogado(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-slate-950 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500 rounded-lg">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-black tracking-tight">SolarManager</h1>
          </div>

          <nav className="flex gap-2">
            <button
              onClick={() => setAbaAtiva("dashboard")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 ${abaAtiva === "dashboard" ? "bg-indigo-600 text-white" : "hover:bg-slate-800 text-slate-300"}`}
            >
              <BarChart3 className="w-4 h-4" /> Dashboard
            </button>
            <button
              onClick={() => setAbaAtiva("usinas")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 ${abaAtiva === "usinas" ? "bg-indigo-600 text-white" : "hover:bg-slate-800 text-slate-300"}`}
            >
              <Sun className="w-4 h-4" /> Usinas
            </button>
            <button
              onClick={() => setAbaAtiva("consumidores")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 ${abaAtiva === "consumidores" ? "bg-indigo-600 text-white" : "hover:bg-slate-800 text-slate-300"}`}
            >
              <User className="w-4 h-4" /> Consumidores
            </button>
            <button
              onClick={() => setAbaAtiva("vinculos")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 ${abaAtiva === "vinculos" ? "bg-indigo-600 text-white" : "hover:bg-slate-800 text-slate-300"}`}
            >
              <LinkIcon className="w-4 h-4" /> Vínculos
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 mt-4">
        {abaAtiva === "dashboard" && <Dashboard />}
        {abaAtiva === "usinas" && <TelaUsinas />}
        {abaAtiva === "consumidores" && <TelaConsumidores />}
        {abaAtiva === "vinculos" && <TelaVinculos />}
      </main>
    </div>
  );
}
