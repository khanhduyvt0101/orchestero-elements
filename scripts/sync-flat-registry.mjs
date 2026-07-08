import { copyFile, mkdir, readdir } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const builtRegistryDir = path.join(root, "public", "r")
const flatRegistryDir = path.join(root, "public")

await mkdir(flatRegistryDir, { recursive: true })

const files = (await readdir(builtRegistryDir))
  .filter((file) => file.endsWith(".json"))
  .sort()

await Promise.all(
  files.map((file) =>
    copyFile(
      path.join(builtRegistryDir, file),
      path.join(flatRegistryDir, file)
    )
  )
)

console.log(`Synced ${files.length} flat registry files to public/`)
