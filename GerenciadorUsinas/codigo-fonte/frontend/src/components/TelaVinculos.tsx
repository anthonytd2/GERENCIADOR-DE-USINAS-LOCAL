import { useState, useEffect } from "react";
import {
  Link as LinkIcon,
  Plus,
  Trash2,
  ArrowLeft,
  Save,
  Search,
  Share2,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  ArrowRight,
  User,
  Zap
} from "lucide-react";
import toast from "react-hot-toast";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import TelaDetalheVinculo from "./TelaDetalheVinculo";

const DADOS_INICIAIS = [
  { id: 1, usina: "Solar Norte", consumidor: "Supermercado Silva", valor_kw_bruto: 0.45, valor_kw_fixo: 0.65, status: "ATIVO" },
  { id: 2, usina: "EcoPower Delta", consumidor: "Condomínio Flores", valor_kw_bruto: 0.42, valor_kw_fixo: 0.60, status: "PENDENTE" },
  { id: 3, usina: "Solaria Premium", consumidor: "Indústria Matos", valor_kw_bruto: 0.48, valor_kw_fixo: 0.70, status: "ENCERRADO" }
];

export default function TelaVinculos() {
  const [view, setView] = useState<"lista" | "formulario" | "detalhe">("lista");
  const [vinculoSelecionado, setVinculoSelecionado] = useState<any>(null);
  const [listaUsinas, setListaUsinas] = useState<any[]>([]);
  const [listaConsumidores, setListaConsumidores] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<"todos" | "ATIVO" | "PENDENTE" | "ENCERRADO">("todos");
  
  const [modalExcluir, setModalExcluir] = useState({ aberto: false, id: null as number | null });

  const [vinculos, setVinculos] = useState<any[]>(() => {
    const salvo = localStorage.getItem("vinculos");
    if (!salvo || JSON.parse(salvo).length === 0) {
      localStorage.setItem("vinculos", JSON.stringify(DADOS_INICIAIS));
      return DADOS_INICIAIS;
    }
    return JSON.parse(salvo);
  });

  useEffect(() => {
    const usinasSalvas = JSON.parse(localStorage.getItem("usinas") || "[]");
    const consumidoresSalvos = JSON.parse(localStorage.getItem("consumidores") || "[]");
    
    if (usinasSalvas.length === 0) {
      const padraoUsinas = [
        { id: 101, nome: "Solar Norte", valor_kw_bruto: 0.45 },
        { id: 102, nome: "EcoPower Delta", valor_kw_bruto: 0.42 },
        { id: 103, nome: "Solaria Premium", valor_kw_bruto: 0.48 }
      ];
      localStorage.setItem("usinas", JSON.stringify(padraoUsinas));
      setListaUsinas(padraoUsinas);
    } else {
      setListaUsinas(usinasSalvas);
    }

    if (consumidoresSalvos.length === 0) {
      const padraoClientes = [
        { id: 201, nome: "Supermercado Silva", valor_kw_fixo: 0.65 },
        { id: 202, nome: "Condomínio Flores", valor_kw_fixo: 0.60 },
        { id: 203, nome: "Indústria Matos", valor_kw_fixo: 0.70 }
      ];
      localStorage.setItem("consumidores", JSON.stringify(padraoClientes));
      setListaConsumidores(padraoClientes);
    } else {
      setListaConsumidores(consumidoresSalvos);
    }
  }, [view]);

  const atualizarVinculos = (novosVinculos: any[]) => {
    setVinculos(novosVinculos);
    localStorage.setItem("vinculos", JSON.stringify(novosVinculos));
  };

  const handleSalvar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nomeUsina = formData.get("usina") as string;
    const nomeConsumidor = formData.get("consumidor") as string;
    const statusSelecionado = formData.get("status") as string;
    
    const usinaEncontrada = listaUsinas.find((u) => u.nome === nomeUsina);
    const consumidorEncontrado = listaConsumidores.find((c) => c.nome === nomeConsumidor);

    const novoVinculo = {
      id: Date.now(),
      usina: nomeUsina,
      consumidor: nomeConsumidor,
      valor_kw_bruto: usinaEncontrada?.valor_kw_bruto || 0,
      valor_kw_fixo: consumidorEncontrado?.valor_kw_fixo || 0,
      status: statusSelecionado,
    };

    atualizarVinculos([...vinculos, novoVinculo]);
    toast.success("Vínculo criado com sucesso!");
    setView("lista");
  };

  const abrirModalExclusao = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setModalExcluir({ aberto: true, id });
  };

  const confirmarExclusao = () => {
    if (modalExcluir.id) {
      const novaLista = vinculos.filter((v) => v.id !== modalExcluir.id);
      atualizarVinculos(novaLista);
      toast.success("Vínculo excluído com sucesso!");
    }
    setModalExcluir({ aberto: false, id: null });
  };

  const totalRegistrado = vinculos.length;
  const contratosAtivos = vinculos.filter((v) => v.status === "ATIVO").length;
  const contratosPendentes = vinculos.filter((v) => v.status === "PENDENTE").length;

  const vinculosFiltrados = vinculos.filter((v) => {
    const termo = busca.toLowerCase();
    const passaBusca = v.usina.toLowerCase().includes(termo) || v.consumidor.toLowerCase().includes(termo);
    
    if (filtro === "todos") return passaBusca;
    return passaBusca && v.status === filtro;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ATIVO":
        return { classe: "bg-emerald-50 text-emerald-700 border-emerald-200", icone: <CheckCircle className="w-3.5 h-3.5" />, texto: "Ativo" };
      case "PENDENTE":
        return { classe: "bg-amber-50 text-amber-700 border-amber-200", icone: <Clock className="w-3.5 h-3.5" />, texto: "Pendente" };
      case "ENCERRADO":
        return { classe: "bg-rose-50 text-rose-700 border-rose-200", icone: <X className="w-3.5 h-3.5" />, texto: "Encerrado" };
      default:
        return { classe: "bg-slate-50 text-slate-700 border-slate-200", icone: <Clock className="w-3.5 h-3.5" />, texto: status };
    }
  };

  if (view === "detalhe" && vinculoSelecionado) {
    return (
      <TelaDetalheVinculo
        vinculo={vinculoSelecionado}
        onVoltar={() => setView("lista")}
      />
    );
  }

  if (view === "formulario") {
    return (
      <div className="animate-fade-in-down max-w-2xl mx-auto p-4">
        <button
          onClick={() => setView("lista")}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para listagem
        </button>

        <form onSubmit={handleSalvar}>
          <Card
            title="Novo Vínculo de Contrato"
            icon={<LinkIcon className="text-indigo-600" />}
          >
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2">
                  Usina Fornecedora
                </label>
                <select
                  name="usina"
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-indigo-500"
                >
                  {listaUsinas.map((u) => (
                    <option key={u.id} value={u.nome}>
                      {u.nome} (Repasse: R$ {u.valor_kw_bruto}/kWh)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2">
                  Consumidor Beneficiário
                </label>
                <select
                  name="consumidor"
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-indigo-500"
                >
                  {listaConsumidores.map((c) => (
                    <option key={c.id} value={c.nome}>
                      {c.nome} (Venda: R$ {c.valor_kw_fixo}/kWh)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2">
                  Status Inicial
                </label>
                <select
                  name="status"
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-indigo-500"
                >
                  <option value="ATIVO">Ativo (Injetando Energia)</option>
                  <option value="PENDENTE">Pendente (Em Análise/Assinatura)</option>
                  <option value="ENCERRADO">Encerrado</option>
                </select>
              </div>
            </div>

            <div className="mt-8">
              <Button type="submit" className="w-full py-4 font-black">
                <Save className="w-5 h-5 mr-2" /> Ativar e Salvar Contrato
              </Button>
            </div>
          </Card>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-down pb-20 p-4">
      
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 shadow-xl border border-slate-800">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none text-white">
          <svg width="100%" height="100%">
            <pattern id="grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg">
              <Share2 className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Gestão de Vínculos
              </h1>
              <p className="text-slate-400 text-sm font-medium mt-1">
                Controle as conexões comerciais entre as usinas geradoras e os consumidores ativos.
              </p>
            </div>
          </div>

          <Button onClick={() => setView("formulario")} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 active:scale-95 transition-all">
            <Plus className="w-5 h-5 mr-2" /> Novo Vínculo Comercial
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-slate-50 text-slate-500 rounded-2xl border border-slate-100">
            <LinkIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Total Registrado</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{totalRegistrado}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Contratos Ativos</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">{contratosAtivos}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Em Análise / Pendentes</p>
            <h3 className="text-2xl font-black text-amber-600 mt-1">{contratosPendentes}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por usina ou cliente beneficiário..."
            className="w-full pl-12 pr-4 py-3 bg-transparent font-bold text-slate-900 placeholder:text-slate-400 outline-none text-sm"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="flex gap-1.5 p-1 bg-slate-50 border border-slate-100 rounded-xl w-full md:w-auto overflow-x-auto">
          {[
            { label: "Todos", id: "todos" },
            { label: "Ativos", id: "ATIVO" },
            { label: "Pendentes", id: "PENDENTE" },
            { label: "Encerrados", id: "ENCERRADO" }
          ].map((aba) => (
            <button
              key={aba.id}
              onClick={() => setFiltro(aba.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                filtro === aba.id
                  ? "bg-white text-indigo-600 shadow-sm border border-slate-200/50"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {aba.label}
            </button>
          ))}
        </div>
      </div>

      {vinculosFiltrados.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-center">
          <div className="bg-slate-50 p-4 rounded-full mb-4 border border-slate-100 shadow-inner">
            <LinkIcon className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-black text-slate-800">Nenhum contrato localizado</h3>
          <p className="text-slate-400 text-sm font-medium mt-1 max-w-sm px-4">
            Altere os termos de busca ou crie um novo vínculo comercial para popular esta tabela.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {vinculosFiltrados.map((v) => {
            const badge = getStatusBadge(v.status);
            return (
              <div
                key={v.id}
                onClick={() => {
                  setVinculoSelecionado(v);
                  setView("detalhe");
                }}
                className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-200 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 border border-orange-100 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 fill-orange-50" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Usina</span>
                      <span className="font-black text-slate-800 text-sm">{v.usina}</span>
                    </div>
                  </div>

                  <div className="hidden sm:block text-slate-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 border border-blue-100 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 fill-blue-50" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">Consumidor</span>
                      <span className="font-black text-slate-800 text-sm">{v.consumidor}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                  <div className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 ${badge.classe}`}>
                    {badge.icone}
                    {badge.texto}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setVinculoSelecionado(v);
                        setView("detalhe");
                      }}
                      className="px-3 py-2 text-xs bg-slate-50 text-slate-600 font-bold rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                    >
                      Ver Detalhes
                    </button>
                    <button
                      onClick={(e) => abrirModalExclusao(v.id, e)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalExcluir.aberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center gap-3 text-rose-600 bg-rose-50 p-3 rounded-2xl border border-rose-100">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" />
              <h4 className="font-black text-base text-rose-950">Aviso de Exclusão</h4>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-800">Deseja mesmo remover permanentemente este vínculo?</p>
              <p className="text-xs font-medium text-slate-400 leading-relaxed">
                Esta ação apagará a conexão comercial no sistema. Os dados históricos associados localmente serão desvinculados de forma definitiva.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalExcluir({ aberto: false, id: null })}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200/60 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmarExclusao}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/10 transition-colors"
              >
                Sim, Deletar Contrato
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}