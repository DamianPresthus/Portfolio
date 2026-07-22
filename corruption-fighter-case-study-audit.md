# Corruption Fighter case study audit

## 1. Source and evidence audit

The Product Report is the factual source for the portal purpose, users, process, testing, design decisions, and limitations. The interview guide supports the think-aloud test format and prototype link. Asset filenames are used only to identify screens already described in the report.

| Planned claim | Source | Confidence and constraint |
| --- | --- | --- |
| Corruption Fighter supports self-reporting of ownership interests, roles, relationships, and other relevant circumstances. | Product Report 1.1 and 2.1–2.7 | Directly documented. |
| The target group includes employees, leaders, board members, and others required to disclose conflicts across sectors. | Product Report 1.4 and 3.3 | Directly documented. The report's narrower 30–60 description conflicts with its later statement that KPMG described all ages, so the page avoids a precise age range. |
| The product is used occasionally rather than daily. | Product Report 5.1 and 6.1 | Directly documented and central to the case study angle. |
| The team made wireframes and a clickable Figma prototype. | Product Report 7.1–7.2 | Directly documented. |
| Testing happened during each sprint with one to three testers per team member. | Product Report 8.1 | Directly documented. Team size and total participant count are not stated. |
| Testing used participants with different ages and backgrounds. | Product Report 8.1 | Directly documented. No recruitment criteria or demographic breakdown is supplied. |
| Testing identified a need for clearer guidance and simpler navigation for first-time users. | Product Report 7.2 and 11.3 | Directly documented. No task-level results or quotes are supplied. |
| Profile information moved from the dashboard to a separate page to reduce cognitive load. | Product Report 9.1 | Directly documented. |
| The flow used explicit next actions, contextual guidance, category status, and completion feedback. | Product Report 2.1–2.7, 9.2, and 10.1 | Directly documented and visible in selected assets. |
| The work was an exploratory student concept rather than a launched KPMG product. | User brief plus absence of implementation or launch evidence in the Product Report | Required boundary. The page describes a proposed design direction and prototype only. |
| Individual contribution cannot be separated from team work. | Product Report throughout | The report uses team voice and does not attribute work by person. The case study does not invent ownership. |

## 2. Recommended case study angle

Designing guidance for a sensitive task that people complete infrequently. The strongest story is how the team used information architecture, staged forms, contextual help, status feedback, and iterative prototype testing to reduce uncertainty. This is more credible than presenting the work as a full portal redesign or product launch.

## 3. Proposed page structure

1. Project introduction and explicit concept boundary
2. Brief, users, and team context
3. Research and iterative testing
4. The central challenge: a rare task must teach itself
5. Three design principles drawn from the findings
6. Key interface decisions: dashboard focus, profile separation, guided forms, status feedback
7. Proposed end-to-end experience
8. Evaluation, deliverable, limitations, and next research question

## 4. Asset selection

| Filename | Purpose | Placement | Reason |
| --- | --- | --- | --- |
| `Dashboardet - Hovedsiden.png` | Major concept and progress model | Hero and design direction | Shows all four categories, status counts, and primary entry point. |
| `Min profil.png` | Information architecture decision | Beside dashboard | Supports the documented decision to separate profile data from reporting status. |
| `Eierinteresse - registreringsskjema.png` | Detailed form and guidance model | Key interface decision | Shows contextual instructions, required fields, and three explicit next actions. |
| `Eierinteresser - fullført.png` | Saved item and completion state | Proposed experience | Shows how one category communicates progress. |
| `Relasjoner - fullført.png` | Cross-category consistency | Proposed experience | Demonstrates that the same status model extends beyond ownership interests. |
| `Fullført selvrapportering.png` | End state | Proposed experience | Shows confirmation after the complete reporting flow. |
| `Frame 11.png` | Component and visual rules | Supporting system figure | Records palette, typography, states, and warning patterns in one controlled crop. |

## 5. Assets not used

The `Roller*`, `Relasjoner*`, `Eierinteresse*`, and `Annet*` variants not listed above repeat the same dashboard, empty, form, and completed states. They add length without proving a new decision. `Annet - Bekreftet.png` duplicates the final status pattern. The tall component board is cropped in-page so its typography samples and state inventory do not dominate the narrative.

No research photographs, affinity maps, or standalone wireframe files are present in the supplied asset folder. The report contains an embedded wireframe image, but it is not available as a clean portfolio asset, so the page does not imply a visual process archive that was not supplied.

## 6. Complete case study copy

The implemented copy lives in `src/app/pages/CorruptionFighterCaseStudy.tsx`. It uses team voice throughout because the report does not document individual ownership. The boundary note, evidence strip, section copy, captions, and limitations panel are part of the page rather than hidden in this audit.

## 7. Exact implementation plan

1. Replace the active F1 case-study module with a Corruption Fighter page built from the shared case-study navigation, evidence strip, resource link, and pagination components.
2. Replace F1 project metadata and imagery in the project data source.
3. Add the canonical `/work/corruption-fighter` route and keep the former URL as a compatibility alias to the new page.
4. Replace the F1 project light and paper tint with restrained KPMG blue tokens.
5. Run typecheck and production build.
6. Capture the canonical route at desktop and mobile sizes and inspect overflow, hierarchy, image scale, and section rhythm.

## 8. Files, routes, metadata, links, and components updated

- `src/app/pages/CorruptionFighterCaseStudy.tsx`: complete case study and selected figures
- `src/app/pages/F1CaseStudy.tsx`: removed from the active app
- `src/app/routes.ts`: canonical route plus compatibility alias
- `src/app/data/projects.ts`: homepage and pagination metadata
- `src/styles/theme.css`: project tint and emitted-light tokens
- `src/app/components/ProjectsSection.tsx`: source comment updated to match the active project order
- Prototype link: sourced from the supplied interview guide

## 9. Final factual consistency check

- No production build, launch, adoption, or business impact is claimed.
- No total participant count is inferred from the per-person test range.
- No KPMG endorsement or client reaction is invented.
- No screen or method is assigned to one person.
- The page distinguishes documented team work from the missing individual-contribution record.
- Testing findings are limited to guidance, navigation, and the report's own general evaluation.
- Future guidance testing is framed as a recommendation, not completed work.
