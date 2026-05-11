package com.pager_api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record PedidoPostRequest(@NotBlank(message = "O nome do cliente é obrigatório") String nomeCliente,
                                @NotNull(message = "O ID da refeição é obrigatório") @Positive(message = "O ID da refeição deve ser um número positivo") Long refeicaoId) {
}
