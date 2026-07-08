import siteConfig from "@/site.config.json"

export type RegistryStyleStatus = "available" | "coming-soon"

export type RegistryStyle = {
  slug: string
  name: string
  status: RegistryStyleStatus
  href: string
  registryUrl: string
  description: string
  audience: string
  installCommand: string
  preview: {
    title: string
    surface: string
    accent: string
    secondary: string
  }
}

export const registryStyles = [
  {
    slug: "default",
    name: "Default",
    status: "available",
    href: "/styles/default",
    registryUrl: siteConfig.registryUrl.replace("{style}", "default"),
    description:
      "The current Orchestero baseline: crisp shadcn-compatible primitives, AI chat pieces, and production-ready registry items.",
    audience:
      "Best for SaaS dashboards, AI products, admin tools, and teams that want the most stable Orchestero component surface today.",
    installCommand: "npx shadcn@latest add @orchestero/chat-kit",
    preview: {
      title: "Quiet product interface",
      surface: "bg-zinc-950 text-white border-white/10",
      accent: "bg-teal-300 text-zinc-950",
      secondary: "bg-lime-300 text-zinc-950",
    },
  },
  {
    slug: "pixel",
    name: "Pixel",
    status: "coming-soon",
    href: "/styles/pixel",
    registryUrl: siteConfig.registryUrl.replace("{style}", "pixel"),
    description:
      "A sharper, grid-forward treatment planned for playful builders, creative tools, and retro-inspired AI interfaces.",
    audience:
      "Best for expressive products that still need installable, shadcn-shaped components instead of one-off visual experiments.",
    installCommand: "npx shadcn@latest add @orchestero/chat-kit",
    preview: {
      title: "Hard-edge creative console",
      surface: "bg-neutral-950 text-white border-fuchsia-300/40",
      accent: "bg-cyan-300 text-zinc-950",
      secondary: "bg-yellow-300 text-zinc-950",
    },
  },
  {
    slug: "macos",
    name: "macOS",
    status: "coming-soon",
    href: "/styles/macos",
    registryUrl: siteConfig.registryUrl.replace("{style}", "macos"),
    description:
      "A desktop-native direction planned for calm, high-density AI workspaces and command surfaces.",
    audience:
      "Best for apps that should feel familiar on desktop while keeping the same registry names and install workflow.",
    installCommand: "npx shadcn@latest add @orchestero/chat-kit",
    preview: {
      title: "Desktop workspace shell",
      surface: "bg-slate-50 text-slate-950 border-slate-200",
      accent: "bg-sky-500 text-white",
      secondary: "bg-emerald-500 text-white",
    },
  },
] as const satisfies readonly RegistryStyle[]

export type RegistryStyleSlug = (typeof registryStyles)[number]["slug"]

export const defaultRegistryStyle = registryStyles[0]

export function getRegistryStyle(slug: string) {
  return registryStyles.find((style) => style.slug === slug)
}

export function getStyleStatusLabel(status: RegistryStyleStatus) {
  return status === "available" ? "Available" : "Coming soon"
}
