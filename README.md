# AgentOS Kernel Map

An interactive map for discussing the minimum stable kernel and replaceable system services of an Agent-native operating system.

The map distinguishes four architectural areas:

- **Agent applications** — Product and domain agents built on the kernel.
- **Agent kernel** — Execution Loop, Context Manager, Tool Runtime, and Model Interface.
- **Extension services** — Memory, multi-agent workflows, knowledge, workspace, sandbox, and evaluation.
- **Providers and adapters** — Model APIs, MCP, A2A, local tools, and programmatic tool execution.

Security, observability, and lifecycle management are modeled as cross-cutting contracts rather than ordinary services.

## Core boundaries

- Memory is a provider for context assembly, not the Context Manager itself.
- MCP is an adapter for tools and context; A2A handles collaboration between independent agents.
- Multi-agent orchestration composes multiple kernels and remains outside the minimum single-agent kernel.
- Provider-specific model behavior is normalized behind a stable Model Interface.

## Interaction

- Switch between Kernel Only and Full System views.
- Select one of six runtime scenarios.
- Click a module to inspect responsibilities, contracts, extension points, standards, and failure semantics.
- Toggle connection labels.
- Press `Space` to pause or resume automatic flow playback.

## GitHub Pages

The site is deployed automatically from `main` through GitHub Actions.

License: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
