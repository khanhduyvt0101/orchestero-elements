"use client"

import { LoaderCircleIcon, SendIcon, SquareIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type ChatComposerStatus = "ready" | "submitted" | "streaming" | "error"

function ChatComposer({ className, ...props }: React.ComponentProps<"form">) {
  return (
    <form
      data-slot="chat-composer"
      className={cn(
        "flex min-w-0 flex-col gap-2 rounded-xl border bg-background p-2 shadow-sm focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
        className
      )}
      {...props}
    />
  )
}

function ChatComposerTextarea({
  className,
  ...props
}: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      data-slot="chat-composer-textarea"
      className={cn(
        "max-h-48 min-h-20 resize-none border-0 bg-transparent p-2 shadow-none focus-visible:ring-0",
        className
      )}
      {...props}
    />
  )
}

function ChatComposerToolbar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-composer-toolbar"
      className={cn("flex items-center justify-between gap-2", className)}
      {...props}
    />
  )
}

function ChatComposerTools({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-composer-tools"
      className={cn("flex min-w-0 items-center gap-1", className)}
      {...props}
    />
  )
}

function ChatComposerSubmit({
  status = "ready",
  disabled,
  children,
  ...props
}: React.ComponentProps<typeof Button> & {
  status?: ChatComposerStatus
}) {
  const isBusy = status === "submitted" || status === "streaming"

  return (
    <Button
      data-slot="chat-composer-submit"
      type="submit"
      size="icon"
      disabled={disabled || status === "submitted"}
      aria-label={isBusy ? "Stop generation" : "Send message"}
      {...props}
    >
      {children ??
        (status === "streaming" ? (
          <SquareIcon aria-hidden="true" />
        ) : status === "submitted" ? (
          <Spinner aria-hidden="true" />
        ) : status === "error" ? (
          <LoaderCircleIcon aria-hidden="true" />
        ) : (
          <SendIcon aria-hidden="true" />
        ))}
    </Button>
  )
}

export {
  ChatComposer,
  ChatComposerSubmit,
  ChatComposerTextarea,
  ChatComposerToolbar,
  ChatComposerTools,
  type ChatComposerStatus,
}
