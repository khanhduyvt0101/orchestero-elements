import {
  ArrowUpRight,
  Bot,
  Check,
  CircleDot,
  Code2,
  Component,
  Database,
  Layers3,
  MessageSquareText,
  PackageCheck,
  Route,
  Search,
  Sparkles,
  Terminal,
} from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import siteConfig from "@/site.config.json"

const componentGroups = [
  {
    title: "Foundation",
    icon: Layers3,
    items: [
      "accordion",
      "alert",
      "button",
      "button-group",
      "card",
      "collapsible",
      "separator",
      "skeleton",
      "spinner",
      "tooltip",
    ],
  },
  {
    title: "Forms",
    icon: CircleDot,
    items: [
      "checkbox",
      "combobox",
      "field",
      "input",
      "input-group",
      "input-otp",
      "label",
      "radio-group",
      "select",
      "slider",
      "switch",
      "textarea",
      "toggle",
      "toggle-group",
    ],
  },
  {
    title: "Overlays",
    icon: Route,
    items: [
      "alert-dialog",
      "command",
      "context-menu",
      "dialog",
      "direction",
      "drawer",
      "dropdown-menu",
      "hover-card",
      "menubar",
      "popover",
      "sheet",
    ],
  },
  {
    title: "Navigation",
    icon: Search,
    items: [
      "breadcrumb",
      "calendar",
      "carousel",
      "navigation-menu",
      "pagination",
      "resizable",
      "scroll-area",
      "sidebar",
      "tabs",
    ],
  },
  {
    title: "Data & Media",
    icon: Database,
    items: [
      "aspect-ratio",
      "attachment",
      "avatar",
      "badge",
      "bubble",
      "chart",
      "empty",
      "item",
      "kbd",
      "marker",
      "message",
      "message-scroller",
      "native-select",
      "progress",
      "sonner",
      "table",
      "use-mobile",
    ],
  },
]

const chatItems = [
  "chat-kit",
  "chat-composer",
  "chat-message",
  "chat-thread",
  "chat-tool-call",
]

const stats = [
  {
    value: "66",
    label: "registry items",
    detail: "Default shadcn components plus AI chat primitives.",
  },
  {
    value: "/{name}.json",
    label: "flat endpoint",
    detail: "Directory-ready URLs for direct namespace installs.",
  },
  {
    value: "base-nova",
    label: "style source",
    detail: "A clean mirror of the current shadcn default set.",
  },
]

const checks = [
  "Flat JSON endpoints",
  "CORS headers for registry reads",
  "shadcn validation in CI",
  "Vercel production deployment",
  "AI chat group under components/chat",
  "Directory entry prepared",
]

const graphNodes = [
  { name: "button", x: "12%", y: "22%", tone: "primary" },
  { name: "dialog", x: "34%", y: "13%", tone: "muted" },
  { name: "chat-kit", x: "57%", y: "22%", tone: "accent" },
  { name: "sidebar", x: "79%", y: "16%", tone: "muted" },
  { name: "registry.json", x: "44%", y: "48%", tone: "core" },
  { name: "table", x: "18%", y: "64%", tone: "muted" },
  { name: "command", x: "70%", y: "61%", tone: "primary" },
  { name: "tooltip", x: "85%", y: "78%", tone: "muted" },
]

function RegistryGraph() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(94,234,212,0.18),transparent_30%),radial-gradient(circle_at_70%_30%,rgba(132,204,22,0.12),transparent_28%),linear-gradient(115deg,rgba(9,9,11,0.94),rgba(24,24,27,0.8)_48%,rgba(9,9,11,0.96))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] opacity-60" />
      <div className="registry-orbit absolute top-1/2 left-1/2 h-[560px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-[48px] border border-white/10 bg-white/[0.025] shadow-2xl shadow-black/50" />
      <svg
        className="absolute inset-0 h-full w-full opacity-75"
        viewBox="0 0 1000 620"
        preserveAspectRatio="none"
      >
        <path
          className="registry-line"
          d="M120 150 C260 90 360 260 440 300 S620 320 700 145 S860 150 900 500"
        />
        <path
          className="registry-line registry-line-delay"
          d="M180 430 C320 390 320 260 440 300 S620 360 800 170"
        />
        <path
          className="registry-line registry-line-slow"
          d="M230 170 C330 420 580 170 760 410"
        />
      </svg>
      {graphNodes.map((node) => (
        <div
          key={node.name}
          className={cn(
            "absolute flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium shadow-2xl backdrop-blur-md",
            node.tone === "core" &&
              "border-teal-300/50 bg-teal-300/15 text-teal-50 shadow-teal-950/40",
            node.tone === "accent" &&
              "border-lime-300/50 bg-lime-300/15 text-lime-50 shadow-lime-950/40",
            node.tone === "primary" &&
              "border-white/25 bg-white/12 text-white shadow-black/30",
            node.tone === "muted" &&
              "border-white/15 bg-zinc-950/55 text-zinc-200 shadow-black/35"
          )}
          style={{ left: node.x, top: node.y }}
        >
          <span className="size-1.5 rounded-full bg-current" />
          {node.name}
        </div>
      ))}
      <div className="absolute right-6 bottom-8 hidden w-[420px] rounded-lg border border-white/15 bg-black/45 p-4 font-mono text-xs text-zinc-200 shadow-2xl shadow-black/40 backdrop-blur-xl md:block">
        <div className="mb-3 flex items-center gap-2 text-zinc-400">
          <Terminal className="size-3.5" />
          <span>components.json</span>
        </div>
        <pre className="leading-6 whitespace-pre-wrap">
          {`"@orchestero": "${siteConfig.registryUrl}"`}
        </pre>
      </div>
    </div>
  )
}

