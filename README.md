# AI Digital Twin & Production RAG Architecture
### Interactive Portfolio & Generative Career Twin of Prasanna Prabhakaran (Prasanna Raja)

[![Live Web Application](https://img.shields.io/badge/Live%20Demo-prasannaraja.github.io-0A66C2?style=for-the-badge&logo=googlechrome&logoColor=white)](https://prasannaraja.github.io/)
[![Architecture](https://img.shields.io/badge/Architecture-Production--Grade%20RAG-7952B3?style=for-the-badge&logo=diagramsdotnet&logoColor=white)](#-rag--system-architecture)
[![Tech Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20Node.js%20%7C%20Gemini%20%7C%20Prisma%20%7C%20FastAPI-009688?style=for-the-badge&logo=react&logoColor=white)](#-technical-stack--ecosystem)
[![Multilingual](https://img.shields.io/badge/Languages-EN%20%7C%20DE%20%7C%20FR-4CAF50?style=for-the-badge)](https://prasannaraja.github.io/)

---

## 🎯 Executive Overview

This repository powers the **AI Digital Twin & Intelligent Portfolio** for **Prasanna Prabhakaran (Prasanna Raja)** — a Senior Software Engineer & Technical Architect with **15+ years of post-degree enterprise engineering experience** (and 18+ years of total technical track record) across **Malta & EU, the UAE, the UK, and India**.

Instead of presenting a static resume, this project demonstrates an end-to-end, enterprise-grade **Retrieval-Augmented Generation (RAG)** decision intelligence system. Technical Managers, Hiring Leaders, and HR teams can interact with the digital twin to interrogate architectural depth, delivery history, technology trade-offs, and live Job Description alignments.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                    LIVE CAPABILITIES                                   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  ⚡ Zero-Hallucination Grounding : Strict cosine similarity floor (0.45) on 23 chunks   │
│  🌐 Multilingual Intelligence   : Native reasoning & vector routing in EN, DE, & FR   │
│  🔍 Autonomous Web Crawler      : Ingests live external JD URLs (FastAPI + Crawl4AI)   │
│  📊 Telemetry & Question Mining : Prisma ORM SQLite query analytics & missing skill log│
│  🛡️ Enterprise Security         : SSRF DNS validation, prompt guardrails, PII filters  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏛️ System Architecture

```
+─────────────────────────────────────────────────────────────────────────────────────────+
|                                  CLIENT & CONSUMER TIER                                 |
+─────────────────────────────────────────────────────────────────────────────────────────+
   │                                                                           │
   │  HTTPS (Port 443 / CORS)                                                  │ JSON-RPC (Stdio)
   ▼                                                                           ▼
+─────────────────────────────────────────+                         +─────────────────────+
|     prasannaraja.github.io (v2)         |                         |  Claude Code / AGY  |
|  React 18 + TS + Tailwind + Redux       |                         |  Model Context MCP  |
|  Multilingual (EN, DE, FR)              |                         +─────────────────────+
+─────────────────────────────────────────+                                    │
   │                                                                           │
   │ REST (POST /api/twin/chat)                                                │
   ▼                                                                           │
+──────────────────────────────────────────────────────────────────────────────┴──────────+
|                    ENTERPRISE BACKEND SERVICE (career-core-service)                     |
|                    Node.js 20 + Express.js (Docker on Linux Server)                     |
+─────────────────────────────────────────────────────────────────────────────────────────+
   │                                                               
   ├── 1. Input Guardrails & SSRF Pre-flight ──► Block malicious injection / IP scans
   │
   ├── 2. Live Web Crawler Dispatch (FastAPI + Crawl4AI + Playwright Chromium)
   │      └── When external JD URL is detected ──► Fetches LLM-ready fit_markdown
   │
   ├── 3. Semantic Vector Search (Cosine Similarity Engine)
   │      ├── Dense Embeddings : Google Gemini text-embedding-004 (768 Dimensions)
   │      ├── Deterministic Hash : Local normalization fallback engine
   │      └── Multi-Locale Store : career_vectors_en / de / fr (23 Chunks / Locale)
   │
   ├── 4. Dual-Context Dynamic LLM Synthesis
   │      ├── Marquee Enrichment : KPMG Katalyst, Geographic Timeline Matrix, Distributed Systems
   │      ├── Prioritized Fallback : gemini-flash-latest ──► gemini-3.1-flash ──► gemini-pro
   │      └── First-Person Persona : Google XYZ formula achievement framing
   │
   └── 5. Telemetry & Analytics Engine (Prisma ORM + SQLite dev.db)
          └── Logs question frequency, query categories, response latencies, and knowledge gaps
```

---

## 🧠 Deep-Dive: Enterprise RAG Pipeline Engineering

### 1. High-Density Semantic Chunking Strategy
Standard RAG pipelines often chunk text arbitrarily by character count (e.g. 500 characters), which tears apart technical narratives, metrics, and project constraints.

Our custom chunker ([`chunker.js`](file:///software-engineer/core/database/source-of-truth/src/chunker.js)) employs **Semantic Entity Chunking**:
- **Discrete Bounded Contexts:** Segmented into exactly **23 discrete chunks** per language (Project Milestones, Architecture Competencies, System Chronology, and Career Matrices).
- **Enriched Metadata Injection:** Every chunk contains structured headers (`id`, `title`, `category`, `company`, `role`, `period`, `country`, `duration`).
- **Pre-Aggregated Chronology Matrix:** Centralized geographic matrix pre-calculating tenures across India (11–12 yrs), UAE (2 yrs), and Malta/EU (almost 5 yrs), preventing aggregate duration hallucinations.

### 2. Live Job Description Alignment (Dual-Context RAG)
When a recruiter pastes a live Job Description URL or text snippet into the chatbot:
1. The backend routes the request to our **Crawl4AI Microservice** ([`core/ai-agents/web-search`](file:///software-engineer/core/ai-agents/web-search)).
2. An async headless **Chromium browser** renders the page, bypasses dynamic JS, and strips DOM clutter into clean `fit_markdown`.
3. The LLM performs **Dual-Context Synthesis**: mapping each requirement from the target JD directly against Prasanna's 15+ years of post-degree .NET Core microservices, cloud systems (Azure), and production GenAI pipelines.

### 3. Hallucination Prevention & Guardrails
- **Strict Confidence Floor (0.45):** Queries with low semantic overlap with the knowledge base trigger a graceful, honest boundary response rather than speculative fabrication.
- **SSRF Defense Layer:** Pre-flight DNS resolution validates destination IPs to strictly block private networks (`10.0.0.0/8`, `192.168.0.0/16`), loopbacks (`127.0.0.1`), and cloud metadata services (`169.254.169.254`).
- **Prompt Injection Defense:** Input sanitation strips common system-override jailbreaks.

---

## 🛠️ Technical Stack & Ecosystem

| Tier | Technologies & Frameworks | Key Highlights |
| :--- | :--- | :--- |
| **Frontend (UI / UX)** | React 18, TypeScript, Tailwind CSS, Vite, Redux Toolkit, Lucide Icons | Dark/Light Mode, Fully Responsive, EN/DE/FR Locale Switcher, Markdown Streaming |
| **Backend (API Layer)** | Node.js 20, Express.js, Prisma ORM, SQLite (`dev.db`), Docker | Clean REST APIs, Telemetry Ingestion, Dynamic Model Fallback Chain |
| **Vector & RAG Engine** | Google Gemini `text-embedding-004` (768-dim), Cosine Similarity, Custom Chunker | Multilingual Indexing (23 Chunks/locale), Deterministic Hash Fallback |
| **Agent Microservices** | Python 3.11, FastAPI, Crawl4AI, Playwright (Headless Chromium), Uvicorn | Async web scraping, DNS SSRF Validation, TTL In-Memory Caching |
| **Agent Tooling (MCP)** | Model Context Protocol (`@modelcontextprotocol/sdk`) | Stdio JSON-RPC interface exposing career tools directly to AI Agents |
| **CI / CD & Infra** | GitHub Actions, GitHub Pages, Linux Home Server, Nginx, Let's Encrypt SSL | Automated testing, build pipeline, Docker container orchestration |

---

## 📊 Monorepo Structure

```
career-workspace/
├── software-engineer/                   # 💻 Software Engineering & Digital Twin Platform
│   ├── core/                            # Intelligence & Backend Services
│   │   ├── services/                    # Express.js REST API & Gemini RAG Engine
│   │   │   ├── ragService.js            # Vector retrieval, prompt synthesis & fallback chain
│   │   │   ├── guardrails/              # SSRF & input sanitization filters
│   │   │   ├── telemetry/               # Prisma analytics & query logging
│   │   │   └── Dockerfile               # Node 20 Alpine production image
│   │   │
│   │   ├── database/source-of-truth/    # Master Knowledge Base & Embeddings
│   │   │   ├── about-me/                # Master ground-truth knowledge bases (EN, DE, FR)
│   │   │   ├── src/chunker.js           # 23-chunk semantic segmenter
│   │   │   ├── src/embeddings.js        # Gemini text-embedding-004 generator
│   │   │   └── data/                    # Pre-indexed vector stores
│   │   │
│   │   ├── tools/                       # Model Context Protocol (MCP) Server
│   │   │   ├── index.js                 # Stdio MCP Server interface
│   │   │   └── test-mcp.js              # Automated integration tests
│   │   │
│   │   └── ai-agents/web-search/        # Autonomous URL Crawler Microservice
│   │       ├── app.py                   # FastAPI SSRF-guarded endpoint
│   │       ├── crawler.py               # Crawl4AI markdown extractor
│   │       └── Dockerfile               # Python 3.11 + Playwright runtime
│   │
│   ├── career-docs/                     # Master Documentation & Regional CVs
│   │   └── senior-software-engineer/    # Markdown resumes, ATS exports, JSON datasets
│   │
│   └── frontend/prasannaraja.github.io/ # React Web Portfolio (Deployed to GitHub Pages)
│       └── v2/my-career-twin/           # Active Modern React 18 + TS UI
│
├── occupational-therapist/              # 🏥 Occupational Therapy (Evelyn Brinnel)
│   └── career-docs/                     # CPCM Malta credentials & pediatric profiles
│
└── openspec/                            # 📋 Specification-Driven Change Management
```

---

## 🚀 Quick Start (Local Full-Stack Setup)

### 1. Prerequisites
- **Node.js**: `v20.x` or higher
- **Python**: `v3.11+` (for optional crawler microservice)
- **API Key**: Google Gemini API key (`GEMINI_API_KEY`)

### 2. Automated All-In-One Runner
Run the verified local test runner from the root directory:
```bash
# Clone the repository
git clone https://github.com/prasannaraja/career-workspace.git
cd career-workspace

# Run complete stack (Backend API + MCP Server Tests + React Dev Server)
./run-digital-twin.sh
```

### 3. Manual Component Execution
```bash
# A. Start Frontend (React + Vite)
cd software-engineer/frontend/prasannaraja.github.io/v2/my-career-twin
npm install
npm run dev

# B. Start Core Backend Service (Node.js Express)
cd software-engineer/core/services
npm install
npm run dev

# C. Run MCP Server Tests
cd software-engineer/core/tools
npm test

# D. Rebuild Vector Indexes (English, German, French)
cd software-engineer/core/database/source-of-truth
npm run ingest:all
```

---

## 👨‍💻 Professional Profile & Contact

**Prasanna Prabhakaran (Prasanna Raja)**  
*Senior Software Engineer & Technical Architect*  
📍 Marsa / Valletta, Malta (EU Resident / Maltese Citizen ID)

- 🌐 **Live Digital Twin**: [prasannaraja.github.io](https://prasannaraja.github.io/)
- 💼 **LinkedIn**: [linkedin.com/in/prasannaraja](https://www.linkedin.com/in/prasannaraja/)
- 🐙 **GitHub**: [github.com/prasannaraja](https://github.com/prasannaraja)
- ✉️ **Email**: prasannaraja@msn.com / heyprasanna@yahoo.com
- 📱 **Phone / WhatsApp**: +356 9997 0397 / +971 506057610 / +91 9019222758

---
*Architected & engineered with precision to demonstrate production GenAI, scalable cloud architecture, and modern full-stack engineering.*

