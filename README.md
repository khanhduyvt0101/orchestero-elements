# orchestero-elements

Orchestero's shadcn-compatible component registry for product interfaces, AI chat experiences, and reusable design system primitives.

The repo is a Next.js app served at `https://elements.orchestero.com`, and it also works as a GitHub source registry through the root `registry.json`.

## What is included

- Orchestero UI primitives under `components/ui`.
- Orchestero AI chat components under `components/chat`.
- Supporting Orchestero hooks under `hooks`.
- A generated source registry at `registry.json`.
- Flat installable registry items in `public/*.json`.
- Mirrored registry items in `public/r/*.json`.
- Next.js 16, React 19, Tailwind CSS v4, and shadcn registry tooling.

## Install from this registry

Use the GitHub registry form while developing directly from the repository:

```bash
npx shadcn@latest add khanhduyvt0101/orchestero-elements/button
npx shadcn@latest add khanhduyvt0101/orchestero-elements/sidebar
```

For production use, add the Orchestero namespace to a consuming app's `components.json`:

```json
{
  "registries": {
    "@orchestero": "https://elements.orchestero.com/{name}.json"
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

If the custom domain is still propagating, use the CDN fallback:

```json
{
  "registries": {
    "@orchestero": "https://cdn.jsdelivr.net/gh/khanhduyvt0101/orchestero-elements@main/public/{name}.json"
  }
}
```

## Maintain the registry

Regenerate and build registry JSON after changing files in `components/ui`, `components/chat`, or `hooks`:

```bash
npm run registry:build
```

Validate the source manifest and flat directory output:

```bash
npm run registry:validate
npx shadcn@latest registry validate public/registry.json
```

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
  "url": "https://elements.orchestero.com/{name}.json",
  "description": "Orchestero's shadcn-compatible component registry for product interfaces, AI chat experiences, and reusable design system primitives.",
  "logo": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'><rect width='24' height='24' rx='5' fill='var(--foreground)'/><path d='M6.5 12a5.5 5.5 0 1 1 11 0a5.5 5.5 0 0 1-11 0Z' stroke='var(--background)' stroke-width='2'/><path d='M12 6.5v11M6.5 12h11' stroke='var(--background)' stroke-width='1.8' stroke-linecap='round'/></svg>"
}
```
