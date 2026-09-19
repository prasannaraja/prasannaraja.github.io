# Production-Grade AI Digital Twin & Multilingual RAG Architecture

[![Live Application](https://img.shields.io/badge/Live%20Demo-prasannaraja.github.io-0A66C2?style=for-the-badge&logo=googlechrome&logoColor=white)](https://prasannaraja.github.io/)
[![Architecture](https://img.shields.io/badge/Pattern-Dual--Context%20RAG-7952B3?style=for-the-badge&logo=diagramsdotnet&logoColor=white)](#-core-architecture--data-flow)
[![Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20Node.js%20%7C%20Gemini%20%7C%20Prisma%20%7C%20FastAPI-009688?style=for-the-badge&logo=react&logoColor=white)](#-engineering-stack)
[![Multilingual](https://img.shields.io/badge/Vector%20Locales-EN%20%7C%20DE%20%7C%20FR-4CAF50?style=for-the-badge)](https://prasannaraja.github.io/)

---

## ⚡ Technical Summary

This repository contains the architecture and implementation of a **Production-Grade, Multilingual Retrieval-Augmented Generation (RAG) Digital Twin**. 

Rather than relying on generic LLM prompts or unstructured document dumps, this system implements an end-to-end intelligent retrieval platform featuring **semantic entity chunking**, **deterministic embedding fallback chains**, **autonomous headless web crawling (Crawl4AI)** for real-time document comparison, **SSRF security guardrails**, and **telemetry-driven query gap analytics**.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                ARCHITECTURAL HIGHLIGHTS                                │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  🎯 Zero-Hallucination Retrieval : Dynamic cosine similarity floor with source binding │
│  🌐 Native Multilingual Stores   : Isolated vector stores for EN, DE, & FR queries     │
│  🕷️ Dual-Context Web Crawler    : Headless Chromium runtime for live JD & URL parsing  │
│  🛡️ Defense-in-Depth Security   : SSRF DNS validation, injection guards & CORS filters  │
│  📊 Query Analytics Engine       : Prisma ORM SQLite telemetry mining unanswered topics │
│  🤖 Model Context Protocol (MCP) : Stdio JSON-RPC interface for external agent tooling  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏛️ Core Architecture & Data Flow

```
+─────────────────────────────────────────────────────────────────────────────────────────+
|                                  CLIENT & AGENT CONSUMERS                               |
+─────────────────────────────────────────────────────────────────────────────────────────+
   │                                                                           │
   │  HTTPS (Port 443 / CORS)                                                  │ JSON-RPC (Stdio)
   ▼                                                                           ▼
+─────────────────────────────────────────+                         +─────────────────────+
|     Web UI (React 18 + TS + Redux)      |                         |  AI Agent Tooling   |
|  • Streaming Markdown Response Parser   |                         |  • Model Context    |
|  • Locale State (EN, DE, FR)            |                         |    Protocol (MCP)   |
+─────────────────────────────────────────+                         +─────────────────────+
   │                                                                           │
   │ REST (POST /api/twin/chat)                                                │
   ▼                                                                           │
+──────────────────────────────────────────────────────────────────────────────┴──────────+
|                    BACKEND CORE SERVICE (Express.js + Node.js 20)                       |
+─────────────────────────────────────────────────────────────────────────────────────────+
   │                                                               
   ├── 1. Security & Pre-Flight Guardrails
   │      ├── Prompt Injection Sanitization (Regex token boundary checks)
   │      └── SSRF Defense: DNS pre-flight checking for private/loopback/cloud IP ranges
   │
   ├── 2. Live Document Extraction (Autonomous Crawler Subsystem)
   │      ├── FastAPI + Crawl4AI + Playwright Headless Chromium
   │      └── Strips DOM bloat, tracking scripts, and cookie banners to return fit_markdown
   │
   ├── 3. Semantic Vector Retrieval Engine
   │      ├── Query Embedding: Google Gemini text-embedding-004 (768 Dimensions)
   │      ├── Fallback Vectorizer: Local deterministic semantic hashing (768 Dimensions)
   │      └── Cosine Similarity Search over localized vector stores (career_vectors_{locale}.json)
   │
   ├── 4. Dual-Context Context Assembly & Persona Injection
   │      ├── Merges Ground-Truth Chunks + Crawled External Markdown
   │      ├── Confidence Floor (0.45 threshold): Rejects low-confidence speculative hallucinations
   │      └── Injects Marquee Enterprise Context (Architecture patterns, metrics, timelines)
   │
   ├── 5. Multi-Model LLM Synthesis Chain
   │      └── gemini-flash-latest ──► gemini-3.1-flash-lite ──► gemini-3.5-flash ──► gemini-pro
   │
   └── 6. Telemetry & Analytics Mining (Prisma ORM + SQLite dev.db)
          └── Asynchronously logs query category, response latency, and knowledge gap metrics
```

---

## 🔬 Deep-Dive: Advanced Engineering Patterns

### 1. High-Density Semantic Entity Chunking
Traditional RAG pipelines naively split text by token or character count (e.g. 500 characters), which severs architectural relationships, project metrics, and technical constraints.

This platform utilizes **Domain-Bounded Semantic Entity Chunking**:
- **Bounded Bounded Contexts:** Content is segmented into **23 discrete, self-contained entity chunks** per language (Project Architectures, Core Competencies, Chronology Matrices, and Systems Engineering).
- **Metadata Injection:** Every chunk is enriched with structured headers (`category`, `company`, `role`, `period`, `country`, `duration`).
- **Pre-Aggregated Master Chronology Matrix:** Consolidates multi-year tenures across different countries into an authoritative reference chunk, preventing the LLM from hallucinating aggregate durations during multi-tenure questions.

```
Raw Markdown Knowledge Base
           │
           ▼
[Custom Semantic Chunker]
  ├── Extracts Frontmatter & Section Boundaries
  ├── Normalizes Tech Stacks & Impact Metrics
  └── Injects Metadata Tags
           │
           ▼
23 Structured JSON Chunks (EN / DE / FR)
           │
           ▼
[Batch Embeddings Generator (Gemini 768-dim)]
           │
           ▼
Pre-Computed Indexed Vector Stores (career_vectors_{locale}.json)
```

---

### 2. Dual-Context Web Ingestion (Crawl4AI Microservice)
When a user pastes a live URL (such as a Job Description, GitHub repo, or architecture article):
1. The backend automatically extracts the target hyperlink via regex boundary matching.
2. The URL is routed to the Python-based **Crawl4AI microservice** ([`core/ai-agents/web-search`](file:///software-engineer/core/ai-agents/web-search)).
3. A headless **Playwright Chromium** instance loads the page, executes required client-side JS, extracts the main readable content, and filters it into token-efficient `fit_markdown`.
4. The RAG engine feeds both contexts into the LLM prompt:
   - **Context A:** The external live document requirements.
   - **Context B:** Ground-truth architectural experience chunks.
5. The LLM performs **Dual-Context Capability Mapping**, point-by-point contrasting the external document requirements against actual engineering background.

---

### 3. Strict SSRF Defense & Security Architecture
Because the system ingests arbitrary user-supplied URLs, it enforces a strict **Defense-in-Depth SSRF Guardrail**:
- **Pre-Flight DNS Resolution:** Resolves target hostnames to concrete IP addresses prior to dispatching browser instances.
- **IP Blocklist Enforcement:** Verifies that resolved IPs are not:
  - Private subnets (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`)
  - Loopback adapters (`127.0.0.0/8`, `::1`)
  - Cloud Instance Metadata Endpoints (`169.254.169.254`)
  - Link-local or multicast ranges
- **Input Sanitization:** Strips common prompt-override delimiters and injection triggers before context concatenation.

---

### 4. Telemetry & Missing Knowledge Mining
Every interaction is asynchronously analyzed and stored via **Prisma ORM (SQLite)**:
- **Confidence Tracking:** Detects queries that hit the confidence floor (< 0.45 similarity).
- **Knowledge Gap Detection:** Automatically surfaces recurring keywords or technologies that are frequently asked about but absent from the ground-truth store, generating actionable suggestions for knowledge base augmentation.
- **Latency & Model Analytics:** Tracks inference latency across fallback models.

---

### 5. Model Context Protocol (MCP) Server Integration
The platform exposes a standard **MCP Server** over `stdio JSON-RPC` ([`core/tools`](file:///software-engineer/core/tools)), allowing autonomous coding agents (Claude Code, Antigravity, OpenCode) to directly invoke:
- `get_career_profile`: Structured biographical & technical entity query.
- `search_career_vectors`: Live semantic similarity search over career chunks.
- `get_skills_matrix`: Categorized competency lookup (.NET, Cloud, React, AI, DBs).
- `get_telemetry_analytics`: Query statistics and knowledge gap summaries.

---

## 🛠️ Engineering Stack

| Layer | Technologies | Architectural Role |
| :--- | :--- | :--- |
| **Frontend UI** | React 18, TypeScript, Tailwind CSS, Vite, Redux Toolkit | Responsive UI, state management, markdown streaming, dark/light persistence |
| **API & RAG Layer** | Node.js 20, Express.js, Prisma ORM, SQLite (`dev.db`) | REST endpoints, vector retrieval, prompt construction, telemetry mining |
| **Embedding Engine** | Google Gemini `text-embedding-004` (768-dim) | Dense vector generation with deterministic local fallback vectorizer |
| **LLM Synthesis** | Google Gemini 2.5 Flash / Flash-Lite / Pro | Dynamic multi-model fallback chain for high-speed streaming synthesis |
| **Agent Microservice** | Python 3.11, FastAPI, Crawl4AI, Playwright (Chromium) | Dynamic URL crawling, JS rendering, structured markdown extraction |
| **Agent Tooling** | Model Context Protocol (`@modelcontextprotocol/sdk`) | Stdio JSON-RPC interface for IDE and agent interoperability |
| **Infrastructure** | Docker, Nginx, Let's Encrypt SSL, Linux Server, GitHub Actions | Containerized microservices, reverse proxy SSL termination, automated CI/CD |

---

## 📁 Repository Layout

```
career-workspace/
├── software-engineer/
│   ├── docker-compose.yml               # Multi-container orchestration (Core API + Crawler)
│   │
│   ├── core/                            
│   │   ├── services/                    # Express.js API & RAG Engine
│   │   │   ├── ragService.js            # Vector retrieval, dual-context assembly & LLM chain
│   │   │   ├── guardrails/              # SSRF & input security sanitizers
│   │   │   ├── telemetry/               # Prisma analytics & query logging
│   │   │   └── Dockerfile               # Node 20 Alpine container
│   │   │
│   │   ├── database/source-of-truth/    # Ground-Truth Knowledge Base & Embeddings
│   │   │   ├── about-me/                # Master knowledge bases (EN, DE, FR)
│   │   │   ├── src/chunker.js           # 23-chunk semantic segmenter
│   │   │   ├── src/embeddings.js        # Gemini text-embedding-004 generator
│   │   │   └── data/                    # Pre-computed vector JSON stores
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
│   └── frontend/prasannaraja.github.io/ # React Web Portfolio (Deployed to GitHub Pages)
│       └── v2/my-career-twin/           # Active Modern React 18 + TS UI
│
├── occupational-therapist/              # Healthcare Domain (Separate Persona)
└── openspec/                            # Spec-Driven Change Management
```

---

## 🚀 Local Full-Stack Setup

### 1. Prerequisites
- **Node.js**: `v20.x` or higher
- **Python**: `v3.11+` (for crawler microservice)
- **API Key**: Google Gemini API key (`GEMINI_API_KEY`)

### 2. Automated All-In-One Runner
```bash
git clone https://github.com/prasannaraja/career-workspace.git
cd career-workspace

# Starts Backend API + MCP Server Tests + React Dev Server
./run-digital-twin.sh
```

### 3. Manual Component Execution
```bash
# Frontend Development
cd software-engineer/frontend/prasannaraja.github.io/v2/my-career-twin
npm install && npm run dev

# Core Backend API
cd software-engineer/core/services
npm install && npm run dev

# Run MCP Tooling Tests
cd software-engineer/core/tools
npm test

# Rebuild Vector Embeddings
cd software-engineer/core/database/source-of-truth
npm run ingest:all
```

---

## 👨‍💻 System Designer & Engineer

**Prasanna Prabhakaran**  
*Senior Software Engineer*  

- 🌐 **Live Digital Twin**: [prasannaraja.github.io](https://prasannaraja.github.io/)
- 💼 **LinkedIn**: [linkedin.com/in/prasannaraja](https://www.linkedin.com/in/prasannaraja/)
- 🐙 **GitHub**: [github.com/prasannaraja](https://github.com/prasannaraja)

---
*Architected and engineered to showcase real-world production RAG patterns, agentic workflows, and cloud-native resilience.*