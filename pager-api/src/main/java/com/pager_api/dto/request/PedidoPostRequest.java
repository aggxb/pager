package com.pager_api.dto.request;

import com.pager_api.enums.Refeicao;

public record PedidoPostRequest(String nomeCliente, Refeicao refeicao) {
}
