package com.pager_api.service;

import com.pager_api.dto.request.PedidoPostRequest;
import com.pager_api.dto.response.PedidoResponse;
import com.pager_api.dto.response.RefeicaoResponse;
import com.pager_api.enums.Refeicao;
import com.pager_api.gateway.MqttGateway;
import com.pager_api.mapper.PedidoMapper;
import com.pager_api.repository.PedidoRepository;
import com.pager_api.util.CurrencyFormatter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
        var pedido = mapper.toPedido(pedidoPostRequest);
        pedido.setRefeicao(refeicao);

        var pedidoSalvo = repository.save(pedido);

        String mensagem = "Novo pedido: " + pedidoSalvo.getId() + " - " + pedidoSalvo.getNomeCliente() + " - " + pedidoSalvo.getRefeicao().getDescricao() + " - " + CurrencyFormatter.formatToBRL(pedidoSalvo.getRefeicao().getPreco());
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
