import { cn } from "@/lib/utils"

function OrchesteroLogoMark({
  className,
  title = "Orchestero",
  ...props
}: React.ComponentProps<"svg"> & {
  title?: string
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label={title}
      className={cn("size-8 shrink-0", className)}
      {...props}
    >
      <rect width="64" height="64" rx="16" fill="#09090B" />
      <rect
        x="4"
        y="4"
        width="56"
        height="56"
        rx="14"
        stroke="white"
        strokeOpacity="0.14"
        strokeWidth="2"
      />
      <g
        transform="translate(14 14) scale(1.5)"
        stroke="#FAFAFA"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z" />
        <path d="M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z" />
        <path d="M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z" />
        <path d="M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z" />
      </g>
    </svg>
  )
}

export { OrchesteroLogoMark }
