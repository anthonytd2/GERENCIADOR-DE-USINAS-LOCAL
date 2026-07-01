import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Zap,
  ArrowLeft,
  Save,
  Sun,
} from "lucide-react";
import toast from "react-hot-toast";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

const usinasIniciais = [
  {
    id: 1,
    nome: "Usina Fazenda Sol Nascente",
    potencia: 75.5,
    geracao_estimada: 12000,
    valor_kw_bruto: 0.85,
    tipo: "GD1",
  },
];

export default function TelaUsinas() {
  const [view, setView] = useState<"lista" | "formulario">("lista");

  const [usinas, setUsinas] = useState(() => {
    const salvo = localStorage.getItem("usinas");
    return salvo ? JSON.parse(salvo) : usinasIniciais;
  });

  const [usinaEditando, setUsinaEditando] = useState<any>(null);
  const [busca, setBusca] = useState("");

  const atualizarUsinas = (novasUsinas: any[]) => {
    setUsinas(novasUsinas);
    localStorage.setItem("usinas", JSON.stringify(novasUsinas));
  };

  const usinasFiltradas = usinas.filter((u: any) =>
    u.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  const handleSalvar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const novaUsina = {
      id: usinaEditando ? usinaEditando.id : Date.now(),
      nome: formData.get("nome") as string,
      potencia: Number(formData.get("potencia")),
      geracao_estimada: Number(formData.get("geracao")),
      valor_kw_bruto: Number(formData.get("valor_kw")),
      tipo: formData.get("tipo") as string,
    };

    if (usinaEditando) {
      atualizarUsinas(
        usinas.map((u: any) => (u.id === novaUsina.id ? novaUsina : u)),
      );
      toast.success("Usina atualizada com sucesso!");
    } else {
      atualizarUsinas([...usinas, novaUsina]);
      toast.success("Usina cadastrada com sucesso!");
    }

    setView("lista");
    setUsinaEditando(null);
  };

  const handleExcluir = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta usina?")) {
      atualizarUsinas(usinas.filter((u: any) => u.id !== id));
      toast.success("Usina excluída!");
    }
  };

  const abrirFormulario = (usina?: any) => {
    setUsinaEditando(usina || null);
    setView("formulario");
  };

  if (view === "formulario") {
    return (
      <div className="animate-fade-in-down max-w-4xl mx-auto">
        <button
          onClick={() => setView("lista")}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para lista
        </button>

        <form onSubmit={handleSalvar}>
          <Card
            title={usinaEditando ? "Editar Usina" : "Nova Usina"}
            icon={<Sun className="fill-amber-500 text-amber-500" />}
            iconBgColor="bg-amber-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">
                  Nome da Usina *
                </label>
                <input
                  required
                  name="nome"
                  defaultValue={usinaEditando?.nome}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Ex: Usina Central"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">
                  Potência (kWp)
                </label>
                <input
                  required
                  type="number"
                  step="any"
                  name="potencia"
                  defaultValue={usinaEditando?.potencia}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-indigo-500"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">
                  Geração Estimada (kWh)
                </label>
                <input
                  required
                  type="number"
                  step="any"
                  name="geracao"
                  defaultValue={usinaEditando?.geracao_estimada}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-indigo-500"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-emerald-600 uppercase mb-2 ml-1">
                  Valor do kW Bruto (R$)
                </label>
                <input
                  required
                  type="number"
                  step="any"
                  name="valor_kw"
                  defaultValue={usinaEditando?.valor_kw_bruto}
                  className="w-full p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-black outline-none focus:border-emerald-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">
                  Tipo / Enquadramento
                </label>
                <select
                  name="tipo"
                  defaultValue={usinaEditando?.tipo}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-indigo-500"
                >
                  <option value="GD1">GD1</option>
                  <option value="GD2">GD2</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button type="submit" variant="primary">
                <Save className="w-5 h-5" /> Salvar Usina
              </Button>
            </div>
          </Card>
        </form>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-down space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-900">
            Usinas Cadastradas
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Gerencie suas fontes geradoras
          </p>
        </div>
        <Button onClick={() => abrirFormulario()}>
          <Plus className="w-5 h-5" /> Cadastrar Usina
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar usina por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl font-bold outline-none focus:border-indigo-500 shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {usinasFiltradas.map((u: any) => (
          <div
            key={u.id}
            className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col md:flex-row items-center gap-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Zap className="w-7 h-7 fill-amber-500" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-black">{u.nome}</h3>
              <p className="text-sm font-bold text-slate-400">
                {u.tipo} • {u.potencia} kWp • {u.geracao_estimada} kWh
              </p>
            </div>
            <div className="text-center md:text-right px-6 border-x border-slate-100">
              <p className="text-[10px] font-black text-emerald-600 uppercase">
                Valor Base
              </p>
              <p className="text-xl font-black text-emerald-700">
                R$ {u.valor_kw_bruto.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => abrirFormulario(u)}
                className="!text-indigo-600 bg-indigo-50"
              >
                <Edit className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleExcluir(u.id)}
                className="!text-red-600 bg-red-50"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
