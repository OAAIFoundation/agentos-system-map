# AgentOS System Map

An interactive system map for discussing and refining the architecture of an Agent-native operating system.

The map distinguishes two levels:

- **Agent application layer** — Agent instances run above AgentOS.
- **AgentOS system layer** — 11 subsystems provide scheduling, runtime, communication, model access, state, memory, tools, workspace, security, observability, and governance.

## Core distinctions

- **Agent Communication Stack** handles Agent-to-Agent, AgentOS-to-AgentOS, MCP, streaming, webhook, discovery, and message routing.
- **Model Gateway** handles model API adapters, multi-model routing, cost, quota, privacy filtering, circuit breaking, and fallback.

## Interaction

- Select one of four data-flow scenarios.
- Click a subsystem to inspect its responsibilities, inputs, and outputs.
- Toggle connection labels.
- Press `Space` to pause or resume automatic flow playback.

## GitHub Pages

The site is deployed automatically from `main` through GitHub Actions.

License: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
