// src/lib/dadosFicticios.ts
export const gerarDadosFicticios = () => {
  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const historico = meses.map((mes) => {
    const faturamento = Math.floor(Math.random() * (50000 - 30000) + 30000);
    const custo = Math.floor(faturamento * 0.65); // 65% de custo
    return { mes, faturamento, custo, lucro: faturamento - custo };
  });

  return {
    contadores: { usinas: 12, consumidores: 48, vinculos: 42 },
    financeiro: { faturamento: 45200, custo: 29380, lucro: 15820 },
    historico,
  };
};
