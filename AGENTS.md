<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Orchestero Style Registry

- `lib/registry-styles.ts` is the source of truth for landing-page style routes, labels, status, preview copy, and registry URL templates.
- `/styles/[style]` renders route-based previews for each style in the catalog. Keep these routes working even before a style is installable so humans and AI agents can inspect the roadmap.
- Registry source manifests are generated beside real source folders: `components/ui/registry.json`, `components/chat/registry.json`, and `hooks/registry.json`.
- Do not copy component source into `registry/`; component code should stay single-source in `components/**` and `hooks/**`.
- A style is installable only when it has generated registry JSON under `public/r/styles/{style}`. Until then, mark it `coming-soon` in the catalog.
- The current implemented style is `default`; `pixel` and `macos` are preview routes only.
