import { useState, useEffect } from "react";
import { Activity, Zap, Users, Link as LinkIcon } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { gerarDadosFicticios } from "../lib/dadosFicticios";

export default function Dashboard() {
  const [dados, setDados] = useState<any>(null);
  const [anoFiltro] = useState(2026);
  const fmt = (v: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(v || 0);

  useEffect(() => {
    setDados(gerarDadosFicticios());
  }, [anoFiltro]);

  if (!dados) return <div className="p-10 text-center">Carregando...</div>;

  return (
    <div className="space-y-8 animate-fade-in-down pb-20">
      <h1 className="text-3xl font-black flex items-center gap-2">
        <Activity className="text-blue-600" /> Visão Geral
      </h1>

      {/* Cards de Contadores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-orange-100 text-orange-600 rounded-2xl">
            <Zap size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Usinas</p>
            <h3 className="text-2xl font-black">{dados.contadores.usinas}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl">
            <Users size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">
              Consumidores
            </p>
            <h3 className="text-2xl font-black">
              {dados.contadores.consumidores}
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-purple-100 text-purple-600 rounded-2xl">
            <LinkIcon size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">
              Contratos Ativos
            </p>
            <h3 className="text-2xl font-black">{dados.contadores.vinculos}</h3>
          </div>
        </div>
      </div>

      {/* Card Financeiro e Gráfico */}
      <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-slate-400 font-bold uppercase text-xs">
            Resultado Líquido (Spread)
          </p>
          <h2 className="text-5xl font-black text-emerald-400 my-4">
            {fmt(dados.financeiro.lucro)}
          </h2>
          <div className="space-y-2 font-bold">
            <p>
              Receita:{" "}
              <span className="text-blue-400">
                {fmt(dados.financeiro.faturamento)}
              </span>
            </p>
            <p>
              Custo:{" "}
              <span className="text-red-400">
                {fmt(dados.financeiro.custo)}
              </span>
            </p>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: "Receita", value: dados.financeiro.faturamento },
                  { name: "Custo", value: dados.financeiro.custo },
                ]}
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
              >
                <Cell fill="#60a5fa" />
                <Cell fill="#f87171" />
              </Pie>
              <RechartsTooltip
                formatter={(value: any) => fmt(Number(value || 0))}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  backgroundColor: "#1e293b",
                  color: "#fff",
                }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
