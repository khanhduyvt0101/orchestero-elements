import {
  ArrowUpRightIcon,
  BotIcon,
  CheckIcon,
  ChevronDownIcon,
  Code2Icon,
  ComponentIcon,
  ExternalLinkIcon,
  Layers3Icon,
  MessageSquareTextIcon,
  PackageCheckIcon,
  PaletteIcon,
  SparklesIcon,
  TerminalIcon,
} from "lucide-react"
import Link from "next/link"
import type { ComponentProps } from "react"

import { ThemeModePopover } from "@/components/landing/theme-mode-popover"
import { OrchesteroLogoMark } from "@/components/orchestero-logo"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  defaultRegistryStyle,
  getRegistryStyle,
  getStyleStatusLabel,
  type RegistryStyle,
  registryStyles,
} from "@/lib/registry-styles"
import { cn } from "@/lib/utils"
import siteConfig from "@/site.config.json"

const componentGroups = [
  {
    title: "Actions",
    description: "Buttons, command surfaces, menus, and context controls.",
    count: 10,
    icon: ComponentIcon,
    samples: ["button", "command", "dropdown-menu", "context-menu"],
  },
  {
    title: "Data Entry",
    description: "Inputs for forms, search, settings, and product flows.",
    count: 13,
    icon: Code2Icon,
    samples: ["input", "textarea", "select", "combobox"],
  },
  {
    title: "Feedback",
    description: "State, messaging, skeletons, and progress patterns.",
    count: 12,
    icon: SparklesIcon,
    samples: ["toast", "alert", "progress", "skeleton"],
  },
  {
    title: "Layout",
    description: "Containers, navigation, tabs, panels, and surfaces.",
    count: 14,
    icon: Layers3Icon,
    samples: ["card", "tabs", "sidebar", "sheet"],
  },
  {
    title: "Overlays",
    description: "Dialogs, drawers, popovers, tooltips, and hover cards.",
    count: 8,
    icon: PackageCheckIcon,
    samples: ["dialog", "drawer", "popover", "tooltip"],
  },
  {
    title: "Display",
    description: "Readable primitives for dense app interfaces.",
    count: 4,
    icon: TerminalIcon,
    samples: ["badge", "avatar", "table", "separator"],
  },
]

const chatItems = [
  "chat-message",
  "chat-thread",
  "composer",
  "prompt-input",
  "thinking-indicator",
]

const installSteps = [
  {
    title: "Point shadcn at Orchestero",
    body: "Use the namespace endpoint for any supported style.",
    code: `"registries": {
  "@orchestero": "${siteConfig.registryUrl}"
}`,
  },
  {
    title: "Install one component",
    body: "Add primitives by name, directly into your app.",
    code: "bunx --bun shadcn@latest add @orchestero/button",
  },
  {
    title: "Install the chat kit",
    body: "Drop the AI chat group into components/chat.",
    code: "bunx --bun shadcn@latest add @orchestero/chat-kit",
  },
]

function statusVariant(status: RegistryStyle["status"]) {
  return status === "available" ? "secondary" : "outline"
}

function GitHubMark(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.03 2C6.49 2 2 6.59 2 12.25c0 4.53 2.88 8.37 6.87 9.73.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.91-2.8.62-3.39-1.22-3.39-1.22-.46-1.19-1.12-1.51-1.12-1.51-.91-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.9 1.57 2.36 1.12 2.94.86.09-.66.35-1.12.64-1.38-2.24-.26-4.59-1.14-4.59-5.07 0-1.12.39-2.03 1.04-2.75-.1-.26-.45-1.3.1-2.71 0 0 .85-.28 2.76 1.05A9.44 9.44 0 0 1 12.03 7c.85 0 1.7.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.65.72 1.04 1.63 1.04 2.75 0 3.94-2.36 4.81-4.6 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.1 10.1 0 0 0 22 12.25C22 6.59 17.52 2 12.03 2Z"
      />
    </svg>
  )
}

