// Week 7 — IoT & Connectivity: structured, checklist-driven task content.
//
// Every task page is built from `sections` (ordered content blocks). Each item of the
// assignment checklist is mapped (see `checklist`) to a section id and, for evidence
// items, to a media slot. Evidence files are NOT listed here: drop them into
//   public/week-7/<task-slug>/<slot>/        e.g. public/week-7/task-1/photos/setup.jpg
// and the page picks them up automatically at build time. File names become captions.
// Source code lives in content/week-7/code/ and is referenced by file name.

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][]; caption?: string }
  | { type: "diagram"; text: string; caption?: string }
  | { type: "cards"; items: { title: string; subtitle?: string; text: string }[] }
  | { type: "image"; src: string; caption: string }
  | { type: "callout"; title: string; text: string }
  | { type: "code"; file: string; title: string; lang: string; caption?: string }
  | { type: "media"; slot: string };

export interface Section {
  id: string;
  title: string;
  blocks: Block[];
}

export interface MediaSlot {
  label: string;
  kind: "image" | "video";
  hint: string;
}

export interface ChecklistItem {
  label: string;
  /** id of the section that answers this item */
  section: string;
  /** media slot that must contain at least one file for the item to count as done */
  slot?: string;
}

export interface ProjectDetail {
  id: string;
  slug: string;
  num: string;
  title: string;
  category: string;
  shortIntro: string;
  coverImage: string;
  repositoryUrl: string;
  activity: { summary: string; bullets: string[] };
  media: Record<string, MediaSlot>;
  sections: Section[];
  checklist: ChecklistItem[];
}

const REPO = "https://github.com/Harinath07-cell/IoT-Connectivity";
const COVER = "/evidence-img-week-7/activity-coverpage";

const p = (text: string): Block => ({ type: "p", text });
const list = (...items: string[]): Block => ({ type: "list", items });
const steps = (...items: string[]): Block => ({ type: "steps", items });
const media = (slot: string): Block => ({ type: "media", slot });

const photo = (label: string, hint: string): MediaSlot => ({ label, kind: "image", hint });
const video = (label: string, hint: string): MediaSlot => ({ label, kind: "video", hint });

// ---------------------------------------------------------------------------
// Reusable pieces
// ---------------------------------------------------------------------------

const ledHardware: Block = {
  type: "table",
  headers: ["Component", "Purpose in this project"],
  rows: [
    ["ESP32 development board (ESP-WROOM-32)", "Microcontroller with built-in Wi-Fi; runs the firmware"],
    ["On-board LED on GPIO 2", "Output that is switched ON/OFF"],
    ["Micro-USB cable", "5 V power, uploading the sketch, Serial Monitor"],
    ["Wi-Fi network / router", "Connects the ESP32 to the network"],
    ["Laptop or phone", "Arduino IDE, browser / dashboard"],
    ["Optional: relay module + bulb", "Used in the lab demonstration to switch a real bulb from the same GPIO 2 signal"],
  ],
};

const sensorHardware: Block = {
  type: "table",
  headers: ["Component", "Purpose in this project"],
  rows: [
    ["ESP32 development board", "Reads sensors, talks to Firebase over Wi-Fi, drives the relay"],
    ["DHT11 sensor", "Digital temperature and humidity sensor (DATA on GPIO 4)"],
    ["LDR (light dependent resistor)", "Ambient light sensor, read as an analog value on GPIO 34"],
    ["10 kΩ resistor", "Forms a voltage divider with the LDR so the ESP32 ADC can read it"],
    ["1-channel relay module", "Isolated switch between the ESP32 (GPIO 23) and the bulb"],
    ["Bulb / demonstration load", "Output controlled from the dashboard or by the LDR logic"],
    ["Breadboard and jumper wires", "Prototyping connections"],
    ["Micro-USB cable", "Power and programming"],
  ],
};

const sensorPins: Block = {
  type: "table",
  headers: ["ESP32 pin", "Connected to", "Purpose"],
  rows: [
    ["3V3", "DHT11 VCC, LDR (top leg)", "3.3 V supply for the sensors"],
    ["GPIO 4", "DHT11 DATA", "Digital input — temperature and humidity"],
    ["GPIO 34", "Node between LDR and 10 kΩ resistor", "Analog input (ADC) — light level 0–4095"],
    ["GPIO 23", "Relay IN", "Digital output — relay / bulb control"],
    ["VIN (5 V)", "Relay VCC", "Supply for the relay coil"],
    ["GND", "DHT11 GND, 10 kΩ resistor, relay GND", "Common ground"],
  ],
};

const ledPins: Block = {
  type: "table",
  headers: ["ESP32 pin", "Connected to", "Purpose"],
  rows: [
    ["GPIO 2", "On-board LED", "Digital output — HIGH = ON, LOW = OFF"],
    ["GND", "Common ground", "Return path"],
    ["USB 5 V", "Laptop / USB supply", "Power, programming and Serial Monitor (115200 baud)"],
    ["GPIO 2 (optional)", "Relay IN → bulb", "Same signal can drive a relay for the bulb demonstration"],
  ],
};

const mainsSafety: Block = {
  type: "callout",
  title: "Safety",
  text: "The relay switches a mains-powered bulb. Never connect mains directly to the ESP32, use an isolated relay module with insulated wiring and an enclosure, and only work on mains wiring when supervised and trained. A low-voltage load is safer for testing.",
};

// ---------------------------------------------------------------------------
// Tasks
// ---------------------------------------------------------------------------

