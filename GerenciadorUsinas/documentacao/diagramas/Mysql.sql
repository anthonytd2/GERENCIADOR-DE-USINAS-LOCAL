CREATE TABLE `usuarios` (
  `id` integer PRIMARY KEY AUTO_INCREMENT COMMENT 'Chave Primária',
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `senha` varchar(255) NOT NULL
);

CREATE TABLE `usinas` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `valor_kw_bruto` decimal NOT NULL COMMENT 'Custo de repasse da usina'
);

CREATE TABLE `consumidores` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `valor_kw_fixo` decimal NOT NULL COMMENT 'Tarifa cobrada do cliente'
);

CREATE TABLE `vinculos` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `usina_id` integer NOT NULL,
  `consumidor_id` integer NOT NULL,
  `status` varchar(255) NOT NULL COMMENT 'ATIVO, PENDENTE ou ENCERRADO',
  `data_criacao` timestamp
);

CREATE TABLE `faturas` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `vinculo_id` integer NOT NULL,
  `ref` varchar(255) NOT NULL COMMENT 'Ex: 07/2026',
  `uc` varchar(255) NOT NULL COMMENT 'Unidade Consumidora informada',
  `consumo_kwh` integer NOT NULL,
  `saldo_acumulado_kwh` integer NOT NULL,
  `receita_bruta` decimal NOT NULL,
  `custo_operacional` decimal NOT NULL,
  `lucro_liquido` decimal NOT NULL
);

ALTER TABLE `vinculos` ADD FOREIGN KEY (`usina_id`) REFERENCES `usinas` (`id`);

ALTER TABLE `vinculos` ADD FOREIGN KEY (`consumidor_id`) REFERENCES `consumidores` (`id`);

ALTER TABLE `faturas` ADD FOREIGN KEY (`vinculo_id`) REFERENCES `vinculos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
