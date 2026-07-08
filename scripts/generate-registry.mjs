import { readdir, readFile, rm, writeFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const siteConfig = JSON.parse(
  await readFile(path.join(root, "site.config.json"), "utf8")
)
const namespace = siteConfig.namespace ?? "@orchestero"
const registryDir = path.join(root, "registry")
const uiDir = path.join(root, "components", "ui")
const chatDir = path.join(root, "components", "chat")
const hooksDir = path.join(root, "hooks")

function titleFromName(name) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function unique(values) {
  return [...new Set(values)].sort()
}

function dependenciesFromSource(source) {
  const dependencies = []
  const uiImportPattern = /@\/components\/ui\/([a-z0-9-]+)/g
  const chatImportPattern = /@\/components\/chat\/([a-z0-9-]+)/g
  const hookImportPattern = /@\/hooks\/([a-z0-9-]+)/g

  for (const match of source.matchAll(uiImportPattern)) {
    dependencies.push(match[1])
  }

  for (const match of source.matchAll(chatImportPattern)) {
    dependencies.push(`chat-${match[1]}`)
  }

  for (const match of source.matchAll(hookImportPattern)) {
    dependencies.push(match[1])
  }

  return unique(dependencies)
}

function namespacedDependency(dependency) {
  return `${namespace}/${dependency}`
}

const uiFiles = (await readdir(uiDir))
  .filter((file) => file.endsWith(".tsx"))
  .sort()

const chatFiles = (await readdir(chatDir))
  .filter((file) => file.endsWith(".ts") || file.endsWith(".tsx"))
  .sort()

const hookFiles = (await readdir(hooksDir))
  .filter((file) => file.endsWith(".ts") || file.endsWith(".tsx"))
  .sort()

await rm(registryDir, { recursive: true, force: true })

const hookItems = hookFiles.map((file) => {
  const name = file.replace(/\.(ts|tsx)$/, "")

  return {
    name,
    type: "registry:hook",
    title: titleFromName(name),
    description: `Orchestero ${titleFromName(name)} hook for shadcn-compatible projects.`,
    files: [
      {
        path: file,
        type: "registry:hook",
        target: `@hooks/${file}`,
      },
    ],
  }
})

const uiItems = await Promise.all(
  uiFiles.map(async (file) => {
    const name = file.replace(/\.tsx$/, "")
    const source = await readFile(path.join(uiDir, file), "utf8")
    const registryDependencies = dependenciesFromSource(source)
      .filter((dependency) => dependency !== name)
      .map(namespacedDependency)

    return {
      name,
      type: "registry:ui",
      title: titleFromName(name),
      description: `Orchestero ${titleFromName(name)} component for product interfaces.`,
      ...(registryDependencies.length > 0 ? { registryDependencies } : {}),
      files: [
        {
          path: file,
          type: "registry:ui",
          target: `@ui/${file}`,
        },
      ],
    }
  })
)

const chatItems = await Promise.all(
  chatFiles.map(async (file) => {
    const slug = file.replace(/\.(ts|tsx)$/, "")
    const name = slug === "index" ? "chat-kit" : `chat-${slug}`
    const source = await readFile(path.join(chatDir, file), "utf8")
    const registryDependencies =
      slug === "index"
        ? unique(
            (
              await Promise.all(
                chatFiles
                  .filter((chatFile) => chatFile !== "index.ts")
                  .map(async (chatFile) => {
                    const chatSource = await readFile(
                      path.join(chatDir, chatFile),
                      "utf8"
                    )

                    return dependenciesFromSource(chatSource)
                  })
              )
            )
              .flat()
              .filter((dependency) => !dependency.startsWith("chat-"))
              .map(namespacedDependency)
          )
        : dependenciesFromSource(source)
            .filter((dependency) => {
              return dependency !== name && dependency !== "chat-index"
            })
            .map(namespacedDependency)

    return {
      name,
      type: "registry:component",
      title: slug === "index" ? "Chat Kit" : `Chat ${titleFromName(slug)}`,
      description:
        slug === "index"
          ? "Orchestero AI chat component group for threads, messages, composers, and tool calls."
          : `Orchestero AI chat ${titleFromName(slug)} component.`,
      categories: ["ai", "chat"],
      meta: {
        group: "chat",
      },
      ...(registryDependencies.length > 0 ? { registryDependencies } : {}),
      files:
        slug === "index"
          ? chatFiles.map((chatFile) => ({
              path: chatFile,
              type: "registry:component",
              target: `@components/chat/${chatFile}`,
            }))
          : [
              {
                path: file,
                type: "registry:component",
                target: `@components/chat/${file}`,
              },
            ],
    }
  })
)

const uiRegistry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  items: uiItems,
}

const chatRegistry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  items: chatItems,
}

const hooksRegistry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  items: hookItems,
}

const rootRegistry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: siteConfig.name,
  homepage: siteConfig.url,
  include: [
    "components/ui/registry.json",
    "components/chat/registry.json",
    "hooks/registry.json",
  ],
}

await writeFile(
  path.join(uiDir, "registry.json"),
  `${JSON.stringify(uiRegistry, null, 2)}\n`
)

await writeFile(
  path.join(chatDir, "registry.json"),
  `${JSON.stringify(chatRegistry, null, 2)}\n`
)

await writeFile(
  path.join(hooksDir, "registry.json"),
  `${JSON.stringify(hooksRegistry, null, 2)}\n`
)

await writeFile(
  path.join(root, "registry.json"),
  `${JSON.stringify(rootRegistry, null, 2)}\n`
)
