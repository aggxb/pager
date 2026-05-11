package com.pager_api.mapper;

import com.pager_api.dto.request.PedidoPostRequest;
import com.pager_api.dto.response.PedidoResponse;
import com.pager_api.dto.response.RefeicaoResponse;
import com.pager_api.entity.Pedido;
import com.pager_api.enums.Refeicao;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PedidoMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "dataCriacao", ignore = true)
    @Mapping(target = "refeicao", ignore = true)
    Pedido toPedido(PedidoPostRequest pedidoPostRequest);

    PedidoPostRequest toPedidoPostRequest(Pedido pedido);

    PedidoResponse toPedidoResponse(Pedido pedido);

    RefeicaoResponse toRefeicaoResponse(Refeicao refeicao);
}
