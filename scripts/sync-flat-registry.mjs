import { copyFile, mkdir, readdir, readFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const siteConfig = JSON.parse(
  await readFile(path.join(root, "site.config.json"), "utf8")
)
const defaultStyle = siteConfig.defaultStyle ?? "default"
const styleAliases = siteConfig.defaultStyleAliases ?? []
const builtRegistryDir = path.join(root, "public", "r", "styles", defaultStyle)
const flatRegistryDir = path.join(root, "public")
const rootRegistryDir = path.join(root, "public", "r")

await mkdir(flatRegistryDir, { recursive: true })
await mkdir(rootRegistryDir, { recursive: true })

const files = (await readdir(builtRegistryDir))
  .filter((file) => file.endsWith(".json"))
  .sort()

await Promise.all(
  files.flatMap((file) => [
    copyFile(
      path.join(builtRegistryDir, file),
      path.join(flatRegistryDir, file)
    ),
    copyFile(
      path.join(builtRegistryDir, file),
      path.join(rootRegistryDir, file)
    ),
  ])
)

for (const alias of styleAliases) {
  const aliasRegistryDir = path.join(root, "public", "r", "styles", alias)

  await mkdir(aliasRegistryDir, { recursive: true })
  await Promise.all(
    files.map((file) =>
      copyFile(
        path.join(builtRegistryDir, file),
        path.join(aliasRegistryDir, file)
      )
    )
  )
}

console.log(
  `Synced ${files.length} default style registry files to public/, public/r/, and ${styleAliases.length} style aliases`
)
