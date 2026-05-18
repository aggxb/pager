package com.pager_api.service;

import com.pager_api.dto.request.PedidoPostRequest;
import com.pager_api.dto.response.PedidoResponse;
import com.pager_api.dto.response.RefeicaoResponse;
import com.pager_api.enums.Refeicao;
import com.pager_api.gateway.MqttGateway;
import com.pager_api.mapper.PedidoMapper;
import com.pager_api.repository.PedidoRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;

@AllArgsConstructor
@Service
public class PedidoService {
    private final PedidoRepository repository;
    private final PedidoMapper mapper;
    private final MqttGateway mqttGateway;

    public List<PedidoResponse> getAll() {
        var pedidosList = repository.findAll().stream()
                .map(pedido -> mapper.toPedidoResponse(pedido))
                .toList();

        return pedidosList;
    }

    public PedidoResponse save(PedidoPostRequest pedidoPostRequest) {
        var refeicao = Refeicao.fromId(pedidoPostRequest.refeicaoId());

        if (refeicao == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Refeição com ID " + pedidoPostRequest.refeicaoId() + " não encontrada");
        }

        var pedido = mapper.toPedido(pedidoPostRequest);
        pedido.setRefeicao(refeicao);

        var pedidoSalvo = repository.save(pedido);

        String mensagem = pedidoSalvo.getNomeCliente() + "\n" +
                Arrays.stream(pedidoSalvo.getRefeicao().getDescricao().split(" "))
                        .toList()
                        .getFirst();

        mqttGateway.sendToMqtt(mensagem);

        var pedidoResponse = mapper.toPedidoResponse(pedidoSalvo);

        return pedidoResponse;
    }

    public List<RefeicaoResponse> getAllMeals() {
        var refeicoesList = Arrays.stream(Refeicao.values()).
                map(refeicao -> mapper.toRefeicaoResponse(refeicao))
                .toList();

        return refeicoesList;
    }
}
