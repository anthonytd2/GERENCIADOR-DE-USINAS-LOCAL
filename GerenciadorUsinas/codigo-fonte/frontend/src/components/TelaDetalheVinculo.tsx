import { useState, useEffect } from "react";
import { ArrowLeft, Zap, User, Plus, FileText, Landmark, Calculator, TrendingUp, X } from "lucide-react";
import { Button } from "./ui/Button";

export default function TelaDetalheVinculo({
  vinculo,
  onVoltar,
}: {
  vinculo: any;
  onVoltar: () => void;
}) {
  const [faturas, setFaturas] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const todas = JSON.parse(localStorage.getItem("faturas") || "{}");
    setFaturas(todas[vinculo.id] || []);
  }, [vinculo.id]);

  const totalKwhAcumulado = faturas.reduce((acc, f) => acc + (f.consumo || 0), 0);
  const totalLucroAcumulado = faturas.reduce((acc, f) => acc + (f.lucro || 0), 0);

  const ultimaFatura = faturas[faturas.length - 1];
  const ucAtual = ultimaFatura?.uc || "Aguardando Lançamento";

  const handleLancarFatura = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const consumo = Number(fd.get("consumo"));
    const receita = consumo * (vinculo.valor_kw_fixo || 0.75);
    const custo = consumo * (vinculo.valor_kw_bruto || 0.5);

    const novaFatura = {
      id: Date.now(),
      ref: fd.get("ref"),
      uc: fd.get("uc"),
      saldo_acumulado: Number(fd.get("saldo_acumulado")),
      consumo,
      receita,
      custo,
      lucro: receita - custo,
    };

    const novasFaturas = [...faturas, novaFatura];
    setFaturas(novasFaturas);
    const todas = JSON.parse(localStorage.getItem("faturas") || "{}");
    localStorage.setItem(
      "faturas",
      JSON.stringify({ ...todas, [vinculo.id]: novasFaturas }),
    );

    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 animate-fade-in-down p-4 font-sans">
      <div className="flex justify-between items-center">
        <Button variant="secondary" onClick={onVoltar} className="font-bold flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Voltar para Contratos
        </Button>
        <span className="text-xs font-black text-slate-400 uppercase bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
          ID Contrato: #{vinculo.id || "ID"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl border border-orange-100">
              <Zap size={24} className="fill-orange-50" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Usina Fornecedora</p>
              <h3 className="text-lg font-black text-slate-900 mt-0.5">{vinculo.usina}</h3>
            </div>
          </div>
          <div className="border-t border-slate-50 pt-3 flex justify-between text-xs font-bold text-slate-500">
            <span>Custo de Repasse:</span>
            <span className="text-orange-600 font-black">R$ {vinculo.valor_kw_bruto?.toFixed(2)}/kWh</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
              <User size={24} className="fill-blue-50" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Consumidor Beneficiário</p>
              <h3 className="text-lg font-black text-slate-900 mt-0.5">{vinculo.consumidor}</h3>
            </div>
          </div>
          <div className="border-t border-slate-50 pt-3 flex justify-between text-xs font-bold text-slate-500">
            <span>Tarifa de Venda:</span>
            <span className="text-blue-600 font-black">R$ {vinculo.valor_kw_fixo?.toFixed(2)}/kWh</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100">
              <Landmark size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Unidade Consumidora (UC)</p>
              <h3 className="text-lg font-black text-indigo-900 mt-0.5">{ucAtual}</h3>
            </div>
          </div>
          <div className="border-t border-slate-50 pt-3 flex justify-between text-xs font-bold text-slate-500">
            <span>Status da Conexão:</span>
            <span className="text-emerald-600 font-black uppercase tracking-wider text-[10px] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
              {vinculo.status || "Ativo"}
            </span>
          </div>
        </div>
      </div>

      {/* BLOCO ATUALIZADO: 3 CARDS DE KPI (Volume, Saldo Concessionária, Lucro Líquido) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-lg flex flex-col justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5" /> Volume Total Compensado
            </span>
            <h2 className="text-3xl font-black text-slate-100">{totalKwhAcumulado.toLocaleString("pt-BR")} <span className="text-xs font-bold text-slate-400">kWh</span></h2>
          </div>
          <div className="text-xs font-medium text-slate-400 w-fit">
            Acumulado Geral
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 rounded-3xl text-white shadow-lg flex flex-col justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-emerald-200 uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Saldo na Concessionária
            </span>
            <h2 className="text-3xl font-black text-white">
              {(ultimaFatura?.saldo_acumulado || 0).toLocaleString("pt-BR")} <span className="text-sm font-bold text-emerald-200">kWh</span>
            </h2>
          </div>
          <div className="text-xs font-bold text-emerald-100 bg-emerald-500/30 px-3 py-1.5 rounded-xl border border-emerald-400/20 w-fit">
            Crédito Atual
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-3xl text-white shadow-lg flex flex-col justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-indigo-200 uppercase tracking-wider flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Lucro Líquido Retido
            </span>
            <h2 className="text-3xl font-black text-white">
              R$ {totalLucroAcumulado.toFixed(2)}
            </h2>
          </div>
          <div className="text-xs font-bold text-indigo-100 bg-indigo-500/30 px-3 py-1.5 rounded-xl border border-indigo-400/20 w-fit">
            Spread Financeiro
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-700">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Histórico de Lançamentos</h3>
              <p className="text-xs font-medium text-slate-400">Faturamento e tarifas de compensação consolidadas</p>
            </div>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto font-bold bg-indigo-600 hover:bg-indigo-500 shadow-md">
            <Plus className="w-4 h-4 mr-2" /> Novo Lançamento de Fatura
          </Button>
        </div>

        {faturas.length === 0 ? (
          <div className="text-center py-12 text-slate-400 font-medium text-sm">
            Nenhuma fatura lançada para este vínculo até o momento.
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm border-collapse min-w-[800px]">
              <thead>
                <tr className="text-slate-400 uppercase font-black text-[10px] tracking-wider border-b border-slate-100">
                  <th className="pb-3 text-left font-black">Mês Ref</th>
                  <th className="pb-3 text-left font-black">Unid. Consumidora</th>
                  <th className="pb-3 text-left font-black">Consumo Reduzido</th>
                  <th className="pb-3 text-left font-black">Saldo Acum. (kWh)</th>
                  <th className="pb-3 text-left font-black">Faturamento Bruto</th>
                  <th className="pb-3 text-left font-black">Custo Operacional</th>
                  <th className="pb-3 text-right font-black">Lucro Líquido</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {faturas.map((f: any) => (
                  <tr key={f.id} className="font-bold text-slate-700 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 text-slate-900 font-black">{f.ref}</td>
                    <td className="py-4 text-slate-600">{f.uc || "-"}</td>
                    <td className="py-4 text-slate-600">{f.consumo.toLocaleString("pt-BR")} kWh</td>
                    <td className="py-4 text-slate-600">{f.saldo_acumulado?.toLocaleString("pt-BR") || 0} kWh</td>
                    <td className="py-4 text-blue-600">R$ {f.receita.toFixed(2)}</td>
                    <td className="py-4 text-orange-600">R$ {f.custo.toFixed(2)}</td>
                    <td className="py-4 text-emerald-600 font-black text-right">R$ {f.lucro.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-slate-100 relative animate-scale-up max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-base text-slate-900">Lançar Nova Fatura</h4>
                <p className="text-xs text-slate-400 font-medium">Insira os dados da fatura da concessionária</p>
              </div>
            </div>

            <form onSubmit={handleLancarFatura} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">Mês de Referência</label>
                  <input
                    name="ref"
                    placeholder="Ex: 07/2026"
                    required
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-indigo-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">Unidade Consumidora</label>
                  <input
                    name="uc"
                    placeholder="Ex: 1045239"
                    required
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-indigo-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">Consumo (kWh)</label>
                  <input
                    name="consumo"
                    type="number"
                    placeholder="Ex: 4500"
                    required
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-indigo-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">Saldo Acum. (kWh)</label>
                  <input
                    name="saldo_acumulado"
                    type="number"
                    placeholder="Ex: 1250"
                    required
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-indigo-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200/60 transition-colors"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/10 transition-colors"
                >
                  Salvar Fatura
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}