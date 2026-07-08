"use client"

import { ChevronDownIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

type ChatToolCallState = "pending" | "running" | "completed" | "error"

function formatValue(value: unknown) {
  if (typeof value === "string") {
    return value
  }

  return JSON.stringify(value, null, 2)
}

function ChatToolCall({
  className,
  ...props
}: React.ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible
      data-slot="chat-tool-call"
      className={cn("rounded-xl border bg-muted/40", className)}
      {...props}
    />
  )
}

function ChatToolCallHeader({
  name,
  state = "pending",
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsibleTrigger> & {
  name: string
  state?: ChatToolCallState
}) {
  return (
    <CollapsibleTrigger
      data-slot="chat-tool-call-header"
      className={cn(
        "group flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
      {...props}
    >
      <span className="flex min-w-0 items-center gap-2">
        <span className="truncate font-medium">{name}</span>
        <Badge
          variant={state === "error" ? "destructive" : "secondary"}
          className="capitalize"
        >
          {state}
        </Badge>
      </span>
      {children ?? (
        <ChevronDownIcon
          aria-hidden="true"
          className="shrink-0 transition-transform group-data-[panel-open]:rotate-180"
        />
      )}
    </CollapsibleTrigger>
  )
}

function ChatToolCallContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsibleContent>) {
  return (
    <CollapsibleContent
      data-slot="chat-tool-call-content"
      className={cn("border-t px-3 py-3", className)}
      {...props}
    />
  )
}

function ChatToolCallInput({
  input,
  className,
  ...props
}: React.ComponentProps<"pre"> & {
  input: unknown
}) {
  return (
    <pre
      data-slot="chat-tool-call-input"
      className={cn(
        "max-h-72 overflow-auto rounded-lg bg-background p-3 text-xs leading-5 text-muted-foreground",
        className
      )}
      {...props}
    >
      {formatValue(input)}
    </pre>
  )
}

function ChatToolCallOutput({
  output,
  error,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  output?: React.ReactNode
  error?: React.ReactNode
}) {
  return (
    <div
      data-slot="chat-tool-call-output"
      data-error={Boolean(error)}
      className={cn(
        "rounded-lg bg-background p-3 text-sm data-[error=true]:text-destructive",
        className
      )}
      {...props}
    >
      {error ?? output}
    </div>
  )
}

export {
  ChatToolCall,
  ChatToolCallContent,
  ChatToolCallHeader,
  ChatToolCallInput,
  ChatToolCallOutput,
  type ChatToolCallState,
}
