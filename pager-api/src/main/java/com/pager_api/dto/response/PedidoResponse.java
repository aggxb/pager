package com.pager_api.dto.response;

import java.time.LocalDateTime;

public record PedidoResponse(Long id, String nomeCliente, RefeicaoResponse refeicao, LocalDateTime dataCriacao) {
}
