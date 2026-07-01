import { useState, useEffect } from "react";
import {
  Link as LinkIcon,
  Plus,
  Trash2,
  ArrowLeft,
  Save,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import TelaDetalheVinculo from "./TelaDetalheVinculo";

export default function TelaVinculos() {
  const [view, setView] = useState<"lista" | "formulario" | "detalhe">("lista");
  const [vinculoSelecionado, setVinculoSelecionado] = useState<any>(null);

  const [listaUsinas, setListaUsinas] = useState<any[]>([]);
  const [listaConsumidores, setListaConsumidores] = useState<any[]>([]);

  const [vinculos, setVinculos] = useState(() => {
    const salvo = localStorage.getItem("vinculos");
    return salvo ? JSON.parse(salvo) : [];
  });

  useEffect(() => {
    const usinasSalvas = JSON.parse(localStorage.getItem("usinas") || "[]");
    const consumidoresSalvos = JSON.parse(
      localStorage.getItem("consumidores") || "[]",
    );
    setListaUsinas(usinasSalvas);
    setListaConsumidores(consumidoresSalvos);
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
    const usinaEncontrada = listaUsinas.find((u) => u.nome === nomeUsina);
    const consumidorEncontrado = listaConsumidores.find(
      (c) => c.nome === nomeConsumidor,
    );

    const novoVinculo = {
      id: Date.now(),
      usina: nomeUsina,
      consumidor: nomeConsumidor,
      valor_kw_bruto: usinaEncontrada?.valor_kw_bruto || 0,
      valor_kw_fixo: consumidorEncontrado?.valor_kw_fixo || 0,
      status: "Ativo",
    };

    atualizarVinculos([...vinculos, novoVinculo]);
    toast.success("Vínculo criado com sucesso!");
    setView("lista");
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
      <div className="animate-fade-in-down max-w-2xl mx-auto">
        <button
          onClick={() => setView("lista")}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>

        <form onSubmit={handleSalvar}>
          <Card
            title="Novo Vínculo"
            icon={<LinkIcon className="text-indigo-600" />}
          >
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2">
                  Usina
                </label>
                <select
                  name="usina"
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                >
                  {listaUsinas.map((u) => (
                    <option key={u.id} value={u.nome}>
                      {u.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2">
                  Consumidor
                </label>
                <select
                  name="consumidor"
                  required
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                >
                  {listaConsumidores.map((c) => (
                    <option key={c.id} value={c.nome}>
                      {c.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-8">
              <Button type="submit" className="w-full">
                <Save className="w-5 h-5 mr-2" /> Confirmar Vínculo
              </Button>
            </div>
          </Card>
        </form>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-down space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-black">Vínculos</h2>
          <p className="text-slate-500 text-sm font-medium">Contratos ativos</p>
        </div>
        <Button onClick={() => setView("formulario")}>
          <Plus className="w-5 h-5 mr-2" /> Novo Vínculo
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {vinculos.map((v: any) => (
          <div
            key={v.id}
            className="bg-white p-6 rounded-3xl border border-slate-100 flex justify-between items-center"
          >
            <span className="font-bold text-slate-900">
              {v.usina} ➔ {v.consumidor}
            </span>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setVinculoSelecionado(v);
                  setView("detalhe");
                }}
              >
                <FileText className="w-4 h-4" />
              </Button>
              <Button
                variant="danger"
                onClick={() =>
                  atualizarVinculos(vinculos.filter((i: any) => i.id !== v.id))
                }
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
