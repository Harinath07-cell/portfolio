// Project Data Schema and Definitions for Week 7 (Tasks 1 to 5)

export interface ProjectDetail {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortIntro: string;
  coverImage?: string;
  repositoryUrl: string;

  // 1. Overview
  overview: {
    objective: string;
    problemSolved: string;
    summary: string;
  };

  // 2. Concepts
  concepts: {
    webServerConcept: string;
    communicationFlow: string;
  };

  // 3. System Design
  systemDesign: {
    image?: string;
    imageCaption?: string;
    diagram?: string;
    explanation: string;
  };

  // 4. Hardware & Software
  hardwareSoftware: {
    components: string[];
    tools: string[];
  };

  // 5. Wiring / Setup
  wiringSetup: {
    image?: string;
    imageCaption?: string;
    circuitDesc: string;
    pinTable: { pin: string; component: string; connection: string }[];
  };

  // 6. Implementation
  implementation: {
    codeTitle: string;
    codeSnippet: string;
    htmlExplanation: string;
    keyCodeSections: { section: string; desc: string }[];
  };

  // 7. Configuration
  configuration: {
    steps: string[];
  };

  // 8. Evidence
  evidence: {
    image: string;
    imageCaption: string;
    gallery?: { url: string; caption?: string }[];
    videoUrl?: string;
    videoCaption?: string;
  };

  // 9. Challenges & Fixes
  challengesFixes: {
    problem: string;
    fix: string;
  }[];

  // 10. Reflection
  reflection: string;
}

