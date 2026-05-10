package com.pager_api.mapper;

import com.pager_api.dto.request.PedidoPostRequest;
import com.pager_api.dto.response.PedidoResponse;
import com.pager_api.entity.Pedido;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PedidoMapper {
    PedidoMapper INSTANCE = Mappers.getMapper(PedidoMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "dataCriacao", ignore = true)
    Pedido toPedido(PedidoPostRequest pedidoPostRequest);

    PedidoPostRequest toPedidoPostRequest(Pedido pedido);

    PedidoResponse toPedidoResponse(Pedido pedido);
}
