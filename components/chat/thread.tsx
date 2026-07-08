import { MessageSquareIcon } from "lucide-react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { cn } from "@/lib/utils"

function ChatThread({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="chat-thread"
      className={cn("flex min-h-0 flex-1 flex-col bg-background", className)}
      {...props}
    />
  )
}

function ChatThreadContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-thread-content"
      role="log"
      aria-live="polite"
      aria-relevant="additions text"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-6",
        className
      )}
      {...props}
    />
  )
}

function ChatThreadFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-thread-footer"
      className={cn("shrink-0 border-t bg-background p-4", className)}
      {...props}
    />
  )
}

function ChatThreadEmpty({
  title = "Start a conversation",
  description = "Send a message to begin chatting with the assistant.",
  icon,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Empty> & {
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
}) {
  return (
    <Empty
      data-slot="chat-thread-empty"
      className={cn("border-0", className)}
      {...props}
    >
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {icon ?? <MessageSquareIcon aria-hidden="true" />}
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {children}
    </Empty>
  )
}

export { ChatThread, ChatThreadContent, ChatThreadEmpty, ChatThreadFooter }
