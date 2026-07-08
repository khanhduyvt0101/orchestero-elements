import type { MetadataRoute } from "next"

import siteConfig from "@/site.config.json"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: "Orchestero",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#09090B",
    theme_color: "#09090B",
    icons: [
      {
        src: "/orchestero-logo-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/orchestero-logo-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
