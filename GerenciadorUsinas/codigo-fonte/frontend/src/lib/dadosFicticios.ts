export const gerarDadosFicticios = () => {
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  
  const historico = meses.map((mes) => {
    const faturamento = Math.floor(Math.random() * (50000 - 30000) + 30000);
    const custo = Math.floor(faturamento * 0.65);
    const geracao = Math.floor(Math.random() * (45000 - 35000) + 35000);
    const consumo = Math.floor(geracao * 0.92);

    return {
      mes,
      faturamento,
      custo,
      lucro: faturamento - custo,
      geracao,
      consumo,
      saldoReal: geracao - consumo
    };
  });

  return {
    contadores: { usinas: 12, consumidores: 48, vinculos: 42 },
    financeiro: { faturamento: 45200, custo: 29380, lucro: 15820 },
    operacional: { geracao: 42500, consumo: 39100, saldoTeorico: 42500, saldoReal: 3400 },
    historico
  };
};