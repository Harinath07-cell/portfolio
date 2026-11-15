#include <WiFi.h>
#include <WebServer.h>

// Enter your local Wi-Fi credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Initialize HTTP server on standard Web Port 80
WebServer server(80);

// Define LED GPIO Pin (GPIO 2 is built-in LED on ESP32 NodeMCU)
const int ledPin = 2;

// Handler for root URL ("/") -> Serves the HTML control page
void handleRoot() {
  String html = "<!DOCTYPE html><html><head>";
  html += "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
  html += "<title>ESP32 LED Control</title>";
  html += "<style>";
  html += "body { font-family: Arial, sans-serif; text-align: center; margin-top: 60px; }";
  html += "button { font-size: 28px; padding: 14px 34px; margin: 4px; background-color: #8fd3c7; border: 2px solid #888; cursor: pointer; }";
  html += "</style></head><body>";
  html += "<h1>ESP32 Built-in LED</h1>";
  html += "<a href='/led/on'><button>ON</button></a>";
  html += "<a href='/led/off'><button>OFF</button></a>";
  html += "</body></html>";

  server.send(200, "text/html", html);
}

// Handler for "/led/on" -> Toggles GPIO 2 HIGH
void handleLedOn() {
  digitalWrite(ledPin, HIGH);
  Serial.println("Command Received: LED Turned ON");
  server.sendHeader("Location", "/");
  server.send(303); // Redirect back to root page
}

// Handler for "/led/off" -> Toggles GPIO 2 LOW
void handleLedOff() {
  digitalWrite(ledPin, LOW);
  Serial.println("Command Received: LED Turned OFF");
  server.sendHeader("Location", "/");
  server.send(303); // Redirect back to root page
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW); // Initial State: OFF

  // Connect to Local Wi-Fi Network
  Serial.print("Connecting to Wi-Fi");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi connected!");
  Serial.print("ESP32 IP address: ");
  Serial.println(WiFi.localIP());

  // Bind HTTP Route Handlers
  server.on("/", handleRoot);
  server.on("/led/on", handleLedOn);
  server.on("/led/off", handleLedOff);

  // Start HTTP Server
  server.begin();
  Serial.println("Web server started!");
}

void loop() {
  // Continuously listen and process client HTTP requests
  server.handleClient();
}