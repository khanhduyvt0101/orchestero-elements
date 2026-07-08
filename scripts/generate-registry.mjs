import { readdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const uiDir = path.join(root, "components", "ui")
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
  const hookImportPattern = /@\/hooks\/([a-z0-9-]+)/g

  for (const match of source.matchAll(uiImportPattern)) {
    dependencies.push(match[1])
  }

  for (const match of source.matchAll(hookImportPattern)) {
    dependencies.push(match[1])
  }

  return unique(dependencies)
}

const uiFiles = (await readdir(uiDir))
  .filter((file) => file.endsWith(".tsx"))
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

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "orchestero-elements",
  homepage: "https://github.com/khanhduyvt0101/orchestero-elements",
  items: [...hookItems, ...uiItems],
}

await writeFile(
  path.join(root, "registry.json"),
  `${JSON.stringify(registry, null, 2)}\n`
)
