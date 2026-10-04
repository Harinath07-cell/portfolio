"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Cpu,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Table,
  ArrowRight,
  ShieldCheck,
  Activity,
  Box,
  Github,
  ExternalLink
} from "lucide-react";
import { PROJECTS } from "./projects-data";

// 5 Activities for Week 7
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
    title: "Adafruit IO Cloud Dashboard & MQTT Built-in LED Control",
    category: "Adafruit IO & MQTT",
    summary:
      "Connected ESP32 to Adafruit IO using MQTT publish/subscribe protocol to remotely control the onboard LED via a cloud dashboard with bidirectional status feedback.",
    details: [
      "Configured Adafruit IO MQTT broker credentials, feeds (led-control, led-status), and dashboard widgets.",
      "Implemented Adafruit MQTT Library in Arduino IDE to establish persistent socket over port 1883.",
      "Handled remote 'ON' and 'OFF' MQTT subscription payloads to toggle GPIO 2 built-in LED.",
      "Published state confirmations back to Adafruit IO to synchronize cloud dashboard indicators in real time."
    ]
  },
  {
    id: "act-3",
    num: "03",
    title: "IFTTT + Adafruit IO Cloud IoT Automation",
    category: "Cloud Automation",
    summary:
      "Automated ESP32 built-in LED switching by linking external condition triggers in IFTTT with Adafruit IO feeds and MQTT messaging.",
    details: [
      "Configured Adafruit IO MQTT feeds ('automation-trigger' and 'device-status') for automated cloud routing.",
      "Built IFTTT Applet connecting event triggers with Adafruit IO service actions.",
      "Implemented ESP32 firmware subscribing to trigger feed and controlling GPIO 2 LED.",
      "Published execution confirmation back to Adafruit IO to maintain synchronized cloud telemetry."
    ]
  },
  {
    id: "act-4",
    num: "04",
    title: "Firebase IoT Realtime Monitoring Dashboard & Bulb Control",
    category: "Cloud Database (BaaS)",
    summary:
      "Integrated ESP32 with Firebase Realtime Database and Authentication to log DHT11/LDR sensor readings and toggle remote bulb loads via a responsive web dashboard.",
    details: [
      "Configured Firebase project with Authentication and Realtime Database NoSQL schema.",
      "Interfaced DHT11 sensor (GPIO 4) and LDR analog voltage divider (GPIO 34) on ESP32.",
      "Uploaded periodic temperature, humidity, and ambient light telemetry to Firebase RTDB.",
      "Synchronized bidirectional bulb actuation commands between web dashboard and ESP32 GPIO."
    ]
  },
  {
    id: "act-5",
    num: "05",
    title: "Firebase Logging, Automation & CSV Data Export",
    category: "Cloud Analytics & Automation",
    summary:
      "Engineered an automated environmental lighting and logging system using ESP32, Firebase RTDB, and NTP time sync with manual/auto modes and client-side CSV data export.",
    details: [
      "Synchronized ESP32 RTC with pool.ntp.org time servers to generate ISO timestamps.",
      "Implemented dual-mode logic: manual dashboard control vs. automated LDR light-threshold switching.",
      "Logged periodic multi-sensor snapshot records to '/iot/history' in Firebase Realtime Database.",
      "Built client-side data export parsing cloud JSON snapshots into downloadable spreadsheet CSV files."
    ]
  }
];

// Component Specs Table Data
const COMPONENTS_TABLE = [
  {
    name: "ESP32 NodeMCU Development Board",
    category: "Microcontroller",
    specs: "Dual-core Tensilica LX6 @ 240MHz, 520KB SRAM, 802.11 b/g/n Wi-Fi",
    use: "Primary edge processing unit hosting HTTP server, MQTT client, and Firebase RTDB client."
  },
  {
    name: "DHT11 Sensor Module",
    category: "Digital Environmental Sensor",
    specs: "Temperature: 0–50°C (±2°C), Humidity: 20–90% RH (±5% RH), Single-bus digital output",
    use: "Measures ambient room temperature and relative humidity connected to ESP32 GPIO 4."
  },
  {
    name: "LDR (Light Dependent Resistor)",
    category: "Analog Optical Sensor",
    specs: "Cadmium Sulfide (CdS) photoresistor in 10kΩ voltage-divider configuration",
    use: "Detects ambient light level via ESP32 ADC1 channel on GPIO 34 for automated switching."
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
    use: "Physical high-voltage electrical device operated via MQTT and Firebase relay switching."
  },
  {
    name: "Built-in Board LED (GPIO 2)",
    category: "Visual Indicator",
    specs: "3.3V SMD LED on ESP32 PCB",
    use: "Visual verification for initial HTTP web server GET request and MQTT toggling."
  },
  {
    name: "Breadboard & Jumper Wires",
    category: "Prototyping Hardware",
    specs: "Male-to-Male & Female-to-Male DuPont jumper cables",
    use: "Establishes pin signal connections between ESP32 GPIO pins, sensors, and relay module."
  },
  {
    name: "Micro-USB Cable",
    category: "Power & Interface",
    specs: "USB 2.0 to Micro-USB 5V power cable",
    use: "Flashing ESP32 firmware via Arduino IDE and serial monitoring at 115200 baud."
  },
  {
    name: "Google Firebase Realtime Database",
    category: "Cloud Database (BaaS)",
    specs: "NoSQL JSON database with real-time WebSocket synchronization & Firebase Auth",
    use: "Stores environmental sensor telemetry and synchronizes bidirectional bulb control states."
  },
  {
    name: "Google Firebase Authentication",
    category: "Identity Provider",
    specs: "Email/Password sign-in provider with secure JWT bearer authentication",
    use: "Secures web dashboard access, ensuring only authorized operators access IoT controls."
  },
  {
    name: "NTP Time Server (pool.ntp.org)",
    category: "Time Protocol",
    specs: "Network Time Protocol synchronization over UDP port 123",
    use: "Synchronizes internal ESP32 clock for timestamping historical sensor database records."
  },
  {
    name: "Adafruit IO Cloud Broker",
    category: "Cloud Messaging Gateway",
    specs: "MQTT v3.1.1 protocol, TCP Port 1883 with feeds architecture",
    use: "Facilitates low-latency pub/sub message routing between remote interface and ESP32."
  },
  {
    name: "IFTTT Webhook Automation",
    category: "Cloud Event Routing",
    specs: "REST Webhook API & trigger-action Applet engine",
    use: "Translates external condition events into automated feed publication for hardware actuation."
  }
];

