# Lane UI Rules

These rules prevent page-to-page UI drift.

## Non-negotiable rules

1. Every core Lane page must use `AppShell`.
2. Do not hand-code the sidebar per page.
3. Do not hand-code the top bar per page.
4. Sidebar width is always 256px on desktop.
5. Top bar height is always 64px on desktop.
6. Page titles use DM Serif Display.
7. Body text uses Inter.
8. Navigation, metadata, chips, and button labels use JetBrains Mono.
9. Cards, panels, buttons, and inputs use 0px radius.
10. Depth is shown through borders and tonal surfaces, not shadows.
11. Primary actions are black with white mono text.
12. Do not introduce new accent colors without a design decision.
13. Do not use gradients.
14. Do not use rounded cards.
15. Do not use random font sizes.
16. Do not change sidebar active state from black fill.
17. Do not claim code is verified working in UI copy; use evidence-based language.

## Evidence language

Use:

- Evidence found
- Possible implementation found
- Strong implementation evidence
- Needs review
- Confirmed by user
- Tested manually

Avoid:

- Verified working
- Guaranteed complete
- Fully QA tested
- Production ready
- Correctness verified
