import {
  type PedidoGet,
  type PedidoPost,
  type Refeicao,
} from '../types/types';
import { pagerAPI } from './api';

export const pedidoService = {
  getAll: async () => {
    const response = await pagerAPI.get<PedidoGet[]>('/pedidos');

    return response.data;
  },
  getRefeicoes: async () => {
    const response = await pagerAPI.get<Refeicao[]>('/pedidos/refeicoes');

    return response.data;
  },
  postPedido: async (data: PedidoPost) => {
    const response = await pagerAPI.post<PedidoPost>('/pedidos', data);

    return response.data;
  },
};
