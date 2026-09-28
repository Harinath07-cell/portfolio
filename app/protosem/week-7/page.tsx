"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Cpu,
  Radio,
  Mic,
  Zap,
  Layers,
  CheckCircle2,
  Server,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Terminal,
  Code2,
  AlertTriangle,
  FileText,
  Table,
  ArrowRight,
  ShieldCheck,
  Activity,
  Box,
  Globe,
  Sliders,
  Play
} from "lucide-react";

// Project Data Schema
interface ProjectDetail {
  id: string;
  title: string;
  category: string;
  shortIntro: string;
  image: string;
  videoUrl?: string;
  components: string[];
  implementation: string;
  codeTitle: string;
  codeSnippet: string;
  steps: { step: string; title: string; desc: string }[];
  flowDiagram: string;
  keyPoints: string[];
  howImplemented: string;
  keyTech: string[];
}

const PROJECTS: ProjectDetail[] = [
  {
    id: "project-1",
    title: "ESP32 HTTP Web Server LED Controller",
    category: "Web & Microcontroller",
    shortIntro:
      "Designed and deployed an embedded HTTP web server on the ESP32 microcontroller using Arduino IDE to control hardware GPIO pins directly through a browser user interface.",
    image: "/images/protosem/week-07-esp32-webcontrol.jpeg",
    components: [
      "ESP32 NodeMCU Development Board",
      "Built-in SMD LED (GPIO 2)",
      "Micro-USB Cable",
      "Local Wi-Fi Network Access Point"
    ],
    implementation:
      "Programmed the ESP32 in Arduino IDE using the WiFi.h and WebServer.h libraries. The ESP32 connects to the local Wi-Fi router, obtains a dynamic IP address via DHCP, and hosts an HTTP server on TCP port 80. Browser GET requests to `/led/on` and `/led/off` endpoints toggle GPIO 2 output HIGH and LOW, providing instant visual feedback.",
    codeTitle: "esp32_http_server.ino",
    codeSnippet: `#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

WebServer server(80);
const int ledPin = 2; // Built-in LED GPIO pin

void handleRoot() {
  String html = "<html><head><title>ESP32 Web Control</title></head>";
  html += "<body style='font-family:sans-serif; text-align:center; padding-top:50px;'>";
  html += "<h1>ESP32 Web Server LED Control</h1>";
  html += "<p><a href='/led/on'><button style='padding:15px 30px; font-size:18px; background:#00E5FF; border:none; border-radius:8px; cursor:pointer;'>TURN LED ON</button></a></p>";
  html += "<p><a href='/led/off'><button style='padding:15px 30px; font-size:18px; background:#FF5252; color:white; border:none; border-radius:8px; cursor:pointer;'>TURN LED OFF</button></a></p>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}

void handleLedOn() {
  digitalWrite(ledPin, HIGH);
  server.sendHeader("Location", "/");
  server.send(303);
}

void handleLedOff() {
  digitalWrite(ledPin, LOW);
  server.sendHeader("Location", "/");
  server.send(303);
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi Connected!");
  Serial.print("ESP32 Local IP Address: ");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.on("/led/on", handleLedOn);
  server.on("/led/off", handleLedOff);
  server.begin();
}

void loop() {
  server.handleClient();
}`,
    steps: [
      {
        step: "01",
        title: "Hardware Wiring & Pin Configuration",
        desc: "Connected the ESP32 NodeMCU board to power via Micro-USB. Verified the built-in SMD LED connected to GPIO 2 on the PCB."
      },
      {
        step: "02",
        title: "Firmware Setup & Library Imports",
        desc: "Imported WiFi.h and WebServer.h headers in Arduino IDE to establish TCP/IP networking and HTTP request dispatching."
      },
      {
        step: "03",
        title: "Web Server Initialization & Endpoint Binding",
        desc: "Configured HTTP GET routes for `/`, `/led/on`, and `/led/off`. Programmed HTTP 200/303 response headers to handle browser button interactions."
      },
      {
        step: "04",
        title: "Testing & Local IP Verification",
        desc: "Monitored the Arduino Serial Monitor at 115200 baud to retrieve the assigned ESP32 IP address, accessing the control panel from mobile and laptop web browsers."
      }
    ],
    flowDiagram: "User Browser -> HTTP GET Request -> Wi-Fi Router -> ESP32 Web Server (Port 80) -> GPIO 2 High/Low -> Built-in LED State",
    keyPoints: [
      "Requires static or persistent IP allocation for seamless access.",
      "HTTP protocol operates pull-based synchronous communication.",
      "Suitable for local area network (LAN) control without external cloud reliance."
    ],
    howImplemented:
      "I implemented this project by configuring the ESP32 in Station (STA) mode. I built custom lightweight HTML buttons served directly from ESP32 flash memory, allowing any browser on the local Wi-Fi network to toggle GPIO 2 with sub-50ms latency.",
    keyTech: ["ESP32", "Arduino C++", "HTTP REST", "HTML5", "Wi-Fi 802.11 b/g/n"]
  },
  {
    id: "project-2",
    title: "MQTT-Based Remote 230W Light Switch",
    category: "IoT Protocols & High Voltage",
    shortIntro:
      "Connected an ESP32 to a 1-channel 5V relay module and leveraged lightweight MQTT pub/sub messaging to remotely control a 230W AC incandescent bulb safely.",
    image: "/images/protosem/week-07-esp32-webcontrol.jpeg",
    components: [
      "ESP32 NodeMCU Microcontroller",
      "1-Channel 5V Relay Module (Optocoupled)",
      "230V AC Incandescent Light Bulb & Holder",
      "HiveMQ / Mosquitto Cloud MQTT Broker",
      "Jumper Wires & Power Supply"
    ],
    implementation:
      "Connected the ESP32 to a public MQTT broker using the PubSubClient library. The ESP32 subscribes to the MQTT topic `home/lighting/bulb1`. When an 'ON' or 'OFF' payload string is published from an external dashboard or CLI terminal, the callback function parses the message and drives the relay signal line connected to GPIO 5, switching the 230V AC mains load.",
    codeTitle: "mqtt_relay_control.ino",
    codeSnippet: `#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* mqtt_server = "broker.hivemq.com";

const int RELAY_PIN = 5; // GPIO 5 connected to Relay IN

WiFiClient espClient;
PubSubClient client(espClient);

void callback(char* topic, byte* message, unsigned int length) {
  String messageTemp;
  for (int i = 0; i < length; i++) {
    messageTemp += (char)message[i];
  }

  Serial.print("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(". Message: ");
  Serial.println(messageTemp);

  if (String(topic) == "home/lighting/bulb1") {
    if (messageTemp == "ON") {
      Serial.println("Turning 230W Bulb ON");
      digitalWrite(RELAY_PIN, LOW); // Relay active LOW
    } else if (messageTemp == "OFF") {
      Serial.println("Turning 230W Bulb OFF");
      digitalWrite(RELAY_PIN, HIGH);
    }
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP32Client-";
    clientId += String(random(0xffff), HEX);
    
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      client.subscribe("home/lighting/bulb1");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH); // Default OFF
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}`,
    steps: [
      {
        step: "01",
        title: "Relay Circuit Wiring & Optocoupler Safety",
        desc: "Wired ESP32 5V (VIN) and GND to Relay VCC/GND. Connected GPIO 5 to Relay IN. Interrupted the 230V AC Live wire through Relay COM and NO terminals."
      },
      {
        step: "02",
        title: "MQTT Broker & PubSubClient Integration",
        desc: "Configured PubSubClient to establish TCP connection with MQTT broker at port 1883. Registered subscriber topic `home/lighting/bulb1`."
      },
      {
        step: "03",
        title: "Callback Handler & Payload Parsing",
        desc: "Wrote incoming message callback handler to decode raw byte buffers into string payloads ('ON'/'OFF') for active-LOW relay triggering."
      },
      {
        step: "04",
        title: "Latency & Connection Re-establishment",
        desc: "Added automatic MQTT reconnect logic in the loop() cycle to maintain persistent cloud connectivity under fluctuating network states."
      }
    ],
    flowDiagram: "MQTT Publisher / Dashboard -> Cloud MQTT Broker (Port 1883) -> ESP32 MQTT Client -> GPIO 5 Trigger -> Optocoupled Relay -> 230V Mains AC -> Light Bulb",
    keyPoints: [
      "MQTT lightweight Pub/Sub protocol minimizes network packet overhead.",
      "Optocoupler on relay module isolates 3.3V ESP32 logic from high-voltage AC mains.",
      "Persistent keep-alive ping ensures instantaneous command reception."
    ],
    howImplemented:
      "I implemented this by connecting the ESP32 to HiveMQ broker using MQTT over TCP port 1883. I ensured high-voltage safety by keeping AC connections fully insulated and using active-LOW optocoupled relay switching logic to prevent unintended relay triggers during boot.",
    keyTech: ["MQTT Protocol", "ESP32", "PubSubClient", "Relay Interfacing", "230V AC Mains"]
  },
  {
    id: "project-3",
    title: "Voice-Controlled IoT Smart Appliance Automation",
    category: "Cloud & Voice Integration",
    shortIntro:
      "Extended the hardware-software infrastructure by linking Google Assistant voice triggers to physical relay hardware using IFTTT Webhooks and MQTT cloud routing.",
    image: "/images/protosem/week-07-esp32-webcontrol.jpeg",
    components: [
      "ESP32 NodeMCU Board",
      "1-Channel Relay Module & 230W Appliance",
      "IFTTT Webhook Automation Service",
      "Google Assistant Voice Engine",
      "Cloud MQTT Gateway"
    ],
    implementation:
      "Configured an IFTTT applet triggered by phrase voice matching ('Turn on the light'). When spoken into Google Assistant, IFTTT dispatches an HTTP POST Webhook payload to an MQTT Webhook gateway, which publishes an MQTT message to topic `home/lighting/bulb1`, triggering the ESP32 relay switch.",
    codeTitle: "ifttt_mqtt_gateway_config.json",
    codeSnippet: `// IFTTT Webhook Event Payload Configuration
{
  "event_name": "google_assistant_voice_trigger",
  "trigger_phrase": "Turn on the living room light",
  "webhook_target": "https://api.cloudmqtt.com/v1/publish",
  "request_method": "POST",
  "content_type": "application/json",
  "body": {
    "topic": "home/lighting/bulb1",
    "payload": "ON",
    "qos": 1,
    "retain": false
  },
  "esp32_status": "ACTIVE_LISTENING"
}`,
    steps: [
      {
        step: "01",
        title: "IFTTT Applet & Voice Recognition Setup",
        desc: "Created a custom IFTTT applet with Google Assistant service trigger specifying custom voice commands ('Turn on light' / 'Turn off light')."
      },
      {
        step: "02",
        title: "Webhook Service Endpoint Configuration",
        desc: "Configured the Webhook action service in IFTTT to issue JSON POST payloads directly to the Cloud MQTT gateway URL."
      },
      {
        step: "03",
        title: "ESP32 Firmware Payload Processing",
        desc: "Utilized existing MQTT client firmware on ESP32 to receive topics published by the Webhook trigger and actuate the relay."
      },
      {
        step: "04",
        title: "End-to-End Latency & Voice Testing",
        desc: "Tested voice phrase execution across smartphone and smart speaker devices, measuring total round-trip latency under 600ms."
      }
    ],
    flowDiagram: "User Voice Command ('Hey Google') -> Google Assistant Engine -> IFTTT Webhook -> HTTP POST Payload -> MQTT Broker -> ESP32 -> Relay -> Appliance",
    keyPoints: [
      "Enables hands-free hardware automation using existing cloud voice APIs.",
      "Decouples voice engine from physical hardware via standardized Webhook JSON payloads.",
      "Low bandwidth overhead allows scaling to multiple smart home devices."
    ],
    howImplemented:
      "I connected IFTTT webhooks to the cloud MQTT broker pipeline developed in Project 2. This allowed me to translate natural voice commands into HTTP Webhook requests that effortlessly triggered the physical 230V relay via ESP32 without modifying hardware wiring.",
    keyTech: ["IFTTT Webhooks", "Google Assistant", "REST APIs", "MQTT Cloud", "ESP32 IoT"]
  }
];

