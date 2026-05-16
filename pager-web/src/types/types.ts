export interface Refeicao {
  id: number;
  descricao: string;
  preco: number;
}

export interface Pedido {
  id: number;
  nomeCliente: string;
  refeicao: string;
  preco: number;
  dataCriacao: string;
}

export interface PedidoGet {
  id: number;
  nomeCliente: string;
  refeicao: Refeicao;
  dataCriacao: string;
}

export interface PedidoPost {
  nomeCliente: string;
  refeicaoId: number;
}
