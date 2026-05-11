package com.pager_api.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum Refeicao {
    HAMBURGUER(1L, "Hambúrguer Completo com Fritas", new BigDecimal("29.9")),
    PIZZA(2L, "Pizza Grande de Mussarela", new BigDecimal("45.99")),
    HOTDOG(3L, "Cachorro-Quente Completo", new BigDecimal("20.9")),
    BOLO(4L, "Bolo de Chocolate (Fatia)", new BigDecimal("17.99")),
    REFRIGERANTE(5L, "Refrigerante de 2 Litros", new BigDecimal("15.99"));

    private final Long id;
    private final String descricao;
    private final BigDecimal preco;

    @JsonCreator
    public static Refeicao fromId(Long id) {
        return Arrays.stream(Refeicao.values()).
                filter(refeicao -> refeicao.id.equals(id))
                .findFirst()
                .orElse(null);
    }
}