export const PROJECTS: ProjectDetail[] = [
  // =========================================================================
  // TASK 1
  // =========================================================================
  {
    id: "project-1",
    slug: "task-1",
    num: "01",
    title: "Task 1 — ESP32 Web Server & HTML LED Control",
    category: "HTTP · Local Web Server",
    shortIntro:
      "Turned the ESP32 into a small web server on the local Wi-Fi network so the on-board LED (GPIO 2) can be switched ON and OFF from a browser.",
    coverImage: `${COVER}/Task 1/ESP32 Web Server LED Control Flow.png`,
    repositoryUrl: `${REPO}/tree/Harinath07-Iot-Assignment-1`,
    activity: {
      summary:
        "Programmed the ESP32 in the Arduino IDE to host an HTTP server on port 80 and control the on-board LED through browser buttons.",
      bullets: [
        "Connected the ESP32 to Wi-Fi in station mode and read its IP from the Serial Monitor.",
        "Registered three routes with WebServer.h: /, /led/on and /led/off.",
        "Built an HTML control page (ON and OFF buttons) served from the ESP32.",
        "Used an HTTP 303 redirect so the browser returns to the page after each command.",
      ],
    },
    media: {
      photos: photo("Photographs of the physical setup", "ESP32 connected over USB (and the relay/bulb if used)"),
      screenshots: photo("Screenshots of the web interface", "Browser page served by the ESP32 (address bar visible)"),
      video: video("Video: LED ON/OFF from the webpage", "Short screen + hardware recording of the buttons switching the LED"),
    },
    sections: [
      {
        id: "objective",
        title: "Objective & Problem Addressed",
        blocks: [
          p("Objective: build a web server on the ESP32 so that an LED can be turned ON and OFF from any web browser connected to the same Wi-Fi network."),
          p("Problem addressed: a microcontroller normally has to be touched or re-programmed to change what it does. Hosting a small web server on the board gives a simple, local way to control hardware from a phone or laptop without any cloud service or extra software. It is the first step from \"a GPIO pin\" to \"a networked device\"."),
          { type: "callout", title: "In one line", text: "Browser button → HTTP request → ESP32 route handler → digitalWrite() → LED." },
        ],
      },
      {
        id: "concept",
        title: "Basic Concept of an ESP32 Web Server",
        blocks: [
          {
            type: "cards",
            items: [
              { title: "Embedded web server", subtitle: "WebServer.h", text: "The ESP32 runs a lightweight HTTP server (WebServer server(80)). It listens on TCP port 80 and builds the HTML page as a String in memory, so no separate hosting is needed." },
              { title: "HTTP request / response", subtitle: "Client–server model", text: "The browser is the client and sends a GET request for a URL (route). The ESP32 matches the route to a handler function, runs it and sends back a status code (200 OK or 303 See Other)." },
              { title: "Wi-Fi station mode", subtitle: "WiFi.h", text: "WiFi.begin(ssid, password) joins the router. The router's DHCP server assigns the ESP32 an IP address, printed with WiFi.localIP(), which is what the browser opens." },
              { title: "GPIO output", subtitle: "digitalWrite()", text: "Each route calls digitalWrite(ledPin, HIGH or LOW) on GPIO 2, so a web action becomes a real voltage change on the pin." },
            ],
          },
        ],
      },
      {
        id: "communication",
        title: "How the ESP32 and Browser Communicate over Wi-Fi",
        blocks: [
          {
            type: "diagram",
            text: `Web Browser (phone / laptop)
        │
        │  HTTP GET  /led/on  or  /led/off
        ▼
Wi-Fi router (local network)
        │
        ▼
ESP32 Web Server  (port 80)
        │
        ▼
HTTP route handler  (handleLedOn / handleLedOff)
        │
        ▼
GPIO 2  ──►  LED`,
            caption: "Task 1 architecture — everything stays on the local network.",
          },
          p("Both devices are on the same Wi-Fi network. The browser sends an HTTP GET request to http://<ESP32-IP>/led/on; the ESP32's server loop (server.handleClient()) receives it, finds the matching handler, switches the pin and answers with a redirect back to the page."),
          {
            type: "table",
            headers: ["Route", "Method", "Handler", "Result"],
            rows: [
              ["/", "GET", "handleRoot()", "Sends the HTML control page (200 OK)"],
              ["/led/on", "GET", "handleLedOn()", "GPIO 2 = HIGH (LED ON), redirects to / (303)"],
              ["/led/off", "GET", "handleLedOff()", "GPIO 2 = LOW (LED OFF), redirects to / (303)"],
            ],
          },
        ],
      },
      {
        id: "hardware",
        title: "Hardware & Software Used",
        blocks: [
          ledHardware,
          {
            type: "table",
            headers: ["Software / library", "Use"],
            rows: [
              ["Arduino IDE + ESP32 board package", "Write, compile and upload the sketch (board: ESP32 Dev Module)"],
              ["WiFi.h", "Wi-Fi connection"],
              ["WebServer.h", "HTTP server and routing"],
              ["Serial Monitor (115200 baud)", "Shows the connection status and the ESP32 IP address"],
              ["Web browser", "The control interface"],
            ],
          },
        ],
      },
      {
        id: "circuit",
        title: "Circuit / Wiring Diagram & ESP32 Pin Connections",
        blocks: [
          { type: "image", src: "/week-7/diagrams/task-1-circuit.svg", caption: "Task 1 circuit and pin connections (the relay/bulb branch is the optional demonstration load)." },
          p("This task needs no external wiring: the LED is already on the ESP32 board and is connected to GPIO 2. The board is powered and programmed through the USB cable."),
          ledPins,
          mainsSafety,
        ],
      },
      {
        id: "code",
        title: "Complete Arduino / ESP32 Source Code",
        blocks: [
          { type: "code", file: "task1-esp32-web-server.ino", title: "task1-esp32-web-server.ino", lang: "cpp", caption: "Replace the Wi-Fi placeholders with your own credentials before uploading." },
          {
            type: "table",
            headers: ["Code", "What it does"],
            rows: [
              ["WebServer server(80)", "Creates the HTTP server on port 80"],
              ["WiFi.begin(ssid, password)", "Joins the Wi-Fi network; the loop waits for WL_CONNECTED"],
              ["server.on(\"/led/on\", handleLedOn)", "Binds a URL to a handler function"],
              ["digitalWrite(ledPin, HIGH / LOW)", "Switches GPIO 2"],
              ["server.sendHeader(\"Location\", \"/\"); server.send(303)", "Redirects the browser back to the control page"],
              ["server.handleClient()", "Called in loop() to serve incoming requests"],
            ],
          },
        ],
      },
      {
        id: "html",
        title: "HTML Interface Developed for Controlling the LED",
        blocks: [
          { type: "code", file: "task1-web-interface.html", title: "task1-web-interface.html", lang: "html", caption: "The page that handleRoot() builds and sends to the browser." },
          p("The page is a small HTML document with a dark theme and two large buttons. Each button is a normal link: \"TURN LED ON\" points to /led/on and \"TURN LED OFF\" points to /led/off, so no JavaScript is needed."),
        ],
      },
      {
        id: "command",
        title: "How the Webpage Sends a Command to the ESP32",
        blocks: [
          steps(
            "The user taps TURN LED ON in the browser.",
            "The browser sends HTTP GET http://<ESP32-IP>/led/on over Wi-Fi to port 80.",
            "The ESP32 passes the request to server.handleClient() inside loop().",
            "The server matches the URL /led/on and calls handleLedOn().",
            "handleLedOn() runs digitalWrite(ledPin, HIGH), so GPIO 2 goes to 3.3 V and the LED lights.",
            "The ESP32 replies HTTP 303 See Other with Location: /.",
            "The browser requests / again and shows the control page; OFF works the same way with LOW."
          ),
        ],
      },
      { id: "photos", title: "Photographs of the Physical Setup", blocks: [media("photos")] },
      { id: "screenshots", title: "Screenshots of the Web Interface", blocks: [media("screenshots")] },
      { id: "video", title: "Video Demonstrating LED ON/OFF Control from the Webpage", blocks: [media("video")] },
      {
        id: "problems",
        title: "Problems Encountered & How They Were Solved",
        blocks: [
          {
            type: "table",
            headers: ["Problem", "Solution"],
            rows: [
              ["Did not know which address to open in the browser", "Printed WiFi.localIP() on the Serial Monitor after connecting and opened that IP in the browser."],
              ["Serial Monitor showed unreadable characters", "Set the Serial Monitor baud rate to 115200 to match Serial.begin(115200)."],
              ["Buttons in the page were not styled as intended", "The HTML string used the React attribute className; in plain HTML it must be class. Corrected the attribute."],
              ["Browser stayed on the command URL after pressing a button", "Sent a 303 redirect with Location: / so the browser returns to the control page."],
              ["Page would not load from the phone", "ESP32 and phone must be on the same Wi-Fi network, and the SSID/password in the sketch must be correct."],
            ],
          },
        ],
      },
      {
        id: "reflection",
        title: "Brief Reflection on What I Learned",
        blocks: [
          p("This task showed me that a microcontroller can host its own web server and be controlled from any browser with nothing but HTTP. I learned how Wi-Fi station mode, IP addresses, routes and handler functions fit together, and how a web action ends up as a voltage on a GPIO pin."),
          list("Connecting an ESP32 to Wi-Fi and finding its IP address", "Writing HTTP route handlers with WebServer.h", "Serving an HTML interface from the microcontroller", "Using redirects so the interface stays responsive"),
        ],
      },
    ],
    checklist: [
      { label: "Objective of the assignment and the problem being addressed", section: "objective" },
      { label: "Basic concept of an ESP32 Web Server", section: "concept" },
      { label: "How the ESP32 and browser communicate over Wi-Fi", section: "communication" },
      { label: "Hardware components used", section: "hardware" },
      { label: "Circuit/wiring diagram", section: "circuit" },
      { label: "ESP32 pin connections", section: "circuit" },
      { label: "Complete Arduino/ESP32 source code", section: "code" },
      { label: "HTML interface developed for controlling the LED", section: "html" },
      { label: "How the webpage sends a command to the ESP32", section: "command" },
      { label: "Photographs of the physical setup", section: "photos", slot: "photos" },
      { label: "Screenshots of the web interface", section: "screenshots", slot: "screenshots" },
      { label: "Video demonstrating LED ON/OFF control from the webpage", section: "video", slot: "video" },
      { label: "Problems encountered and how they were solved", section: "problems" },
      { label: "Brief reflection on what you learned", section: "reflection" },
      { label: "All required files/code available in your repository", section: "repo" },
    ],
  },

  // =========================================================================
  // TASK 2
  // =========================================================================
  {
    id: "project-2",
    slug: "task-2",
    num: "02",
    title: "Task 2 — Adafruit IO Dashboard & MQTT",
    category: "MQTT · Cloud Dashboard",
    shortIntro:
      "Extended the local web server into a cloud-connected design: the ESP32 talks MQTT to Adafruit IO, and an online dashboard switch controls the LED from anywhere.",
    coverImage: `${COVER}/Task 2/Adafruit IO MQTT ESP32 Flow Diagram.png`,
    repositoryUrl: `${REPO}/tree/Harinath07-Assesinment-2`,
    activity: {
      summary:
        "Connected the ESP32 to Adafruit IO over MQTT so an online dashboard can switch the LED and receive its status back.",
      bullets: [
        "Created an Adafruit IO account, two feeds (led-control, led-status) and a dashboard.",
        "Subscribed the ESP32 to led-control and published confirmations to led-status.",
        "Accepted ON/OFF (and 1/0) commands and handled MQTT reconnection.",
        "Verified two-way communication between the dashboard and the hardware.",
      ],
    },
    media: {
      photos: photo("Photographs of the hardware setup", "ESP32 (and relay/bulb) while connected to Adafruit IO"),
      dashboard: photo("Screenshots of the Adafruit IO dashboard", "Dashboard with the toggle, feeds list, feed configuration"),
      demo: photo("LED control through the cloud dashboard", "Pairs of images: dashboard toggled ON/OFF and the LED/bulb response"),
      video: video("Working demonstration video", "Dashboard switch toggling the LED/bulb"),
    },
    sections: [
      {
        id: "overview",
        title: "Objective & Summary",
        blocks: [
          p("Objective: connect the ESP32 to the Adafruit IO cloud platform using MQTT and control the LED from an online dashboard."),
          p("In Task 1 the ESP32 could only be reached from the same Wi-Fi network. With a cloud broker in the middle, the device and the dashboard are both just MQTT clients of Adafruit IO, so the LED can be switched from any internet connection without port forwarding."),
        ],
      },
      {
        id: "purpose",
        title: "Purpose of Adafruit IO in an IoT System",
        blocks: [
          p("Adafruit IO is a ready-made cloud service for IoT. It provides an MQTT broker, feeds that store data, and dashboards with toggles, gauges and charts, so no server has to be written or hosted."),
          list(
            "Acts as the MQTT broker that routes messages between the dashboard and the ESP32.",
            "Stores values in feeds so the latest state and history are available.",
            "Offers a browser dashboard with controls and indicators.",
            "Authenticates devices with a username and an AIO key."
          ),
        ],
      },
      {
        id: "mqtt",
        title: "Basic Concept of MQTT",
        blocks: [
          p("MQTT (Message Queuing Telemetry Transport) is a lightweight publish/subscribe protocol that runs over TCP. Devices do not talk to each other directly: they publish messages to named topics on a broker, and any client subscribed to a topic receives them. Small headers and a persistent connection make it well suited to microcontrollers."),
          {
            type: "table",
            headers: ["Property", "MQTT", "HTTP (Task 1)"],
            rows: [
              ["Model", "Publish / subscribe through a broker", "Request / response, client to server"],
              ["Connection", "Persistent TCP connection", "One request per action"],
              ["Overhead", "Very small packets", "Larger headers"],
              ["Direction", "Either side can send at any time", "Client always starts"],
              ["Used here", "ESP32 ↔ Adafruit IO (port 1883)", "Browser ↔ ESP32 (port 80)"],
            ],
          },
        ],
      },
      {
        id: "roles",
        title: "MQTT Publisher, Subscriber and Broker Identified",
        blocks: [
          {
            type: "table",
            headers: ["Role", "Who", "What it does here"],
            rows: [
              ["Broker", "Adafruit IO (io.adafruit.com:1883)", "Receives every message and forwards it to the subscribers of that feed"],
              ["Publisher", "Adafruit IO dashboard toggle", "Publishes ON or OFF to the led-control feed"],
              ["Subscriber", "ESP32", "Subscribes to led-control and reacts to each command"],
              ["Publisher", "ESP32", "Publishes the confirmed state (ON/OFF) to led-status"],
              ["Subscriber", "Dashboard indicator", "Shows the value arriving on led-status"],
            ],
          },
        ],
      },
      {
        id: "feeds-role",
        title: "Role of an MQTT Topic / Feed",
        blocks: [
          p("A topic is the address a message is published to. In Adafruit IO each feed is a topic of the form USERNAME/feeds/feed-name. Using one feed for commands and another for status keeps the two directions separate and lets the dashboard show what the hardware actually did instead of just what was requested."),
        ],
      },
      {
        id: "hardware",
        title: "Hardware & Software Used",
        blocks: [
          ledHardware,
          {
            type: "table",
            headers: ["Software / service", "Use"],
            rows: [
              ["Arduino IDE + ESP32 board package", "Firmware development and upload"],
              ["Adafruit MQTT library (Adafruit_MQTT.h, Adafruit_MQTT_Client.h)", "MQTT client, subscribe and publish"],
              ["WiFi.h", "Wi-Fi connection"],
              ["Adafruit IO", "MQTT broker, feeds and dashboard"],
              ["Serial Monitor (115200 baud)", "Connection and message logging"],
            ],
          },
        ],
      },
      {
        id: "account",
        title: "Adafruit IO Account Created and Documented",
        blocks: [
          steps(
            "Open io.adafruit.com and sign up for a free Adafruit account.",
            "Open the Adafruit IO dashboard area (the IO tab) after signing in.",
            "Click the yellow key icon (AIO Key) to see the username and the Active Key.",
            "Copy the username and key into AIO_USERNAME and AIO_KEY in the sketch.",
            "Treat the key like a password: never publish it, and regenerate it if it is ever shown in a screenshot or committed to a repository."
          ),
        ],
      },
      {
        id: "dashboard-config",
        title: "Dashboard & Feed Configuration Documented",
        blocks: [
          steps(
            "Feeds → New Feed → create led-control (commands from the dashboard).",
            "Feeds → New Feed → create led-status (state reported by the ESP32).",
            "Dashboards → New Dashboard → give it a name.",
            "Add a Toggle block connected to led-control, with button on value ON and off value OFF.",
            "Add a Text / Indicator block connected to led-status to display the confirmed state.",
            "Run the sketch and toggle the switch to check that the LED follows it."
          ),
        ],
      },
      {
        id: "flow",
        title: "Communication Flow between ESP32, MQTT and Adafruit IO",
        blocks: [
          {
            type: "diagram",
            text: `Adafruit IO Dashboard (toggle)
          │  1. user switches ON / OFF
          ▼
Adafruit IO MQTT broker  (io.adafruit.com:1883)
   feed: USERNAME/feeds/led-control
          │  2. broker forwards the message
          ▼
ESP32  (subscribed to led-control)
          │  3. reads payload → digitalWrite(GPIO 2)
          │  4. publishes "ON" / "OFF"
          ▼
Adafruit IO feed: USERNAME/feeds/led-status
          │
          ▼
Dashboard indicator updates`,
            caption: "Command path (top to bottom) and status path (feedback).",
          },
          { type: "image", src: "/week-7/diagrams/task-2-circuit.svg", caption: "Hardware wiring for Task 2 (the network path is shown in the diagram above)." },
        ],
      },
      {
        id: "topics",
        title: "MQTT Topic / Feed Structure Used",
        blocks: [
          {
            type: "table",
            headers: ["Feed (topic)", "Direction", "ESP32 role", "Values"],
            rows: [
              ["USERNAME/feeds/led-control", "Dashboard → ESP32", "Subscriber", "ON, OFF (also on/off, 1/0)"],
              ["USERNAME/feeds/led-status", "ESP32 → Dashboard", "Publisher", "ON, OFF"],
            ],
          },
        ],
      },
      {
        id: "code",
        title: "Complete ESP32 Source Code",
        blocks: [
          { type: "code", file: "task2-adafruit-mqtt.ino", title: "task2-adafruit-mqtt.ino", lang: "cpp", caption: "Fill in WIFI_SSID, WIFI_PASSWORD, AIO_USERNAME and AIO_KEY. Never commit real keys." },
        ],
      },
      {
        id: "code-explained",
        title: "Explanation of Important Code Sections",
        blocks: [
          {
            type: "table",
            headers: ["Code section", "Explanation"],
            rows: [
              ["#define AIO_SERVER / AIO_SERVERPORT", "Adafruit IO broker address (io.adafruit.com) and MQTT port 1883."],
              ["Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY)", "Creates the MQTT client over the Wi-Fi client and authenticates with the username and AIO key."],
              ["Adafruit_MQTT_Subscribe ledFeed", "Subscription to USERNAME/feeds/led-control — the command channel."],
              ["Adafruit_MQTT_Publish ledStatus", "Publisher for USERNAME/feeds/led-status — the feedback channel."],
              ["connectWiFi()", "Connects to Wi-Fi and prints the ESP32 IP address."],
              ["MQTT_connect()", "Connects to the broker and retries every 5 seconds until it succeeds."],
              ["mqtt.readSubscription(5000)", "Waits up to 5 seconds for a message on a subscribed feed."],
              ["if (command == \"ON\" || \"on\" || \"1\")", "Turns GPIO 2 HIGH and publishes ON; the OFF branch does the opposite; anything else is reported as an unknown command."],
            ],
          },
        ],
      },
      { id: "photos", title: "Photographs of the Hardware Setup", blocks: [media("photos")] },
      { id: "dashboard", title: "Screenshots of the Adafruit IO Dashboard", blocks: [media("dashboard")] },
      { id: "demo", title: "LED Control through the Cloud Dashboard Demonstrated", blocks: [media("demo")] },
      { id: "video", title: "Working Demonstration Video", blocks: [media("video")] },
      {
        id: "problems",
        title: "Problems Encountered during MQTT / Cloud Setup",
        blocks: [
          {
            type: "table",
            headers: ["Problem", "Cause"],
            rows: [
              ["ESP32 could not connect to the MQTT broker", "Wrong Wi-Fi credentials, username/AIO key, broker address or port"],
              ["Dashboard toggle did nothing", "ESP32 subscribed to a different feed name than the one the toggle publishes to"],
              ["Dashboard status never updated", "Status was not published back to the led-status feed"],
              ["MQTT connection dropped after a while", "Network interruption or the idle connection timing out"],
            ],
          },
        ],
      },
      {
        id: "solutions",
        title: "Solutions Implemented",
        blocks: [
          {
            type: "table",
            headers: ["Problem", "Solution"],
            rows: [
              ["Connection failure", "Checked the SSID, password, username, AIO key, io.adafruit.com and port 1883; MQTT_connect() prints the error string and retries."],
              ["Toggle had no effect", "Used the exact feed path USERNAME/feeds/led-control in the subscription and the same feed in the dashboard block."],
              ["Status not updated", "Published ON/OFF to led-status after every command and checked the return value of publish()."],
              ["Dropped connection", "MQTT_connect() runs at the start of every loop() iteration and reconnects automatically."],
            ],
          },
        ],
      },
      {
        id: "reflection",
        title: "Brief Learning Reflection",
        blocks: [
          p("This task taught me the difference between local HTTP control and cloud MQTT control. The publish/subscribe model, with a broker in the middle, means neither the dashboard nor the ESP32 needs to know the other's address. I also learned that reliable cloud communication depends on correct credentials, exact feed names, reconnection handling and testing both the sending and the receiving side."),
        ],
      },
    ],
    checklist: [
      { label: "Purpose of Adafruit IO in an IoT system", section: "purpose" },
      { label: "Basic concept of MQTT", section: "mqtt" },
      { label: "MQTT Publisher, Subscriber, and Broker identified", section: "roles" },
      { label: "Role of an MQTT Topic/Feed", section: "feeds-role" },
      { label: "Hardware and software used", section: "hardware" },
      { label: "Adafruit IO account created and documented", section: "account" },
      { label: "Dashboard and feed configuration documented", section: "dashboard-config" },
      { label: "Communication flow between ESP32, MQTT, and Adafruit IO", section: "flow" },
      { label: "MQTT topic/feed structure used", section: "topics" },
      { label: "Complete ESP32 source code", section: "code" },
      { label: "Explanation of important code sections", section: "code-explained" },
      { label: "Photographs of the hardware setup", section: "photos", slot: "photos" },
      { label: "Screenshots of the Adafruit IO dashboard", section: "dashboard", slot: "dashboard" },
      { label: "LED control through the cloud dashboard demonstrated", section: "demo", slot: "demo" },
      { label: "Working demonstration video", section: "video", slot: "video" },
      { label: "Problems encountered during MQTT/cloud setup", section: "problems" },
      { label: "Solutions implemented", section: "solutions" },
      { label: "Brief learning reflection", section: "reflection" },
      { label: "All required files available in your repository", section: "repo" },
    ],
  },

  // =========================================================================
  // TASK 3
  // =========================================================================
  {
    id: "project-3",
    slug: "task-3",
    num: "03",
    title: "Task 3 — IFTTT + Adafruit IO IoT Automation",
    category: "IFTTT · Event-Driven Automation",
    shortIntro:
      "Added automation: an IFTTT applet (a Google Assistant voice command) sends ON/OFF to an Adafruit IO feed and the ESP32 acts on it over MQTT, with no manual dashboard click.",
    coverImage: `${COVER}/Task 3/Neon IoT Automation System Flow.png`,
    repositoryUrl: `${REPO}/tree/Harinath07-Assignment-3`,
    activity: {
      summary:
        "Connected an external event to the hardware: IFTTT sends data to Adafruit IO, Adafruit IO forwards it over MQTT and the ESP32 switches the output.",
      bullets: [
        "Created Adafruit IO feeds for commands (automation-control) and status (automation-status).",
        "Built IFTTT applets with a Google Assistant trigger and a \"Send data to Adafruit IO\" action.",
        "Wrote firmware that processes ON/OFF, 1/0 and TRUE/FALSE commands and publishes the state back.",
        "Added Wi-Fi and MQTT reconnection plus a keep-alive ping.",
      ],
    },
    media: {
      ifttt: photo("Screenshots of the IFTTT configuration", "Applet trigger, action and My Applets page"),
      adafruit: photo("Screenshots of the Adafruit IO dashboard / feed", "Feeds list and feed history showing the received commands"),
      photos: photo("Photographs of the working prototype", "ESP32 (and bulb) reacting to the automation"),
      video: video("Video demonstrating the complete automation", "Trigger → bulb/LED response"),
    },
    sections: [
      {
        id: "objective",
        title: "Objective of the IoT Automation",
        blocks: [
          p("Objective: automate the ESP32 so that an external event — here an IFTTT trigger — switches the output without anyone opening the Adafruit IO dashboard."),
          p("Task 2 still needed a person to click the dashboard. This task introduces event-driven automation: a trigger fires, a cloud service passes the command on, and the device reacts."),
        ],
      },
      {
        id: "automation",
        title: "Basic Concept of IoT Automation",
        blocks: [
          p("IoT automation lets a physical device respond automatically to an event instead of waiting for manual control. The chain is Event → Cloud service → Message → Device action. Because the trigger lives in the cloud, the ESP32 only has to listen to one feed."),
        ],
      },
      {
        id: "ifttt",
        title: "What IFTTT Is and Why It Is Used",
        blocks: [
          p("IFTTT (If This Then That) is a cloud service that connects other services with simple rules called applets. A microcontroller cannot easily talk to many different web services directly, so IFTTT acts as the automation layer: it understands triggers such as voice commands, schedules, buttons and webhooks, and can send data to Adafruit IO as its action."),
        ],
      },
      {
        id: "trigger-action",
        title: "Trigger → Action Concept",
        blocks: [
          {
            type: "diagram",
            text: `IF THIS (trigger)                    THEN THAT (action)
Google Assistant voice command  ──►  Send data to Adafruit IO
"Okay Google, activate bulb on"       feed = automation-control
                                      data = ON`,
            caption: "Every IFTTT applet is a trigger paired with an action.",
          },
        ],
      },
      {
        id: "role",
        title: "Role of Adafruit IO in the Automation",
        blocks: [
          p("Adafruit IO is the bridge between IFTTT and the ESP32. IFTTT writes a value into an Adafruit IO feed over the internet; Adafruit IO's MQTT broker then pushes that value to every client subscribed to the feed — the ESP32. The ESP32 reports back by publishing to a status feed."),
        ],
      },
      {
        id: "hardware",
        title: "Hardware & Software Used",
        blocks: [
          ledHardware,
          {
            type: "table",
            headers: ["Software / service", "Use"],
            rows: [
              ["Arduino IDE + ESP32 board package", "Firmware development and upload"],
              ["Adafruit MQTT library", "Subscribe to the command feed, publish status"],
              ["Adafruit IO", "Feeds and MQTT broker"],
              ["IFTTT", "Applet with trigger and action"],
              ["Google Assistant (phone)", "Voice trigger used for the demonstration"],
              ["Serial Monitor (115200 baud)", "Shows received commands"],
            ],
          },
        ],
      },
      {
        id: "applet",
        title: "IFTTT Applet / Workflow Created and Documented",
        blocks: [
          steps(
            "Create the Adafruit IO feeds automation-control (commands) and automation-status (feedback).",
            "In IFTTT, open Create and choose \"If This\" → Google Assistant → a voice trigger (for example \"Okay Google, activate bulb on\").",
            "Choose \"Then That\" → Adafruit IO → \"Send data to Adafruit IO\".",
            "Select the Adafruit account, the feed automation-control, and set Data to save to ON.",
            "Create a second applet for \"bulb off\" that saves OFF to the same feed.",
            "Check My Applets: both applets show as Connected."
          ),
        ],
      },
      {
        id: "trigger-used",
        title: "Trigger Used",
        blocks: [
          { type: "callout", title: "Trigger", text: "Google Assistant voice command — \"Okay Google, activate bulb on\" and \"Okay Google, bulb off\". (IFTTT can use other triggers, such as a schedule, a button or a webhook, with exactly the same action.)" },
        ],
      },
      {
        id: "action-performed",
        title: "Action Performed",
        blocks: [
          { type: "callout", title: "Action", text: "IFTTT \"Send data to Adafruit IO\": the text ON or OFF is saved into the automation-control feed. The ESP32 then switches GPIO 2 and publishes ON/OFF to automation-status." },
        ],
      },
      {
        id: "reach",
        title: "How the Trigger Reaches the IoT System",
        blocks: [
          steps(
            "The user speaks the voice command to Google Assistant.",
            "Google Assistant fires the matching IFTTT applet.",
            "IFTTT performs the action and saves ON or OFF to the Adafruit IO feed automation-control.",
            "Adafruit IO's MQTT broker publishes the new value to subscribers of that feed.",
            "The ESP32 (subscribed over MQTT) receives the payload and runs processCommand().",
            "processCommand() sets GPIO 2 HIGH or LOW and the output changes.",
            "The ESP32 publishes the new state to automation-status, which can be seen in Adafruit IO."
          ),
        ],
      },
      {
        id: "dataflow",
        title: "Communication / Data-Flow Diagram",
        blocks: [
          {
            type: "diagram",
            text: `Voice command / other trigger
          │
          ▼
        IFTTT  ── applet: If This → Then That
          │  HTTPS: "Send data to Adafruit IO"
          ▼
Adafruit IO feed: automation-control
          │  MQTT (broker, port 1883)
          ▼
        ESP32  ── processCommand("ON" / "OFF")
          │                    │
          ▼                    ▼
   GPIO 2 → LED / relay → bulb    publish → automation-status`,
            caption: "Event → Cloud → MQTT → Device (and status back to the cloud).",
          },
          { type: "image", src: "/week-7/diagrams/task-3-circuit.svg", caption: "Hardware wiring for Task 3 (same as Task 2)." },
        ],
      },
      {
        id: "code",
        title: "ESP32 Source Code",
        blocks: [
          { type: "code", file: "task3-ifttt-automation.ino", title: "task3-ifttt-automation.ino", lang: "cpp", caption: "Placeholders must be replaced with your own Wi-Fi and Adafruit IO details." },
          {
            type: "table",
            headers: ["Code section", "What it does"],
            rows: [
              ["automationFeed (subscribe)", "Listens to USERNAME/feeds/automation-control for commands from IFTTT"],
              ["statusFeed (publish)", "Publishes the resulting state to USERNAME/feeds/automation-status"],
              ["processCommand()", "Trims and upper-cases the text, then accepts ON / 1 / TRUE or OFF / 0 / FALSE"],
              ["connectWiFi() / connectMQTT()", "Reconnect automatically if Wi-Fi or the broker connection is lost"],
              ["mqtt.ping()", "Keeps the MQTT connection alive between commands"],
            ],
          },
        ],
      },
      { id: "ifttt-shots", title: "Screenshots of the IFTTT Configuration", blocks: [media("ifttt")] },
      { id: "adafruit-shots", title: "Screenshots of the Adafruit IO Dashboard / Feed", blocks: [media("adafruit")] },
      { id: "photos", title: "Photographs of the Working Prototype", blocks: [media("photos")] },
      { id: "video", title: "Video Demonstrating the Complete Automation", blocks: [media("video")] },
      {
        id: "testing",
        title: "Automation Tested under Different Conditions",
        blocks: [
          {
            type: "table",
            headers: ["Condition", "Expected behaviour", "How it is checked"],
            rows: [
              ["ON trigger fires", "automation-control = ON → output ON → ON published to automation-status", "Serial Monitor, Adafruit IO feed history, video"],
              ["OFF trigger fires", "automation-control = OFF → output OFF → OFF published", "Serial Monitor, feed history, video"],
              ["Payload written differently (on, 1, true, off, 0, false)", "Accepted — the sketch trims and upper-cases the text", "Send the values from the Adafruit IO feed page"],
              ["Unknown payload", "Ignored; \"Unknown command received\" is printed", "Serial Monitor"],
              ["Wi-Fi or MQTT connection lost", "loop() reconnects and re-subscribes, then commands work again", "Briefly turn the hotspot/router off and back on"],
            ],
          },
        ],
      },
      {
        id: "problems",
        title: "Problems and Their Solutions",
        blocks: [
          {
            type: "table",
            headers: ["Problem", "Solution"],
            rows: [
              ["ESP32 did not react to the applet", "The applet must write to the same feed the sketch subscribes to (automation-control); matched the names exactly."],
              ["Command text not recognised", "IFTTT can add spaces or change case; processCommand() trims and upper-cases the text before comparing."],
              ["MQTT connection failure", "Checked Wi-Fi credentials, username, AIO key and port 1883; connectMQTT() retries every 5 seconds."],
              ["State on the cloud out of step with the device", "The ESP32 publishes the state it applied to automation-status after each command."],
            ],
          },
        ],
      },
      {
        id: "learned",
        title: "What I Learned about Cloud-Based Automation",
        blocks: [
          list(
            "Automation is Event → Cloud → Message → Device; the device does not need to know where the event came from.",
            "IFTTT handles triggers, Adafruit IO routes data, and the ESP32 performs the physical action.",
            "Feed names, payload format and reconnection handling decide whether an automation is reliable.",
            "The same architecture works for any trigger — a schedule, a button, a webhook or a voice command."
          ),
        ],
      },
      {
        id: "reflection",
        title: "Brief Reflection on the Assignment",
        blocks: [
          p("This task showed how several services work together in a modern IoT system. I no longer controlled the LED manually: an event started a chain that ended in physical action, which gave me a clear picture of how smart-home automation is built."),
        ],
      },
    ],
    checklist: [
      { label: "Objective of the IoT automation", section: "objective" },
      { label: "Basic concept of IoT automation", section: "automation" },
      { label: "What IFTTT is and why it is used", section: "ifttt" },
      { label: "Trigger → Action concept explained", section: "trigger-action" },
      { label: "Role of Adafruit IO in the automation", section: "role" },
      { label: "Hardware and software used", section: "hardware" },
      { label: "IFTTT Applet/workflow created and documented", section: "applet" },
      { label: "Trigger used identified", section: "trigger-used" },
      { label: "Action performed identified", section: "action-performed" },
      { label: "How the trigger reaches the IoT system", section: "reach" },
      { label: "Communication/data-flow diagram", section: "dataflow" },
      { label: "ESP32 source code", section: "code" },
      { label: "Screenshots of the IFTTT configuration", section: "ifttt-shots", slot: "ifttt" },
      { label: "Screenshots of the Adafruit IO dashboard/feed", section: "adafruit-shots", slot: "adafruit" },
      { label: "Photographs of the working prototype", section: "photos", slot: "photos" },
      { label: "Video demonstrating the complete automation", section: "video", slot: "video" },
      { label: "Automation tested under different conditions", section: "testing" },
      { label: "Problems and their solutions documented", section: "problems" },
      { label: "What you learned about cloud-based automation", section: "learned" },
      { label: "Brief reflection on the assignment", section: "reflection" },
    ],
  },

  // =========================================================================
  // TASK 4
  // =========================================================================
  {
    id: "project-4",
    slug: "task-4",
    num: "04",
    title: "Task 4 — Firebase IoT Monitoring Dashboard",
    category: "Firebase · Cloud Monitoring",
    shortIntro:
      "Built a cloud monitoring system: the ESP32 uploads DHT11 and LDR readings to Firebase Realtime Database and an authenticated web dashboard shows them and switches a relay-controlled bulb.",
    coverImage: `${COVER}/Task 4/Firebase IoT Monitoring System Flow.png`,
    repositoryUrl: `${REPO}/tree/Assignment-4`,
    activity: {
      summary:
        "Connected sensors and a relay to Firebase Realtime Database with email/password authentication and a hosted web dashboard.",
      bullets: [
        "Created a Firebase project with Authentication (email/password) and a Realtime Database.",
        "Uploaded temperature, humidity and LDR light level from the ESP32 every 5 seconds.",
        "Read the bulb command from the database and switched the relay.",
        "Built a login-protected web dashboard on Firebase Hosting.",
      ],
    },
    media: {
      login: photo("Screenshots of the login page", "Dashboard sign-in page"),
      firebase: photo("Screenshots of the Firebase database", "Realtime Database data tree, Authentication users, rules"),
      dashboard: photo("Screenshots of the working dashboard", "Live temperature, humidity, light and bulb control after login"),
      photos: photo("Hardware prototype (extra)", "ESP32 with DHT11, LDR and relay"),
      video: video("Video demonstrating the webpage workflow", "Login → live values → bulb control"),
    },
    sections: [
      {
        id: "objective",
        title: "Objective of the Firebase IoT Monitoring System",
        blocks: [
          p("Objective: move from simple device control to a cloud-based monitoring system. The ESP32 reads a DHT11 (temperature, humidity) and an LDR (light level), stores the values in Firebase, and a password-protected web dashboard displays them and can turn a bulb ON or OFF through a relay."),
          p("Previous tasks only switched an output. This task adds sensing, a database, user authentication and a real dashboard — the building blocks of a monitoring product."),
        ],
      },
      {
        id: "cloud",
        title: "Basic Concept of Cloud Computing",
        blocks: [
          p("Cloud computing means using computing resources — servers, storage, databases, networking, software — over the internet from a provider instead of owning and running the machines. Resources are on demand, scale with use and are billed (or free-tiered) by usage. For IoT, the cloud stores the data, runs the back end and lets devices and dashboards reach each other from anywhere."),
        ],
      },
      {
        id: "service-models",
        title: "IaaS, PaaS, SaaS and BaaS Explained",
        blocks: [
          {
            type: "table",
            headers: ["Model", "Meaning", "You manage", "Example"],
            rows: [
              ["IaaS — Infrastructure as a Service", "Virtual machines, storage and networks on demand", "OS, runtime, application, data", "Amazon EC2, Google Compute Engine"],
              ["PaaS — Platform as a Service", "A platform to deploy code without managing servers", "Application and data", "Google App Engine, Heroku"],
              ["SaaS — Software as a Service", "Finished software used through a browser", "Only your own data and settings", "Gmail, Google Docs"],
              ["BaaS — Backend as a Service", "Ready-made back-end services (database, authentication, hosting) used through an SDK", "Front-end and rules", "Firebase"],
            ],
          },
          p("Firebase is a BaaS: it supplies the database, authentication and hosting, so the project only needs the ESP32 firmware and a front-end dashboard."),
        ],
      },
      {
        id: "platform",
        title: "What a Cloud Platform Is",
        blocks: [
          p("A cloud platform is a provider's collection of cloud services reached through a console, SDKs and APIs, for example Google Cloud, AWS, Azure, Adafruit IO or Firebase. It handles servers, scaling and security so developers can concentrate on the application. In this task the platform is Firebase (part of Google), used on the free Spark plan."),
        ],
      },
      {
        id: "database",
        title: "What a Database Is",
        blocks: [
          p("A database is an organised store of data that can be written, read, queried and kept safe. Relational (SQL) databases keep data in tables with fixed columns; NoSQL databases keep flexible documents or trees. Firebase Realtime Database is NoSQL: the data is one large JSON tree."),
          {
            type: "table",
            headers: ["", "Relational (SQL)", "Firebase Realtime Database"],
            rows: [
              ["Structure", "Tables, rows, columns", "JSON tree of paths"],
              ["Schema", "Fixed in advance", "Flexible"],
              ["Access", "SQL queries", "Read/write by path, real-time listeners"],
              ["Best for here", "Reports, relations", "Live sensor values and commands"],
            ],
          },
        ],
      },
      {
        id: "rtdb",
        title: "Firebase Realtime Database Explained",
        blocks: [
          p("Firebase Realtime Database stores data as JSON and synchronises it to every connected client in milliseconds. Clients keep an open connection and attach listeners: when a value changes, every listener is notified immediately. The ESP32 writes sensor values to paths such as /iot/sensors/temperature while the dashboard listens to the same data and writes commands such as /iot/control/bulb."),
          list("Real-time synchronisation without polling by the dashboard", "Security rules decide who can read and write", "Works with the ESP32 library and the Firebase web SDK", "Free Spark plan is enough for this prototype"),
        ],
      },
      {
        id: "dashboard-concept",
        title: "What a Cloud-Based Dashboard Is",
        blocks: [
          p("A cloud-based dashboard is a web page that reads data from a cloud service and shows it live, often with controls. Because it runs in a browser and the data lives in the cloud, it can be opened from any device. Here the dashboard shows temperature, humidity, light level and bulb state, and has buttons to control the bulb after login."),
        ],
      },
      {
        id: "auth",
        title: "Authentication and the Purpose of a Login System",
        blocks: [
          p("Authentication is verifying who the user is. A login system makes sure that only registered users can see sensor data or control the bulb. In this project Firebase Authentication provides email/password sign-in: the dashboard signs in the user, and the ESP32 signs in with its own account, so the database can require a signed-in user."),
        ],
      },
      {
        id: "authz",
        title: "Difference between Authentication and Authorization",
        blocks: [
          {
            type: "table",
            headers: ["", "Authentication", "Authorization"],
            rows: [
              ["Question", "Who are you?", "What are you allowed to do?"],
              ["Example here", "Signing in with email and password", "Database rules: read/write only when auth != null"],
              ["Happens", "First", "After authentication, on every request"],
              ["Tool", "Firebase Authentication", "Realtime Database security rules"],
            ],
          },
          p("The rules used here allow read and write to any signed-in user. A stricter design would also authorize by role, for example letting only an admin change the bulb."),
        ],
      },
      {
        id: "setup",
        title: "Firebase Project Setup",
        blocks: [
          steps(
            "Open console.firebase.google.com and create a new project (the free Spark plan is enough).",
            "Add a Web app to the project and copy the web configuration (apiKey, authDomain, databaseURL, projectId...).",
            "Create the Realtime Database and choose a location.",
            "Install the Firebase ESP Client and DHT sensor libraries in the Arduino IDE.",
            "Put the Wi-Fi details, API key, database URL and the Firebase user's email and password into the ESP32 sketch.",
            "Put the web configuration into the dashboard app.js and deploy the public folder with Firebase Hosting (firebase deploy)."
          ),
        ],
      },
      {
        id: "auth-config",
        title: "Firebase Authentication Configuration",
        blocks: [
          steps(
            "Firebase console → Build → Authentication → Get started.",
            "Sign-in method → enable Email/Password.",
            "Users → Add user: create one account for the dashboard user and one for the ESP32 (or share one).",
            "Use the same email and password in the login page and in USER_EMAIL / USER_PASSWORD in the sketch.",
            "Keep real passwords out of the repository."
          ),
          p("Database rules used (Realtime Database → Rules): { \"rules\": { \".read\": \"auth != null\", \".write\": \"auth != null\" } } — only signed-in users can read or write."),
        ],
      },
      {
        id: "db-structure",
        title: "Realtime Database Structure",
        blocks: [
          {
            type: "diagram",
            text: `iot
├── sensors            (written by the ESP32 every 5 s)
│   ├── temperature    float   °C
│   ├── humidity       float   %
│   └── ldr            int     0 – 4095
└── control            (written by the dashboard)
    └── bulb           bool    true = ON, false = OFF`,
            caption: "Database tree used by the Task 4 firmware.",
          },
          {
            type: "table",
            headers: ["Path", "Type", "Written by", "Read by", "Purpose"],
            rows: [
              ["/iot/sensors/temperature", "float", "ESP32", "Dashboard", "DHT11 temperature in °C"],
              ["/iot/sensors/humidity", "float", "ESP32", "Dashboard", "DHT11 relative humidity in %"],
              ["/iot/sensors/ldr", "int", "ESP32", "Dashboard", "Raw LDR ADC value (0–4095)"],
              ["/iot/control/bulb", "bool", "Dashboard", "ESP32", "Bulb command"],
            ],
          },
          { type: "code", file: "database-structure.json", title: "database-structure.json (from the repository)", lang: "json", caption: "Database template kept in the repository for the dashboard." },
        ],
      },
      {
        id: "architecture",
        title: "Database / Data-Flow Architecture",
        blocks: [
          {
            type: "diagram",
            text: `DHT11 ───────┐
             │
LDR ─────────┤
             ▼
           ESP32
             │  Wi-Fi + Firebase Authentication
             ▼
   Firebase Realtime Database
             │
             ▼
        Web Dashboard   (login required)
             │  control command (bulb)
             ▼
   Firebase Realtime Database
             │
             ▼
           ESP32 → relay (GPIO 23) → bulb`,
            caption: "Sensor data flows up to the cloud; commands flow back down to the relay.",
          },
        ],
      },
      {
        id: "hardware",
        title: "Hardware & Software Used",
        blocks: [
          sensorHardware,
          {
            type: "table",
            headers: ["Software / service", "Use"],
            rows: [
              ["Arduino IDE + ESP32 board package", "Firmware"],
              ["Firebase_ESP_Client, DHT sensor library", "Firebase access and DHT11 reading"],
              ["Firebase Realtime Database and Authentication", "Cloud storage and login"],
              ["Firebase Hosting", "Hosts the dashboard"],
              ["HTML, CSS, JavaScript + Firebase web SDK", "Dashboard"],
            ],
          },
          mainsSafety,
        ],
      },
      {
        id: "circuit",
        title: "Circuit / Wiring and Pin Connections",
        blocks: [
          { type: "image", src: "/week-7/diagrams/task-4-circuit.svg", caption: "Task 4 circuit: DHT11 on GPIO 4, LDR divider on GPIO 34, relay on GPIO 23." },
          sensorPins,
        ],
      },
      {
        id: "code",
        title: "ESP32 Source Code",
        blocks: [
          { type: "code", file: "task4-firebase-monitoring.ino", title: "task4-firebase-monitoring.ino", lang: "cpp", caption: "Uploads sensor data every 5 seconds and reads /iot/control/bulb. Replace all YOUR_ placeholders." },
          {
            type: "table",
            headers: ["Code section", "What it does"],
            rows: [
              ["Firebase.begin(&config, &auth)", "Signs in with the Firebase user and starts the connection"],
              ["readSensors()", "Reads DHT11 and the LDR; stops with a message if the DHT11 returns NaN"],
              ["sendSensorData()", "Writes temperature, humidity and ldr to /iot/sensors/…"],
              ["readBulbControl()", "Reads /iot/control/bulb and drives the relay only when the value changes"],
              ["millis() timer (5000 ms)", "Sends data on a schedule without blocking the loop"],
            ],
          },
        ],
      },
      {
        id: "dashboard-code",
        title: "Complete Dashboard Source Code",
        blocks: [
          p("The dashboard is a static web app hosted on Firebase Hosting. index.html holds the login view, metric cards, mode and bulb controls, charts and history table; app.js signs in with Firebase Authentication, listens to the database and sends control commands. The stylesheet (style.css) is in the repository."),
          { type: "code", file: "dashboard-index.html", title: "public/index.html", lang: "html" },
          { type: "code", file: "dashboard-app.js", title: "public/app.js", lang: "javascript", caption: "The Firebase web configuration is shown with placeholders." },
        ],
      },
      { id: "login-shots", title: "Screenshots of the Login Page", blocks: [media("login")] },
      { id: "firebase-shots", title: "Screenshots of the Firebase Database", blocks: [media("firebase")] },
      { id: "dashboard-shots", title: "Screenshots of the Working Dashboard", blocks: [media("dashboard")] },
      { id: "hw-photos", title: "Hardware Prototype Photographs (extra)", blocks: [media("photos")] },
      { id: "video", title: "Video Demonstrating the Webpage Workflow", blocks: [media("video")] },
      {
        id: "problems",
        title: "Problems Encountered and Their Solutions",
        blocks: [
          {
            type: "table",
            headers: ["Problem", "Solution"],
            rows: [
              ["Writes to the database were rejected (permission denied)", "Rules require a signed-in user (auth != null). The ESP32 now signs in with a Firebase user and the sketch checks Firebase.ready() first."],
              ["DHT11 sometimes returned invalid readings", "Added the isnan() check so bad readings are discarded instead of being uploaded."],
              ["Dashboard did not show values", "ESP32 and dashboard must use the same database paths and the same Firebase project configuration."],
              ["Bulb state out of step with the dashboard", "The ESP32 reads /iot/control/bulb continuously and only switches the relay when the value changes."],
              ["Upload and Wi-Fi interruptions", "Firebase.reconnectWiFi(true) and the Firebase.ready() guard keep the loop safe."],
            ],
          },
        ],
      },
      {
        id: "reflection",
        title: "Brief Reflection on the Assignment",
        blocks: [
          p("This task turned the ESP32 from a standalone device into part of a cloud-connected system. I learned how cloud databases, real-time synchronisation, authentication and authorization fit together, how sensor data travels from hardware to an authenticated web dashboard and how commands travel back to switch a relay. The most valuable lesson was integrating the sensors, the firmware, the cloud and the web interface into one working pipeline."),
        ],
      },
    ],
    checklist: [
      { label: "Objective of the Firebase IoT monitoring system", section: "objective" },
      { label: "Basic concept of Cloud Computing", section: "cloud" },
      { label: "IaaS, PaaS, SaaS, and BaaS explained", section: "service-models" },
      { label: "What a Cloud Platform is", section: "platform" },
      { label: "What a Database is", section: "database" },
      { label: "Firebase Realtime Database explained", section: "rtdb" },
      { label: "What a Cloud-Based Dashboard is", section: "dashboard-concept" },
      { label: "Authentication and the purpose of a login system", section: "auth" },
      { label: "Difference between Authentication and Authorization", section: "authz" },
      { label: "Firebase project setup documented", section: "setup" },
      { label: "Firebase Authentication configuration documented", section: "auth-config" },
      { label: "Realtime Database structure documented", section: "db-structure" },
      { label: "Database/data-flow architecture", section: "architecture" },
      { label: "Complete dashboard source code", section: "dashboard-code" },
      { label: "Screenshots of the login page", section: "login-shots", slot: "login" },
      { label: "Screenshots of the Firebase database", section: "firebase-shots", slot: "firebase" },
      { label: "Screenshots of the working dashboard", section: "dashboard-shots", slot: "dashboard" },
      { label: "Video demonstrating webpage workflow", section: "video", slot: "video" },
      { label: "Problems encountered and their solutions", section: "problems" },
      { label: "Brief reflection on the assignment", section: "reflection" },
    ],
  },

  // =========================================================================
  // TASK 5
  // =========================================================================
  {
    id: "project-5",
    slug: "task-5",
    num: "05",
    title: "Task 5 — Firebase Logging, Automation & Data Export",
    category: "Firebase · Automation & Data Logging",
    shortIntro:
      "Completed the system: manual and automatic (LDR threshold) bulb control, periodic historical logging to Firebase, charts, a history table on the dashboard and CSV export.",
    coverImage: `${COVER}/Task 5/Firebase IoT Monitoring Workflow.png`,
    repositoryUrl: `${REPO}/tree/Harinath07-Assignment-5`,
    activity: {
      summary:
        "Combined monitoring, manual/automatic control, threshold automation and historical logging with CSV export in one IoT application.",
      bullets: [
        "Added MANUAL and AUTO modes with a configurable light threshold.",
        "Logged a record (time, temperature, humidity, light, bulb, mode) every 30 seconds.",
        "Showed history in a table and charts on the dashboard.",
        "Exported the recorded data as a CSV file from the browser.",
      ],
    },
    media: {
      monitoring: photo("DHT11 and LDR monitoring demonstrated", "Serial Monitor and dashboard showing temperature, humidity and light level"),
      modes: photo("Manual / automatic mode (extra)", "Mode switch, threshold setting and the bulb responding"),
      firebase: photo("Screenshots of the Firebase log data", "Realtime Database /history records and control values"),
      dashboard: photo("Screenshots of the dashboard and data visualization", "Live cards, charts and history table"),
      csv: photo("Downloaded CSV file demonstrated", "The exported file opened in Excel or Google Sheets"),
      photos: photo("Photographs of the complete prototype", "ESP32, DHT11, LDR, relay and bulb"),
      video: video("Video demonstrating the complete system", "Sensing, mode change, automatic switching, history and CSV export"),
    },
    sections: [
      {
        id: "objective",
        title: "Objective of the Complete IoT System",
        blocks: [
          p("Objective: build a more complete IoT application by combining sensor monitoring, cloud storage, manual control, automatic control, threshold-based automation, historical data logging, a web dashboard and CSV export."),
          p("Task 4 showed current readings only. Current values alone cannot show how a room changes over time or when the light automation acted, so this task adds history, automation and data export on top of the Firebase system."),
        ],
      },
      {
        id: "architecture",
        title: "Final System Architecture",
        blocks: [
          {
            type: "diagram",
            text: `  DHT11 (temp, humidity)      LDR (light level)
            └────────────┬───────────────┘
                         ▼
                       ESP32
        read sensors · mode logic · history log
                         │  Wi-Fi
                         ▼
          Firebase Realtime Database
     sensors / control / history      Authentication
                         │
                         ▼
                   Web Dashboard
   live cards · mode & threshold · charts · history · CSV
                         │  control values
                         ▼
                       ESP32 → relay (GPIO 23) → bulb`,
            caption: "Final architecture: Sensing → ESP32 → Firebase → Dashboard → Relay / Bulb.",
          },
          p("Layers: sensing (DHT11, LDR), processing (ESP32), cloud (Firebase Realtime Database and Authentication), application (dashboard) and output (relay and bulb)."),
        ],
      },
      {
        id: "monitoring",
        title: "DHT11 Temperature and Humidity Monitoring Demonstrated",
        blocks: [
          p("readSensors() reads temperature and humidity from the DHT11 on GPIO 4 every 5 seconds, keeps the last valid value when a reading fails, prints the values on the Serial Monitor and uploads them to Firebase."),
          media("monitoring"),
        ],
      },
      {
        id: "ldr-monitoring",
        title: "LDR-Based Light Level Monitoring Demonstrated",
        blocks: [
          p("The LDR forms a voltage divider with a 10 kΩ resistor. analogRead(34) returns 0–4095: with this wiring a darker room gives a lower number, which is why the automatic mode turns the bulb on when the value falls below the threshold. The value is shown in the Serial Monitor, uploaded to Firebase and displayed on the dashboard (\"Ambient light\"). The monitoring evidence above covers both sensors."),
        ],
      },
      {
        id: "manual",
        title: "Manual Bulb Control Implemented",
        blocks: [
          p("In MANUAL mode the bulb follows the Bulb switch in Firebase. The dashboard's Turn on / Turn off buttons write true or false to /iot/control/bulb; the ESP32 reads it every 2 seconds and drives the relay on GPIO 23."),
        ],
      },
      {
        id: "auto",
        title: "Automatic Bulb Control Using LDR Implemented",
        blocks: [
          p("In AUTO mode the ESP32 decides by itself. automaticLightControl() compares the LDR value with the stored threshold: below the threshold means dark and the bulb is turned ON; otherwise it is turned OFF. The result is written back to /iot/control/bulb so the dashboard shows the real state."),
        ],
      },
      {
        id: "modes",
        title: "Manual / Automatic Mode Implemented and Documented",
        blocks: [
          {
            type: "table",
            headers: ["", "MANUAL", "AUTO"],
            rows: [
              ["Who decides", "The user, from the dashboard", "The ESP32, from the LDR reading"],
              ["Input used", "/iot/control/bulb", "LDR value and /iot/control/threshold"],
              ["Bulb ON when", "Bulb switch is ON", "Light level < threshold (dark)"],
              ["Switching modes", "Dashboard Manual / Automatic buttons write /iot/control/mode", "Same control"],
            ],
          },
          media("modes"),
        ],
      },
      {
        id: "logic",
        title: "Logic Used for Automatic Lighting Explained",
        blocks: [
          {
            type: "diagram",
            text: `loop() every 2 s
   read mode, threshold, bulb from Firebase
   if mode == "AUTO":
        if lightLevel < threshold   →  DARK   →  bulb = ON
        else                        →  LIGHT  →  bulb = OFF
        relay = bulb ;  write bulb state back to /iot/control/bulb
   else (MANUAL):
        relay = bulb value set on the dashboard`,
            caption: "Decision logic in automaticLightControl() and manualLightControl().",
          },
        ],
      },
      {
        id: "threshold",
        title: "LDR Threshold / Calibration Method Documented",
        blocks: [
          p("The threshold depends on the sensor, the 10 kΩ resistor and the room, so it is not a fixed number. The firmware starts with 1500 and the dashboard can change it (0–4095) without re-flashing."),
          steps(
            "Open the Serial Monitor or the dashboard and note the light value in a bright room.",
            "Cover the LDR or switch off the lights and note the value in the dark.",
            "Choose a threshold between the two readings, so that \"dark\" switches the bulb on without flickering around the limit.",
            "Enter the value in the dashboard and press Save; it is stored in /iot/control/threshold.",
            "Re-test in both conditions and adjust if the bulb switches too early or too late."
          ),
        ],
      },
      {
        id: "history",
        title: "Historical Data Logging in Firebase Implemented",
        blocks: [
          p("Every 30 seconds (LOG_INTERVAL) createHistoryLog() pushes a new record under /iot/history using push(), which gives each record a unique, time-ordered key. The 30-second interval keeps the database small enough for the free plan while still giving a useful history."),
          { type: "code", file: "task5-firebase-logging.ino", title: "task5-firebase-logging.ino", lang: "cpp", caption: "Complete Task 5 firmware: sensors, mode logic and history logging. Replace the YOUR_ placeholders." },
          {
            type: "table",
            headers: ["Code section", "What it does"],
            rows: [
              ["SENSOR_INTERVAL 5000", "Reads sensors and uploads current values every 5 s"],
              ["CONTROL_INTERVAL 2000", "Reads mode, threshold and bulb from Firebase every 2 s"],
              ["LOG_INTERVAL 30000", "Appends a history record every 30 s"],
              ["readControlSettings()", "Loads /iot/control/mode, threshold and bulb"],
              ["automaticLightControl() / manualLightControl()", "Implements the two modes"],
              ["createHistoryLog()", "Pushes a record with timestamp, temperature, humidity, light level, bulb status and mode"],
            ],
          },
        ],
      },
      {
        id: "log-structure",
        title: "Database Structure Used for Logs Documented",
        blocks: [
          {
            type: "diagram",
            text: `iot
├── sensors
│   ├── temperature
│   ├── humidity
│   └── lightLevel
├── control
│   ├── mode          "AUTO" | "MANUAL"
│   ├── threshold     int  (default 1500)
│   └── bulb          bool
└── history
    └── <push-id>            (one record per log)
        ├── timestamp
        ├── temperature
        ├── humidity
        ├── lightLevel
        ├── bulbStatus
        └── mode`,
            caption: "Realtime Database layout written by the Task 5 firmware.",
          },
          {
            type: "table",
            headers: ["Field", "Type", "Meaning"],
            rows: [
              ["timestamp", "string", "Time marker of the record (the device's millis() counter, see limitations)"],
              ["temperature", "float", "°C from the DHT11"],
              ["humidity", "float", "% relative humidity from the DHT11"],
              ["lightLevel", "int", "LDR ADC value 0–4095"],
              ["bulbStatus", "bool", "Bulb state when the record was written"],
              ["mode", "string", "AUTO or MANUAL"],
            ],
          },
        ],
      },
      {
        id: "recorded",
        title: "Timestamped Readings and Recorded Values",
        blocks: [
          p("Each history record contains: a timestamp, temperature and humidity (DHT11), the LDR light level, the bulb status and the operating mode. That covers the timestamped readings, the temperature and humidity values, the light-level values and the bulb status and mode."),
          {
            type: "table",
            headers: ["Recorded item", "Stored as", "Source in code"],
            rows: [
              ["Timestamped sensor readings", "timestamp", "String(millis()) when the record is created"],
              ["Temperature and humidity", "temperature, humidity", "dht.readTemperature() / readHumidity()"],
              ["LDR / light-level values", "lightLevel", "analogRead(LDR_PIN)"],
              ["Bulb status and operating mode", "bulbStatus, mode", "Current bulb state and mode variable"],
            ],
          },
        ],
      },
      {
        id: "dashboard-history",
        title: "Historical Data Displayed on the Dashboard",
        blocks: [
          p("The dashboard has a History panel with a table (Time, Temperature, Humidity, LDR, Bulb, Mode) filled from the history records in Firebase, sorted by time."),
          { type: "code", file: "dashboard-index.html", title: "public/index.html (History panel, charts, CSV button)", lang: "html" },
        ],
      },
      {
        id: "charts",
        title: "Graph / Chart for Recorded Sensor Data",
        blocks: [
          p("Three charts — Temperature, Humidity and Ambient light — are drawn from the recorded history by renderCharts() in the dashboard, so trends over time are visible without reading the table."),
        ],
      },
      {
        id: "csv",
        title: "CSV Data Download Implemented",
        blocks: [
          p("The Download CSV button builds a CSV text from the history records the dashboard has loaded, wraps it in a Blob and starts a browser download named home-monitoring-history.csv. Columns: Timestamp, Temperature, Humidity, LDR, Bulb State, Operating Mode. No server is involved; it all happens in the browser."),
          { type: "code", file: "dashboard-app.js", title: "public/app.js (see the CSV section)", lang: "javascript" },
        ],
      },
      {
        id: "csv-file",
        title: "Downloaded File Demonstrated to Contain the Recorded Data",
        blocks: [media("csv")],
      },
      { id: "firebase-shots", title: "Screenshots of the Firebase Log Data", blocks: [media("firebase")] },
      { id: "dashboard-shots", title: "Screenshots of the Dashboard and Data Visualization", blocks: [media("dashboard")] },
      { id: "photos", title: "Photographs of the Complete Prototype", blocks: [media("photos")] },
      { id: "video", title: "Video Demonstrating the Complete System", blocks: [media("video")] },
      {
        id: "circuit",
        title: "Circuit / Wiring and Pin Connections",
        blocks: [
          { type: "image", src: "/week-7/diagrams/task-5-circuit.svg", caption: "Task 5 uses the same hardware as Task 4." },
          sensorPins,
          sensorHardware,
          mainsSafety,
        ],
      },
      {
        id: "problems",
        title: "Problems Encountered and Solutions Implemented",
        blocks: [
          {
            type: "table",
            headers: ["Problem", "Solution"],
            rows: [
              ["Choosing a light threshold that works in the room", "Read the LDR in bright and dark conditions, picked a value between them and made it editable from the dashboard."],
              ["Manual commands and automatic logic fighting each other", "Two explicit modes: manual commands drive the relay only in MANUAL, the LDR logic only in AUTO."],
              ["Database growing too quickly", "Logging uses its own 30-second timer instead of writing on every loop iteration."],
              ["Live values mixed with history", "Separate branches: sensors for current values, control for settings, history for records."],
              ["DHT11 returning invalid readings", "readSensors() only replaces the stored value when the new reading is a number."],
              ["NoSQL data is not a spreadsheet", "The dashboard converts the history records into comma-separated rows and downloads them as CSV."],
            ],
          },
        ],
      },
      {
        id: "limitations",
        title: "Limitations of the Current Prototype",
        blocks: [
          list(
            "The history timestamp is the board's millis() counter (time since power-up), not real clock time; there is no NTP or real-time clock yet.",
            "DHT11 accuracy is limited (roughly ±2 °C and ±5 % RH) and it updates slowly.",
            "The LDR reading is uncalibrated and non-linear, so the threshold must be tuned by hand for each room.",
            "The ESP32 polls Firebase every 2 seconds instead of using a streaming listener.",
            "History is never trimmed, so it grows without limit and could exceed free-plan quotas over time.",
            "Rules only require a signed-in user; there is no role-based authorization.",
            "Wi-Fi and Firebase credentials are stored in the firmware.",
            "There is no offline buffering: readings are lost while Wi-Fi is down.",
            "A mains bulb needs a properly isolated relay and enclosure."
          ),
        ],
      },
      {
        id: "future",
        title: "Possible Future Improvements",
        blocks: [
          list(
            "Add NTP time synchronisation (or an RTC) so each record has a real date and time.",
            "Use a more accurate sensor (DHT22, BME280) and a calibrated light sensor.",
            "Use Firebase streaming (listeners) instead of polling.",
            "Automatically delete or aggregate old history records.",
            "Add role-based access control and stricter database rules.",
            "Use PIR occupancy detection and adaptive lighting algorithms.",
            "Mobile app integration and push notifications for alerts.",
            "Energy-consumption monitoring and anomaly detection.",
            "Store credentials outside the source code (provisioning or secure storage)."
          ),
        ],
      },
      {
        id: "reflection",
        title: "Final Learning Reflection",
        blocks: [
          p("This task brought together everything from the IoT unit: sensing, cloud storage, remote control, automation, history and data export. Splitting control into manual and automatic modes taught me to design systems that stay predictable for the user, and tuning the LDR threshold showed me why hardware must be tested in real conditions. Turning stored data into a CSV file showed how IoT readings become useful for analysis and reporting."),
        ],
      },
    ],
    checklist: [
      { label: "Objective of the complete IoT system", section: "objective" },
      { label: "Final system architecture documented", section: "architecture" },
      { label: "DHT11 Temperature and Humidity Monitoring demonstrated", section: "monitoring", slot: "monitoring" },
      { label: "LDR-based Light Level Monitoring demonstrated", section: "ldr-monitoring", slot: "monitoring" },
      { label: "Manual Bulb Control implemented", section: "manual" },
      { label: "Automatic Bulb Control using LDR implemented", section: "auto" },
      { label: "Manual / Automatic Mode implemented and documented", section: "modes" },
      { label: "Logic used for automatic lighting explained", section: "logic" },
      { label: "LDR threshold/calibration method documented", section: "threshold" },
      { label: "Historical data logging in Firebase implemented", section: "history" },
      { label: "Database structure used for logs documented", section: "log-structure" },
      { label: "Timestamped sensor readings recorded", section: "recorded" },
      { label: "Temperature and humidity values recorded", section: "recorded" },
      { label: "LDR/light-level values recorded", section: "recorded" },
      { label: "Bulb status and operating mode recorded", section: "recorded" },
      { label: "Historical data displayed on the dashboard", section: "dashboard-history" },
      { label: "Graph/chart for recorded sensor data included (if implemented)", section: "charts" },
      { label: "CSV data download implemented", section: "csv" },
      { label: "Downloaded file demonstrated to contain the recorded data", section: "csv-file", slot: "csv" },
      { label: "Screenshots of the Firebase log data", section: "firebase-shots", slot: "firebase" },
      { label: "Screenshots of the dashboard and data visualization", section: "dashboard-shots", slot: "dashboard" },
      { label: "Photographs of the complete prototype", section: "photos", slot: "photos" },
      { label: "Video demonstrating the complete system", section: "video", slot: "video" },
      { label: "Problems encountered and solutions implemented", section: "problems" },
      { label: "Limitations of the current prototype explained", section: "limitations" },
      { label: "Possible future improvements suggested", section: "future" },
      { label: "Final learning reflection included", section: "reflection" },
      { label: "All source code and project files available in the repository", section: "repo" },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
