## 1. Project Setup & State Infrastructure

- [x] 1.1 Install `@reduxjs/toolkit` and `react-redux` in `v1/my-career-twin` and verify package installation succeeds.
- [x] 1.2 Copy assets (profile picture, CV PDF, favicon) from `v0/web/public/` to `v1/my-career-twin/public/` and copy fonts/meta setup to `index.html`.
- [x] 1.3 Port `en.json`, `de.json`, and `fr.json` into `v1/my-career-twin/src/data/locales/` and configure TypeScript schema definitions.
- [x] 1.4 Setup Redux store and slices (`localeSlice`, `themeSlice`, `uiSlice`) with strong TypeScript typing and `useAppDispatch` / `useAppSelector` hooks.
- [x] 1.5 Implement `useTranslation` hook to provide locale-aware content and fallback handling.

## 2. Layout & Global Styling

- [x] 2.1 Port custom CSS styles, CSS variables, typography, and glassmorphism from `v0/web/public/assets/style.css` to `v1/my-career-twin/src/styles/main.css`.
- [x] 2.2 Create `Header` component with brand logo, desktop nav, `LanguageSwitcher`, and `ThemeToggle`.
- [x] 2.3 Create `Footer` component with copyright, location info, and links.
- [x] 2.4 Create mobile navigation drawer with responsive toggle and backdrop.

## 3. Section & UI Components

- [x] 3.1 Implement `HeroSection` with availability badge, headline, summary text, action buttons, and domain pill tags.
- [x] 3.2 Implement `AboutSection` with architectural pillars, career narrative, and highlight cards.
- [x] 3.3 Implement `ExperienceSection` and `ExperienceCard` with role, period, location, Context, Responsibility, Engineering, and Impact details.
- [x] 3.4 Implement `ProjectsSection` and `ProjectCard` with tags, description, and external project links.
- [x] 3.5 Implement `ApproachSection` highlighting engineering philosophy and system design principles.
- [x] 3.6 Implement `StackSection` and `SkillCategory` with categorized tech pills and reveal animations.
- [x] 3.7 Implement `ContactSection` with direct email CTA, résumé download, GitHub, and LinkedIn links.

## 4. Verification & Polish

- [x] 4.1 Verify language switching across all 3 locales (`en`, `de`, `fr`) ensures complete content translation without missing keys.
- [x] 4.2 Verify theme switching (dark/light) persists to `localStorage` and synchronizes with document classes without flashing.
- [x] 4.3 Run `npm run build` in `v1/my-career-twin` and verify TypeScript compilation and Vite production build pass with zero errors.