export default function Page() {
  const totalItems =
    componentGroups.reduce((count, group) => count + group.items.length, 0) +
    chatItems.length

  return (
    <main className="min-h-svh overflow-x-hidden bg-zinc-950 text-white">
      <section className="relative flex min-h-[92svh] overflow-hidden">
        <RegistryGraph />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,11,0.96),rgba(9,9,11,0.68)_42%,rgba(9,9,11,0.2)_78%,rgba(9,9,11,0.78))]" />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 pt-5 pb-10 md:px-10">
          <header className="flex items-center justify-between gap-4 py-3">
            <Link
              href="/"
              className="flex items-center gap-3 text-sm font-medium text-white"
            >
              <span className="flex size-8 items-center justify-center rounded-lg border border-white/15 bg-white/10">
                <Component className="size-4" />
              </span>
              {siteConfig.title}
            </Link>
            <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
              <a className="transition hover:text-white" href="#registry">
                Registry
              </a>
              <a className="transition hover:text-white" href="#chat">
                Chat
              </a>
              <a className="transition hover:text-white" href="#components">
                Components
              </a>
            </nav>
            <a
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "border-white/15 bg-white/10 text-white hover:bg-white/15 hover:text-white"
              )}
              href={siteConfig.githubUrl}
            >
              <ArrowUpRight className="size-3.5" />
              GitHub
            </a>
          </header>

          <div className="grid flex-1 items-center gap-12 py-14 md:grid-cols-[minmax(0,0.86fr)_minmax(360px,0.64fr)] md:py-20">
            <div className="min-w-0 max-w-4xl">
              <h1 className="max-w-4xl text-5xl leading-[0.95] font-semibold tracking-normal text-white md:text-7xl lg:text-8xl">
                {siteConfig.title}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-balance text-zinc-300 md:text-xl">
                A public shadcn registry for default base-nova components and AI
                chat building blocks, served from{" "}
                <span className="font-mono text-teal-200">
                  elements.orchestero.com
                </span>
                .
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "h-11 bg-white px-4 text-zinc-950 hover:bg-zinc-200"
                  )}
                  href="/registry.json"
                >
                  Open Registry
                  <ArrowUpRight className="size-4" />
                </a>
                <a
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-11 border-white/15 bg-white/10 px-4 text-white hover:bg-white/15 hover:text-white"
                  )}
                  href={siteConfig.githubUrl}
                >
                  View GitHub
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
              <div className="mt-8 max-w-3xl overflow-hidden rounded-lg border border-white/15 bg-black/55 shadow-2xl shadow-black/40 backdrop-blur">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-zinc-400">
                  <span className="flex items-center gap-2">
                    <Terminal className="size-3.5" />
                    Install the chat group
                  </span>
                  <span className="hidden font-mono text-teal-200 sm:block">
                    200 OK
                  </span>
                </div>
                <pre className="min-w-0 max-w-full overflow-x-auto px-4 py-4 font-mono text-sm text-zinc-100">
                  <code>npx shadcn@latest add @orchestero/chat-kit</code>
                </pre>
              </div>
            </div>

            <div className="relative hidden min-h-[520px] md:block" />
          </div>

          <div
            id="registry"
            className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3 backdrop-blur md:grid-cols-3"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 py-3">
                <div className="font-mono text-2xl font-semibold text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-medium text-teal-100">
                  {stat.label}
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-zinc-900/70">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-[0.8fr_1.2fr] md:px-10">
          <div>
            <h2 className="text-3xl font-semibold tracking-normal text-white md:text-4xl">
              Directory-ready from the root URL.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">
              The public surface is intentionally simple: one namespace, flat
              JSON files, stable Vercel hosting, and a CDN fallback for
              propagation windows.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {checks.map((check) => (
              <div
                key={check}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-zinc-950/55 px-4 py-3 text-sm text-zinc-200"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-teal-300/15 text-teal-200">
                  <Check className="size-3.5" />
                </span>
                {check}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="chat"
        className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[0.95fr_1.05fr] md:px-10"
      >
        <div className="flex flex-col justify-center">
          <div className="flex size-11 items-center justify-center rounded-lg border border-lime-300/20 bg-lime-300/10 text-lime-200">
            <Bot className="size-5" />
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-normal text-white md:text-5xl">
            AI chat components live as a first-class group.
          </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400">
                <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-sm text-zinc-200">
                  components/chat
                </code>{" "}
                installs the thread, message, composer, and tool call primitives
                together, while still letting projects pull each piece
                independently.
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-zinc-900 p-4 shadow-2xl shadow-black/30">
          <div className="rounded-md border border-white/10 bg-zinc-950">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <MessageSquareText className="size-4 text-lime-200" />
                chat-kit
              </div>
              <Badge
                variant="outline"
                className="border-lime-300/25 text-lime-100"
              >
                group
              </Badge>
            </div>
            <div className="space-y-3 p-4">
              {chatItems.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-3 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-7 items-center justify-center rounded-md bg-white/10 font-mono text-xs text-zinc-300">
                      {index + 1}
                    </span>
                    <span className="font-mono text-sm text-zinc-100">
                      {item}.json
                    </span>
                  </div>
                  <span className="text-xs text-zinc-500">ready</span>
                </div>
              ))}
            </div>
            <Separator className="bg-white/10" />
            <pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-6 text-zinc-300">
              <code>{`{
  "categories": ["ai", "chat"],
  "meta": { "group": "chat" }
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section id="components" className="bg-white text-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-normal md:text-5xl">
                The default shadcn surface, grouped for scanning.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
                Components stay source-owned and installable one at a time, but
                the landing page organizes the directory by how builders reach
                for them.
              </p>
            </div>
            <div className="font-mono text-sm text-zinc-500">
              {totalItems} installable entries
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {componentGroups.map((group) => (
              <Card
                key={group.title}
                className="rounded-lg border-zinc-200 bg-white shadow-none ring-0"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-zinc-950 text-white">
                      <group.icon className="size-4" />
                    </span>
                    <div>
                      <CardTitle>{group.title}</CardTitle>
                      <CardDescription>
                        {group.items.length} entries
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Badge
                        key={item}
                        variant="outline"
                        className="rounded-md border-zinc-200 text-zinc-700"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[0.9fr_1.1fr] md:px-10">
          <div className="min-w-0">
            <div className="flex size-11 items-center justify-center rounded-lg border border-teal-300/20 bg-teal-300/10 text-teal-200">
              <PackageCheck className="size-5" />
            </div>
            <h2 className="mt-6 text-3xl font-semibold tracking-normal text-white md:text-5xl">
              Prepared for shadcn directory publishing when you are ready.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400">
              The public entry points are already shaped for the directory. The
              upstream PR can wait until the custom domain is verified.
            </p>
          </div>
          <div className="grid min-w-0 gap-4">
            <div className="min-w-0 rounded-lg border border-white/10 bg-zinc-900 p-5">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white">
                <Sparkles className="size-4 text-teal-200" />
                Directory entry
              </div>
              <pre className="min-w-0 max-w-full overflow-x-auto rounded-md bg-black/45 p-4 font-mono text-xs leading-6 text-zinc-300">
                <code>{`{
  "name": "${siteConfig.namespace}",
  "homepage": "${siteConfig.url}",
  "url": "${siteConfig.registryUrl}"
}`}</code>
              </pre>
            </div>
            <div className="grid min-w-0 gap-4 sm:grid-cols-2">
              <a
                className="group min-w-0 rounded-lg border border-white/10 bg-white/[0.03] p-5 transition hover:border-teal-300/35 hover:bg-teal-300/10"
                href="/registry.json"
              >
                <Code2 className="size-5 text-teal-200" />
                <div className="mt-4 text-sm font-medium text-white">
                  Root registry
                </div>
                <div className="mt-2 font-mono text-xs text-zinc-500 group-hover:text-teal-100">
                  /registry.json
                </div>
              </a>
              <a
                className="group min-w-0 rounded-lg border border-white/10 bg-white/[0.03] p-5 transition hover:border-lime-300/35 hover:bg-lime-300/10"
                href="/chat-kit.json"
              >
                <MessageSquareText className="size-5 text-lime-200" />
                <div className="mt-4 text-sm font-medium text-white">
                  Chat bundle
                </div>
                <div className="mt-2 font-mono text-xs text-zinc-500 group-hover:text-lime-100">
                  /chat-kit.json
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