function StyleSelect({ selectedStyle }: { selectedStyle: RegistryStyle }) {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
      >
        <PaletteIcon data-icon="inline-start" />
        <span>{selectedStyle.name}</span>
        <ChevronDownIcon data-icon="inline-end" className="opacity-60" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72">
        <PopoverHeader>
          <PopoverTitle>Styles</PopoverTitle>
          <PopoverDescription>
            One registry shape, multiple visual systems.
          </PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-1">
          {registryStyles.map((style) => {
            const isActive = style.slug === selectedStyle.slug

            return (
              <Link
                key={style.slug}
                href={style.href}
                className={cn(
                  "group grid gap-1 rounded-lg border border-transparent p-2.5 text-sm transition-colors hover:border-border hover:bg-muted",
                  isActive && "border-border bg-muted"
                )}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-medium">{style.name}</span>
                  <Badge variant={statusVariant(style.status)}>
                    {getStyleStatusLabel(style.status)}
                  </Badge>
                </span>
                <span className="text-xs text-muted-foreground">
                  {style.preview.title}
                </span>
              </Link>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function SiteHeader({ selectedStyle }: { selectedStyle: RegistryStyle }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <OrchesteroLogoMark className="size-7" title="Orchestero Elements" />
          <span className="truncate text-sm font-semibold">
            Orchestero Elements
          </span>
        </Link>
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          <a
            href="#components"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Components
          </a>
          <a
            href="#install"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Install
          </a>
        </nav>
        <StyleSelect selectedStyle={selectedStyle} />
        <ThemeModePopover />
        <a
          href={siteConfig.githubUrl}
          aria-label="GitHub"
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "icon-sm" })
          )}
        >
          <GitHubMark />
        </a>
      </div>
    </header>
  )
}

function HeroPreview({ selectedStyle }: { selectedStyle: RegistryStyle }) {
  const isAvailable = selectedStyle.status === "available"

  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <Badge variant={statusVariant(selectedStyle.status)}>
            {getStyleStatusLabel(selectedStyle.status)}
          </Badge>
          <span className="text-xs text-muted-foreground">
            styles/{selectedStyle.slug}
          </span>
        </div>
        <CardTitle>{selectedStyle.preview.title}</CardTitle>
        <CardDescription>{selectedStyle.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid min-w-0 gap-4">
        <div className="rounded-lg border border-border bg-muted/40 p-3">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span className="size-2 rounded-full bg-amber-500" />
              <span className="size-2 rounded-full bg-rose-500" />
            </div>
            <span className="text-xs text-muted-foreground">chat preview</span>
          </div>
          <div className="grid gap-2">
            <div className="mr-8 min-w-0 rounded-lg border border-border bg-background p-3 text-sm">
              What can I install from this registry?
            </div>
            <div className="ml-8 min-w-0 rounded-lg bg-foreground p-3 text-sm text-background">
              Primitives, app surfaces, and AI chat components.
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-2 text-center">
          <div className="min-w-0 rounded-lg border border-border p-3">
            <div className="text-lg font-semibold">66</div>
            <div className="text-xs text-muted-foreground">items</div>
          </div>
          <div className="min-w-0 rounded-lg border border-border p-3">
            <div className="text-lg font-semibold">5</div>
            <div className="text-xs text-muted-foreground">chat</div>
          </div>
          <div className="min-w-0 rounded-lg border border-border p-3">
            <div className="text-lg font-semibold">3</div>
            <div className="text-xs text-muted-foreground">styles</div>
          </div>
        </div>
        <div className="min-w-0 rounded-lg border border-border bg-background p-3">
          <div className="mb-2 text-xs text-muted-foreground">registry</div>
          <code className="block truncate font-mono text-xs">
            {isAvailable
              ? selectedStyle.registryUrl.replace("{name}", "registry")
              : "Coming soon. Default is ready today."}
          </code>
        </div>
      </CardContent>
    </Card>
  )
}

