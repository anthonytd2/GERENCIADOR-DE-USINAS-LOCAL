import { useState, useEffect } from "react";
import { Activity, Zap, Users, Link as LinkIcon, BarChart3 } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";
import { gerarDadosFicticios } from "../lib/dadosFicticios";

export default function Dashboard() {
  const [dados, setDados] = useState<any>(null);
  const [anoFiltro] = useState(2026);
  const [mesFiltro, setMesFiltro] = useState("2026-07");

  const fmtMoeda = (v: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(v || 0);

  const fmtKwh = (v: number) =>
    new Intl.NumberFormat("pt-BR").format(v || 0) + " kWh";

  useEffect(() => {
    setDados(gerarDadosFicticios());
  }, [anoFiltro, mesFiltro]);

  if (!dados) return <div className="p-10 text-center">Carregando...</div>;

  return (
    <div className="space-y-8 animate-fade-in-down pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-black flex items-center gap-2">
          <Activity className="text-blue-600" /> Visão Geral
        </h1>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase">Mês Ref:</span>
          <input
            type="month"
            value={mesFiltro}
            onChange={(e) => setMesFiltro(e.target.value)}
            className="font-bold text-slate-700 outline-none bg-transparent cursor-pointer"
          />
        </div>
      </div>

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
            <p className="text-xs font-bold text-slate-400 uppercase">Consumidores</p>
            <h3 className="text-2xl font-black">{dados.contadores.consumidores}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-purple-100 text-purple-600 rounded-2xl">
            <LinkIcon size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Contratos Ativos</p>
            <h3 className="text-2xl font-black">{dados.contadores.vinculos}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="space-y-4 w-full md:w-1/2">
            <div>
              <p className="text-slate-400 font-bold uppercase text-xs">Resultado Líquido (Spread)</p>
              <h2 className="text-4xl font-black text-emerald-400 mt-2">{fmtMoeda(dados.financeiro.lucro)}</h2>
            </div>
            <div className="space-y-2 font-bold text-sm border-t border-slate-800 pt-4">
              <p className="flex justify-between">Receita: <span className="text-blue-400">{fmtMoeda(dados.financeiro.faturamento)}</span></p>
              <p className="flex justify-between">Custo Repasse: <span className="text-red-400">{fmtMoeda(dados.financeiro.custo)}</span></p>
            </div>
          </div>
          <div className="h-48 w-full md:w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Receita", value: dados.financeiro.faturamento },
                    { name: "Custo", value: dados.financeiro.custo },
                  ]}
                  innerRadius={50}
                  outerRadius={70}
                  dataKey="value"
                >
                  <Cell fill="#60a5fa" />
                  <Cell fill="#f87171" />
                </Pie>
                <RechartsTooltip formatter={(value: any) => fmtMoeda(Number(value || 0))} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Zap className="text-orange-500 fill-orange-500" size={20} /> Performance Operacional
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl">
              <span className="text-xs font-bold text-slate-400 uppercase block">Geração (Usinas)</span>
              <span className="text-lg font-black text-slate-800">{fmtKwh(dados.operacional.geracao)}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl">
              <span className="text-xs font-bold text-slate-400 uppercase block">Consumo (Clientes)</span>
              <span className="text-lg font-black text-slate-800">{fmtKwh(dados.operacional.consumu || dados.operacional.consumo)}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl">
              <span className="text-xs font-bold text-slate-400 uppercase block">Saldo Teórico</span>
              <span className="text-lg font-black text-slate-800">{fmtKwh(dados.operacional.saldoTeorico)}</span>
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl">
              <span className="text-xs font-bold text-emerald-600 uppercase block">Saldo Real (Diferença)</span>
              <span className="text-lg font-black text-emerald-700">{fmtKwh(dados.operacional.saldoReal)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <BarChart3 className="text-indigo-600" size={20} /> Evolução Financeira Anual
        </h2>
        <div className="h-80 w-full text-xs font-bold">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dados.historico}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="mes" tickLine={false} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `R$ ${v / 1000}k`} />
              <RechartsTooltip formatter={(value: any) => fmtMoeda(Number(value || 0))} />
              <Legend iconType="circle" />
              <Bar dataKey="faturamento" name="Receitas" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="custo" name="Custos" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="lucro" name="Lucro Líquido" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}