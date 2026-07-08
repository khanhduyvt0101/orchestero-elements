import { readdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const siteConfig = JSON.parse(
  await readFile(path.join(root, "site.config.json"), "utf8")
)
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

const uiFiles = (await readdir(uiDir))
  .filter((file) => file.endsWith(".tsx"))
  .sort()

const chatFiles = (await readdir(chatDir))
  .filter((file) => file.endsWith(".ts") || file.endsWith(".tsx"))
  .sort()

const hookFiles = (await readdir(hooksDir))
  .filter((file) => file.endsWith(".ts") || file.endsWith(".tsx"))
  .sort()

const hookItems = hookFiles.map((file) => {
  const name = file.replace(/\.(ts|tsx)$/, "")

  return {
    name,
    type: "registry:hook",
    title: titleFromName(name),
    description: `Default shadcn ${titleFromName(name)} hook.`,
    files: [
      {
        path: `hooks/${file}`,
        type: "registry:hook",
      },
    ],
  }
})

const uiItems = await Promise.all(
  uiFiles.map(async (file) => {
    const name = file.replace(/\.tsx$/, "")
    const source = await readFile(path.join(uiDir, file), "utf8")
    const registryDependencies = dependenciesFromSource(source).filter(
      (dependency) => dependency !== name
    )

    return {
      name,
      type: "registry:ui",
      title: titleFromName(name),
      description: `Default shadcn ${titleFromName(name)} component.`,
      ...(registryDependencies.length > 0 ? { registryDependencies } : {}),
      files: [
        {
          path: `components/ui/${file}`,
          type: "registry:ui",
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
          )
        : dependenciesFromSource(source).filter((dependency) => {
            return dependency !== name && dependency !== "chat-index"
          })

    return {
      name,
      type: "registry:component",
      title: slug === "index" ? "Chat Kit" : `Chat ${titleFromName(slug)}`,
      description:
        slug === "index"
          ? "AI chat app component group for threads, messages, composers, and tool calls."
          : `AI chat app ${titleFromName(slug)} component.`,
      categories: ["ai", "chat"],
      meta: {
        group: "chat",
      },
      ...(registryDependencies.length > 0 ? { registryDependencies } : {}),
      files:
        slug === "index"
          ? chatFiles.map((chatFile) => ({
              path: `components/chat/${chatFile}`,
              type: "registry:component",
            }))
          : [
              {
                path: `components/chat/${file}`,
                type: "registry:component",
              },
            ],
    }
  })
)

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: siteConfig.name,
  homepage: siteConfig.url,
  items: [...hookItems, ...uiItems, ...chatItems],
}

await writeFile(
  path.join(root, "registry.json"),
  `${JSON.stringify(registry, null, 2)}\n`
)