function HeroSection({ selectedStyle }: { selectedStyle: RegistryStyle }) {
  return (
    <section className="border-b border-border bg-[radial-gradient(circle_at_top_left,color-mix(in_oklch,var(--primary),transparent_78%),transparent_32rem)]">
      <div className="mx-auto grid min-h-[calc(100svh-3.5rem)] w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,25rem)] lg:py-20">
        <div className="max-w-3xl min-w-0">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-balance sm:text-5xl lg:text-6xl">
            Orchestero Elements
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-pretty text-muted-foreground">
            A shadcn registry for product teams building AI-first interfaces.
            Default is live. Pixel and macOS are next.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-2">
            <a
              href="#install"
              className={cn(buttonVariants({ variant: "default", size: "lg" }))}
            >
              <TerminalIcon data-icon="inline-start" />
              Install
            </a>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <GitHubMark data-icon="inline-start" />
              GitHub
            </a>
            <a
              href={selectedStyle.registryUrl.replace("{name}", "registry")}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
            >
              Registry
              <ArrowUpRightIcon data-icon="inline-end" />
            </a>
          </div>
          <div className="mt-8 grid max-w-2xl gap-2 sm:grid-cols-3">
            {registryStyles.map((style) => (
              <Link
                key={style.slug}
                href={style.href}
                className={cn(
                  "rounded-lg border border-border bg-background/75 p-3 transition-colors hover:bg-muted",
                  style.slug === selectedStyle.slug && "bg-muted"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">{style.name}</span>
                  {style.status === "available" ? <CheckIcon /> : null}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {getStyleStatusLabel(style.status)}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <HeroPreview selectedStyle={selectedStyle} />
      </div>
    </section>
  )
}

function ComponentsShowcase() {
  return (
    <section id="components" className="border-b border-border py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-normal sm:text-3xl">
              Components Showcase
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              The default style ships shadcn-shaped primitives plus an AI chat
              group for components/chat.
            </p>
          </div>
          <Badge variant="secondary">Default style ready</Badge>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {componentGroups.map((group) => {
            const Icon = group.icon

            return (
              <Card key={group.title}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-9 place-items-center rounded-lg border border-border bg-muted">
                      <Icon />
                    </span>
                    <Badge variant="outline">{group.count}</Badge>
                  </div>
                  <CardTitle>{group.title}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {group.samples.map((sample) => (
                      <Badge key={sample} variant="outline">
                        {sample}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <Card className="mt-4">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BotIcon />
                  AI Chat Kit
                </CardTitle>
                <CardDescription>
                  Install as one group or compose individual chat pieces.
                </CardDescription>
              </div>
              <CardAction>
                <Badge variant="secondary">components/chat</Badge>
              </CardAction>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {chatItems.map((item) => (
              <Badge key={item} variant="outline">
                <MessageSquareTextIcon />
                {item}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function HowToInstall({ selectedStyle }: { selectedStyle: RegistryStyle }) {
  return (
    <section id="install" className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <h2 className="text-2xl font-semibold tracking-normal sm:text-3xl">
              How to Install
            </h2>
            <p className="mt-2 text-muted-foreground">
              Add the namespace once, then install by registry name.
            </p>
            <div className="mt-5 rounded-lg border border-border bg-muted/40 p-4">
              <div className="text-sm font-medium">Current style</div>
              <div className="mt-1 text-sm text-muted-foreground">
                {selectedStyle.name} ·{" "}
                {getStyleStatusLabel(selectedStyle.status)}
              </div>
              <Separator className="my-4" />
              <code className="block truncate font-mono text-xs">
                {selectedStyle.registryUrl}
              </code>
            </div>
          </div>
          <div className="grid gap-4">
            {installSteps.map((step, index) => (
              <Card key={step.title}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle>{step.title}</CardTitle>
                      <CardDescription>{step.body}</CardDescription>
                    </div>
                    <Badge variant="outline">{index + 1}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="overflow-x-auto rounded-lg border border-border bg-foreground p-4 text-background">
                    <code className="font-mono text-xs">{step.code}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2 text-foreground">
          <OrchesteroLogoMark className="size-7" title="Orchestero Elements" />
          <span className="font-medium">Orchestero Elements</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/styles/default" className="hover:text-foreground">
            Default
          </Link>
          <a href="#install" className="hover:text-foreground">
            Install
          </a>
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-foreground"
          >
            GitHub
            <ExternalLinkIcon />
          </a>
        </div>
      </div>
    </footer>
  )
}

export function LandingPage({
  selectedStyleSlug,
}: {
  selectedStyleSlug?: string
}) {
  const selectedStyle =
    (selectedStyleSlug ? getRegistryStyle(selectedStyleSlug) : undefined) ??
    defaultRegistryStyle

  return (
    <div className="min-h-svh bg-background text-foreground">
      <SiteHeader selectedStyle={selectedStyle} />
      <main>
        <HeroSection selectedStyle={selectedStyle} />
        <ComponentsShowcase />
        <HowToInstall selectedStyle={selectedStyle} />
      </main>
      <SiteFooter />
    </div>
  )
}
