# 📟 Delivery Pager — Ecossistema IoT Fullstack

Um sistema completo de notificação e gerenciamento de pedidos para restaurantes e delivery. O projeto substitui os tradicionais pagers de rádio frequência (RF) por uma infraestrutura moderna baseada em Nuvem, Internet das Coisas (IoT) e conectividade Wi-Fi, permitindo gestão centralizada e integração fluida.

---

## 🏗️ Arquitetura do Sistema

O projeto é dividido em três camadas desacopladas que se comunicam de forma assíncrona:

1. **Frontend (Painel Web):** Interface de operação para o balcão do restaurante registrar os pedidos concluídos.
2. **Backend (API REST):** Responsável pelas regras de negócio, persistência de dados e delegação de mensagens para o broker.
3. **Firmware (Hardware IoT):** Microcontrolador ESP32 que atua como receptor (subscriber), convertendo comandos de rede em alertas físicos (visuais e sonoros).

---

## 🚀 Tecnologias Utilizadas

### Frontend — [`/pager-web`](./pager-web)

| Tecnologia | Finalidade |
|---|---|
| React 19 + TypeScript + Vite | Base da aplicação |
| TailwindCSS 4 + HeroUI | Estilização e componentes visuais |
| TanStack Query & Form | Gerenciamento de estado e cache |
| Zod | Validação de schemas |
| Framer Motion | Microinterações e animações |

### Backend — [`/pager-api`](./pager-api)

| Tecnologia | Finalidade |
|---|---|
| Java 21 + Spring Boot 3.5 | Base da aplicação |
| PostgreSQL | Banco de dados relacional |
| Spring Integration MQTT | Mensageria |
| MapStruct + Hibernate/JPA | Mapeamento DTO e persistência |

### Firmware — [`/pager-firmware`](./pager-firmware)

| Tecnologia | Finalidade |
|---|---|
| C++ (Arduino Framework) via PlatformIO | Base do firmware |
| ESP32 DevKit | Microcontrolador |
| PubSubClient | Comunicação MQTT |
| Adafruit GFX + SSD1306 | Controle do display OLED |

**Componentes físicos:** Display OLED I2C 128×64, Buzzer Passivo (PWM), LED indicador.

---

## 📂 Estrutura do Repositório

```text
pager/
├── pager-api/          # API REST (Java/Spring Boot)
├── pager-firmware/     # Código C++ embarcado para o ESP32 (PlatformIO)
├── pager-web/          # Aplicação Web (React/Vite)
├── docker-compose.yml  # Infraestrutura local (PostgreSQL e Mosquitto opcional)
└── README.md
```

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos

- Node.js (v18+)
- Java JDK 21 e Maven
- Docker e Docker Compose
- VS Code com a extensão PlatformIO

---

### Passo 1 — Subir a Infraestrutura (Banco de Dados)

Na raiz do projeto, inicie o container do PostgreSQL:

```bash
docker-compose up -d
```

---

### Passo 2 — Iniciar o Backend (Spring Boot)

Navegue até a pasta do backend e inicie a aplicação:

```bash
cd pager-api
./mvnw spring-boot:run
```

A API estará disponível em `http://localhost:8080/api/v1`.

---

### Passo 3 — Iniciar o Frontend (React)

Navegue até a pasta do frontend, instale as dependências e inicie o servidor de desenvolvimento:

```bash
cd pager-web
npm install
npm run dev
```

Acesse a interface web em `http://localhost:5173`.

---

### Passo 4 — Gravar o Firmware no ESP32

1. Abra a pasta `pager-firmware/` no VS Code.
2. Conecte o ESP32 ao computador via cabo USB (com suporte a dados).
3. Pela extensão PlatformIO, clique no ícone de **Upload** (seta para a direita na barra inferior).
4. *(Opcional)* Se necessário, mantenha pressionado o botão **BOOT** no ESP32 quando o terminal exibir `Connecting...`.

---

## 🔌 Esquema de Hardware (Pinout)

Para montar o pager físico na protoboard, siga o mapeamento abaixo:

| Componente | Pino no ESP32 | Direção | Função |
|---|---|---|---|
| Buzzer Passivo | GPIO 4 | Saída (PWM) | Emissão do bipe sonoro de alerta a 1 kHz |
| LED Verde | GPIO 5 | Saída (Digital) | Sinalização visual de pedido pronto |
| Display OLED (SDA) | GPIO 21 | Bidirecional | Linha de dados do barramento I2C |
| Display OLED (SCL) | GPIO 22 | Entrada | Linha de clock do barramento I2C |

> **Nota:** O dispositivo conecta-se automaticamente ao broker público HiveMQ (`broker.hivemq.com:1883`) e assina o tópico `delivery/pager/command`.