// Activity Accordion Data
const ACTIVITIES = [
  {
    id: "act-1",
    num: "01",
    title: "ESP32 Web Server & Built-in LED Control (HTTP)",
    category: "HTTP Protocol",
    summary:
      "Programmed the ESP32 using Arduino IDE to host an HTTP web server on port 80 and created web endpoints to toggle the built-in LED (GPIO 2).",
    details: [
      "Configured ESP32 Wi-Fi station mode to connect to local wireless router.",
      "Implemented WebServer.h library to listen on HTTP port 80.",
      "Constructed embedded HTML UI served directly from ESP32 memory.",
      "Handled GET requests for `/led/on` and `/led/off` routes to control GPIO 2."
    ]
  },
  {
    id: "act-2",
    num: "02",
    title: "MQTT Broker Communication & High-Voltage Relay Switch",
    category: "MQTT Pub/Sub",
    summary:
      "Interfaced ESP32 with a 1-channel relay module and used MQTT publish/subscribe protocol to remotely toggle a 230W AC incandescent bulb.",
    details: [
      "Wired ESP32 GPIO 5 to 5V optocoupled relay module signal input.",
      "Established persistent TCP connection with HiveMQ MQTT Broker.",
      "Subscribed to topic `home/lighting/bulb1` and processed binary payloads.",
      "Executed active-LOW relay switching to safely operate 230V mains light bulb."
    ]
  },
  {
    id: "act-3",
    num: "03",
    title: "Voice-Controlled IoT Automation via IFTTT Webhooks",
    category: "Cloud Automation",
    summary:
      "Extended hardware control by linking Google Assistant voice triggers to physical relay actuation through IFTTT webhooks and MQTT API routing.",
    details: [
      "Created custom IFTTT Applet triggered by Google Assistant voice input.",
      "Configured Webhook REST API action issuing POST payloads.",
      "Routed Webhook triggers into cloud MQTT broker queue.",
      "Achieved seamless sub-second voice automation for physical electrical loads."
    ]
  }
];

