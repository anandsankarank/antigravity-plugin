# A-MDUI Antigravity Plugin

Antigravity UI Plugin & Sidecar for rendering interactive, autonomous [A-MarkdownUI (.mdui)](https://github.com/anandsankarank/MD2UI) documents in Google Antigravity.

## Features

- **Auxiliary Pane Sidecar (`A-MDUI Studio`)**: Real-time interactive preview of `.mdui` files in Antigravity's side pane.
- **MCP Server Integration**: Bundled tools for generating and validating `.mdui` markup.
- **Skills**: Teaches Antigravity agents how and when to use `.mdui` generative UI components (Progressive Intake Wizards, Telemetry Dashboards).
- **Self-Contained**: Runs without external CDNs using bundled `@a-mdui/web` custom element.

## Usage

In Antigravity chat, open the side panel via:
```markdown
[Open A-MDUI Studio](sidecar://amdui/viewer/)
```
Or target a specific document in the workspace:
```markdown
[Preview Appointment](sidecar://amdui/viewer/?file=examples/doctor_appointment.mdui)
```

## License

MIT © Anand Sankaran
