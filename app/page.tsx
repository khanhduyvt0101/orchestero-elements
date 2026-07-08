import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const items = [
  "accordion",
  "alert-dialog",
  "alert",
  "aspect-ratio",
  "attachment",
  "avatar",
  "badge",
  "breadcrumb",
  "bubble",
  "button-group",
  "button",
  "calendar",
  "card",
  "carousel",
  "chart",
  "checkbox",
  "collapsible",
  "combobox",
  "command",
  "context-menu",
  "dialog",
  "direction",
  "drawer",
  "dropdown-menu",
  "empty",
  "field",
  "hover-card",
  "input-group",
  "input-otp",
  "input",
  "item",
  "kbd",
  "label",
  "marker",
  "menubar",
  "message-scroller",
  "message",
  "native-select",
  "navigation-menu",
  "pagination",
  "popover",
  "progress",
  "radio-group",
  "resizable",
  "scroll-area",
  "select",
  "separator",
  "sheet",
  "sidebar",
  "skeleton",
  "slider",
  "sonner",
  "spinner",
  "switch",
  "table",
  "tabs",
  "textarea",
  "toggle-group",
  "toggle",
  "tooltip",
  "use-mobile",
]

export default function Page() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 md:px-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">shadcn registry</Badge>
            <Badge variant="outline">base-nova</Badge>
            <Badge variant="outline">61 items</Badge>
          </div>
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div className="flex max-w-3xl flex-col gap-3">
              <h1 className="text-4xl font-semibold tracking-normal md:text-5xl">
                orchestero-elements
              </h1>
              <p className="text-base leading-7 text-muted-foreground">
                Current default shadcn components packaged as a source registry
                and built JSON registry.
              </p>
            </div>
            <a
              className={cn(buttonVariants({ variant: "default" }))}
              href="/r/registry.json"
            >
              Open Registry JSON
            </a>
          </div>
        </div>

        <Separator />

        <div className="grid gap-8 md:grid-cols-2">
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-medium">GitHub registry install</h2>
            <pre className="overflow-x-auto rounded-md border bg-muted p-4 text-sm">
              <code>
                npx shadcn@latest add khanhduyvt0101/orchestero-elements/button
              </code>
            </pre>
          </section>
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-medium">Namespaced URL install</h2>
            <pre className="overflow-x-auto rounded-md border bg-muted p-4 text-sm">
              <code>npx shadcn@latest add @orchestero/button</code>
            </pre>
          </section>
        </div>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-medium">Registry items</h2>
            <span className="text-sm text-muted-foreground">
              {items.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Badge key={item} variant="outline">
                {item}
              </Badge>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