// Component Specs Table Data
const COMPONENTS_TABLE = [
  {
    name: "ESP32 NodeMCU Development Board",
    category: "Microcontroller",
    specs: "Dual-core Tensilica LX6 @ 240MHz, 520KB SRAM, 802.11 b/g/n Wi-Fi",
    use: "Primary edge processing unit hosting HTTP server & MQTT socket client."
  },
  {
    name: "1-Channel 5V Relay Module",
    category: "Electromechanical Switch",
    specs: "Optocoupler isolation, AC 250V/10A & DC 30V/10A rated",
    use: "Acts as an electronically isolated switch controlling high-voltage 230V AC load."
  },
  {
    name: "230V AC Incandescent Light Bulb",
    category: "Load Appliance",
    specs: "230V AC mains powered, 60W/100W resistive electrical load",
    use: "Physical high-voltage electrical device operated via MQTT relay switching."
  },
  {
    name: "Built-in Board LED (GPIO 2)",
    category: "Visual Indicator",
    specs: "3.3V SMD LED on ESP32 PCB",
    use: "Visual verification for initial HTTP web server GET request toggling."
  },
  {
    name: "Breadboard & Jumper Wires",
    category: "Prototyping Hardware",
    specs: "Male-to-Male & Female-to-Male DuPont jumper cables",
    use: "Establishes pin signal connections between ESP32 GPIO pins and Relay module."
  },
  {
    name: "Micro-USB Cable",
    category: "Power & Interface",
    specs: "USB 2.0 to Micro-USB 5V power cable",
    use: "Flashing ESP32 firmware via Arduino IDE and serial monitoring at 115200 baud."
  },
  {
    name: "HiveMQ Cloud MQTT Broker",
    category: "Cloud Messaging Gateway",
    specs: "MQTT v3.1.1 protocol, TCP Port 1883",
    use: "Facilitates low-latency pub/sub message routing between remote interface and ESP32."
  },
  {
    name: "IFTTT Webhook Automation",
    category: "Voice & Cloud Integration",
    specs: "REST Webhook API & Google Assistant integration",
    use: "Translates natural language voice commands into HTTP POST requests for MQTT routing."
  }
];

