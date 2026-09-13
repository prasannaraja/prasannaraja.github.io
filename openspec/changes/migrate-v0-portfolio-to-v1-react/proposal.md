## Why

The portfolio was previously maintained across 3 separate static HTML files (`index.html`, `de/index.html`, `fr/index.html`) alongside an unmaintained, prototype React app in `v0/web`. To establish a foundation for the upcoming AI Career Twin assistant and streamline maintainability, we need to migrate the portfolio to a pure React 19 + TypeScript + Redux Toolkit (RTK) application in `v1/my-career-twin` while retaining 100% of the existing content, design, typography, dark/light mode, and multilingual localization (`EN`, `DE`, `FR`).

## What Changes

- **Port Content and Assets**: Integrate `content/en.json`, `de.json`, and `fr.json` into type-safe data modules, and copy static assets (images, favicon, résumé PDF).
- **State Management**: Implement Redux Toolkit (RTK) with `localeSlice` (handling `en`, `de`, `fr` switching), `themeSlice` (managing light/dark mode and localStorage persistence), and `uiSlice` (mobile navigation, active section scroll-spy).
- **Component Architecture**: Replace monolithic HTML with modular, typed React components:
  - `Header`, `Navigation`, `LanguageSwitcher`, `ThemeToggle`, `Footer`.
  - `HeroSection`, `AboutSection`, `ExperienceSection`, `ProjectsSection`, `ApproachSection`, `StackSection`, `ContactSection`.
  - Reusable UI elements (`ProjectCard`, `ExperienceCard`, `SkillCategory`, `GlassCard`).
- **Styling & Visual Parity**: Port exact CSS styles, glassmorphism effects, custom color variables, and typography (`Newsreader`, `Inter`, `JetBrains Mono`).
- **SEO & Structured Data**: Add dynamic document title, meta tags, and Schema.org JSON-LD structured data synchronized with the active language.

## Capabilities

### New Capabilities
- `career-twin-portfolio`: Core React portfolio UI including localized content rendering (`EN`, `DE`, `FR`), theme switching (Dark/Light), modular section components, and Redux Toolkit state management in `v1/my-career-twin`.

### Modified Capabilities
<!-- None -->

## Impact

- **New Application**: `v1/my-career-twin` becomes the active, pure React application.
- **Dependencies**: Added `@reduxjs/toolkit` and `react-redux` to `v1/my-career-twin`.
- **Legacy Source**: `v0/web` remains as the reference source for content and assets.

