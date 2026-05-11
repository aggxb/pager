package com.pager_api.controller;

import com.pager_api.dto.request.PedidoPostRequest;
import com.pager_api.dto.response.PedidoResponse;
import com.pager_api.dto.response.RefeicaoResponse;
import com.pager_api.service.PedidoService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("api/v1/pedidos")
public class PedidoController {
    private final PedidoService service;

    @GetMapping
    public ResponseEntity<List<PedidoResponse>> getAll() {
        log.info("Request to get all orders");
        var pedidosList = service.getAll();

        return ResponseEntity.ok(pedidosList);
    }

    @PostMapping
    public ResponseEntity<PedidoResponse> save(@Valid @RequestBody PedidoPostRequest pedidoPostRequest) {
        log.info("Request to save a new order");

        var pedido = service.save(pedidoPostRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(pedido);
    }

    @GetMapping("refeicoes")
    public ResponseEntity<List<RefeicaoResponse>> getRefeicoes() {
        log.info("Request to get all meals");

        var refeicoesList = service.getAllMeals();

        return ResponseEntity.ok(refeicoesList);
    }
}