export const PROJECTS: ProjectDetail[] = [
  // =========================================================================
  // TASK 1: ESP32 Web Server & HTML LED Control
  // =========================================================================
  {
    id: "project-1",
    slug: "task-1",
    title: "Task 1 — ESP32 Web Server & HTML LED Control",
    category: "Web & Microcontroller",
    shortIntro:
      "Designed and deployed an embedded HTTP web server on the ESP32 microcontroller using Arduino IDE to control hardware GPIO pins directly through a browser user interface over local Wi-Fi.",
    coverImage: "/evidence-img-week-7/System Design & Data Flow-p1.png",
    repositoryUrl: "https://github.com/Harinath07-cell/IoT-Connectivity",

    overview: {
      objective:
        "To build a standalone embedded HTTP web server on the ESP32 microcontroller using Arduino IDE and control physical hardware (LED) over a local Wi-Fi network without relying on third-party cloud applications.",
      problemSolved:
        "Traditional IoT and smart home appliances often depend on third-party cloud servers (such as Blynk or Tuya) which introduce command latency, require constant internet access, and pose potential privacy risks. By hosting an embedded HTTP web server directly on the ESP32, device control remains 100% local, responsive, lightweight, and private.",
      summary:
        "This project demonstrates end-to-end hardware control by converting an ESP32 into a local Wi-Fi web server. The microcontroller connects to a local wireless router, obtains an IP address, listens on TCP port 80, and serves a custom HTML interface. When users click control buttons on their smartphone or laptop browser, HTTP GET requests (/led/on and /led/off) are routed to ESP32 handler functions, driving GPIO pin output states to turn the physical LED on and off instantaneously."
    },

    concepts: {
      webServerConcept:
        "An ESP32 Web Server utilizes the WebServer.h library to open a listening TCP socket on port 80. Unlike cloud web applications hosted on remote Linux servers, the ESP32 serves HTML pages directly from its flash memory, processing incoming HTTP headers and executing C++ hardware control code in real time.",
      communicationFlow:
        "Communication follows a client-server architecture. The browser acts as the HTTP client while the ESP32 acts as the HTTP server. When a user clicks a button, the browser transmits an HTTP GET request packet over Wi-Fi. The ESP32 parses the request path, triggers digitalWrite(ledPin, HIGH/LOW), and returns an HTTP status 200/303 response header back to the browser to update the page state."
    },

    systemDesign: {
      image: "/evidence-img-week-7/System Design & Data Flow-p1.png",
      imageCaption: "Fig 3.1: ESP32 HTTP Web Server Architecture and Bidirectional Communication Flow",
      diagram: `User Browser (Client)
        │
        │ HTTP GET /led/on  or  /led/off
        ▼
Local Wi-Fi Router (Access Point)
        │
        ▼
ESP32 NodeMCU (HTTP Server :80)
        │
        ├─► Parses URL Endpoint Handler
        ├─► Triggers digitalWrite(GPIO 2, HIGH/LOW)
        └─► Returns HTTP 303 Redirect / HTML UI
        │
        ▼
Physical LED / Load (Actuation)`,
      explanation:
        "The system architecture functions completely on the local area network (LAN). The user device (client) sends standard HTTP GET requests across the local router to the static or DHCP-assigned IP address of the ESP32. The ESP32 WebServer core receives the socket, matches the registered routes, executes GPIO level transitions, and returns updated HTML UI representations."
    },

    hardwareSoftware: {
      components: [
        "ESP32 NodeMCU Development Board (Dual-core LX6 @ 240MHz, 802.11 b/g/n Wi-Fi)",
        "5mm Red/Blue LED (or Onboard SMD LED on GPIO 2)",
        "220Ω / 330Ω Current Limiting Resistor",
        "Solderless Breadboard",
        "Male-to-Male Jumper Wires",
        "Micro-USB Data Cable (5V power & programming interface)"
      ],
      tools: [
        "Arduino IDE (Embedded C++ firmware compilation and flashing)",
        "ESP32 Arduino Core & WebServer.h Library",
        "WiFi.h (Wi-Fi Station Mode network driver)",
        "Arduino Serial Monitor (@ 115200 baud for IP address discovery)",
        "Chrome / Firefox Web Browser for mobile & desktop user interaction"
      ]
    },

    wiringSetup: {
      image: "/evidence-img-week-7/Circuit Wiring & Pin Connections-p1.png",
      imageCaption: "Fig 5.1: ESP32 GPIO to LED Circuit Wiring Diagram & Breadboard Setup",
      circuitDesc:
        "The hardware circuit connects ESP32 digital pin GPIO 2 to the anode (longer leg) of the LED through a 220Ω current-limiting resistor to protect against over-current conditions. The cathode (shorter leg) of the LED is connected directly to the ESP32 Ground (GND) rail. When GPIO 2 is set to HIGH (+3.3V), forward bias causes current flow, illuminating the LED. When set to LOW (0V), the circuit turns OFF.",
      pinTable: [
        {
          pin: "GPIO 2",
          component: "LED Anode (+)",
          connection: "Connected via 220Ω current-limiting resistor (Logic Output)"
        },
        {
          pin: "GND",
          component: "LED Cathode (-)",
          connection: "Direct connection to common circuit ground reference"
        },
        {
          pin: "VIN / USB",
          component: "Power Supply",
          connection: "5V regulated DC supply delivered through Micro-USB port"
        },
        {
          pin: "3.3V",
          component: "VCC Rail",
          connection: "Internal ESP32 low-dropout regulator output (unused for passive LED)"
        }
      ]
    },

    implementation: {
      codeTitle: "esp32_webserver_led_control.ino",
      codeSnippet: `#include <WiFi.h>
#include <WebServer.h>

// Enter your local Wi-Fi credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Initialize HTTP server on standard Web Port 80
WebServer server(80);

// Define LED GPIO Pin (GPIO 2 is built-in LED on ESP32 NodeMCU)
const int ledPin = 2;

// Handler for root URL ("/") -> Serves HTML Web Interface
void handleRoot() {
  String html = "<!DOCTYPE html><html><head>";
  html += "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
  html += "<title>ESP32 Web Server LED Control</title>";
  html += "<style>";
  html += "body { font-family: Arial, sans-serif; text-align: center; background-color: #0f172a; color: #f8fafc; padding-top: 50px; }";
  html += "h1 { color: #38bdf8; margin-bottom: 30px; }";
  html += ".btn { display: inline-block; padding: 15px 32px; font-size: 18px; font-weight: bold; text-decoration: none; border-radius: 12px; margin: 10px; transition: 0.3s; }";
  html += ".btn-on { background-color: #00E5FF; color: #0f172a; }";
  html += ".btn-off { background-color: #ef4444; color: #ffffff; }";
  html += ".btn:hover { opacity: 0.85; transform: scale(1.05); }";
  html += "</style></head><body>";
  html += "<h1>ESP32 Web Server LED Control</h1>";
  html += "<p>Control hardware GPIO 2 directly over Wi-Fi</p>";
  html += "<p><a href='/led/on' class='btn btn-on'>TURN LED ON</a></p>";
  html += "<p><a href='/led/off' class='btn btn-off'>TURN LED OFF</a></p>";
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
  digitalWrite(ledPin, LOW); // Start with LED OFF

  // Connect to Wi-Fi Network
  Serial.print("Connecting to Wi-Fi: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("Wi-Fi Connected Successfully!");
  Serial.print("ESP32 Web Server IP Address: http://");
  Serial.println(WiFi.localIP());

  // Define HTTP Route Handlers
  server.on("/", handleRoot);
  server.on("/led/on", handleLedOn);
  server.on("/led/off", handleLedOff);

  // Start HTTP Server
  server.begin();
  Serial.println("HTTP Web Server Started on Port 80.");
}

void loop() {
  // Continuously listen and process client HTTP requests
  server.handleClient();
}`,
      htmlExplanation:
        "The embedded HTML interface is generated dynamically inside `handleRoot()` and sent as a string response. It renders a clean UI with viewport responsiveness for mobile devices and two action buttons hyperlinked to `/led/on` and `/led/off` routes.",
      keyCodeSections: [
        {
          section: "WiFi.begin(ssid, password)",
          desc: "Initiates ESP32 Wi-Fi station mode handshake with local router."
        },
        {
          section: "server.on('/', handleRoot)",
          desc: "Binds HTTP GET route to render embedded HTML interface."
        },
        {
          section: "digitalWrite(ledPin, HIGH/LOW)",
          desc: "Sets GPIO 2 pin voltage level to 3.3V (HIGH) or 0V (LOW)."
        },
        {
          section: "server.sendHeader('Location', '/') & server.send(303)",
          desc: "Issues HTTP 303 Redirect header back to root so the web browser updates without hanging."
        },
        {
          section: "server.handleClient()",
          desc: "Executes inside loop() to handle incoming TCP socket requests instantly."
        }
      ]
    },

    configuration: {
      steps: [
        "1. Install ESP32 Board Package in Arduino IDE via Board Manager (https://dl.espressif.com/dl/package_esp32_index.json).",
        "2. Select Board: 'ESP32 Dev Module' and set Upload Speed to 921600.",
        "3. Replace `YOUR_WIFI_SSID` and `YOUR_WIFI_PASSWORD` with actual network credentials.",
        "4. Connect ESP32 via Micro-USB and select the corresponding COM Port.",
        "5. Compile and flash firmware to ESP32.",
        "6. Open Arduino Serial Monitor at 115200 baud rate and press ESP32 RST button.",
        "7. Note assigned local IP address (e.g., http://192.168.1.50).",
        "8. Open smartphone or laptop web browser on the same Wi-Fi network and navigate to the IP address to operate the LED."
      ]
    },

    evidence: {
      image: "/evidence-img-week-7/evidence-1/WhatsApp Image 2026-10-04 at 7.13.41 PM.jpeg",
      imageCaption: "Fig 8.1: ESP32 NodeMCU Development Board setup with LED control circuit on breadboard.",
      gallery: [
        {
          url: "/evidence-img-week-7/evidence-1/WhatsApp Image 2026-10-04 at 7.13.40 PM.jpeg",
          caption: "Fig 8.1: Hardware Circuit Setup — ESP32 Dev Board wired with LED & resistor on breadboard under USB power."
        },
        {
          url: "/evidence-img-week-7/evidence-1/WhatsApp Image 2026-10-04 at 7.13.41 PM.jpeg",
          caption: "Fig 8.2: Hardware Verification — Physical LED illumination triggered via HTTP GET request over local Wi-Fi."
        },
        {
          url: "/evidence-img-week-7/evidence-1/WhatsApp Image 2026-10-04 at 7.13.41 PM (1).jpeg",
          caption: "Fig 8.3: Browser User Interface — ESP32 HTTP Web Server control dashboard serving interactive control buttons."
        }
      ],
      videoUrl: "/evidence-img-week-7/evidence-1/WhatsApp Video 2026-10-04 at 8.55.32 PM.mp4",
      videoCaption: "Demo Video: ESP32 local Web Server serving HTML interface and actuating physical LED upon browser button interaction."
    },

    challengesFixes: [
      {
        problem: "Dynamic IP Address Reassignment on Router Reboot",
        fix: "The router reassigned dynamic IP addresses to the ESP32 after disconnection. Fixed by assigning static IP configuration using `WiFi.config(staticIP, gateway, subnet)` in setup()."
      },
      {
        problem: "Browser Request Hanging & Button Latency",
        fix: "Initial code did not send redirection response headers, causing the browser to wait indefinitely. Fixed by adding `server.sendHeader('Location', '/')` and HTTP status 303 SEE OTHER."
      },
      {
        problem: "Serial Monitor Displaying Unreadable Garbage Characters",
        fix: "Serial Monitor baud rate mismatch. Fixed by setting Serial Monitor dropdown to match `Serial.begin(115200)` baud rate."
      }
    ],

    reflection:
      "This project solidified my foundational understanding of network sockets and embedded HTTP communication. Learning that a compact microcontroller like the ESP32 can act as an independent web server without any cloud subscription or OS runtime opened up practical possibilities for local home automation, offline edge computing, and zero-latency smart installations."
  },

  // =========================================================================
  // TASK 2: Adafruit IO Dashboard & MQTT
  // =========================================================================
  {
    id: "project-2",
    slug: "task-2",
    title: "Task 2 — Adafruit IO Dashboard & MQTT",
    category: "Cloud-Based ESP32 Control using MQTT and Adafruit IO",
    shortIntro:
      "This project extends the local ESP32 web-control system into a cloud-connected IoT architecture. The ESP32 communicates with Adafruit IO using the MQTT protocol, allowing the built-in LED to be controlled remotely through a cloud dashboard.",
    coverImage: "/evidence-img-week-7/System Design & Data Flow-p2.png",
    repositoryUrl: "https://github.com/Harinath07-cell/IoT-Connectivity/tree/Harinath07-Assesinment-2",

    overview: {
      objective:
        "To connect the ESP32 microcontroller to the Adafruit IO cloud platform using MQTT and control the ESP32 built-in LED through a cloud-based dashboard. The objective was to understand how MQTT-based communication works in an IoT environment and how a cloud platform can act as an intermediary between a user interface and an embedded device.",
      problemSolved:
        "In the previous task, the ESP32 web server could only be accessed by devices connected to the same local Wi-Fi network. A cloud-based IoT platform provides a more flexible architecture where the device communicates with a remote service through an established messaging protocol across any internet connection. Adafruit IO provides MQTT connectivity, feeds, dashboards, and data visualization.",
      summary:
        "This project demonstrates cloud-based IoT communication by connecting an ESP32 to Adafruit IO using MQTT. The ESP32 connects to the internet through Wi-Fi and establishes an MQTT connection with the Adafruit IO broker. A dashboard button publishes an ON or OFF command to an MQTT feed. The ESP32 subscribes to this feed, receives the command, and changes the state of its built-in LED connected to GPIO 2. The ESP32 also publishes the current LED state back to a separate status feed, creating a basic two-way IoT communication system."
    },

    concepts: {
      webServerConcept:
        "MQTT (Message Queuing Telemetry Transport) is a lightweight publish-subscribe communication protocol commonly used in IoT systems. It comprises Publishers (devices that send messages to a topic), Subscribers (devices that listen to a topic), and Brokers (the central routing server). Adafruit IO acts as the central MQTT broker managing secure client connections over TCP port 1883.",
      communicationFlow:
        "Adafruit IO organizes communication using feeds. Commands are transmitted via `USERNAME/feeds/led-control`. When the user toggles a dashboard switch, Adafruit IO publishes an 'ON' or 'OFF' string. The ESP32, which maintains an active subscription socket to this feed, instantly parses the payload and toggles GPIO 2. It then publishes state verification back to `USERNAME/feeds/led-status`, creating a reliable closed-loop telemetry cycle."
    },

    systemDesign: {
      image: "/evidence-img-week-7/System Design & Data Flow-p2.png",
      imageCaption: "Fig 3.1: MQTT Publish/Subscribe Communication Flow between Adafruit IO Cloud and ESP32 Microcontroller",
      diagram: `Adafruit IO Dashboard
        │
        │ 1. User Clicks ON/OFF Widget
        ▼
Adafruit IO MQTT Broker (io.adafruit.com:1883)
  [Feed: USERNAME/feeds/led-control]
        │
        │ 2. Broker Publishes MQTT Message to Subscriber
        ▼
ESP32 NodeMCU Microcontroller
        │
        ├─► 3. Decodes MQTT Payload ('ON' or 'OFF')
        ├─► 4. Actuates digitalWrite(GPIO 2, HIGH/LOW)
        │
        │ 5. Publishes State Confirmation ('ON' / 'OFF')
        ▼
Adafruit IO Feed [USERNAME/feeds/led-status]
        │
        ▼
Dashboard Indicator Widget Updates in Real Time`,
      explanation:
        "The architecture is decoupled: neither the browser nor the ESP32 need direct IP knowledge of each other. Both connect as MQTT clients to io.adafruit.com. The cloud dashboard publishes to 'led-control', which the ESP32 receives as a subscriber. Upon toggling the onboard LED, the ESP32 publishes to 'led-status', ensuring the dashboard display accurately reflects physical reality."
    },

    hardwareSoftware: {
      components: [
        "ESP32 NodeMCU Development Board (Dual-core LX6 @ 240MHz, 802.11 b/g/n Wi-Fi)",
        "Built-in SMD LED connected to GPIO 2",
        "Micro-USB Data Cable (Power supply & serial communication)",
        "Stable Wi-Fi Network with Internet Access"
      ],
      tools: [
        "Arduino IDE (Embedded firmware development)",
        "Adafruit MQTT Library (Adafruit_MQTT_Client.h)",
        "WiFi.h (ESP32 Network stack)",
        "Adafruit IO Platform (Cloud MQTT Broker & Dashboard GUI)",
        "Arduino Serial Monitor (@ 115200 baud for connection telemetry)"
      ]
    },

    wiringSetup: {
      image: "/evidence-img-week-7/Circuit Wiring & Pin Connections-p2.png",
      imageCaption: "Fig 5.1: ESP32 Built-in LED Hardware Pin Configuration",
      circuitDesc:
        "For this project, the ESP32's built-in LED was used. This simplified the hardware setup because no external breadboard wiring was required. The LED is already connected to GPIO 2 on the ESP32 board. The board was powered through a Micro-USB cable connected to the computer.",
      pinTable: [
        {
          pin: "GPIO 2",
          component: "Built-in SMD LED",
          connection: "Digital output logic control line (HIGH = ON, LOW = OFF)"
        },
        {
          pin: "USB",
          component: "Computer / Power Supply",
          connection: "5V power input and USB-to-UART serial interface"
        },
        {
          pin: "GND",
          component: "ESP32 Ground",
          connection: "Common circuit ground reference"
        },
        {
          pin: "3.3V",
          component: "Internal Regulator",
          connection: "Internal ESP32 SoC operational voltage rail"
        }
      ]
    },

    implementation: {
      codeTitle: "esp32_adafruit_io_mqtt.ino",
      codeSnippet: `// =====================================================
// Task 2: Adafruit IO Dashboard & MQTT LED Control
// Microcontroller: ESP32 NodeMCU
// Protocol: MQTT over TCP (Port 1883)
// Cloud Platform: Adafruit IO
// Actuator: Built-in LED (GPIO 2)
// =====================================================

#include <WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"

// -----------------------------------------------------
// Wi-Fi Configuration
// -----------------------------------------------------

#define WLAN_SSID "YOUR_WIFI_SSID"
#define WLAN_PASS "YOUR_WIFI_PASSWORD"

// -----------------------------------------------------
// Adafruit IO Configuration
// -----------------------------------------------------

#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME    "YOUR_ADAFRUIT_IO_USERNAME"
#define AIO_KEY         "YOUR_ADAFRUIT_IO_KEY"

// -----------------------------------------------------
// Hardware Pin Definition
// -----------------------------------------------------

#define LED_PIN 2

// -----------------------------------------------------
// Global Clients & MQTT Feeds
// -----------------------------------------------------

WiFiClient client;

Adafruit_MQTT_Client mqtt(
  &client,
  AIO_SERVER,
  AIO_SERVERPORT,
  AIO_USERNAME,
  AIO_KEY
);

Adafruit_MQTT_Subscribe ledControl = Adafruit_MQTT_Subscribe(
  &mqtt,
  AIO_USERNAME "/feeds/led-control"
);

Adafruit_MQTT_Publish ledStatus = Adafruit_MQTT_Publish(
  &mqtt,
  AIO_USERNAME "/feeds/led-status"
);

void connectWiFi();
void MQTT_connect();

void setup() {
  Serial.begin(115200);
  delay(10);

  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);

  connectWiFi();
  mqtt.subscribe(&ledControl);
}

void loop() {
  MQTT_connect();

  Adafruit_MQTT_Subscribe *subscription;

  while ((subscription = mqtt.readSubscription(5000))) {
    if (subscription == &ledControl) {
      String command = (char *)ledControl.lastread;
      command.trim();

      if (command == "ON" || command == "on" || command == "1") {
        digitalWrite(LED_PIN, HIGH);
        ledStatus.publish("ON");
      } else if (command == "OFF" || command == "off" || command == "0") {
        digitalWrite(LED_PIN, LOW);
        ledStatus.publish("OFF");
      }
    }
  }

  if (!mqtt.ping()) {
    mqtt.disconnect();
  }
}

void connectWiFi() {
  WiFi.begin(WLAN_SSID, WLAN_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Wi-Fi connected!");
}

void MQTT_connect() {
  int8_t ret;
  if (mqtt.connected()) return;

  Serial.print("Connecting to Adafruit IO MQTT...");
  while ((ret = mqtt.connect()) != 0) {
    Serial.println(mqtt.connectErrorString(ret));
    mqtt.disconnect();
    delay(5000);
  }
  Serial.println("MQTT Connected!");
}`,
      htmlExplanation:
        "The firmware connects the ESP32 to Wi-Fi and establishes an authenticated MQTT client connection with io.adafruit.com on port 1883. It subscribes to 'led-control' to process incoming toggle commands, updates the built-in LED on GPIO 2, and publishes state confirmations back to 'led-status' for bidirectional cloud synchronization.",
      keyCodeSections: [
        {
          section: "Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY)",
          desc: "Creates the MQTT client used by the ESP32 to communicate with Adafruit IO cloud broker."
        },
        {
          section: "Adafruit_MQTT_Subscribe ledFeed = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME '/feeds/led-control')",
          desc: "Subscribes the ESP32 to the led-control feed to listen for incoming toggle commands."
        },
        {
          section: "Adafruit_MQTT_Publish ledStatus = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME '/feeds/led-status')",
          desc: "Publishes live LED state ('ON'/'OFF') back to Adafruit IO to synchronize cloud dashboard widgets."
        },
        {
          section: "digitalWrite(LED_PIN, HIGH / LOW)",
          desc: "Directly drives ESP32 GPIO 2 to toggle the onboard physical SMD LED."
        },
        {
          section: "MQTT_connect()",
          desc: "Maintains connection between ESP32 and Adafruit IO broker, automatically reconnecting on temporary network drops."
        }
      ]
    },

    configuration: {
      steps: [
        "1. Create and access an Adafruit IO account and open the IO dashboard.",
        "2. Obtain Adafruit IO credentials (Username and Active AIO Key) to authenticate the MQTT connection.",
        "3. Create an MQTT feed named 'led-control' to receive commands (ON/OFF) from the dashboard.",
        "4. Create an MQTT feed named 'led-status' to receive published hardware state from the ESP32.",
        "5. Create an Adafruit IO dashboard and add a control widget connected to 'led-control' (configured with ON and OFF values).",
        "6. Add a status indicator / text block widget connected to 'led-status' to display confirmed hardware state.",
        "7. Install 'Adafruit MQTT Library' in Arduino IDE via Library Manager.",
        "8. Configure Wi-Fi credentials (WIFI_SSID, WIFI_PASSWORD) and Adafruit IO credentials (AIO_USERNAME, AIO_KEY) in the source code.",
        "9. Select appropriate ESP32 board and COM port in Arduino IDE, then compile and upload the firmware.",
        "10. Open Serial Monitor at 115200 baud rate to verify Wi-Fi and Adafruit IO MQTT connection.",
        "11. Click the dashboard control to publish 'ON' and 'OFF' and verify immediate built-in LED response on GPIO 2."
      ]
    },

    evidence: {
      image: "/evidence-img-week-7/evidence-2/WhatsApp Image 2026-10-04 at 6.57.19 PM.jpeg",
      imageCaption: "Fig 8.1: Adafruit IO Cloud Dashboard and ESP32 MQTT hardware setup.",
      gallery: [
        {
          url: "/evidence-img-week-7/evidence-2/WhatsApp Image 2026-10-04 at 6.57.19 PM.jpeg",
          caption: "Fig 8.1: Adafruit IO Cloud Dashboard — Control widgets and feed telemetry configured for remote ESP32 switching."
        },
        {
          url: "/evidence-img-week-7/evidence-2/WhatsApp Image 2026-10-04 at 6.57.21 PM.jpeg",
          caption: "Fig 8.2: Hardware Verification — ESP32 NodeMCU built-in LED responding to remote MQTT commands."
        }
      ]
    },

    challengesFixes: [
      {
        problem: "MQTT Connection Failure",
        fix: "The ESP32 was unable to connect due to misconfigured credentials or broker port. Resolved by verifying Wi-Fi SSID, password, Adafruit IO username, AIO key, broker domain (io.adafruit.com), and port 1883."
      },
      {
        problem: "Dashboard Command Not Reaching ESP32",
        fix: "The dashboard button published commands, but the ESP32 did not react. Fixed by verifying feed paths and ensuring the ESP32 subscribed to the exact feed path: USERNAME/feeds/led-control."
      },
      {
        problem: "LED Status Not Updating on Dashboard",
        fix: "Hardware toggled correctly, but the dashboard widget did not reflect state changes. Solved by creating a dedicated 'led-status' feed and invoking ledStatus.publish('ON') / publish('OFF') after every GPIO actuation."
      },
      {
        problem: "MQTT Connection Lost on Network Fluctuation",
        fix: "Intermittent Wi-Fi drops closed the MQTT socket. Fixed by implementing an automated MQTT_connect() reconnection handler in loop() to reconnect and re-subscribe seamlessly."
      }
    ],

    reflection:
      "This task helped me understand how IoT devices communicate through a cloud-based messaging system rather than directly communicating with a local web browser. I learned the basic publish-subscribe model of MQTT and understood the different roles of the publisher, subscriber, and broker. Working with Adafruit IO also showed me how feeds can act as communication channels between the cloud dashboard and an ESP32. The most important learning was understanding the difference between local HTTP communication from Task 1 and cloud-based MQTT communication in this task. I also learned that reliable IoT communication requires proper authentication, feed configuration, connection handling, and testing of both the sending and receiving sides."
  },

  // =========================================================================
  // TASK 3: IFTTT + Adafruit IO IoT Automation
  // =========================================================================
  {
    id: "project-3",
    slug: "task-3",
    title: "Task 3 — IFTTT + Adafruit IO IoT Automation",
    category: "IFTTT-Based ESP32 Automation using Adafruit IO and MQTT",
    shortIntro:
      "This task extends the cloud-based ESP32 control developed in Task 2 by introducing IoT automation using IFTTT. Instead of manually controlling the LED from an Adafruit IO dashboard, an IFTTT trigger is used to automatically send an ON/OFF command to an Adafruit IO feed. The ESP32 receives this command through MQTT and controls its built-in LED through GPIO 2.",
    coverImage: "/evidence-img-week-7/System Design & Data Flow-p3.png",
    repositoryUrl: "https://github.com/Harinath07-cell/IoT-Connectivity/tree/Harinath07-Assignment-3",

    overview: {
      objective:
        "The objective of this task was to understand how IoT automation can connect external events with physical hardware. I implemented an automation flow where an IFTTT trigger sends an ON or OFF command to an Adafruit IO feed, which is then delivered to the ESP32 through MQTT. The task helped me understand how different IoT services can work together instead of relying only on direct user interaction.",
      problemSolved:
        "In the previous task, the ESP32 LED was controlled manually through an Adafruit IO dashboard. Although this provided cloud-based control, the user still had to interact with the dashboard. IoT automation can reduce this manual interaction by allowing an external event to automatically trigger a hardware action.",
      summary:
        "The system consists of four main stages: IFTTT Trigger -> Adafruit IO -> MQTT -> ESP32 -> GPIO 2 LED. When an IFTTT event occurs, an ON or OFF command is sent to the Adafruit IO 'automation-trigger' feed. The ESP32 subscribes to this feed using MQTT. When the command is received, the ESP32 processes it and changes the state of the built-in LED connected to GPIO 2. The ESP32 also publishes the current LED state to the 'device-status' feed, allowing the status to be tracked through Adafruit IO."
    },

    concepts: {
      webServerConcept:
        "IoT Automation & IFTTT: IoT automation allows a physical device to respond automatically to an event without requiring continuous manual control (Event -> Automation -> Device Action). IFTTT (If This Then That) operates on a trigger-and-action logic (IF This happens -> THEN perform That action). In this project, IFTTT acts as the automation layer generating commands toward Adafruit IO.",
      communicationFlow:
        "Adafruit IO & MQTT Communication: Adafruit IO acts as the cloud communication broker between IFTTT and the ESP32. IFTTT sends ON/OFF commands to the 'automation-trigger' feed. The ESP32 subscribes to this feed over MQTT (TCP port 1883), triggers GPIO 2 to toggle the onboard LED, and publishes the confirmed state back to 'device-status', establishing a reliable two-way automated feedback loop."
    },

    systemDesign: {
      image: "/evidence-img-week-7/System Design & Data Flow-p3.png",
      imageCaption: "Fig 3.1: IFTTT Trigger to ESP32 Hardware Automation Data Flow Architecture",
      diagram: `External Event / Schedule Trigger
        │
        ▼
IFTTT Platform Engine (If This Then That)
        │
        │ HTTP REST Action: Send Data
        ▼
Adafruit IO Cloud Broker
  [Feed: USERNAME/feeds/automation-trigger]
        │
        │ MQTT Pub/Sub Socket (Port 1883)
        ▼
ESP32 NodeMCU (MQTT Subscriber Client)
        │
        ├─► Parses Trigger Command ('ON' / 'OFF')
        ├─► Actuates digitalWrite(GPIO 2, HIGH/LOW)
        └─► Publishes Execution Feedback
        │
        ▼
Adafruit IO Feed [USERNAME/feeds/device-status]`,
      explanation:
        "The end-to-end event chain links external web triggers to physical hardware actuation. IFTTT monitors an external condition (such as time schedules, app triggers, or webhooks). Upon triggering, IFTTT transmits a payload to Adafruit IO's cloud feed. The ESP32 subscriber receives the payload via MQTT within milliseconds, toggles the LED, and confirms execution back to the cloud."
    },

    hardwareSoftware: {
      components: [
        "ESP32 NodeMCU Development Board (Dual-core LX6 @ 240MHz, 802.11 b/g/n Wi-Fi)",
        "Built-in SMD LED connected to GPIO 2",
        "Micro-USB Data Cable (Power supply & UART programming interface)",
        "Wi-Fi Connection with Internet Access"
      ],
      tools: [
        "Arduino IDE (Embedded firmware compilation & serial monitor)",
        "Adafruit MQTT Library (Adafruit_MQTT_Client.h)",
        "WiFi.h (ESP32 Network stack)",
        "Adafruit IO (Cloud MQTT Broker & Feed Management)",
        "IFTTT (Automation Service for authoring Applet recipes)"
      ]
    },

    wiringSetup: {
      image: "/evidence-img-week-7/Circuit Wiring & Pin Connections-p3.png",
      imageCaption: "Fig 5.1: ESP32 Built-in LED Hardware Pin Configuration for IFTTT Automation",
      circuitDesc:
        "For this implementation, the ESP32's built-in LED is used instead of an external LED circuit. The electrical connection is already integrated on the development board, connecting microcontroller pin GPIO 2 directly to the onboard SMD LED. The board receives 5V DC power and serial data via the Micro-USB cable, requiring no external breadboard wiring.",
      pinTable: [
        {
          pin: "GPIO 2",
          component: "Built-in SMD LED",
          connection: "Digital output logic control line (HIGH = ON, LOW = OFF)"
        },
        {
          pin: "USB",
          component: "Computer / Power Supply",
          connection: "5V power input and USB-to-UART serial interface"
        },
        {
          pin: "GND",
          component: "ESP32 Ground",
          connection: "Common circuit ground reference"
        },
        {
          pin: "3.3V",
          component: "Internal Regulator",
          connection: "Internal ESP32 SoC operational voltage rail"
        }
      ]
    },

    implementation: {
      codeTitle: "esp32_ifttt_adafruit_io_mqtt.ino",
      codeSnippet: `// =====================================================
// Task 3: IFTTT + Adafruit IO IoT Automation
// Microcontroller: ESP32 NodeMCU
// Protocol: MQTT over TCP (Port 1883)
// Cloud Services: IFTTT & Adafruit IO
// Actuator: Built-in LED (GPIO 2)
// =====================================================

#include <WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"

// -----------------------------------------------------
// Wi-Fi Configuration
// -----------------------------------------------------
#define WLAN_SSID       "YOUR_WIFI_SSID"
#define WLAN_PASS       "YOUR_WIFI_PASSWORD"

// -----------------------------------------------------
// Adafruit IO Configuration
// -----------------------------------------------------
#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME    "YOUR_ADAFRUIT_IO_USERNAME"
#define AIO_KEY         "YOUR_ADAFRUIT_IO_KEY"

// -----------------------------------------------------
// Hardware Pin
// -----------------------------------------------------
#define LED_PIN 2

// -----------------------------------------------------
// MQTT Client & Feed Setup
// -----------------------------------------------------
WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);

// Subscribe to feed receiving commands from IFTTT
Adafruit_MQTT_Subscribe automationFeed = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/automation-trigger");

// Publish feed sending device feedback to Adafruit IO
Adafruit_MQTT_Publish statusFeed = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/device-status");

void MQTT_connect();

void setup() {
  Serial.begin(115200);
  delay(10);

  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);

  Serial.println();
  Serial.print("Connecting to Wi-Fi: ");
  Serial.println(WLAN_SSID);

  WiFi.begin(WLAN_SSID, WLAN_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.println("Wi-Fi connected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  // Subscribe to automation trigger feed
  mqtt.subscribe(&automationFeed);
}

void loop() {
  MQTT_connect();

  Adafruit_MQTT_Subscribe *subscription;
  while ((subscription = mqtt.readSubscription(5000))) {
    if (subscription == &automationFeed) {
      char *payload = (char *)automationFeed.lastread;
      Serial.print("Cloud Automation Trigger Received: ");
      Serial.println(payload);

      if (strcmp(payload, "ON") == 0 || strcmp(payload, "on") == 0 || strcmp(payload, "1") == 0) {
        digitalWrite(LED_PIN, HIGH);
        Serial.println("Built-in LED -> ON");
        statusFeed.publish("LED Turned ON via Cloud Automation");
      } else if (strcmp(payload, "OFF") == 0 || strcmp(payload, "off") == 0 || strcmp(payload, "0") == 0) {
        digitalWrite(LED_PIN, LOW);
        Serial.println("Built-in LED -> OFF");
        statusFeed.publish("LED Turned OFF via Cloud Automation");
      }
    }
  }

  // Ping MQTT broker to keep connection alive
  if (!mqtt.ping()) {
    mqtt.disconnect();
  }
}

// -----------------------------------------------------
// Connect & Reconnect to Adafruit IO MQTT Broker
// -----------------------------------------------------
void MQTT_connect() {
  int8_t ret;
  if (mqtt.connected()) return;

  Serial.print("Connecting to Adafruit IO MQTT... ");
  uint8_t retries = 3;
  while ((ret = mqtt.connect()) != 0) {
    Serial.println(mqtt.connectErrorString(ret));
    Serial.println("Retrying in 5 seconds...");
    mqtt.disconnect();
    delay(5000);
    retries--;
    if (retries == 0) while (1);
  }
  Serial.println("MQTT Connected!");
}`,
      htmlExplanation:
        "The system architecture functions without a traditional web interface; it is driven entirely by cloud-triggered events. When a trigger condition occurs (such as a time schedule, web webhook, or external app event), IFTTT publishes a data message to the Adafruit IO feed. The ESP32 continuously listens to this feed over an active MQTT socket connection. Upon receiving 'ON' or 'OFF', the ESP32 decodes the payload, actuates GPIO 2, and publishes a status confirmation back to device-status.",
      keyCodeSections: [
        {
          section: "automationFeed Subscription",
          desc: "Defines the MQTT subscriber listening to 'automation-trigger' feed where IFTTT publishes action commands."
        },
        {
          section: "statusFeed Publication",
          desc: "Defines the MQTT publisher sending device state confirmations back to Adafruit IO."
        },
        {
          section: "Automated Command Processing",
          desc: "Parses received subscription payloads ('ON' or 'OFF'), switches GPIO 2 logic level, and publishes status feedback."
        },
        {
          section: "MQTT_connect() Auto-Reconnect",
          desc: "Ensures persistent TCP connection to Adafruit IO broker over port 1883 with 3 automatic retry attempts."
        }
      ]
    },

    configuration: {
      steps: [
        "1. Create an Adafruit IO account and generate an AIO Key from the top-right toolbar.",
        "2. Create two new feeds in Adafruit IO: `automation-trigger` (for inbound commands) and `device-status` (for device feedback).",
        "3. Optionally build an Adafruit IO Dashboard with a Stream or Text block connected to `device-status` to monitor live execution.",
        "4. Create an IFTTT account and click 'Create' to author a new automated Applet.",
        "5. In the 'If This' block, select a trigger service (such as Date & Time schedule, Button widget, or Webhook service).",
        "6. In the 'Then That' block, select the Adafruit service, authenticate with your Adafruit credentials, choose 'Send data to Adafruit IO', target feed `automation-trigger`, and set data payload to 'ON' or 'OFF'."
      ]
    },

    evidence: {
      image: "/evidence-img-week-7/evidence-3/WhatsApp Image 2026-10-04 at 8.10.09 PM.jpeg",
      imageCaption: "Fig 8.1: IFTTT Applet automation triggering Adafruit IO feeds and controlling ESP32 LED.",
      gallery: [
        {
          url: "/evidence-img-week-7/evidence-3/WhatsApp Image 2026-10-04 at 8.10.09 PM.jpeg",
          caption: "Fig 8.1: IFTTT Applet & Adafruit IO feed setup configured for cloud trigger automation."
        },
        {
          url: "/evidence-img-week-7/evidence-3/WhatsApp Image 2026-10-04 at 8.10.10 PM.jpeg",
          caption: "Fig 8.2: Adafruit IO Feed telemetry monitoring inbound automation triggers and state confirmations."
        },
        {
          url: "/evidence-img-week-7/evidence-3/WhatsApp Image 2026-10-04 at 8.10.10 PM (1).jpeg",
          caption: "Fig 8.3: Arduino IDE Serial Monitor logging incoming MQTT trigger events from cloud feeds."
        },
        {
          url: "/evidence-img-week-7/evidence-3/WhatsApp Image 2026-10-04 at 8.10.10 PM (2).jpeg",
          caption: "Fig 8.4: ESP32 NodeMCU built-in LED actuated following automated cloud condition trigger."
        },
        {
          url: "/evidence-img-week-7/evidence-3/WhatsApp Image 2026-10-04 at 8.10.11 PM.jpeg",
          caption: "Fig 8.5: Full end-to-end automation verification across IFTTT, Adafruit IO, and ESP32 hardware."
        }
      ]
    },

    challengesFixes: [
      {
        problem: "MQTT Connection Failure",
        fix: "The ESP32 was unable to connect to Adafruit IO during startup. Resolved by verifying Wi-Fi credentials, Adafruit IO username, active AIO key, broker host (io.adafruit.com), and standard MQTT TCP port 1883."
      },
      {
        problem: "Incorrect Feed Subscription",
        fix: "The ESP32 did not respond to published triggers because the feed path was mismatched. Corrected by aligning the code subscription to the exact path: AIO_USERNAME/feeds/automation-trigger."
      },
      {
        problem: "Command Format Not Recognized",
        fix: "The payload sent from IFTTT was not triggering the conditional check due to case differences. Fixed by evaluating both uppercase and lowercase matches ('ON' / 'on' / '1' and 'OFF' / 'off' / '0')."
      },
      {
        problem: "LED State Confirmation Desynchronization",
        fix: "The hardware toggled correctly, but the cloud status was not reflecting execution. Resolved by calling statusFeed.publish(...) immediately after toggling GPIO 2 to synchronize device state with Adafruit IO."
      }
    ],

    reflection:
      "This task demonstrated the power of IoT automation by removing the need for direct manual control. I learned how IFTTT can act as an automation bridge that connects external triggers with IoT platforms. It helped me understand how multi-platform IoT ecosystems operate, where IFTTT handles automation, Adafruit IO handles cloud data routing, and the ESP32 performs physical actuation. This project gave me a complete picture of modern IoT architecture: Event -> Cloud -> MQTT -> Device."
  },

  // =========================================================================
  // TASK 4: Firebase IoT Monitoring Dashboard
  // =========================================================================
  {
    id: "project-4",
    slug: "task-4",
    title: "Task 4 — Firebase IoT Monitoring Dashboard",
    category: "ESP32 Environmental Monitoring and Remote Bulb Control using Firebase",
    shortIntro:
      "This task extends the previous IoT work by introducing Firebase as the cloud backend for monitoring and controlling an ESP32-based system. The ESP32 collects temperature, humidity, and light-level data using a DHT11 sensor and LDR, sends the readings to Firebase Realtime Database, and receives bulb-control commands from the cloud dashboard. A web dashboard provides authenticated access to the live sensor data and allows the user to control the connected bulb remotely.",
    coverImage: "/evidence-img-week-7/System Design & Data Flow-p4.png",
    repositoryUrl: "https://github.com/Harinath07-cell/IoT-Connectivity/tree/Assignment-4",

    overview: {
      objective:
        "The objective of this task was to understand how a microcontroller can communicate with a cloud platform to collect sensor data, store it in a real-time database, and provide a web-based interface for monitoring and control. The ESP32 was used as the main hardware controller. A DHT11 sensor was used to measure temperature and humidity, while an LDR was used to detect the surrounding light level. Firebase Realtime Database was used to store and synchronize the data between the ESP32 and the web dashboard.",
      problemSolved:
        "In earlier IoT tasks, the ESP32 was mainly controlled through direct local HTTP or MQTT messaging. However, practical IoT monitoring applications require persistent historical and live data storage, remote authenticated access, synchronization across multi-client web dashboards, and a structured cloud data model without requiring local network proximity. Firebase Realtime Database and Firebase Authentication solve these requirements as a scalable Backend-as-a-Service (BaaS).",
      summary:
        "The system consists of an ESP32, DHT11 sensor, LDR, Firebase Realtime Database, Firebase Authentication, and a web dashboard. The ESP32 reads temperature, humidity, and light-level values from the sensors and uploads the readings to Firebase. The dashboard retrieves the same information from Firebase and displays it to the user in real time. The dashboard can also send a bulb ON/OFF command to Firebase, which the ESP32 reads to control the connected output accordingly."
    },

    concepts: {
      webServerConcept:
        "Cloud Computing & BaaS (Backend-as-a-Service): Cloud computing provides computing resources and services accessed over the internet rather than relying entirely on local hardware. Firebase represents a Backend-as-a-Service (BaaS) architecture that eliminates the need to manage virtual machines (IaaS) or application servers (PaaS). It provides ready-to-use backend services including Firebase Authentication for secure identity verification and Firebase Realtime Database for cloud data storage and live synchronization.",
      communicationFlow:
        "NoSQL Realtime Synchronization & Authentication Pipeline: Firebase Realtime Database organizes data in a structured JSON document tree (/iot/sensors/temperature, humidity, ldr, and /iot/control/bulb). The ESP32 acts as an edge node, connecting to Wi-Fi and using the Firebase ESP Client to write sensor readings every 5 seconds. The web dashboard authenticates registered users via Firebase Auth (Email/Password), listens for live snapshot updates via WebSocket, and writes boolean bulb state updates back to Firebase to actuate the ESP32 GPIO pin."
    },

    systemDesign: {
      image: "/evidence-img-week-7/System Design & Data Flow-p4.png",
      imageCaption: "Fig 3.1: 4-Layer System Design & Data Flow Architecture — Sensor Layer, ESP32 Processing Layer, Firebase Cloud Layer & Web Dashboard Application Layer.",
      explanation:
        "The complete architecture is divided into four distinct layers: 1) Sensor Layer: DHT11 measures ambient temperature and humidity, while the LDR detects surrounding light levels. 2) Processing Layer: ESP32 processes analog and digital sensor readings, validates data integrity, and handles network transmissions. 3) Cloud Layer: Firebase Realtime Database stores the latest telemetry values in a JSON tree and maintains persistent synchronization sockets. 4) Application Layer: An authenticated responsive web dashboard visualizes real-time metrics and publishes bulb control states back to the cloud."
    },

    hardwareSoftware: {
      components: [
        "ESP32 NodeMCU Development Board (Dual-core LX6 @ 240MHz, 802.11 b/g/n Wi-Fi)",
        "DHT11 Digital Temperature & Humidity Sensor",
        "LDR (Light Dependent Resistor) Analog Sensor",
        "10kΩ Resistor (LDR voltage divider pull-down network)",
        "Output Load Circuit / Relay Module for AC Bulb Control",
        "Solderless Breadboard & Male-to-Male / Male-to-Female Jumper Wires",
        "Micro-USB Cable (5V DC power supply & UART serial flashing interface)"
      ],
      tools: [
        "Arduino IDE (Embedded C++ firmware development and compilation)",
        "Firebase_ESP_Client Library by Mobizt (ESP32 Firebase Realtime Database client)",
        "DHT Sensor Library (Adafruit) & Adafruit Unified Sensor Driver",
        "Google Firebase Realtime Database (Cloud NoSQL JSON database)",
        "Firebase Authentication (Email & Password identity management)",
        "Web Technologies: HTML5, CSS3, JavaScript (Firebase Web SDK)",
        "Arduino Serial Monitor (@ 115200 baud for telemetry inspection)"
      ]
    },

    wiringSetup: {
      image: "/evidence-img-week-7/Circuit Wiring & Pin Connections-p4.png",
      imageCaption: "Fig 5.1: Circuit Wiring & Pin Connections for ESP32, DHT11 Sensor, LDR Voltage Divider, and Bulb Output Driver.",
      circuitDesc:
        "The hardware circuit connects the DHT11 digital sensor to ESP32 GPIO 4 with 3.3V power. The LDR sensor is configured in a voltage-divider circuit with a 10kΩ resistor, with the center analog tap connected to GPIO 34 (ADC1 channel) to measure ambient illumination. The bulb output is controlled via GPIO 2 (or an isolated relay driver circuit). The ESP32 is powered via 5V Micro-USB with common ground shared across all peripheral circuits.",
      pinTable: [
        {
          pin: "GPIO 4",
          component: "DHT11 DATA Pin",
          connection: "Single-bus digital temperature and humidity data communication"
        },
        {
          pin: "GPIO 34",
          component: "LDR Analog Divider Output",
          connection: "Analog input (ADC) reading variable ambient light voltage"
        },
        {
          pin: "GPIO 2",
          component: "Bulb / LED Output",
          connection: "Digital output logic control line (HIGH = ON, LOW = OFF) to driver/relay"
        },
        {
          pin: "3.3V",
          component: "Power Rail",
          connection: "Regulated 3.3V DC power supplied to DHT11 VCC and LDR divider"
        },
        {
          pin: "GND",
          component: "Circuit Ground",
          connection: "Common ground reference across ESP32, sensors, and divider circuit"
        }
      ]
    },

    implementation: {
      codeTitle: "esp32_firebase_iot_monitoring.ino",
      codeSnippet: `// =====================================================
// Task 4: Firebase IoT Monitoring Dashboard
// Microcontroller: ESP32 NodeMCU
// Protocol: HTTPS / REST via Firebase ESP Client
// Cloud Services: Firebase RTDB & Firebase Authentication
// Sensors: DHT11 (GPIO 4), LDR Analog (GPIO 34)
// Actuator: Bulb / Output Load (GPIO 2)
// =====================================================

#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>

#define WIFI_SSID     "YOUR_WIFI_SSID"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"
#define API_KEY       "YOUR_FIREBASE_API_KEY"
#define DATABASE_URL  "YOUR_FIREBASE_DATABASE_URL"

#define DHT_PIN       4
#define DHT_TYPE      DHT11
#define LDR_PIN       34
#define BULB_PIN      2

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
DHT dht(DHT_PIN, DHT_TYPE);

unsigned long lastUpdate = 0;
const unsigned long updateInterval = 5000;

void connectWiFi() {
  Serial.print("Connecting to Wi-Fi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\\nWi-Fi connected!");
}

void setupFirebase() {
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
  Serial.println("Firebase initialized.");
}

void uploadSensorData() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int ldrValue = analogRead(LDR_PIN);

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read DHT11.");
    return;
  }

  if (Firebase.ready()) {
    Firebase.RTDB.setFloat(&fbdo, "/iot/sensors/temperature", temperature);
    Firebase.RTDB.setFloat(&fbdo, "/iot/sensors/humidity", humidity);
    Firebase.RTDB.setInt(&fbdo, "/iot/sensors/ldr", ldrValue);
    Serial.println("Sensor data uploaded to Firebase.");
  }
}

void readBulbControl() {
  if (!Firebase.ready()) return;

  if (Firebase.RTDB.getBool(&fbdo, "/iot/control/bulb")) {
    bool bulbState = fbdo.boolData();
    digitalWrite(BULB_PIN, bulbState ? HIGH : LOW);
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(BULB_PIN, OUTPUT);
  digitalWrite(BULB_PIN, LOW);
  dht.begin();
  connectWiFi();
  setupFirebase();
}

void loop() {
  if (millis() - lastUpdate >= updateInterval) {
    lastUpdate = millis();
    uploadSensorData();
    readBulbControl();
  }
}`,
      htmlExplanation:
        "The web dashboard acts as the user interface for the IoT system. Built with HTML, CSS, and modern JavaScript using the Firebase Web SDK, it requires user login via Firebase Authentication before granting access to controls. Once authenticated, realtime snapshot listeners ('onValue') monitor the /iot/sensors path to update live temperature (°C), humidity (%), and light levels without reloading the page. The dashboard also provides interactive ON/OFF buttons that write boolean states to /iot/control/bulb, which the ESP32 fetches and executes on its output pin.",
      keyCodeSections: [
        {
          section: "setupFirebase() & Firebase.begin()",
          desc: "Configures Firebase API key and Realtime Database URL, initializing authenticated client with automatic Wi-Fi reconnect."
        },
        {
          section: "uploadSensorData()",
          desc: "Reads DHT11 temperature/humidity and analog LDR readings, validates them with isnan(), and pushes updates to /iot/sensors."
        },
        {
          section: "readBulbControl()",
          desc: "Reads boolean control value from /iot/control/bulb and toggles ESP32 digital output pin accordingly."
        },
        {
          section: "Validation Guard: isnan(temperature) || isnan(humidity)",
          desc: "Prevents invalid or corrupted sensor reads from overwriting cloud database records."
        }
      ]
    },

    configuration: {
      steps: [
        "1. Create a Firebase project in the Firebase Console (console.firebase.google.com).",
        "2. Enable Firebase Authentication and activate the Email/Password sign-in provider.",
        "3. Create a Firebase Realtime Database in test mode or with authenticated access rules.",
        "4. Define the database JSON schema under '/iot' with '/sensors' (temperature, humidity, ldr) and '/control' (bulb).",
        "5. Retrieve the Web API Key and Realtime Database URL from Project Settings.",
        "6. Install the 'Firebase ESP Client' by Mobizt and 'DHT sensor library' by Adafruit in Arduino IDE.",
        "7. Configure Wi-Fi credentials (WIFI_SSID, WIFI_PASSWORD) and Firebase credentials (API_KEY, DATABASE_URL) in ESP32 sketch.",
        "8. Deploy the HTML/JS web dashboard configured with matching Firebase Web SDK configuration keys.",
        "9. Register an authorized user account in Firebase Auth, log in to dashboard, and verify live bidirectional telemetry and bulb control."
      ]
    },

    evidence: {
      image: "/evidence-img-week-7/evidence-4/Screenshot 2026-09-10 160419.png",
      imageCaption: "Fig 8.1: Firebase Realtime Database Console and Web IoT Dashboard Interface.",
      gallery: [
        {
          url: "/evidence-img-week-7/evidence-4/Screenshot 2026-09-10 160419.png",
          caption: "Fig 8.1: Firebase Authentication console displaying authenticated user credentials."
        },
        {
          url: "/evidence-img-week-7/evidence-4/Screenshot 2026-09-10 160529.png",
          caption: "Fig 8.2: Firebase Realtime Database schema showing live /iot/sensors and /iot/control JSON tree."
        },
        {
          url: "/evidence-img-week-7/evidence-4/Screenshot 2026-09-10 161637.png",
          caption: "Fig 8.3: Web Dashboard login page with Firebase Email/Password authentication."
        },
        {
          url: "/evidence-img-week-7/evidence-4/Screenshot 2026-09-10 170955.png",
          caption: "Fig 8.4: Live telemetry monitoring dashboard displaying temperature, humidity, and LDR metrics."
        },
        {
          url: "/evidence-img-week-7/evidence-4/Screenshot 2026-09-11 105855.png",
          caption: "Fig 8.5: Remote bulb control interface with toggle states synchronized in real time."
        },
        {
          url: "/evidence-img-week-7/evidence-4/Screenshot 2026-09-11 110043.png",
          caption: "Fig 8.6: Real-time database value mutation reflecting live sensor telemetry updates."
        },
        {
          url: "/evidence-img-week-7/evidence-4/Screenshot 2026-09-11 122109.png",
          caption: "Fig 8.7: Arduino IDE Serial Monitor logging Wi-Fi connection, Firebase init, and sensor uploads."
        },
        {
          url: "/evidence-img-week-7/evidence-4/Screenshot 2026-09-11 143659.png",
          caption: "Fig 8.8: Hardware prototype verification showing ESP32, DHT11, LDR, and load control."
        }
      ],
      videoUrl: "/evidence-img-week-7/evidence-4/WhatsApp Video 2026-10-04 at 8.55.31 PM.mp4",
      videoCaption: "Demo Video: End-to-end Firebase IoT demonstration showing user login, live DHT11/LDR sensor telemetry updates, and remote bulb control."
    },

    challengesFixes: [
      {
        problem: "Firebase Connection and Wi-Fi Stability",
        fix: "The ESP32 requires an active network before initializing Firebase. Handled by checking Wi-Fi status in a connection loop and enabling Firebase.reconnectWiFi(true) to recover automatically from network drops."
      },
      {
        problem: "Intermittent Invalid DHT11 Sensor Readings",
        fix: "DHT11 sensors occasionally return NaN due to timing latency. Resolved by implementing isnan(temperature) || isnan(humidity) guards to discard corrupted readings before database write operations."
      },
      {
        problem: "Database Path Mismatch Between Firmware and Dashboard",
        fix: "Sensor values were not displaying on the web UI due to inconsistent URI paths. Aligned both C++ firmware and JavaScript SDK listeners to uniform root keys: /iot/sensors and /iot/control/bulb."
      },
      {
        problem: "Authentication and Security Rules Permission Denied",
        fix: "Users logged in but received permission errors on database access. Fixed by configuring appropriate Firebase Database Rules to grant read and write permissions to authenticated users."
      },
      {
        problem: "Bulb State Desynchronization Between Hardware and Web UI",
        fix: "Multiple web clients toggling the switch could cause desynchronized states. Established Firebase Realtime Database as the single source of truth, updating hardware state upon reading the cloud value."
      }
    ],

    reflection:
      "This task helped me understand how a microcontroller can become part of a cloud-connected monitoring system rather than functioning only as a standalone device. Working with Firebase introduced me to concepts such as cloud databases, real-time synchronization, authentication, authorization, and backend services (BaaS). I learned how sensor data moves from physical hardware to a cloud database and then to an authenticated web dashboard, as well as the reverse control flow where dashboard commands actuate physical appliances. The most valuable learning was mastering the end-to-end integration across physical sensors, embedded hardware, cloud infrastructure, and a modern web interface."
  },

  // =========================================================================
  // TASK 5: Firebase Logging, Automation & Data Export
  // =========================================================================
  {
    id: "project-5",
    slug: "task-5",
    title: "Task 5 — Firebase Logging, Automation & Data Export",
    category: "Complete IoT Monitoring, Automatic Lighting and Historical Data System",
    shortIntro:
      "This task extends the Firebase IoT monitoring system developed in Task 4 by adding historical data logging, automatic lighting control, manual/automatic operating modes, configurable LDR threshold, and CSV data export. The ESP32 continuously collects temperature, humidity, and light-level data, stores timestamped readings in Firebase Realtime Database, and controls the bulb based on either manual commands or the surrounding light level. A web dashboard is used to monitor the current values, change the operating mode, control the bulb, view historical data, and export the collected information as a CSV file.",
    coverImage: "/evidence-img-week-7/System Design & Data Flow-p5.png",
    repositoryUrl: "https://github.com/Harinath07-cell/IoT-Connectivity/tree/Harinath07-Assignment-5",

    overview: {
      objective:
        "The objective of this task was to develop a more complete IoT monitoring and automation system by extending the Firebase implementation from Task 4. The system was designed to monitor temperature, humidity, and ambient light, support both manual control and automatic LDR threshold-based bulb switching, store historical timestamped records in Firebase Realtime Database, display current and historical metrics on an authenticated dashboard, and export historical logs as a CSV file.",
      problemSolved:
        "A basic IoT dashboard can display current sensor values, but current readings alone are insufficient when analyzing how an environmental system behaves over time. Users cannot track diurnal temperature/humidity cycles, identify when darkness triggered automatic lighting, determine how long loads remained active, or export data for external audits. Task 5 resolves this by introducing structured historical logging with NTP time-synchronization and client-side CSV data export.",
      summary:
        "The final system combines physical sensing, cloud storage, automation, remote control, and data analysis. The ESP32 reads DHT11 and LDR sensors and logs timestamped readings into Firebase Realtime Database. The system operates in two distinct modes: Manual Mode (user toggles the bulb directly from the web dashboard) and Automatic Mode (ESP32 autonomously switches the bulb when LDR readings drop below a calibrated threshold). The web dashboard visualizes live metrics, displays historical tabular logs, and provides one-click CSV export."
    },

    concepts: {
      webServerConcept:
        "Dual-Mode Automation & LDR Threshold Calibration: The system provides two mutually exclusive operating modes: MANUAL (dashboard user controls the relay load) and AUTO (ESP32 firmware evaluates ambient light against a configured LDR threshold). Because photoresistor characteristics and ambient illumination vary across environments, the threshold is dynamically calibrated and can be updated from the dashboard to optimize automated energy-saving switching.",
      communicationFlow:
        "Historical Data Logging & NTP Timestamp Synchronization: The ESP32 synchronizes its internal clock with an NTP time server over Wi-Fi. At configured intervals (e.g. every 10 seconds), the ESP32 pushes a timestamped JSON object to /iot/history containing temperature, humidity, LDR, bulb status, and active mode, while maintaining live state under /iot/current. The frontend parses the historical dataset to render tabular telemetry and generates RFC 4180-compliant CSV files for spreadsheet analysis."
    },

    systemDesign: {
      image: "/evidence-img-week-7/System Design & Data Flow-p5.png",
      imageCaption: "Fig 3.1: 5-Layer System Architecture — Sensing Layer, ESP32 Processing Layer, Firebase Cloud Layer, Web Dashboard Application Layer, and Load Output Layer.",
      explanation:
        "The complete architecture is structured into five distinct operational layers: 1) Sensing Layer: DHT11 measures temperature and humidity; LDR detects ambient illumination. 2) Processing Layer: ESP32 processes sensor signals, handles NTP clock synchronization, and executes dual-mode threshold decision logic. 3) Cloud Layer: Firebase Realtime Database partitions live data (/iot/current), user control parameters (/iot/control), and historical logs (/iot/history). 4) Application Layer: An authenticated web dashboard enables real-time monitoring, threshold adjustment, tabular historical inspection, and client-side CSV compilation. 5) Output Layer: Isolated relay driver controlling the high-voltage or demonstration bulb load."
    },

    hardwareSoftware: {
      components: [
        "ESP32 NodeMCU Development Board (Dual-core LX6 @ 240MHz, 802.11 b/g/n Wi-Fi)",
        "DHT11 Digital Temperature & Humidity Sensor",
        "LDR (Light Dependent Resistor) Light Sensor",
        "10kΩ Resistor (LDR voltage divider pull-down network)",
        "1-Channel 5V Relay Module (Optocoupler isolation, 250V/10A rated)",
        "230V AC Incandescent Bulb / Demonstration Load Circuit",
        "Solderless Breadboard & DuPont Jumper Wires",
        "Micro-USB Cable (5V DC power & UART serial flashing interface)"
      ],
      tools: [
        "Arduino IDE (Embedded C++ firmware compilation & upload)",
        "Firebase_ESP_Client Library by Mobizt (ESP32 RTDB client)",
        "DHT Sensor Library (Adafruit) & Adafruit Unified Sensor",
        "NTPClient & time.h (Network Time Protocol synchronization)",
        "Google Firebase Realtime Database & Firebase Authentication",
        "Web Technologies: HTML5, CSS3, JavaScript (Firebase Web SDK v9+)",
        "Spreadsheet Applications: Microsoft Excel / Google Sheets for CSV analysis"
      ]
    },

    wiringSetup: {
      image: "/evidence-img-week-7/Circuit Wiring & Pin Connections-p5.png",
      imageCaption: "Fig 5.1: Circuit Schematic & Pin Connections for ESP32, DHT11 Sensor, LDR Voltage Divider, and 1-Channel Relay Bulb Driver.",
      circuitDesc:
        "The hardware wiring connects the DHT11 digital signal to ESP32 GPIO 4 powered by 3.3V. The LDR is arranged in a voltage divider with a 10kΩ resistor, with the center analog voltage node routed to GPIO 34 (ADC1 channel). The relay control IN pin is connected to GPIO 2, which switches the isolated load circuit based on either automatic light threshold evaluation or manual dashboard toggles. The ESP32 and relay board share a common circuit ground reference.",
      pinTable: [
        {
          pin: "3.3V",
          component: "DHT11 VCC & LDR",
          connection: "Regulated 3.3V power rail supplying sensor electronics"
        },
        {
          pin: "GPIO 4",
          component: "DHT11 DATA",
          connection: "Single-bus bidirectional digital temperature & humidity data communication"
        },
        {
          pin: "GPIO 34",
          component: "LDR Divider Tap",
          connection: "Analog ADC1 input reading variable ambient light intensity voltage"
        },
        {
          pin: "GPIO 2",
          component: "Relay IN",
          connection: "Digital logic output driving optocoupler relay switch for bulb load"
        },
        {
          pin: "5V / VIN",
          component: "Relay VCC",
          connection: "5V DC power supply driving relay electromagnetic switching coil"
        },
        {
          pin: "GND",
          component: "Common Ground",
          connection: "Common circuit ground reference across ESP32, sensors, and relay module"
        }
      ]
    },

    implementation: {
      codeTitle: "esp32_firebase_logging_automation.ino",
      codeSnippet: `// =====================================================
// Task 5: Firebase Logging, Automation & Data Export
// Microcontroller: ESP32 NodeMCU
// Protocol: HTTPS / REST via Firebase ESP Client
// Cloud Services: Firebase RTDB, Firebase Auth, NTP Time
// Sensors: DHT11 (GPIO 4), LDR Analog (GPIO 34)
// Actuator: 1-Channel Relay (GPIO 2)
// =====================================================

#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>
#include "time.h"

#define WIFI_SSID     "YOUR_WIFI_SSID"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"
#define API_KEY       "YOUR_FIREBASE_API_KEY"
#define DATABASE_URL  "YOUR_FIREBASE_DATABASE_URL"

#define DHT_PIN       4
#define DHT_TYPE      DHT11
#define LDR_PIN       34
#define RELAY_PIN     2

const char* ntpServer = "pool.ntp.org";
const long  gmtOffset_sec = 19800; // GMT+5:30 (India Standard Time)
const int   daylightOffset_sec = 0;

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
DHT dht(DHT_PIN, DHT_TYPE);

unsigned long lastUpload = 0;
unsigned long lastLog = 0;
const unsigned long uploadInterval = 3000;  // Update live readings every 3s
const unsigned long logInterval = 10000;     // Append historical record every 10s

String getTimestamp() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    return "2026-10-04 19:20:00";
  }
  char buffer[30];
  strftime(buffer, sizeof(buffer), "%Y-%m-%d %H:%M:%S", &timeinfo);
  return String(buffer);
}

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);

  dht.begin();
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\\nWiFi Connected!");

  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  if (!Firebase.ready()) return;

  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  int ldr = analogRead(LDR_PIN);

  if (isnan(temp) || isnan(hum)) return;

  // Read Control Settings from Firebase
  String mode = "AUTO";
  bool manualBulb = false;
  int threshold = 1500;

  if (Firebase.RTDB.getString(&fbdo, "/iot/control/mode")) {
    mode = fbdo.stringData();
  }
  if (Firebase.RTDB.getBool(&fbdo, "/iot/control/manualBulb")) {
    manualBulb = fbdo.boolData();
  }
  if (Firebase.RTDB.getInt(&fbdo, "/iot/control/ldrThreshold")) {
    threshold = fbdo.intData();
  }

  // Dual-Mode Bulb Decision
  bool bulbState = false;
  if (mode == "MANUAL") {
    bulbState = manualBulb;
  } else {
    // AUTO mode: LDR below threshold indicates dark condition
    bulbState = (ldr < threshold);
  }
  digitalWrite(RELAY_PIN, bulbState ? HIGH : LOW);

  // Update Live Current Telemetry
  if (millis() - lastUpload >= uploadInterval) {
    lastUpload = millis();
    Firebase.RTDB.setFloat(&fbdo, "/iot/current/temperature", temp);
    Firebase.RTDB.setFloat(&fbdo, "/iot/current/humidity", hum);
    Firebase.RTDB.setInt(&fbdo, "/iot/current/ldr", ldr);
    Firebase.RTDB.setBool(&fbdo, "/iot/current/bulb", bulbState);
    Firebase.RTDB.setString(&fbdo, "/iot/current/mode", mode);
  }

  // Append Timestamped Historical Record
  if (millis() - lastLog >= logInterval) {
    lastLog = millis();
    FirebaseJson json;
    json.set("timestamp", getTimestamp());
    json.set("temperature", temp);
    json.set("humidity", hum);
    json.set("ldr", ldr);
    json.set("bulb", bulbState ? "ON" : "OFF");
    json.set("mode", mode);

    Firebase.RTDB.pushJSON(&fbdo, "/iot/history", &json);
    Serial.println("Historical snapshot logged to Firebase.");
  }
}`,
      htmlExplanation:
        "The web dashboard interface features responsive controls built with HTML5, CSS, and vanilla JavaScript using the Firebase Web SDK. Users authenticate via Firebase Auth. The frontend listens to '/iot/current' for live sensor gauges and mode status. A segmented control toggles between MANUAL and AUTO modes in '/iot/control/mode'. When in MANUAL mode, direct ON/OFF buttons toggle '/iot/control/manualBulb'; in AUTO mode, a slider/number input configures '/iot/control/ldrThreshold'. The historical view queries '/iot/history', dynamically generating a paginated data table and offering an 'Export CSV' button that encodes records into a downloadable comma-separated file.",
      keyCodeSections: [
        {
          section: "NTP Time Synchronization: configTime(0, 0, 'pool.ntp.org')",
          desc: "Connects to international time servers over UDP to synchronize the ESP32 RTC for accurate historical timestamp generation."
        },
        {
          section: "Dual-Mode Logic: checkOperatingMode()",
          desc: "Evaluates whether system mode is 'MANUAL' or 'AUTO', delegating bulb switching to either user cloud commands or LDR threshold comparison."
        },
        {
          section: "Periodic History Logging: pushJSON(&fbdo, '/iot/history')",
          desc: "Appends timestamped JSON snapshots containing temperature, humidity, LDR, bulb state, and active mode at configured time intervals."
        },
        {
          section: "Client-Side CSV Export Function",
          desc: "Iterates through historical Firebase snapshot objects, constructs RFC 4180 CSV strings, and initiates browser file download via Blob and Object URL."
        }
      ]
    },

    configuration: {
      steps: [
        "1. Create and configure Google Firebase project with Authentication and Realtime Database enabled.",
        "2. Define root database structure with three distinct branches: '/iot/current', '/iot/control', and '/iot/history'.",
        "3. Configure initial control values in Firebase: 'mode': 'AUTO', 'manualBulb': false, 'ldrThreshold': 1500.",
        "4. Experimentally calibrate LDR readings under bright, normal, and dark ambient room conditions to set an accurate threshold.",
        "5. Define the history logging interval in ESP32 firmware (default 10s–30s) to balance resolution with database quotas.",
        "6. Connect the ESP32 to Wi-Fi and configure NTP time synchronization with target timezone offset.",
        "7. Flash ESP32 firmware with Firebase API credentials and verify live telemetry on Arduino Serial Monitor.",
        "8. Host the web dashboard, sign in with authenticated credentials, test mode switching between MANUAL and AUTO.",
        "9. Click 'Export CSV' on the web dashboard and verify that downloaded files open cleanly in Excel or Google Sheets."
      ]
    },

    evidence: {
      image: "/evidence-img-week-7/evidence-5/Screenshot 2026-09-10 160419.png",
      imageCaption: "Fig 8.1: Complete Firebase IoT Dashboard with Historical Logging and CSV Export.",
      gallery: [
        {
          url: "/evidence-img-week-7/evidence-5/Screenshot 2026-09-10 160419.png",
          caption: "Fig 8.1: Firebase Authentication console displaying authenticated user credentials."
        },
        {
          url: "/evidence-img-week-7/evidence-5/Screenshot 2026-09-10 160529.png",
          caption: "Fig 8.2: Realtime Database tree showing partitioned /current, /control, and /history nodes."
        },
        {
          url: "/evidence-img-week-7/evidence-5/Screenshot 2026-09-10 161637.png",
          caption: "Fig 8.3: Web Dashboard login page with Firebase Email/Password authentication."
        },
        {
          url: "/evidence-img-week-7/evidence-5/Screenshot 2026-09-10 170955.png",
          caption: "Fig 8.4: Live telemetry interface displaying real-time temperature, humidity, and LDR readings."
        },
        {
          url: "/evidence-img-week-7/evidence-5/Screenshot 2026-09-11 105855.png",
          caption: "Fig 8.5: Dual-mode control panel for switching between MANUAL and AUTO modes with LDR threshold configuration."
        },
        {
          url: "/evidence-img-week-7/evidence-5/Screenshot 2026-09-11 110043.png",
          caption: "Fig 8.6: Historical data table rendering timestamped sensor telemetry logs."
        },
        {
          url: "/evidence-img-week-7/evidence-5/Screenshot 2026-09-11 122109.png",
          caption: "Fig 8.7: Serial Monitor logging NTP time sync, sensor reads, and historical database push operations."
        },
        {
          url: "/evidence-img-week-7/evidence-5/Screenshot 2026-09-11 143659.png",
          caption: "Fig 8.8: Hardware prototype verification showing ESP32, DHT11, LDR, and relay-controlled bulb."
        }
      ]
    },

    challengesFixes: [
      {
        problem: "Choosing and Calibrating the Correct LDR Threshold",
        fix: "LDR analog readings vary significantly with ambient room conditions. Performed multi-environment testing (bright room: ~2800, normal: ~1900, dark: ~900) to select an optimal threshold of 1500 and made it configurable via the web dashboard."
      },
      {
        problem: "Control Conflicts Between Manual Commands and Automatic Logic",
        fix: "Simultaneous manual dashboard inputs and automatic sensor decisions caused race conditions. Established a strict mode partition where manual commands only actuate the relay in MANUAL mode, while LDR logic only operates in AUTO mode."
      },
      {
        problem: "Rapid Historical Database Growth and Quota Exhaustion",
        fix: "Continuous database writes on every loop iteration risked exhausting free-tier quotas. Implemented a non-blocking millis() timer to push historical records at controlled intervals (e.g. every 10–30s)."
      },
      {
        problem: "Accurate Timestamp Synchronization for Historical Logs",
        fix: "Microcontrollers lack real-time clock (RTC) batteries. Connected the ESP32 to NTP (pool.ntp.org) over Wi-Fi on startup to attach synchronized ISO timestamps to every historical record."
      },
      {
        problem: "Partitioning Live Telemetry from Historical Datasets",
        fix: "Storing historical records in the same node as live values overloaded client-side listeners. Separated the database into /iot/current for instantaneous reads, /iot/control for parameters, and /iot/history for append-only records."
      },
      {
        problem: "Formatting NoSQL JSON Objects into Tabular CSV Structure",
        fix: "Firebase stores non-relational nested objects that cannot be parsed directly by spreadsheets. Built a frontend parser that extracts keys (Timestamp, Temp, Humidity, LDR, Bulb, Mode), formats them into comma-separated lines, and triggers browser file downloads."
      }
    ],

    reflection:
      "This task brought together all the concepts I worked with throughout the IoT connectivity unit into a comprehensive production-grade system. I learned how physical sensing can be coupled with cloud databases, automated threshold decision logic, remote multi-mode control, historical logging, and data export. The separation of Manual and Automatic modes taught me how to design intuitive human-in-the-loop systems, while LDR threshold calibration proved the necessity of testing physical hardware in real-world environments. Implementing NTP time synchronization and CSV export demonstrated how IoT telemetry transforms into actionable data for spreadsheet analysis and long-term reporting."
  }
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return PROJECTS.find((p) => p.slug === slug || p.id === slug);
}