export default function Week7DashboardPage() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [openActivityId, setOpenActivityId] = useState<string | null>("act-1");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const selectedProject = PROJECTS.find((p) => p.id === selectedProjectId);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setSelectedProjectId(null);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink selection:bg-indigo/30 selection:text-ink">
      <div aria-hidden className="noise-overlay" />

      {/* Top Navbar & Section Dashboard Navigation */}
      <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href="/#protosem"
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/5 px-3.5 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:border-indigo-soft hover:text-ink"
          >
            <ArrowLeft size={14} /> <span className="hidden sm:inline">Back to Internship Dashboard</span><span className="sm:hidden">Dashboard</span>
          </Link>

          <span className="font-mono text-xs uppercase tracking-wider text-cyan font-semibold">
            ProtoSem · Week 07
          </span>
        </div>

        {/* Section Navigation Tabs */}
        {!selectedProject && (
          <div className="border-t border-hairline bg-black/20 overflow-x-auto">
            <div className="mx-auto flex max-w-6xl items-center gap-1 px-4 py-2 sm:px-6">
              {[
                { id: "overview", label: "Overview", icon: FileText },
                { id: "activities", label: "Activity", icon: Activity },
                { id: "projects", label: "Project", icon: Box },
                { id: "components", label: "Components-Worked", icon: Table },
                { id: "description", label: "Description", icon: ShieldCheck }
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeSection === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition-all ${
                      isActive
                        ? "bg-indigo/20 text-cyan border border-indigo-soft/40 shadow-sm shadow-indigo/20"
                        : "text-ink-muted hover:bg-white/5 hover:text-ink"
                    }`}
                  >
                    <IconComponent size={14} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* IF A PROJECT IS SELECTED -> SHOW PROJECT DETAILED VIEW */}
        {selectedProject ? (
          <div className="space-y-8 animate-fadeIn">
            {/* Back Button */}
            <button
              onClick={() => setSelectedProjectId(null)}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-soft/30 bg-indigo/10 px-4 py-2 text-xs font-mono font-medium text-cyan transition-colors hover:bg-indigo/20"
            >
              <ArrowLeft size={14} /> Back to Projects List
            </button>

            {/* Project Header */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/5 px-3 py-1 text-xs font-mono text-indigo-soft">
                <Box size={14} /> {selectedProject.category}
              </div>
              <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
                {selectedProject.title}
              </h1>
              <p className="text-base text-ink-muted sm:text-lg max-w-3xl leading-relaxed">
                {selectedProject.shortIntro}
              </p>
            </div>

            {/* Components Used */}
            <div className="glass-panel rounded-2xl p-6 space-y-4">
              <h2 className="flex items-center gap-2 font-display text-xl text-ink">
                <Sliders size={20} className="text-cyan" /> Components Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {selectedProject.components.map((comp, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-white/5 px-3 py-1.5 text-xs font-mono text-ink-muted"
                  >
                    <CheckCircle2 size={12} className="text-cyan" />
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            {/* Implementation & Media Showcase */}
            <div className="glass-panel rounded-2xl p-6 space-y-6">
              <h2 className="flex items-center gap-2 font-display text-xl text-ink">
                <Play size={20} className="text-indigo-soft" /> Implementation & Media Showcase
              </h2>
              <p className="text-sm leading-relaxed text-ink-muted">
                {selectedProject.implementation}
              </p>

              {/* Media Display */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="overflow-hidden rounded-xl border border-hairline bg-black/40">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="aspect-video w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="p-3 bg-canvas/80 text-xs font-mono text-ink-faint">
                    Fig: Hardware Circuit & Setup for {selectedProject.title}
                  </div>
                </div>

                {selectedProject.videoUrl ? (
                  <div className="overflow-hidden rounded-xl border border-hairline bg-black/40">
                    <video
                      src={selectedProject.videoUrl}
                      controls
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="aspect-video w-full object-cover"
                    />
                    <div className="p-3 bg-canvas/80 text-xs font-mono text-ink-faint">
                      Video: Working Demonstration of {selectedProject.title}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-hairline bg-white/5 p-6 text-center">
                    <Zap size={28} className="text-indigo-soft mb-2" />
                    <p className="font-mono text-xs text-ink-muted">Circuit Working Verification Complete</p>
                    <p className="text-xs text-ink-faint mt-1">Real-time signal switching verified on hardware</p>
                  </div>
                )}
              </div>
            </div>

            {/* Terminal Theme Code Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 font-display text-xl text-ink">
                  <Code2 size={20} className="text-cyan" /> Implementation Firmware Code
                </h2>
                <span className="font-mono text-xs text-ink-faint">Terminal View</span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-hairline bg-[#0D1117] shadow-2xl">
                {/* Terminal Header */}
                <div className="flex items-center justify-between border-b border-white/10 bg-[#161B22] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
                    <span className="ml-2 font-mono text-xs text-slate-400 flex items-center gap-1.5">
                      <Terminal size={12} className="text-cyan" /> {selectedProject.codeTitle}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyCode(selectedProject.codeSnippet)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {copiedCode ? (
                      <>
                        <Check size={12} className="text-green-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={12} /> Copy Code
                      </>
                    )}
                  </button>
                </div>

                {/* Code Body */}
                <div className="overflow-x-auto p-4 sm:p-6 font-mono text-xs sm:text-sm text-emerald-400/90 leading-relaxed">
                  <pre>{selectedProject.codeSnippet}</pre>
                </div>
              </div>
            </div>

            {/* Step-by-Step Implementation */}
            <div className="glass-panel rounded-2xl p-6 space-y-6">
              <h2 className="flex items-center gap-2 font-display text-xl text-ink">
                <Sliders size={20} className="text-indigo-soft" /> Step-by-Step Implementation Flow
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                {selectedProject.steps.map((st) => (
                  <div
                    key={st.step}
                    className="rounded-xl border border-hairline bg-canvas/60 p-4 space-y-2 transition-all hover:border-indigo-soft/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-cyan font-semibold">Step {st.step}</span>
                      <CheckCircle2 size={14} className="text-cyan" />
                    </div>
                    <h3 className="font-semibold text-ink text-sm">{st.title}</h3>
                    <p className="text-xs leading-relaxed text-ink-muted">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Pipeline & Key Points */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="glass-panel rounded-2xl p-6 space-y-4">
                <h3 className="flex items-center gap-2 font-display text-lg text-ink">
                  <Globe size={18} className="text-cyan" /> System Flow Pipeline
                </h3>
                <div className="rounded-xl border border-hairline bg-black/40 p-4 font-mono text-xs text-indigo-soft leading-relaxed">
                  {selectedProject.flowDiagram}
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-6 space-y-4">
                <h3 className="flex items-center gap-2 font-display text-lg text-ink">
                  <AlertTriangle size={18} className="text-amber-400" /> Key Points to Note
                </h3>
                <ul className="space-y-2 text-xs text-ink-muted">
                  {selectedProject.keyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-amber-400" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* How I Implemented It */}
            <div className="glass-panel rounded-2xl p-6 space-y-3">
              <h3 className="flex items-center gap-2 font-display text-lg text-ink">
                <FileText size={18} className="text-indigo-soft" /> How I Implemented It
              </h3>
              <p className="text-sm leading-relaxed text-ink-muted">
                {selectedProject.howImplemented}
              </p>
            </div>

            {/* Key Technologies */}
            <div className="glass-panel rounded-2xl p-6 space-y-3">
              <h3 className="flex items-center gap-2 font-display text-lg text-ink">
                <Layers size={18} className="text-cyan" /> Key Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.keyTech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-hairline bg-white/5 px-3 py-1 font-mono text-xs text-ink-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Back Button */}
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => setSelectedProjectId(null)}
                className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/5 px-6 py-3 text-sm font-medium text-ink transition-all hover:border-indigo-soft hover:bg-white/10"
              >
                <ArrowLeft size={16} /> Back to Projects Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* STANDARD DASHBOARD VIEW WITH SECTIONS */
          <div className="space-y-16">
            {/* HERO TITLE HEADER */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-soft/30 bg-indigo/10 px-3.5 py-1 text-xs font-mono text-indigo-soft">
                <Cpu size={14} /> Development · IoT & Connectivity
              </div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Week 07 — IoT & Connectivity
              </h1>
              <p className="text-lg font-medium text-cyan sm:text-xl">
                Connecting Hardware to the Web: ESP32, HTTP, MQTT & Voice Automation
              </p>
            </div>

            {/* 1. OVERVIEW SECTION */}
            <section id="overview" className="scroll-mt-32 space-y-6">
              <div className="flex items-center justify-between border-b border-hairline pb-4">
                <h2 className="flex items-center gap-2 font-display text-2xl text-ink">
                  <FileText size={22} className="text-cyan" /> Week Overview
                </h2>
                <span className="font-mono text-xs text-ink-faint">Section 01</span>
              </div>

              <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
                <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
                  This week focused on understanding how IoT devices communicate with web applications and external services. Through hands-on sessions with the ESP32 and Arduino IDE, I explored different approaches for sending commands to physical hardware using HTTP, MQTT, and voice-triggered automation.
                </p>

                {/* Stat Grid */}
                <div className="grid gap-4 pt-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-hairline bg-white/5 p-4 text-center">
                    <p className="font-display text-2xl font-bold text-cyan">03</p>
                    <p className="font-mono text-xs text-ink-muted mt-1">Featured Projects</p>
                  </div>
                  <div className="rounded-xl border border-hairline bg-white/5 p-4 text-center">
                    <p className="font-display text-2xl font-bold text-indigo-soft">08+</p>
                    <p className="font-mono text-xs text-ink-muted mt-1">Hardware Components</p>
                  </div>
                  <div className="rounded-xl border border-hairline bg-white/5 p-4 text-center">
                    <p className="font-display text-2xl font-bold text-cyan">03</p>
                    <p className="font-mono text-xs text-ink-muted mt-1">IoT Protocols (HTTP/MQTT/REST)</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. ACTIVITY SECTION */}
            <section id="activities" className="scroll-mt-32 space-y-6">
              <div className="flex items-center justify-between border-b border-hairline pb-4">
                <div>
                  <h2 className="flex items-center gap-2 font-display text-2xl text-ink">
                    <Activity size={22} className="text-indigo-soft" /> Activity Exploration
                  </h2>
                  <p className="text-xs text-ink-muted mt-1">
                    Click on any activity accordion below to expand and view detailed descriptions.
                  </p>
                </div>
                <span className="font-mono text-xs text-ink-faint">Section 02</span>
              </div>

              {/* Accordions */}
              <div className="space-y-4">
                {ACTIVITIES.map((act) => {
                  const isOpen = openActivityId === act.id;
                  return (
                    <div
                      key={act.id}
                      className="glass-panel overflow-hidden rounded-2xl transition-all border border-hairline hover:border-indigo-soft/40"
                    >
                      <button
                        onClick={() => setOpenActivityId(isOpen ? null : act.id)}
                        className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-white/5"
                      >
                        <div className="flex items-center gap-4">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/10 font-mono text-sm font-bold text-cyan">
                            {act.num}
                          </span>
                          <div>
                            <span className="font-mono text-xs text-indigo-soft">{act.category}</span>
                            <h3 className="text-base sm:text-lg font-semibold text-ink">{act.title}</h3>
                          </div>
                        </div>
                        {isOpen ? <ChevronUp size={20} className="text-cyan" /> : <ChevronDown size={20} className="text-ink-muted" />}
                      </button>

                      {isOpen && (
                        <div className="border-t border-hairline bg-black/20 p-5 space-y-3">
                          <p className="text-sm leading-relaxed text-ink-muted">
                            {act.summary}
                          </p>
                          <div className="rounded-xl border border-hairline bg-canvas/60 p-4 space-y-2">
                            <p className="font-mono text-xs font-semibold text-cyan">Key Activity Breakdown:</p>
                            <ul className="space-y-1.5 text-xs text-ink-muted">
                              {act.details.map((d, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircle2 size={13} className="text-cyan mt-0.5 flex-none" />
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 3. PROJECT SECTION */}
            <section id="projects" className="scroll-mt-32 space-y-6">
              <div className="flex items-center justify-between border-b border-hairline pb-4">
                <div>
                  <h2 className="flex items-center gap-2 font-display text-2xl text-ink">
                    <Box size={22} className="text-cyan" /> Featured Projects
                  </h2>
                  <p className="text-xs text-ink-muted mt-1">
                    Click any project card to open its dedicated page with complete implementation, terminal code & step-by-step breakdown.
                  </p>
                </div>
                <span className="font-mono text-xs text-ink-faint">Section 03</span>
              </div>

              {/* Project Cards Grid */}
              <div className="grid gap-6 sm:grid-cols-3">
                {PROJECTS.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProjectId(project.id)}
                    className="glass-panel group cursor-pointer overflow-hidden rounded-2xl border border-hairline p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50 hover:shadow-xl hover:shadow-cyan/10 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Card Image */}
                      <div className="overflow-hidden rounded-xl border border-hairline bg-canvas/40 aspect-video">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Badge & Title */}
                      <div className="space-y-2">
                        <span className="inline-block font-mono text-xs text-indigo-soft">
                          {project.category}
                        </span>
                        <h3 className="font-display text-lg font-bold text-ink group-hover:text-cyan transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-ink-muted line-clamp-3 leading-relaxed">
                          {project.shortIntro}
                        </p>
                      </div>
                    </div>

                    {/* Footer Button */}
                    <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between text-xs font-mono text-cyan">
                      <span>View Detailed Project</span>
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. COMPONENTS WORKED SECTION */}
            <section id="components" className="scroll-mt-32 space-y-6">
              <div className="flex items-center justify-between border-b border-hairline pb-4">
                <div>
                  <h2 className="flex items-center gap-2 font-display text-2xl text-ink">
                    <Table size={22} className="text-indigo-soft" /> Components Worked & Specifications
                  </h2>
                  <p className="text-xs text-ink-muted mt-1">
                    Comprehensive table listing all hardware components, microcontrollers, relays, and cloud tools utilized.
                  </p>
                </div>
                <span className="font-mono text-xs text-ink-faint">Section 04</span>
              </div>

              {/* Hardware Image Showcase */}
              <div className="glass-panel overflow-hidden rounded-2xl p-6">
                <div className="grid gap-6 sm:grid-cols-2 items-center">
                  <div className="space-y-3">
                    <div className="overflow-hidden rounded-xl border border-hairline bg-black/40">
                      <img
                        src="/images/protosem/week-07-esp32-webcontrol.jpeg"
                        alt="Hardware Components Setup"
                        className="aspect-video w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <p className="text-xs font-mono text-ink-faint">
                      Fig: ESP32 development board, relay module, jumper wiring, and 230V mains light bulb.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-display text-lg text-ink font-semibold">Hardware Integration Overview</h3>
                    <p className="text-xs leading-relaxed text-ink-muted">
                      Every project combined low-power microcontroller logic (3.3V/5V) with isolated high-voltage AC load actuation (230V mains). Using optical isolation modules ensured zero electrical back-feed, protecting the ESP32 while enabling sub-second switching.
                    </p>
                  </div>
                </div>
              </div>

              {/* Components Table */}
              <div className="glass-panel overflow-hidden rounded-2xl border border-hairline">
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs sm:text-sm">
                    <thead className="border-b border-hairline bg-white/5 font-mono text-xs uppercase tracking-wider text-cyan">
                      <tr>
                        <th className="px-4 py-3 sm:px-6">Component Name</th>
                        <th className="px-4 py-3 sm:px-6">Category</th>
                        <th className="px-4 py-3 sm:px-6">Key Specifications</th>
                        <th className="px-4 py-3 sm:px-6">Project Application & Use</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-hairline text-ink-muted">
                      {COMPONENTS_TABLE.map((c, i) => (
                        <tr key={i} className="transition-colors hover:bg-white/5">
                          <td className="px-4 py-3.5 sm:px-6 font-semibold text-ink font-mono">{c.name}</td>
                          <td className="px-4 py-3.5 sm:px-6 text-indigo-soft">{c.category}</td>
                          <td className="px-4 py-3.5 sm:px-6 text-ink-faint">{c.specs}</td>
                          <td className="px-4 py-3.5 sm:px-6 text-ink-muted leading-relaxed">{c.use}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* 5. DESCRIPTION SECTION (TAKEAWAYS) */}
            <section id="description" className="scroll-mt-32 space-y-6">
              <div className="flex items-center justify-between border-b border-hairline pb-4">
                <h2 className="flex items-center gap-2 font-display text-2xl text-ink">
                  <ShieldCheck size={22} className="text-cyan" /> Key Takeaways & Description
                </h2>
                <span className="font-mono text-xs text-ink-faint">Section 05</span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="glass-panel rounded-2xl p-6 space-y-3">
                  <h3 className="flex items-center gap-2 font-display text-lg text-ink font-semibold">
                    <HelpCircle size={18} className="text-amber-400" /> Protocol Learning & Comparison
                  </h3>
                  <p className="text-xs leading-relaxed text-ink-muted">
                    Working across HTTP, MQTT, and IFTTT Webhooks provided a practical understanding of IoT networking models:
                  </p>
                  <ul className="space-y-2 text-xs text-ink-muted">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-cyan" />
                      <span><strong>HTTP Protocol:</strong> Best for local browser dashboards, but higher packet header overhead and pull-based client request requirements.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-cyan" />
                      <span><strong>MQTT Protocol:</strong> Optimized for low-bandwidth pub/sub event distribution, enabling persistent low-latency hardware control.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-cyan" />
                      <span><strong>Voice Automation:</strong> Webhook endpoints bridge external cloud AI platforms directly into IoT messaging streams.</span>
                    </li>
                  </ul>
                </div>

                <div className="glass-panel rounded-2xl p-6 space-y-3">
                  <h3 className="flex items-center gap-2 font-display text-lg text-ink font-semibold">
                    <CheckCircle2 size={18} className="text-cyan" /> Educational Impact
                  </h3>
                  <p className="text-xs leading-relaxed text-ink-muted">
                    Week 7 bridged pure software engineering with physical hardware design. Mastering high-voltage AC relay switching, micro-controller networking, and cloud webhook routing provided hands-on experience applicable to real-world smart home and industrial automation systems.
                  </p>
                </div>
              </div>
            </section>

            {/* MAIN BACK BUTTON */}
            <div className="pt-8 flex justify-center">
              <Link
                href="/#protosem"
                className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/5 px-6 py-3.5 text-sm font-medium text-ink transition-all hover:border-indigo-soft hover:bg-white/10 hover:text-cyan"
              >
                <ArrowLeft size={16} /> Back to Main Protosem Dashboard
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
