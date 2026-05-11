package com.pager_api.dto.response;

import java.math.BigDecimal;

public record RefeicaoResponse(Long id, String descricao, BigDecimal preco) {
}
