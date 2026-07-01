import { useState, useEffect } from "react";
import { ArrowLeft, Zap, User, Plus, FileText } from "lucide-react";
import { Card } from "./ui/Card";
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

  const handleLancarFatura = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const consumo = Number(fd.get("consumo"));
    const receita = consumo * (vinculo.valor_kw_fixo || 0.75);
    const custo = consumo * (vinculo.valor_kw_bruto || 0.5);

    const novaFatura = {
      id: Date.now(),
      ref: fd.get("ref"),
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
    <div className="max-w-7xl mx-auto space-y-6 pb-20 animate-fade-in-down">
      <Button variant="secondary" onClick={onVoltar}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Fonte: Usina" icon={<Zap className="text-amber-500" />}>
          <p className="font-black text-xl">{vinculo.usina}</p>
          <p className="text-sm text-slate-500 font-bold">
            Custo kWh: R$ {vinculo.valor_kw_bruto?.toFixed(2)}
          </p>
        </Card>
        <Card
          title="Beneficiário: Consumidor"
          icon={<User className="text-blue-500" />}
        >
          <p className="font-black text-xl">{vinculo.consumidor}</p>
          <p className="text-sm text-slate-500 font-bold">
            Preço kWh: R$ {vinculo.valor_kw_fixo?.toFixed(2)}
          </p>
        </Card>
      </div>

      <Card
        title="Histórico de Faturas"
        icon={<FileText className="text-indigo-600" />}
      >
        <div className="flex justify-end mb-4">
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Lançar Fatura
          </Button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 uppercase font-black text-[10px]">
              <th className="p-3 text-left">Ref</th>
              <th className="p-3 text-left">Consumo</th>
              <th className="p-3 text-left">Receita (Consumidor)</th>
              <th className="p-3 text-left">Custo (Usina)</th>
              <th className="p-3 text-left">Lucro</th>
            </tr>
          </thead>
          <tbody>
            {faturas.map((f: any) => (
              <tr key={f.id} className="border-t border-slate-100 font-bold">
                <td className="p-3">{f.ref}</td>
                <td className="p-3">{f.consumo} kWh</td>
                <td className="p-3 text-blue-600">R$ {f.receita.toFixed(2)}</td>
                <td className="p-3 text-amber-600">R$ {f.custo.toFixed(2)}</td>
                <td className="p-3 text-emerald-600 font-black">
                  R$ {f.lucro.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card title="Nova Fatura" className="w-full max-w-sm">
            <form onSubmit={handleLancarFatura} className="space-y-4">
              <input
                name="ref"
                placeholder="Referência (ex: 06/2026)"
                required
                className="w-full p-3 border rounded-xl"
              />
              <input
                name="consumo"
                type="number"
                placeholder="Energia Consumida (kWh)"
                required
                className="w-full p-3 border rounded-xl"
              />
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  type="button"
                  className="w-full"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="w-full">
                  Salvar
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
