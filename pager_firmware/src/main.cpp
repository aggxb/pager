#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET    -1
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

const char* ssid = "Wokwi-GUEST";
const char* password = "";
const char* mqtt_server = "broker.hivemq.com";

WiFiClient espClient;
PubSubClient client(espClient);

const int PIN_BUZZER = 13;
const int PIN_LED_VERDE = 14;
const int PIN_LED_VERMELHO = 27;
const int PIN_MOTOR = 12;

unsigned long tempoAcionamento = 0;
bool pagerAtivo = false;
const unsigned long TEMPO_ALERTA = 10000;

String tratarAcentos(String str) {
  String resultado = "";
  for (int i = 0; i < str.length(); i++) {
    unsigned char c = str[i];
    
    if (c == 0xC3) { 
      i++;
      unsigned char proximo = str[i];
      switch (proximo) {
        case 0xA1: resultado += (char)160; break;
        case 0xA9: resultado += (char)130; break;
        case 0xAD: resultado += (char)161; break;
        case 0xB3: resultado += (char)162; break;
        case 0xBA: resultado += (char)163; break;
        case 0xA7: resultado += (char)135; break;
        case 0xA2: resultado += (char)131; break;
        case 0xAA: resultado += (char)136; break;
        case 0xB4: resultado += (char)147; break;
        case 0xA3: resultado += "a"; break;       
        case 0xB5: resultado += "o"; break;       
        case 0x81: resultado += (char)143; break;
        case 0x89: resultado += (char)144; break;
        case 0x87: resultado += (char)128; break;
        default: resultado += "?"; break;
      }
    } else {
      resultado += (char)c;
    }
  }
  return resultado;
}

void atualizarTela(String linha1, String linha2) {
  display.clearDisplay();
  display.setTextColor(SSD1306_WHITE);
  
  display.setTextSize(1);
  display.setCursor(0, 5);
  display.println(tratarAcentos(linha1));
  
  display.setTextSize(2); 
  display.setCursor(0, 30);
  display.println(tratarAcentos(linha2));
  
  display.display();
}

void setup_wifi() {
  delay(10);
  Serial.println("Conectando ao WiFi...");
  atualizarTela("WiFi", "Conectando");
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado!");
  atualizarTela("WiFi", "Conectado!");
}

void callback(char* topic, byte* payload, unsigned int length) {
  String msg;
  for (int i = 0; i < length; i++) {
    msg += (char)payload[i];
  }
  
  Serial.print("Comando recebido: ");
  Serial.println(msg);

  if (msg.length() > 0 && !pagerAtivo) {
    pagerAtivo = true;
    tempoAcionamento = millis();
    
    int indexQuebra = msg.indexOf('\n');
    
    display.clearDisplay();
    display.setTextColor(SSD1306_WHITE);
    
    display.setTextSize(1);
    display.setCursor(0, 2);
    display.println("NOVO PEDIDO");
    
    if (indexQuebra != -1) {
      String nomeCliente = msg.substring(0, indexQuebra);
      String refeicao = msg.substring(indexQuebra + 1);
      
      display.setTextSize(2);
      display.setCursor(0, 16); 
      display.println(tratarAcentos(nomeCliente));
      
      display.setTextSize(1);
      display.setCursor(0, 45); 
      display.println(tratarAcentos(refeicao));
    } else {
      display.setTextSize(2);
      display.setCursor(0, 20);
      display.println(tratarAcentos(msg));
    }
    
    display.display(); 

    digitalWrite(PIN_BUZZER, HIGH);
    digitalWrite(PIN_MOTOR, HIGH);
    digitalWrite(PIN_LED_VERDE, HIGH);
    digitalWrite(PIN_LED_VERMELHO, LOW);
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Tentando conectar MQTT...");
    atualizarTela("Servidor", "Conectando");
    
    String clientId = "ESP32_Pager_Wokwi_" + String(random(0xffff), HEX);
    
    if (client.connect(clientId.c_str())) {
      Serial.println("Conectado!");
      client.subscribe("delivery/pager/command");
      atualizarTela("PAGER OCIOSO", "Aguardando");
    } else {
      Serial.print("Falha. Tentando em 5s...");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("Falha ao iniciar o OLED");
    for(;;);
  }

  display.cp437(true);
  display.clearDisplay();
  
  pinMode(PIN_BUZZER, OUTPUT);
  pinMode(PIN_MOTOR, OUTPUT);
  pinMode(PIN_LED_VERDE, OUTPUT);
  pinMode(PIN_LED_VERMELHO, OUTPUT);

  digitalWrite(PIN_LED_VERMELHO, HIGH);

  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  if (pagerAtivo) {
    if (millis() - tempoAcionamento >= TEMPO_ALERTA) {
      pagerAtivo = false;
      digitalWrite(PIN_BUZZER, LOW);
      digitalWrite(PIN_MOTOR, LOW);
      digitalWrite(PIN_LED_VERDE, LOW);
      digitalWrite(PIN_LED_VERMELHO, HIGH);
      
      atualizarTela("PAGER OCIOSO", "Aguardando");
      Serial.println("Alerta finalizado.");
    }
  }
}