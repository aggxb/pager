package com.pager_api.service;

import com.pager_api.dto.request.PedidoPostRequest;
import com.pager_api.dto.response.PedidoResponse;
import com.pager_api.mapper.PedidoMapper;
import com.pager_api.repository.PedidoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class PedidoService {
    private final PedidoRepository repository;
    private final PedidoMapper mapper;

    public List<PedidoResponse> getAll() {
        var pedidosList = repository.findAll().stream()
                .map(pedido -> mapper.toPedidoResponse(pedido))
                .toList();

        return pedidosList;
    }

    public PedidoResponse save(PedidoPostRequest pedidoPostRequest) {
        var pedido = mapper.toPedido(pedidoPostRequest);

        var pedidoSalvo = repository.save(pedido);

        var pedidoReponse = mapper.toPedidoResponse(pedidoSalvo);

        return pedidoReponse;
    }
}
