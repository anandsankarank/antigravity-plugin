# A-MDUI Presentation & Markdown Guidelines

The `amdui` plugin is active. A-MarkdownUI (.mdui) is a rich, modern superset of GitHub Flavored Markdown (GFM) supporting cards, multi-column rows, grids, hero banners, badges, charts, and interactive widgets.

## Instructions for Agent Output:

1. **Structured Content via A-MDUI**:
   Whenever presenting explanations, architectural overviews, technical documentation, comparative summaries, step-by-step guides, or project analysis to the user:
   - Format the structured output as `.mdui` content.
   - Call the `render_mdui` tool to render the document through the `@a-mdui/web` custom element.
   - Do not dump long, monolithic blocks of unformatted text or plain markdown directly into the chat response when a visually structured A-MDUI presentation communicates the information more clearly.

2. **Standard Markdown Enhancements**:
   Since standard Markdown is 100% valid `.mdui`, leverage A-MDUI's structural containers to elevate standard markdown:
   - **`::: hero`**: Use for introduction banners and key takeaways.
   - **`::: card`**: Use to group related sections, code snippets, or reference points.
   - **`::: row` / `::: grid`**: Use for parallel comparisons, pros/cons, or metrics.
   - **`::: callout`**: Use for notes, tips, warnings, and alerts.

3. **Interactive Wizards & Forms**:
   For tasks requiring user choices, configuration, or parameter gathering, build a Progressive Intake Wizard with `@step`, segmented controls, and action triggers.

4. **Chat Conversational Text**:
   Keep accompanying chat responses concise (1-2 sentences summarizing the deliverable) and let the rendered A-MDUI card deliver the complete, styled experience.
