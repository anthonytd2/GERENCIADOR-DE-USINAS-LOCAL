import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  User,
  ArrowLeft,
  Save,
  Building,
} from "lucide-react";
import toast from "react-hot-toast";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

const consumidoresIniciais = [
  {
    id: 1,
    nome: "João da Silva",
    documento: "111.222.333-44",
    telefone: "(45) 99999-9999",
    valor_kw_fixo: 0.75,
  },
];

export default function TelaConsumidores() {
  const [view, setView] = useState<"lista" | "formulario">("lista");


  const [consumidores, setConsumidores] = useState(() => {
    const salvo = localStorage.getItem("consumidores");
    return salvo ? JSON.parse(salvo) : consumidoresIniciais;
  });

  const [consumidorEditando, setConsumidorEditando] = useState<any>(null);
  const [busca, setBusca] = useState("");

  // Função auxiliar para atualizar o estado E o localStorage
  const atualizarConsumidores = (novosConsumidores: any[]) => {
    setConsumidores(novosConsumidores);
    localStorage.setItem("consumidores", JSON.stringify(novosConsumidores));
  };

  const filtrados = consumidores.filter(
    (c: any) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.documento.includes(busca),
  );

  const handleSalvar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const novoConsumidor = {
      id: consumidorEditando ? consumidorEditando.id : Date.now(),
      nome: formData.get("nome") as string,
      documento: formData.get("documento") as string,
      telefone: formData.get("telefone") as string,
      valor_kw_fixo: Number(formData.get("valor_kw")),
    };

    if (consumidorEditando) {
      atualizarConsumidores(
        consumidores.map((c: any) =>
          c.id === novoConsumidor.id ? novoConsumidor : c,
        ),
      );
      toast.success("Consumidor atualizado com sucesso!");
    } else {
      atualizarConsumidores([...consumidores, novoConsumidor]);
      toast.success("Consumidor cadastrado com sucesso!");
    }

    setView("lista");
    setConsumidorEditando(null);
  };

  const handleExcluir = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este consumidor?")) {
      atualizarConsumidores(consumidores.filter((c: any) => c.id !== id));
      toast.success("Consumidor excluído!");
    }
  };

  const abrirFormulario = (consumidor?: any) => {
    setConsumidorEditando(consumidor || null);
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
            title={consumidorEditando ? "Editar Consumidor" : "Novo Consumidor"}
            icon={<User className="text-blue-500" />}
            iconBgColor="bg-blue-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">
                  Nome Completo *
                </label>
                <input
                  required
                  name="nome"
                  defaultValue={consumidorEditando?.nome}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Ex: João da Silva"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">
                  CPF / CNPJ *
                </label>
                <input
                  required
                  name="documento"
                  defaultValue={consumidorEditando?.documento}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="000.000.000-00"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2 ml-1">
                  Telefone / WhatsApp
                </label>
                <input
                  name="telefone"
                  defaultValue={consumidorEditando?.telefone}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="md:col-span-2 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 mt-2">
                <label className="block text-xs font-black text-emerald-700 uppercase mb-2 ml-1">
                  Valor Fixo do kWh (R$) *
                </label>
                <input
                  required
                  type="number"
                  step="any"
                  name="valor_kw"
                  defaultValue={consumidorEditando?.valor_kw_fixo}
                  className="w-full p-4 bg-white border-2 border-emerald-200 text-emerald-800 rounded-xl font-black text-xl outline-none focus:border-emerald-500"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                type="submit"
                className="!bg-blue-600 hover:!bg-blue-700 shadow-blue-600/20"
              >
                <Save className="w-5 h-5 mr-2" /> Salvar Consumidor
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
          <h2 className="text-2xl font-black text-slate-900">Consumidores</h2>
          <p className="text-slate-500 text-sm font-medium">
            Beneficiários dos créditos de energia
          </p>
        </div>
        <Button
          onClick={() => abrirFormulario()}
          className="!bg-blue-600 hover:!bg-blue-700 shadow-blue-600/20"
        >
          <Plus className="w-5 h-5 mr-2" /> Novo Consumidor
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar consumidor por nome ou documento..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-900 outline-none focus:border-blue-500 shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtrados.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-3xl border border-dashed border-slate-300 text-slate-500 font-bold">
            Nenhum consumidor encontrado.
          </div>
        ) : (
          filtrados.map((c: any) => (
            <div
              key={c.id}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-black text-xl">
                {c.nome.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg font-black text-slate-900">{c.nome}</h3>
                <p className="text-sm font-bold text-slate-400 mt-1 flex items-center justify-center md:justify-start gap-2">
                  <Building className="w-4 h-4" /> {c.documento}
                </p>
              </div>
              <div className="text-center md:text-right px-6 border-x border-slate-100">
                <p className="text-[10px] font-black text-emerald-600 uppercase">
                  Valor Fixo Contratado
                </p>
                <p className="text-xl font-black text-emerald-700">
                  R$ {c.valor_kw_fixo.toFixed(2)}{" "}
                  <span className="text-xs">/kWh</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() => abrirFormulario(c)}
                  className="!p-3 !text-blue-600 bg-blue-50"
                >
                  <Edit className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleExcluir(c.id)}
                  className="!p-3 !text-red-600 bg-red-50"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