export default function Week7DashboardPage() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [openActivityId, setOpenActivityId] = useState<string | null>("act-1");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
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

          <div className="flex items-center gap-3">
            <span className="hidden md:inline font-mono text-xs uppercase tracking-wider text-cyan font-semibold">
              ProtoSem · Week 07
            </span>
            <a
              href="https://github.com/Harinath07-cell/IoT-Connectivity"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-3.5 py-1.5 text-xs font-mono font-medium text-cyan transition-all hover:bg-cyan hover:text-canvas"
            >
              <Github size={14} /> <span className="hidden sm:inline">IoT-Connectivity Repo</span><span className="sm:hidden">GitHub</span> <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* Section Navigation Tabs */}
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
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
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
              Connecting Hardware to the Web: ESP32, HTTP, MQTT, IFTTT & Firebase BaaS
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
                This week explored how microcontrollers communicate with modern web applications and cloud backend services. Through hands-on development using the ESP32 and Arduino IDE, I progressed from standalone local HTTP servers to cloud MQTT publish-subscribe messaging, IFTTT trigger automation, and complete BaaS cloud monitoring and historical data systems using Google Firebase.
              </p>

              {/* Stat Grid */}
              <div className="grid gap-4 pt-4 sm:grid-cols-3">
                <div className="rounded-xl border border-hairline bg-white/5 p-4 text-center">
                  <p className="font-display text-2xl font-bold text-cyan">05</p>
                  <p className="font-mono text-xs text-ink-muted mt-1">Featured Projects</p>
                </div>
                <div className="rounded-xl border border-hairline bg-white/5 p-4 text-center">
                  <p className="font-display text-2xl font-bold text-indigo-soft">12+</p>
                  <p className="font-mono text-xs text-ink-muted mt-1">Hardware Components</p>
                </div>
                <div className="rounded-xl border border-hairline bg-white/5 p-4 text-center">
                  <p className="font-display text-2xl font-bold text-cyan">05</p>
                  <p className="font-mono text-xs text-ink-muted mt-1">IoT Protocols & Clouds</p>
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
                  Click any project card below to open its dedicated project page with full 11-section documentation, source code, pin diagram & evidence.
                </p>
              </div>
              <span className="font-mono text-xs text-ink-faint">Section 03</span>
            </div>

            {/* Project Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((project) => (
                <Link
                  key={project.id}
                  href={`/protosem/week-7/${project.slug}`}
                  className="glass-panel group cursor-pointer overflow-hidden rounded-2xl border border-hairline p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50 hover:shadow-xl hover:shadow-cyan/10 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Card Image */}
                    <div className="overflow-hidden rounded-xl border border-hairline bg-canvas/40 aspect-video">
                      <img
                        src={encodeURI(project.coverImage || project.evidence.image)}
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
                    <span>Open Dedicated Task Page</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
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
                  Comprehensive table listing all hardware components, microcontrollers, relays, sensors, and cloud services utilized.
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
                    Fig: ESP32 development board, DHT11 sensor, LDR divider, relay module, and bulb load.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-display text-lg text-ink font-semibold">Hardware Integration Overview</h3>
                  <p className="text-xs leading-relaxed text-ink-muted">
                    Every project combined low-power microcontroller logic (3.3V/5V) with environmental sensors (DHT11, LDR) and isolated high-voltage AC load actuation (230V mains). Using optical isolation modules ensured zero electrical back-feed, protecting the ESP32 while enabling sub-second switching.
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
                  Working across HTTP, MQTT, IFTTT, and Firebase BaaS provided a comprehensive understanding of IoT networking models:
                </p>
                <ul className="space-y-2 text-xs text-ink-muted">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-cyan" />
                    <span><strong>Local HTTP Web Server:</strong> Best for standalone edge devices on local Wi-Fi without cloud dependencies.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-cyan" />
                    <span><strong>MQTT Cloud Broker:</strong> Optimized for low-bandwidth pub/sub message distribution with persistent two-way feeds.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-cyan" />
                    <span><strong>IFTTT Automation:</strong> Seamlessly bridges third-party event triggers and webhooks into IoT actuation pipelines.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-cyan" />
                    <span><strong>Firebase Realtime Database:</strong> High-performance BaaS providing real-time WebSocket state synchronization, user auth, and persistent historical records.</span>
                  </li>
                </ul>
              </div>

              <div className="glass-panel rounded-2xl p-6 space-y-3">
                <h3 className="flex items-center gap-2 font-display text-lg text-ink font-semibold">
                  <CheckCircle2 size={18} className="text-cyan" /> Educational Impact & Industry Readiness
                </h3>
                <p className="text-xs leading-relaxed text-ink-muted">
                  Week 7 bridged hardware electrical engineering with cloud software architecture. Progressing through all 5 tasks—from direct GPIO pin toggling to automated light threshold evaluation, historical database logging, and client-side CSV data export—provided real-world experience directly transferable to smart home automation, industrial telemetry, and commercial IoT platforms.
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
      </main>
    </div>
  );
}
