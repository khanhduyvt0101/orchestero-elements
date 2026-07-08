# orchestero-elements

Orchestero's shadcn-compatible component registry for product interfaces, AI chat experiences, and reusable design system primitives.

The repo is a Next.js app served at `https://elements.orchestero.com` with a canonical shadcn registry endpoint at `https://elements.orchestero.com/r/styles/{style}/{name}.json`.

## What is included

- Orchestero UI primitives under `components/ui`.
- Orchestero AI chat components under `components/chat`.
- Supporting Orchestero hooks under `hooks`.
- A generated source registry at `registry.json`.
- Generated source manifests at `components/ui/registry.json`, `components/chat/registry.json`, and `hooks/registry.json`.
- Style-aware installable registry items in `public/r/styles/default/*.json`.
- Next.js 16, React 19, Tailwind CSS v4, and shadcn registry tooling.

## Install from this registry

Add the Orchestero namespace to a consuming app's `components.json`:

```json
{
  "registries": {
    "@orchestero": "https://elements.orchestero.com/r/styles/{style}/{name}.json"
  }
}
```

Then install Orchestero components by namespace:

```bash
npx shadcn@latest add @orchestero/button
```

Install the Orchestero AI chat component group:

```bash
npx shadcn@latest add @orchestero/chat-kit
```

Or install individual Orchestero chat components:

```bash
npx shadcn@latest add @orchestero/chat-thread
npx shadcn@latest add @orchestero/chat-message
npx shadcn@latest add @orchestero/chat-composer
npx shadcn@latest add @orchestero/chat-tool-call
```

The only implemented style today is `default`. Future styles such as `pixel`
and `macos` are shown on the landing page as coming-soon style routes and will
live under `public/r/styles/{style}` when they are ready.

## Style catalog

The landing page uses route-based style previews so each visual direction is
shareable and easy for humans or AI agents to inspect:

- `/` shows the default landing page.
- `/styles/default` is the canonical page for the current implemented style.
- `/styles/pixel` previews the planned Pixel style.
- `/styles/macos` previews the planned macOS style.

Add or update style metadata in `lib/registry-styles.ts`. When a style becomes
installable, add a source manifest beside that style's source files and update
the registry build pipeline to emit `public/r/styles/{style}/*.json`.

## Maintain the registry

Regenerate and build registry JSON after changing files in `components/ui`, `components/chat`, or `hooks`:

```bash
npm run registry:build
```

Validate the source manifests and canonical directory output:

```bash
npm run registry:validate
npx shadcn@latest registry validate public/r/styles/default/registry.json
```

The registry generator does not copy component source into a separate registry
tree. It writes small manifest files beside the real source folders so component
code stays single-source.

Run app checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## shadcn directory entry

Submit this entry to `apps/v4/registry/directory.json` in `shadcn-ui/ui`:

```json
{
  "name": "@orchestero",
  "homepage": "https://elements.orchestero.com",
  "url": "https://elements.orchestero.com/r/styles/{style}/{name}.json",
  "description": "Orchestero's shadcn-compatible component registry for product interfaces, AI chat experiences, and reusable design system primitives.",
  "logo": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='none'><rect width='64' height='64' rx='16' fill='#09090B'/><rect x='4' y='4' width='56' height='56' rx='14' stroke='#FFFFFF' stroke-opacity='0.14' stroke-width='2'/><g transform='translate(14 14) scale(1.5)' stroke='#FAFAFA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z'/><path d='M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z'/><path d='M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z'/><path d='M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z'/></g></svg>"
}
```
