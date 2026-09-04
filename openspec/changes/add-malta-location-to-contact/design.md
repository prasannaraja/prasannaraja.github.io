## Context

The contact section currently communicates target opportunities and an email address but does not identify the current base of operations. See proposal.md - Why.

## Goals / Non-Goals

**Goals:**

- Add the current Malta location and employment tenure to the existing contact paragraph.
- Keep the content concise, readable, and consistent with the existing HTML structure.
- Preserve the existing opportunity statement and mailto link.

**Non-Goals:**

- No layout, styling, navigation, or metadata changes.
- No new links, dependencies, or dynamic date calculations.

## Decisions

- Update the existing paragraph in `index.html` rather than adding a separate contact element, keeping the location context adjacent to the call to action.
- Use the explicit phrase “living and working in Malta since October 2021 (nearly five years)” so the location and start date remain accurate without introducing runtime logic.
- Retain the existing email link unchanged to avoid disrupting contact behavior.

## Risks / Trade-offs

- [Tenure wording will become outdated over time] -> Use “since October 2021” as the durable fact and “nearly five years” only as the current contextual description; revise the parenthetical in a future content update.

