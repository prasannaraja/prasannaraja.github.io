## Context

See `proposal.md` for motivation. The legacy implementation in `v0/web` is split into three static HTML files (`index.html`, `de/index.html`, `fr/index.html`) using a shared CSS file (`style.css`), localized JSON files (`content/en.json`, `de.json`, `fr.json`), and static assets. The target project `v1/my-career-twin` is a Vite + React 19 + TypeScript application.

## Goals / Non-Goals

**Goals:**
- Provide a clean, componentized React 19 application with full TypeScript support in `v1/my-career-twin`.
- Integrate Redux Toolkit (RTK) with slices for `locale` (`en`, `de`, `fr`), `theme` (light/dark), and `ui` (active nav section, mobile menu).
- Preserve 100% of the UI design, typography (`Newsreader`, `Inter`, `JetBrains Mono`), glassmorphism, responsive behavior, animations, and metadata from `v0/web`.
- Ensure all content is driven dynamically from the `en.json`, `de.json`, and `fr.json` language files.

**Non-Goals:**
- Phase 2 AI Chatbot backend connection (FastAPI, LangChain, vector database, Gemini streaming) - that will be added in a subsequent change once the core portfolio migration is verified.
- Modifying the original copy or career data during this migration.

## Decisions

### 1. State Management: Redux Toolkit (RTK)
- **Decision**: Use `@reduxjs/toolkit` and `react-redux` with dedicated slices:
  - `localeSlice`: active locale (`en` | `de` | `fr`), with action `setLocale`.
  - `themeSlice`: active theme (`dark` | `light`), initialized from `localStorage` or `prefers-color-scheme`, with action `toggleTheme`.
  - `uiSlice`: active navigation section for scroll-spy and mobile drawer open/close state.
- **Alternatives Considered**: React Context, Zustand. RTK was chosen to provide scalable structured state and support future AI conversation streaming states seamlessly.

### 2. Localization & Content Model
- **Decision**: Store `en.json`, `de.json`, and `fr.json` in `src/data/locales/`. Provide a custom hook `useTranslation()` that selects the current dictionary from the Redux store with strong TypeScript typing (`TranslationSchema`).
- **Alternatives Considered**: `react-i18next`. Custom typed hook was chosen because existing `content/*.json` files are already well-structured trees and avoiding extra bundle overhead for simple key-path access is cleaner.

### 3. Styling & CSS Architecture
- **Decision**: Adapt `v0/web/public/assets/style.css` directly into `src/styles/` using CSS variables (`--bg`, `--card`, `--text-primary`, etc.) and utility classes for glassmorphism, typography, and responsive grid layouts.
- **Alternatives Considered**: Tailwind CSS rewrite. Retaining the CSS architecture ensures exact visual parity without subtle spacing or typography regressions.

### 4. Component Structure
- `src/components/layout/`: `Header`, `Navigation`, `LanguageSwitcher`, `ThemeToggle`, `Footer`
- `src/components/sections/`: `HeroSection`, `AboutSection`, `ExperienceSection`, `ProjectsSection`, `ApproachSection`, `StackSection`, `ContactSection`
- `src/components/ui/`: `ProjectCard`, `ExperienceCard`, `SkillCategory`, `GlassCard`, `SectionHeader`

## Risks / Trade-offs

- **[Risk] React 19 compatibility with Redux Toolkit** → Mitigation: Use latest `@reduxjs/toolkit` (v2.x) and `react-redux` (v9.x) which officially support React 19.
- **[Risk] Missing translation keys in non-English locales** → Mitigation: Fallback mechanism in `useTranslation()` to English if a localized string is undefined.
- **[Risk] Flash of wrong theme on initial load** → Mitigation: Read `theme` from `localStorage` synchronously and apply `.dark` class to `document.documentElement` during initialization.

