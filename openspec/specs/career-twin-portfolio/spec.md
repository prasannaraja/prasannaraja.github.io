## Purpose

Provides a responsive, localized, and modular React portfolio for Prasanna Raja with dark/light themes, structured career data, and Redux Toolkit state management.

## Requirements

### Requirement: Multilingual Content Localization
The system SHALL support dynamic language switching across English (`en`), German (`de`), and French (`fr`), displaying the full portfolio content in the selected locale with English as the fallback.

#### Scenario: Switching language to German
- **WHEN** user selects "DE" from the language switcher
- **THEN** all navigational labels, hero text, about section, experience bullets, and project descriptions render in German

#### Scenario: Switching language to French
- **WHEN** user selects "FR" from the language switcher
- **THEN** all navigational labels, hero text, about section, experience bullets, and project descriptions render in French

#### Scenario: Switching language back to English
- **WHEN** user selects "EN" from the language switcher
- **THEN** all portfolio sections render in English

### Requirement: Theme Customization (Dark/Light Mode)
The system SHALL support dark and light color themes, persisting user preference in `localStorage` and syncing with system color scheme preferences by default.

#### Scenario: Toggling dark and light mode
- **WHEN** user clicks the theme toggle button
- **THEN** document theme class alternates between `dark` and `light` and is stored in `localStorage`

### Requirement: Structured Navigation and Responsive Layout
The system SHALL provide a sticky, glassmorphic header with navigation links, active scroll spy highlighting, responsive mobile menu drawer, and smooth section scrolling.

#### Scenario: Mobile viewport navigation
- **WHEN** user views the site on a mobile device and taps the menu button
- **THEN** mobile drawer opens displaying all navigation links, language options, and theme controls

### Requirement: Portfolio Sections and Career Data Presentation
The system SHALL render dedicated sections for Hero, About, Experience timeline, Projects, Engineering Approach, Tech Stack, and Contact with exact visual and content parity with the original portfolio.

#### Scenario: Viewing enterprise projects and experience
- **WHEN** user scrolls through the Experience and Projects sections
- **THEN** project cards and experience items render with technology tags, role responsibilities, architectural highlights, and external/download links
