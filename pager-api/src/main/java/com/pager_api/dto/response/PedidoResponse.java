package com.pager_api.dto.response;

import com.pager_api.enums.Refeicao;

import java.time.LocalDateTime;

public record PedidoResponse(Long id, String nomeCliente, Refeicao refeicao, LocalDateTime dataCriacao) {
}
