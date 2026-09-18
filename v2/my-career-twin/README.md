# Prasanna Raja — Digital Twin & Portfolio Web Application (`v1/my-career-twin`)

Interactive web application and AI Digital Twin for **Prasanna Prabhakaran (Prasanna Raja)**. Built with React 18, TypeScript, Tailwind CSS, and Redux Toolkit, deployed to GitHub Pages at [prasannaraja.github.io](https://prasannaraja.github.io).

---

## 1. Features & Architecture

- **AI Digital Twin Chatbot:** Full-screen responsive conversational modal connecting to the live Gemini backend (`https://my-digital-twin.duckdns.org`).
- **Multilingual Support (i18n):** Native instant UI and AI switching between **English (`en`)**, **German (`de`)**, and **French (`fr`)**.
- **Dark / Light Theme:** Persistent system-aware theme toggle with smooth CSS transitions.
- **Mobile Responsive & Safe-Area Aware:** Uses dynamic viewport units (`100dvh`) and safe-area insets for native mobile experience on iOS and Android.
- **Markdown & Citation Rendering:** Custom parser for bold, italics, code snippets, horizontal rules, alert callout banners, and grounded vector source tags.

---

## 2. Directory Layout

```
v1/my-career-twin/
├── src/
│   ├── components/
│   │   ├── header/Navbar.tsx            # Global navigation, locale & theme switchers
│   │   ├── hero/HeroSection.tsx         # Hero banner & career overview
│   │   ├── experience/Experience.tsx    # Interactive project timeline
│   │   ├── skills/SkillMatrix.tsx       # Categorized competency pills
│   │   └── twin/DigitalTwinChat.tsx     # Chatbot interface & markdown renderer
│   ├── config/api.ts                    # Centralized backend URL configuration
│   ├── data/locales/                    # en.json, de.json, fr.json
│   ├── store/                           # Redux Toolkit state slices (theme, locale)
│   └── styles/main.css                  # Custom styling & responsive animations
├── index.html
└── vite.config.ts
```

---

## 3. Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
The Vite development server runs at `http://localhost:5173` and proxies API requests to `http://localhost:3000`.

### 3. Production Build
```bash
npm run build
```
Generates optimized, tree-shaken static assets in `dist/`.

---

## 4. Production Deployment

The web app is deployed automatically to **GitHub Pages** on push to `master` via GitHub Actions (`.github/workflows/deploy.yml` or root pages workflow).
