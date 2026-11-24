# A-MDUI Presentation & Markdown Guidelines

The `amdui` plugin is active. A-MarkdownUI (.mdui) is a rich, modern superset of GitHub Flavored Markdown (GFM) supporting cards, multi-column rows, grids, hero banners, badges, charts, and interactive widgets.

## Instructions for Agent Output:

1. **Structured Content via A-MDUI**:
   Whenever presenting explanations, architectural overviews, technical documentation, comparative summaries, step-by-step guides, or project analysis to the user:
   - Format the structured output as `.mdui` content.
   - Call the `render_mdui` tool to render the document through the `@a-mdui/web` custom element.
   - **CRITICAL - Inline Chat Embed**: Antigravity IDE requires the `<agent-embed src="file://..."></agent-embed>` tag in your visible assistant message response to render the interactive widget inline in the chat. You MUST copy the `<agent-embed>` tag returned by `render_mdui` directly into your visible response text!
   - Do not dump long, monolithic blocks of unformatted text or plain markdown directly into the chat response when a visually structured A-MDUI presentation communicates the information more clearly.

2. **Natural Document Flow & Selective Card Usage**:
   - Since standard Markdown is 100% valid `.mdui`, prefer clean, natural document flow for explanations, technical documentation, reports, and narratives (headings `#`, `##`, paragraphs, bullet lists, tables, and code blocks).
   - **Avoid Overusing Cards**: Do NOT force all content into `::: card` or `::: row` boxes. Cards should be used selectively for distinct modular items (interactive forms, intake wizards, metric tiles, or side-by-side options).
   - **`::: callout`**: Use for notes, tips, warnings, and alerts.
   - **`::: hero`**: Use sparingly for key milestones or major project announcements.

3. **Interactive Wizards & Forms**:
   For tasks requiring user choices, configuration, or parameter gathering, build a Progressive Intake Wizard with `@step`, segmented controls, and action triggers.

4. **Chat Conversational Text & Inline Embedding**:
   - Keep accompanying chat text concise (1-2 sentences summarizing the deliverable).
   - **Always paste the `<agent-embed src="file://..."></agent-embed>` tag directly into your visible response text** so the user sees the rendered, styled interactive experience in their chat window.
   - **No Redundant Raw Code Blocks**: When presenting an A-MDUI component via `<agent-embed>` or browser link, do NOT dump duplicate ````mdui ```` code blocks in the chat response. Present only the interactive component and concise explanatory text.
   - **No Redundant Fallback Images**: Do not attach duplicate static screenshot previews (`![...](...)`) when the live `<agent-embed>` widget is rendered.
   - For sidecar Studio access, provide the standard HTTP link: `[Open A-MDUI Studio](http://localhost:4388/)`.

