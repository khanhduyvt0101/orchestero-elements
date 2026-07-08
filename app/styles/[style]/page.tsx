import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { LandingPage } from "@/components/landing/landing-page"
import {
  getRegistryStyle,
  getStyleStatusLabel,
  registryStyles,
} from "@/lib/registry-styles"
import siteConfig from "@/site.config.json"

type StylePageProps = {
  params: Promise<{
    style: string
  }>
}

export function generateStaticParams() {
  return registryStyles.map((style) => ({
    style: style.slug,
  }))
}

export async function generateMetadata({
  params,
}: StylePageProps): Promise<Metadata> {
  const { style: styleSlug } = await params
  const style = getRegistryStyle(styleSlug)

  if (!style) {
    return {}
  }

  return {
    title: `${style.name} Style`,
    description: `${style.description} ${getStyleStatusLabel(style.status)} in the Orchestero shadcn component registry.`,
    alternates: {
      canonical: `${siteConfig.url}${style.href}`,
    },
    openGraph: {
      title: `${style.name} Style | ${siteConfig.title}`,
      description: style.description,
      url: `${siteConfig.url}${style.href}`,
    },
  }
}

export default async function StylePage({ params }: StylePageProps) {
  const { style: styleSlug } = await params
  const style = getRegistryStyle(styleSlug)

  if (!style) {
    notFound()
  }

  return <LandingPage selectedStyleSlug={style.slug} />
}
