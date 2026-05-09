package com.pager_api.entity;

import com.pager_api.enums.Refeicao;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(nullable = false)
    private String nomeCliente;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Refeicao refeicao;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime dataCriacao;
}
